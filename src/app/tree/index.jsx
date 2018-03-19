import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';
import theme from './theme';
import IconFolderClose from '../../components/icon/folderclose';
import IconCode from '../../components/icon/code';
import IconFile from '../../components/icon/file';
import IconView from '../../components/icon/view';
import DataBaseView from '../../components/icon/database';
import DataTableView from '../../components/icon/datatable';

export default class Tree extends Component {
  constructor(props) {
    super(props);
    this.isNodeMoved = null;
    this.state = {
      treeData: this.props.data,
      searchFocusIndex: 0
    };
  }

  componentWillReceiveProps({ data }) {
    this.setState({ treeData: data });
  }

  matchIcon = (type) => {
    switch (type) {
      case 'folder':
        return <IconFolderClose color="#78A0FF" />;
      case 'tempTask':
        return <IconCode color="#BE42FA" />;
      case 'timingTask':
        return <IconCode color="#2DD7C3" />;
      case 'database':
        return <DataBaseView color="#78A0FF" />;
      case 'systable':
        return <DataTableView color="#BE42FA" />;
      case 'usrtable':
        return <DataTableView color="#2DD7C3" />;
      case 'view':
        return <IconView color="#BE42FA" />;
      default:
        return null;
    }
  };

  render() {
    const { searchString, data, onClick, contextId } = this.props;
    const { searchFocusIndex, treeData } = this.state;
    const searchMethod = ({ node, searchQuery }) =>
      searchQuery && node.title.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;
    console.log('data =>', data)
    return (
      <SortableTree
        onlyExpandSearchedNodes
        rowHeight={26}
        contextId={contextId}
        treeData={treeData}
        onChange={(update) => {
          this.setState({ treeData: update });
        }}
        onDragStateChanged={({ isDragging }) => {
          if (isDragging) {

          } else if (this.isNodeMoved) {
            this.props.onChange(treeData);
          }
        }}
        onMoveNode={({ prevTreeIndex, nextTreeIndex }) => {
          this.isNodeMoved = prevTreeIndex !== nextTreeIndex;
        }}
        theme={theme}
        generateNodeProps={rowInfo => ({
          icons: [this.matchIcon(rowInfo.node.type)],
          onClick: e => onClick(e, rowInfo)
        })}
        onContextMenu={e => console.log(e)}
        searchMethod={searchMethod}
        searchQuery={searchString}
        searchFocusOffset={searchFocusIndex}
        searchFinishCallback={matches =>
          this.setState({
            searchFocusIndex: matches.length > 0 ? searchFocusIndex % matches.length : 0
          })
        }
      />
    );
  }
}
