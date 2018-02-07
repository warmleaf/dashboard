import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import theme from './theme';
import IconFolderClose from '../../components/icon/folderclose';
import IconCode from '../../components/icon/code';
import IconFile from '../../components/icon/file';
import IconView from '../../components/icon/view';

export default class Tree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData: [
        {
          name: 'myfolder',
          title: '我的文件夾',
          type: 'folder',
          children: [
            {
              name: 'myfolder2',
              title: '我的文件夾2',
              type: 'folder',
              children: [
                {
                  name: 'task01',
                  title: '定時任務01',
                  type: 'timingTask'
                },
                {
                  name: 'task02',
                  title: '定時任務02',
                  type: 'timingTask'
                },
                {
                  name: 'task01',
                  title: '臨時任務01',
                  type: 'tempTask'
                }
              ]
            },
            {
              name: 'task03',
              title: '定時任務03',
              type: 'timingTask'
            },
            {
              name: 'task02',
              title: '臨時任務02',
              type: 'tempTask'
            }
          ]
        },
        {
          name: 'task04',
          title: '定時任務04',
          type: 'timingTask'
        },
        {
          name: 'task03',
          title: '臨時任務03',
          type: 'tempTask'
        }
      ],
      searchFocusIndex: 0
    };
  }

  matchIcon = (type) => {
    switch (type) {
      case 'folder':
        return <IconFolderClose color="#78A0FF" />;
      case 'tempTask':
        return <IconCode color="#BE42FA" />;
      case 'timingTask':
        return <IconCode color="#2DD7C3" />;
      case 'systable':
        return <IconFile color="#BE42FA" />;
      case 'usrtable':
        return <IconFile color="#2DD7C3" />;
      case 'view':
        return <IconView color="#BE42FA" />;
      default:
        return null;
    }
  };

  render() {
    const { searchString } = this.props;
    const { searchFocusIndex } = this.state;
    const searchMethod = ({ node, searchQuery }) =>
      searchQuery && node.title.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;
    return (
      <SortableTree
        style={{ width: '100%' }}
        treeData={this.state.treeData}
        onChange={treeData => this.setState({ treeData })}
        theme={theme}
        generateNodeProps={rowInfo => ({
          icons: [this.matchIcon(rowInfo.node.type)]
        })}
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
