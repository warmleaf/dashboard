import React, { Component } from 'react';
import { Grid, List, ScrollSync, AutoSizer } from 'react-virtualized';
import scrollbarSize from 'dom-helpers/util/scrollbarSize';
import tail from 'lodash/tail';
import Portal from '../../app/portal';
import Flex from '../flex';
import Base from '../base';
import Button from '../button';

const columnWidth = 75;
const height = 300;
const overscanColumnCount = 0;
const overscanRowCount = 5;
const rowHeight = 40;
const rowCount = 100;

class BigTable extends Component {
  _renderBodyCell = ({ columnIndex, key, rowIndex, style }) => (
    columnIndex < 1 ? null : (
      <div key={key} style={style}>
        {this.props.data[rowIndex][columnIndex]}
      </div>)
  )

  _renderHeaderCell = ({ columnIndex, key, style }) => (
    columnIndex < 1 ? null : (
      <div key={key} style={style}>
        {this.props.columns[columnIndex]}
      </div>)
  )

  _renderLeftHeaderCell = ({ columnIndex, key, style }) => {
    return (
      <div key={key} style={style}>
        {`C${columnIndex}`}
      </div>
    );
  }

  _renderLeftSideCell = ({ key, rowIndex, style }) => 
  this.props.data[rowIndex]map((d, i) => (
    <div key={key} style={style}>
      {console.log(this.props.data[rowIndex])}
      {this.props.data[rowIndex]map()}
    </div>
  ))

  render() {
    const { columns, renderBodyCell, renderHeaderCell, data } = this.props;
    const columnCount = data.length;
    return (
      <Flex full>
        <ScrollSync>
          {({
            clientHeight,
            clientWidth,
            onScroll,
            scrollHeight,
            scrollLeft,
            scrollTop,
            scrollWidth
          }) => {
            const x = scrollLeft / (scrollWidth - clientWidth);
            const y = scrollTop / (scrollHeight - clientHeight);
            console.log(clientWidth)
            return (
              <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0
                  }}
                >
                  <Grid
                    cellRenderer={() => columns[0]}
                    width={columnWidth}
                    height={rowHeight}
                    rowHeight={rowHeight}
                    columnWidth={columnWidth}
                    rowCount={1}
                    columnCount={1}
                  />
                </div>
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: rowHeight
                  }}
                >
                  <Grid
                    overscanColumnCount={overscanColumnCount}
                    overscanRowCount={overscanRowCount}
                    cellRenderer={this._renderLeftSideCell}
                    columnWidth={columnWidth}
                    columnCount={1}
                    height={height - scrollbarSize()}
                    rowHeight={rowHeight}
                    rowCount={rowCount}
                    scrollTop={scrollTop}
                    width={columnWidth}
                  />
                </div>
                <div>
                  <AutoSizer disableHeight>
                    {({ width }) => (
                      <div>
                        <div
                          style={{
                            height: rowHeight,
                            width: width - scrollbarSize(),
                          }}>
                          <Grid
                            columnWidth={columnWidth}
                            columnCount={columnCount}
                            height={rowHeight}
                            overscanColumnCount={overscanColumnCount}
                            cellRenderer={cell => (renderHeaderCell ? renderHeaderCell(cell) : this._renderHeaderCell(cell))}
                            rowHeight={rowHeight}
                            rowCount={1}
                            scrollLeft={scrollLeft}
                            width={width - scrollbarSize()}
                          />
                        </div>
                        <div
                          style={{
                            height,
                            width,
                          }}>
                          <Grid
                            columnWidth={columnWidth}
                            columnCount={columnCount}
                            height={height}
                            onScroll={onScroll}
                            overscanColumnCount={overscanColumnCount}
                            overscanRowCount={overscanRowCount}
                            cellRenderer={({
                              columnIndex, key, rowIndex, style
                            }) => renderBodyCell && renderBodyCell({
                              columnIndex, key, rowIndex, style
                            })}
                            rowHeight={rowHeight}
                            rowCount={rowCount}
                            width={width}
                          />
                        </div>
                      </div>
                    )}
                  </AutoSizer>
                </div>
              </div>
            );
          }}
        </ScrollSync>
      </Flex>
    );
  }
}
export default BigTable;
