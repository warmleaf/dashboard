import { CellMeasurerCache } from 'react-virtualized';

/**
 * Caches measurements for a given cell.
 */
export default class CellMeasurerCacheDecorator {
  _cellMeasurerCache: CellMeasurerCache;
  _columnIndexOffset: number;
  _rowIndexOffset: number;

  constructor(params: {}) {
    const {
      cellMeasurerCache,
      columnIndexOffset = 0,
      rowIndexOffset = 0,
    } = params;

    this._cellMeasurerCache = cellMeasurerCache;
    this._columnIndexOffset = columnIndexOffset;
    this._rowIndexOffset = rowIndexOffset;
  }

  clear(rowIndex, columnIndex) {
    this._cellMeasurerCache.clear(
      rowIndex + this._rowIndexOffset,
      columnIndex + this._columnIndexOffset,
    );
  }

  clearAll() {
    this._cellMeasurerCache.clearAll();
  }

  columnWidth = ({index}) => {
    this._cellMeasurerCache.columnWidth({
      index: index + this._columnIndexOffset,
    });
  };

  defaultHeight() {
    return this._cellMeasurerCache.defaultHeight;
  }

  defaultWidth() {
    return this._cellMeasurerCache.defaultWidth;
  }

  hasFixedHeight() {
    return this._cellMeasurerCache.hasFixedHeight();
  }

  hasFixedWidth() {
    return this._cellMeasurerCache.hasFixedWidth();
  }

  getHeight(rowIndex, columnIndex: 0) {
    return this._cellMeasurerCache.getHeight(
      rowIndex + this._rowIndexOffset,
      columnIndex + this._columnIndexOffset,
    );
  }

  getWidth(rowIndex, columnIndex = 0) {
    return this._cellMeasurerCache.getWidth(
      rowIndex + this._rowIndexOffset,
      columnIndex + this._columnIndexOffset,
    );
  }

  has(rowIndex, columnIndex = 0) {
    return this._cellMeasurerCache.has(
      rowIndex + this._rowIndexOffset,
      columnIndex + this._columnIndexOffset,
    );
  }

  rowHeight = ({index}) => {
    this._cellMeasurerCache.rowHeight({
      index: index + this._rowIndexOffset,
    });
  };

  set(
    rowIndex,
    columnIndex,
    width,
    height,
  ) {
    this._cellMeasurerCache.set(
      rowIndex + this._rowIndexOffset,
      columnIndex + this._columnIndexOffset,
      (width),
      (height),
    );
  }
}