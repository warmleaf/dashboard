import 'react-virtualized/styles.css';
import React, { Component } from 'react';
import { injectGlobal } from 'styled-components';
import { Grid, AutoSizer, ScrollSync } from 'react-virtualized';
import Flex from '../flex';

/* eslint-disable */
injectGlobal`
  .ReactVirtualized__Table__headerColumn {
    
  }
`;
/* eslint-enable */

export default class Table extends Component {
  _noRowsRenderer = () => (<Flex>no data!</Flex>)
  _headRender = ({ columnIndex, key, style }) => (
    <Flex
      hc
      pl="10px"
      pr="10px"
      key={key}
      style={style}
      br={this.props.columnLine && '1px solid #ebebeb'}
      bb={this.props.columnLine && '1px solid #ebebeb'}
    >
      {this.props.columns[columnIndex]}
    </Flex>
  )
  _bodyRender = ({ columnIndex, key, rowIndex, style }) => (
    <Flex
      hc
      key={key}
      style={style}
      pl="10px"
      pr="10px"
      bt={!this.props.columnLine && '1px solid #ebebeb'}
      br={this.props.columnLine && '1px solid #ebebeb'}
      bb={this.props.columnLine && '1px solid #ebebeb'}
    >
      {this.props.data[rowIndex][columnIndex]}
    </Flex>
  )
  render() {
    const { columns, data, noRowsRenderer, headerColor, rowHeight, overscanColumnCount, overscanRowCount } = this.props;
    return (
      <AutoSizer>
        {({ width, height }) => (
          <ScrollSync>
            {({ scrollLeft, onScroll }) => [
              <Grid
                key="header"
                rowCount={1}
                height={rowHeight || 30}
                overscanColumnCount={overscanColumnCount || 5}
                overscanRowCount={overscanRowCount || 10}
                columnWidth={90}
                rowHeight={rowHeight || 30}
                columnCount={columns.length}
                cellRenderer={this._headRender}
                width={width}
                scrollLeft={scrollLeft}
                containerStyle={{ background: headerColor || '#f2f2f2' }}
              />,
              <Grid
                key="body"
                onScroll={onScroll}
                rowCount={data.length}
                height={height}
                noContentRenderer={this._noRowsRenderer}
                overscanColumnCount={overscanColumnCount || 5}
                overscanRowCount={overscanRowCount || 10}
                columnWidth={90}
                columnCount={columns.length}
                rowHeight={rowHeight || 30}
                cellRenderer={this._bodyRender}
                width={width}
              />
            ]}
          </ScrollSync>
        )}
      </AutoSizer>
    );
  }
}
