/** @flow */
import React, { PureComponent } from 'react';
import {
  bool,
  func,
  array as PTArray,
  number as PTNumber,
  string as PTString,
  object as PTObject
} from 'prop-types';
import { Grid, AutoSizer } from 'react-virtualized';
import { Scrollbars } from 'react-custom-scrollbars';
import CellMeasurerCacheDecorator from './cell_measurer_cache_decorator';

const SCROLLBAR_SIZE_BUFFER = 20;

/**
 * Renders 1, 2, or 4 Grids depending on configuration.
 * A main (body) Grid will always be rendered.
 * Optionally, 1-2 Grids for sticky header rows will also be rendered.
 * If no sticky columns, only 1 sticky header Grid will be rendered.
 * If sticky columns, 2 sticky header Grids will be rendered.
 */
export default class MultiGrid extends PureComponent {
  static propTypes = {
    classNameBottomLeftGrid: PTString.isRequired,
    classNameBottomRightGrid: PTString.isRequired,
    classNameTopLeftGrid: PTString.isRequired,
    classNameTopRightGrid: PTString.isRequired,
    enableFixedColumnScroll: bool.isRequired,
    enableFixedRowScroll: bool.isRequired,
    fixedColumnCount: PTNumber.isRequired,
    fixedRowCount: PTNumber.isRequired,
    onScrollbarPresenceChange: func,
    style: PTObject.isRequired,
    styleBottomLeftGrid: PTObject.isRequired,
    styleBottomRightGrid: PTObject.isRequired,
    styleTopLeftGrid: PTObject.isRequired,
    styleTopRightGrid: PTObject.isRequired,
    columns: PTArray,
    data: PTArray.isRequired
  };

  static defaultProps = {
    classNameBottomLeftGrid: '',
    classNameBottomRightGrid: '',
    classNameTopLeftGrid: '',
    classNameTopRightGrid: '',
    enableFixedColumnScroll: false,
    enableFixedRowScroll: false,
    fixedColumnCount: 0,
    fixedRowCount: 0,
    scrollToColumn: -1,
    scrollToRow: -1,
    style: {},
    styleHead: {},
    styleHeadGrid: {},
    styleBody: {},
    styleBodyGrid: {},
    styleBottomLeftGrid: {},
    styleBottomRightGrid: {},
    styleTopLeftGrid: {},
    styleTopRightGrid: {},
    data: []
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      scrollLeft: 0,
      scrollTop: 0,
      scrollbarSize: 0,
      showHorizontalScrollbar: false,
      showVerticalScrollbar: false,
    };

    this._deferredInvalidateColumnIndex = null;
    this._deferredInvalidateRowIndex = null;
    this._columnsCount = (this.props.columns && this.props.columns.length) ||
      (this.props.data.length && this.props.data[0].length);
    this._rowCount = Number(this.props.data.length + (this.props.columns && 1));
  }

  /** See Grid#invalidateCellSizeAfterRender */
  invalidateCellSizeAfterRender({ columnIndex = 0, rowIndex = 0 } = {}) {
    this._deferredInvalidateColumnIndex =
      typeof this._deferredInvalidateColumnIndex === 'number'
        ? Math.min(this._deferredInvalidateColumnIndex, columnIndex)
        : columnIndex;
    this._deferredInvalidateRowIndex =
      typeof this._deferredInvalidateRowIndex === 'number'
        ? Math.min(this._deferredInvalidateRowIndex, rowIndex)
        : rowIndex;
  }

  /** See Grid#measureAllCells */
  measureAllCells() {
    this._bottomLeftGrid && this._bottomLeftGrid.measureAllCells();
    this._bottomRightGrid && this._bottomRightGrid.measureAllCells();
    this._topLeftGrid && this._topLeftGrid.measureAllCells();
    this._topRightGrid && this._topRightGrid.measureAllCells();
  }

  /** See Grid#recomputeGridSize */
  recomputeGridSize({ columnIndex = 0, rowIndex = 0 } = {}) {
    const { fixedColumnCount, fixedRowCount } = this.props;

    const adjustedColumnIndex = Math.max(0, columnIndex - fixedColumnCount);
    const adjustedRowIndex = Math.max(0, rowIndex - fixedRowCount);

    this._bottomLeftGrid &&
      this._bottomLeftGrid.recomputeGridSize({
        columnIndex,
        rowIndex: adjustedRowIndex,
      });
    this._bottomRightGrid &&
      this._bottomRightGrid.recomputeGridSize({
        columnIndex: adjustedColumnIndex,
        rowIndex: adjustedRowIndex,
      });
    this._topLeftGrid &&
      this._topLeftGrid.recomputeGridSize({
        columnIndex,
        rowIndex,
      });
    this._topRightGrid &&
      this._topRightGrid.recomputeGridSize({
        columnIndex: adjustedColumnIndex,
        rowIndex,
      });

    this._leftGridWidth = null;
    this._topGridHeight = null;
    this._maybeCalculateCachedStyles(null, this.props, null, this.state);
  }

  componentDidUpdate() {
    this._handleInvalidatedGridSize();
  }

  forceUpdateGrids() {
    this._bottomLeftGrid && this._bottomLeftGrid.forceUpdate();
    this._bottomRightGrid && this._bottomRightGrid.forceUpdate();
    this._topLeftGrid && this._topLeftGrid.forceUpdate();
    this._topRightGrid && this._topRightGrid.forceUpdate();
  }

  componentWillMount() {
    const {
      deferredMeasurementCache,
      fixedColumnCount,
      fixedRowCount
    } = this.props;

    this._maybeCalculateCachedStyles(null, this.props, null, this.state);

    if (deferredMeasurementCache) {
      this._deferredMeasurementCacheBottomLeftGrid =
        fixedRowCount > 0
          ? new CellMeasurerCacheDecorator({
            cellMeasurerCache: deferredMeasurementCache,
            columnIndexOffset: 0,
            rowIndexOffset: fixedRowCount
          })
          : deferredMeasurementCache;

      this._deferredMeasurementCacheBottomRightGrid =
        fixedColumnCount > 0 || fixedRowCount > 0
          ? new CellMeasurerCacheDecorator({
            cellMeasurerCache: deferredMeasurementCache,
            columnIndexOffset: fixedColumnCount,
            rowIndexOffset: fixedRowCount
          })
          : deferredMeasurementCache;

      this._deferredMeasurementCacheTopRightGrid =
        fixedColumnCount > 0
          ? new CellMeasurerCacheDecorator({
            cellMeasurerCache: deferredMeasurementCache,
            columnIndexOffset: fixedColumnCount,
            rowIndexOffset: 0
          })
          : deferredMeasurementCache;
    }
  }

  componentDidMount() {
    const { scrollLeft, scrollTop } = this.props;

    if (scrollLeft > 0 || scrollTop > 0) {
      const newState = {};

      if (scrollLeft > 0) {
        newState.scrollLeft = scrollLeft;
      }

      if (scrollTop > 0) {
        newState.scrollTop = scrollTop;
      }

      this.setState(newState);
    }
    this._handleInvalidatedGridSize();
  }

  componentWillReceiveProps(nextProps, nextState) {
    const {
      columnWidth,
      fixedColumnCount,
      fixedRowCount,
      rowHeight,
      columns,
      data
    } = this.props;

    this._columnsCount = (nextProps.columns && nextProps.columns.length) ||
      (nextProps.data.length && nextProps.data[0].length);
    this._rowCount = Number(nextProps.data.length + (nextProps.columns && 1));

    if (
      columnWidth !== nextProps.columnWidth ||
      fixedColumnCount !== nextProps.fixedColumnCount
    ) {
      this._leftGridWidth = null;
    }

    if (
      fixedRowCount !== nextProps.fixedRowCount ||
      rowHeight !== nextProps.rowHeight
    ) {
      this._topGridHeight = null;
    }

    if (
      nextProps.scrollLeft !== this.props.scrollLeft ||
      nextProps.scrollTop !== this.props.scrollTop
    ) {
      const newState = {};

      if (nextProps.scrollLeft != null && nextProps.scrollLeft >= 0) {
        newState.scrollLeft = nextProps.scrollLeft;
      }

      if (nextProps.scrollTop != null && nextProps.scrollTop >= 0) {
        newState.scrollTop = nextProps.scrollTop;
      }

      this.setState(newState);
    }

    this._maybeCalculateCachedStyles(
      this.props,
      nextProps,
      this.state,
      nextState,
    );
  }

  render() {
    const {
      onScroll,
      onSectionRendered,
      onScrollbarPresenceChange, // eslint-disable-line no-unused-vars
      scrollLeft: scrollLeftProp, // eslint-disable-line no-unused-vars
      scrollToColumn,
      scrollTop: scrollTopProp, // eslint-disable-line no-unused-vars
      scrollToRow,
      data,
      columns,
      ...rest
    } = this.props;

    // scrollTop and scrollLeft props are explicitly filtered out and ignored
    if (data.length === 0 && columns.length === 0) return null;
    const { scrollLeft, scrollTop } = this.state;

    return (
      <AutoSizer>
        {({ width, height }) => (
          <div style={this._containerOuterStyle}>
            <div style={this._containerTopStyle}>
              {this._renderTopLeftGrid(rest)}
              {this._renderTopRightGrid({
                ...rest,
                width,
                height,
                onScroll,
                scrollLeft
              })}
            </div>
            <div style={this._containerBottomStyle}>
              {this._renderBottomLeftGrid({
                ...rest,
                width,
                height,
                onScroll,
                scrollTop
              })}
              {this._renderBottomRightGrid({
                ...rest,
                width,
                height,
                onScroll,
                onSectionRendered,
                scrollLeft,
                scrollToColumn,
                scrollToRow,
                scrollTop
              })}
            </div>
          </div>
        )}
      </AutoSizer>
    );
  }

  _handleScroll = ({ target }) => {
    const { scrollTop, scrollLeft } = target;
    const { Grid: grid } = this.List;
    Grid.handleScrollEvent({ scrollTop, scrollLeft });
  }

  _defaultCellRenderer = ({ columnIndex, key, rowIndex, style }) => (
    <div
      key={key}
      style={{
        overflow: 'hidden',
        ...style,
        ...this.props.styleBodyGrid
      }}
    >
      {this.props.data[rowIndex][columnIndex]}
    </div>
  )

  _defaultHeadRenderer = ({ columnIndex, key, style }) => (
    <div
      key={key}
      style={{
        overflow: 'hidden',
        ...style,
        ...this.props.styleHeadGrid
      }}
    >
      <span style={{ margin: '0 15px' }}>{this.props.columns ? this.props.columns[columnIndex] : this.props.data[0][columnIndex]}</span>
    </div>
  )

  _bottomLeftGridRef = (ref) => {
    this._bottomLeftGrid = ref;
  }

  _bottomRightGridRef = (ref) => {
    this._bottomRightGrid = ref;
  }

  _cellRendererBottomLeftGrid = ({ rowIndex, ...rest }) => {
    const { cellRenderer, fixedRowCount } = this.props;

    if (rowIndex === this._rowCount - fixedRowCount) {
      return (
        <div
          key={rest.key}
          style={{
            ...rest.style,
            height: SCROLLBAR_SIZE_BUFFER
          }}
        />
      );
    }
    return cellRenderer({
      ...rest,
      parent: this,
      rowIndex: rowIndex + fixedRowCount
    });
  }

  _cellRendererBottomRightGrid = ({ columnIndex, rowIndex, ...rest }) => {
    const { cellRenderer, bottomRightRenderer, fixedColumnCount, fixedRowCount } = this.props;
    const renderer = bottomRightRenderer || cellRenderer || this._defaultCellRenderer;

    return renderer({
      ...rest,
      columnIndex: columnIndex + fixedColumnCount,
      parent: this,
      rowIndex // 去掉fixedRowCount的列，如果需要固定多行 + fixedRowCount
    });
  }

  _cellRendererTopRightGrid = ({ columnIndex, ...rest }) => {
    const { cellRenderer, topCellRenderer, data, fixedColumnCount } = this.props;
    const renderer = topCellRenderer || cellRenderer || this._defaultHeadRenderer;
    if (columnIndex === this._columnCount - fixedColumnCount) {
      return (
        <div
          key={rest.key}
          style={{
            ...rest.style,
            width: SCROLLBAR_SIZE_BUFFER
          }}
        />
      );
    }
    return renderer({
      ...rest,
      columnIndex: columnIndex + fixedColumnCount,
      parent: this
    });
  }

  _columnWidthRightGrid = ({ index }) => {
    const { fixedColumnCount, columnWidth } = this.props;
    const { scrollbarSize, showHorizontalScrollbar } = this.state;

    // An extra cell is added to the count
    // This gives the smaller Grid extra room for offset,
    // In case the main (bottom right) Grid has a scrollbar
    // If no scrollbar, the extra space is overflow:hidden anyway
    if (showHorizontalScrollbar && index === this._columnCount - fixedColumnCount) {
      return scrollbarSize;
    }

    return typeof columnWidth === 'function'
      ? columnWidth({ index: index + fixedColumnCount })
      : columnWidth;
  }

  _getBottomGridHeight = (props) => {
    const { height } = props;

    let topGridHeight = this._getTopGridHeight(props);

    return height - topGridHeight;
  }

  _getLeftGridWidth = (props) => {
    const { fixedColumnCount, columnWidth } = props;

    if (this._leftGridWidth == null) {
      if (typeof columnWidth === 'function') {
        let leftGridWidth = 0;

        for (let index = 0; index < fixedColumnCount; index++) {
          leftGridWidth += columnWidth({ index });
        }

        this._leftGridWidth = leftGridWidth;
      } else {
        this._leftGridWidth = columnWidth * fixedColumnCount;
      }
    }

    return this._leftGridWidth;
  }

  _getRightGridWidth = (props) => {
    const { width } = props;
    let leftGridWidth = this._getLeftGridWidth(props);
    return width - leftGridWidth;
  }

  _getTopGridHeight = (props) => {
    const { fixedRowCount, rowHeight } = props;

    if (this._topGridHeight == null) {
      if (typeof rowHeight === 'function') {
        let topGridHeight = 0;

        for (let index = 0; index < fixedRowCount; index++) {
          topGridHeight += rowHeight({ index });
        }

        this._topGridHeight = topGridHeight;
      } else {
        this._topGridHeight = rowHeight * fixedRowCount;
      }
    }

    return this._topGridHeight;
  }

  _handleInvalidatedGridSize = () => {
    if (typeof this._deferredInvalidateColumnIndex === 'number') {
      const columnIndex = this._deferredInvalidateColumnIndex;
      const rowIndex = this._deferredInvalidateRowIndex;

      this._deferredInvalidateColumnIndex = null;
      this._deferredInvalidateRowIndex = null;

      this.recomputeGridSize({
        columnIndex,
        rowIndex
      });
      this.forceUpdate();
    }
  }

  /**
   * Avoid recreating inline styles each render; this bypasses Grid's shallowCompare.
   * This method recalculates styles only when specific props change.
   */
  _maybeCalculateCachedStyles = (prevProps, props) => {
    const {
      columnWidth,
      enableFixedColumnScroll,
      enableFixedRowScroll,
      height,
      fixedColumnCount,
      fixedRowCount,
      rowHeight,
      style,
      styleHead,
      styleHeadGrid,
      styleBody,
      styleBodyGrid,
      styleBottomLeftGrid,
      styleBottomRightGrid,
      styleTopLeftGrid,
      styleTopRightGrid,
      width
    } = props;

    const firstRender = !prevProps;
    const sizeChange =
      firstRender || height !== prevProps.height || width !== prevProps.width;
    const leftSizeChange =
      firstRender ||
      columnWidth !== prevProps.columnWidth ||
      fixedColumnCount !== prevProps.fixedColumnCount;
    const topSizeChange =
      firstRender ||
      fixedRowCount !== prevProps.fixedRowCount ||
      rowHeight !== prevProps.rowHeight;

    if (firstRender || sizeChange || style !== prevProps.style) {
      this._containerOuterStyle = {
        height,
        overflow: 'visible', // Let :focus outline show through
        width,
        ...style
      };
    }

    if (firstRender || sizeChange || topSizeChange) {
      this._containerTopStyle = {
        height: this._getTopGridHeight(props),
        position: 'relative',
        width
      };

      this._containerBottomStyle = {
        height: height - this._getTopGridHeight(props),
        overflow: 'visible', // Let :focus outline show through
        position: 'relative',
        width
      };
    }

    if (firstRender || styleBody !== prevProps.styleBody) {
      this._bottomLeftGridStyle = {
        left: 0,
        overflowX: 'hidden',
        overflowY: enableFixedColumnScroll ? 'auto' : 'hidden',
        position: 'absolute',
        ...styleBody
      };
    }

    if (
      firstRender ||
      leftSizeChange ||
      styleBody !== prevProps.styleBody
    ) {
      this._bottomRightGridStyle = {
        left: this._getLeftGridWidth(props),
        position: 'absolute',
        ...styleBody
      };
    }

    if (firstRender || styleHead !== prevProps.styleHead) {
      this._topLeftGridStyle = {
        left: 0,
        overflowX: 'hidden',
        overflowY: 'hidden',
        position: 'absolute',
        top: 0,
        ...styleHead
      };
    }

    if (
      firstRender ||
      leftSizeChange ||
      styleHead !== prevProps.styleHead
    ) {
      this._topRightGridStyle = {
        left: this._getLeftGridWidth(props),
        overflowX: enableFixedRowScroll ? 'auto' : 'hidden',
        overflowY: 'hidden',
        position: 'absolute',
        top: 0,
        ...styleHead
      };
    }
  }

  _onScroll = (scrollInfo) => {
    const { scrollLeft, scrollTop } = scrollInfo;
    this.setState({
      scrollLeft,
      scrollTop
    });
    const onScroll = this.props.onScroll;
    if (onScroll) {
      onScroll(scrollInfo);
    }
  }

  _onScrollbarPresenceChange = ({ horizontal, size, vertical }) => {
    const { showHorizontalScrollbar, showVerticalScrollbar } = this.state;

    if (
      horizontal !== showHorizontalScrollbar ||
      vertical !== showVerticalScrollbar
    ) {
      this.setState({
        scrollbarSize: size,
        showHorizontalScrollbar: horizontal,
        showVerticalScrollbar: vertical
      });

      const { onScrollbarPresenceChange } = this.props;
      if (typeof onScrollbarPresenceChange === 'function') {
        onScrollbarPresenceChange({
          horizontal,
          size,
          vertical
        });
      }
    }
  }

  _onScrollLeft = (scrollInfo) => {
    const { scrollLeft } = scrollInfo;
    this._onScroll({
      scrollLeft,
      scrollTop: this.state.scrollTop
    });
  }

  _onScrollTop = (scrollInfo) => {
    const { scrollTop } = scrollInfo;
    this._onScroll({
      scrollTop,
      scrollLeft: this.state.scrollLeft
    });
  }

  _renderBottomLeftGrid = (props) => {
    const {
      enableFixedColumnScroll,
      fixedColumnCount,
      fixedRowCount,
      scrollTop
    } = props;
    const { showVerticalScrollbar } = this.state;

    if (!fixedColumnCount) {
      return null;
    }

    const additionalRowCount = showVerticalScrollbar ? 1 : 0;

    return (
      <Grid
        {...props}
        cellRenderer={this._cellRendererBottomLeftGrid}
        className={this.props.classNameBottomLeftGrid}
        columnCount={fixedColumnCount}
        deferredMeasurementCache={this._deferredMeasurementCacheBottomLeftGrid}
        height={this._getBottomGridHeight(props)}
        onScroll={enableFixedColumnScroll ? this._onScrollTop : undefined}
        ref={this._bottomLeftGridRef}
        rowCount={Math.max(0, this._rowCount - fixedRowCount) + additionalRowCount}
        rowHeight={this._rowHeightBottomGrid}
        scrollTop={scrollTop}
        style={this._bottomLeftGridStyle}
        tabIndex={null}
        width={this._getLeftGridWidth(props)}
      />
    );
  }

  _renderBottomRightGrid = (props) => {
    const {
      fixedColumnCount,
      fixedRowCount,
      scrollToColumn,
      scrollToRow
    } = props;

    return (
      <Grid
        {...props}
        cellRenderer={this._cellRendererBottomRightGrid}
        className={this.props.classNameBottomRightGrid}
        columnCount={Math.max(0, this._columnsCount - fixedColumnCount)}
        columnWidth={this._columnWidthRightGrid}
        deferredMeasurementCache={this._deferredMeasurementCacheBottomRightGrid}
        height={this._getBottomGridHeight(props)}
        onScroll={this._onScroll}
        onScrollbarPresenceChange={this._onScrollbarPresenceChange}
        ref={this._bottomRightGridRef}
        rowCount={Math.max(0, this._rowCount - fixedRowCount)}
        rowHeight={this._rowHeightBottomGrid}
        scrollToColumn={scrollToColumn - fixedColumnCount}
        scrollToRow={scrollToRow - fixedRowCount}
        style={this._bottomRightGridStyle}
        width={this._getRightGridWidth(props)}
      />
    );
  }

  _renderTopLeftGrid = (props) => {
    const { fixedColumnCount, fixedRowCount } = props;

    if (!fixedColumnCount || !fixedRowCount) {
      return null;
    }

    return (
      <Grid
        {...props}
        className={this.props.classNameTopLeftGrid}
        columnCount={fixedColumnCount}
        height={this._getTopGridHeight(props)}
        ref={this._topLeftGridRef}
        rowCount={fixedRowCount}
        style={this._topLeftGridStyle}
        tabIndex={null}
        width={this._getLeftGridWidth(props)}
      />
    );
  }

  _renderTopRightGrid = (props) => {
    const {
      enableFixedRowScroll,
      fixedColumnCount,
      fixedRowCount,
      scrollLeft
    } = props;
    const { showHorizontalScrollbar } = this.state;

    if (!fixedRowCount) {
      return null;
    }

    const additionalColumnCount = showHorizontalScrollbar ? 1 : 0;

    return (
      <Grid
        {...props}
        cellRenderer={this._cellRendererTopRightGrid}
        className={this.props.classNameTopRightGrid}
        columnCount={
          Math.max(0, this._columnsCount - fixedColumnCount) + additionalColumnCount
        }
        columnWidth={this._columnWidthRightGrid}
        deferredMeasurementCache={this._deferredMeasurementCacheTopRightGrid}
        height={this._getTopGridHeight(props)}
        onScroll={enableFixedRowScroll ? this._onScrollLeft : undefined}
        ref={this._topRightGridRef}
        rowCount={fixedRowCount}
        scrollLeft={scrollLeft}
        style={this._topRightGridStyle}
        tabIndex={null}
        width={this._getRightGridWidth(props)}
      />
    );
  }

  _rowHeightBottomGrid = ({ index }) => {
    const { fixedRowCount, rowHeight } = this.props;
    const { scrollbarSize, showVerticalScrollbar } = this.state;

    // An extra cell is added to the count
    // This gives the smaller Grid extra room for offset,
    // In case the main (bottom right) Grid has a scrollbar
    // If no scrollbar, the extra space is overflow:hidden anyway
    if (showVerticalScrollbar && index === this._rowCount - fixedRowCount) {
      return scrollbarSize;
    }

    return typeof rowHeight === 'function'
      ? rowHeight({ index: index + fixedRowCount })
      : rowHeight;
  }

  _topLeftGridRef = (ref) => {
    this._topLeftGrid = ref;
  }

  _topRightGridRef = (ref) => {
    this._topRightGrid = ref;
  }
};
