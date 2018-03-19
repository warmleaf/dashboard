import React, { Component } from 'react';
import { withTheme } from 'styled-components';
import { lighten } from 'polished';
import SplitPane from 'react-split-pane';
import { observer, inject, Observer } from 'mobx-react';
import { injectGlobal } from 'styled-components';
import Tree from '../tree';

import TabList from '../tabs/tab_list';
import TabContainer from '../tabs/tab_container';
import Flex from '../../components/flex';
import Base from '../../components/base';
import Button from '../../components/button';
import IconCycle from '../../components/icon/cycle';
import IconPlus from '../../components/icon/plus';
import IconExec from '../../components/icon/exec';
import IconFindfile from '../../components/icon/findfile';
import IconFunc from '../../components/icon/function';
import SearchBar from '../search-bar';
import SelfIconView from '../self-icon-view';
import TableContext from '../table-context';

import Table from '../../components/table';
import TwoSidePane from '../two-side-pane';
import Recover from '../recover';

import store from '../store';
import { dataBaseType, tableFieldType, taskTreeType } from './store';

/* eslint-disable */
injectGlobal`
  .rst__virtualScrollOverride {
    overflow: auto !important;
  }
  .Pane.horizontal {
    transition: height 200ms;
  }
  .table-contextmenu {
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);
    padding: 10px 0;
    z-index: 9;

    &>div {
      height: 36px;
      line-height: 36px;
      padding: 0 15px;
      cursor: pointer;
    }
  }
`
/* eslint-enable */

let searchIndex = 0;
store.registerModule('database', dataBaseType.create());
store.registerModule('tableField', tableFieldType.create());
store.registerModule('taskTree', taskTreeType.create());

class Slider extends Component {

  componentDidMount() {
    this.props.database.doFetch();
  }

  render() {
    const { theme } = this.props;
    console.log(this.props.tableField.ifFieldExist())
    return (
      <Flex full h="100%" bgc={theme.manBackgroundColor}>
        <TabList
          column
          origin="input"
          bgc="rgba(0, 0, 0, .15)"
          w="48px"
          miw="48px"
          maw="48px"
          hc="start"
          defaultItem="table"
          afterSelect={(index) => {
            // SLIDER.activeNow(index);
          }}
        >
          <SelfIconView key="task" text="任务" Icon={IconExec} />
          <SelfIconView key="table" text="表查询" Icon={IconFindfile} />
          <SelfIconView key="function" text="函数" Icon={IconFunc} />
        </TabList>
        <Flex full column pt="20px" hidden={false}>
          <TabContainer full origin="input" defaultItem="table">
            <Flex key="task" full column>
              <Observer>
                {() => (<SearchBar
                  value={this.props.taskTree.search}
                  onChange={this.props.taskTree.setSearch}
                  reload={this.props.taskTree.doFetch}
                  new={this.props.newTab}
                />)}
              </Observer>
              <Observer>
                {() => (<Tree
                  contextId="task"
                  searchString={this.props.taskTree.search}
                  data={this.props.taskTree.data}
                // onChange={snapshot => SLIDER.updateBySnapshot('taskTree', snapshot)}
                />)}
              </Observer>
            </Flex>
            <Flex key="table" full rela h="100%">
              <Observer>
                {() => (
                  <TwoSidePane
                    split="horizontal"
                    maxSize={400}
                    minSize={this.props.tableField.ifFieldExist() ? 43 : 0}
                    defaultSize={this.props.tableField.ifFieldExist() ? 400 : 0}
                    primary="second"
                  >
                    <Flex full column h="100%" w="100%">
                      <Observer>
                        {() => (<SearchBar
                          value={this.props.database.search}
                          onChange={this.props.database.setSearch}
                          reload={this.props.database.doFetch}
                          add={this.props.newTab}
                        />)}
                      </Observer>
                      <div full style={{ height: '100%' }}>
                        <Observer>
                          {() => (
                            <Tree
                              contextId="table"
                              searchString={this.props.database.search}
                              data={this.props.database.isUpdate && this.props.database.data}
                              // onChange={snapshot => SLIDER.updateBySnapshot('tableTree', snapshot)}
                              onClick={(e, { node }) => {
                                if (node.type !== 'database') {
                                  this.props.tableField.doFetch(node.name);
                                }
                              }}
                            />
                          )}
                        </Observer>
                      </div>
                    </Flex>
                    <Observer>
                      {() => (
                        <Flex
                          w="100%"
                          h="100%"
                          abs
                          column
                          top={(this.props.tableField.data.records &&
                            this.props.tableField.data.records.length > 0) ? 0 : '248px'}
                        >
                          <SearchBar full w="100%" />
                          <Flex full h="100%">
                            <Table
                              style={{ height: '100%' }}
                              fixedRowCount={1}
                              columnWidth={75}
                              rowHeight={40}
                              columns={['字段', '类型', '扩展字段', '描述']}
                              data={this.props.tableField.isUpdate &&
                                this.props.tableField.data.records}
                              styleHeadGrid={{
                                lineHeight: '40px',
                                boxSizing: 'border-box',
                                color: 'rgba(255,255,255,.3)'
                              }}
                              styleBodyGrid={{
                                lineHeight: '40px',
                                margin: '0 15px',
                                boxSizing: 'border-box',
                                color: 'rgba(255,255,255,.6)'
                              }}
                            />
                          </Flex>
                        </Flex>)}
                    </Observer>
                  </TwoSidePane>
                )}
              </Observer>
              <TableContext />
              <Observer>{() => (this.props.popup === 'recover' && <Recover />)}</Observer>
            </Flex>
            <Flex key="function" full>
              func 3
            </Flex>
          </TabContainer>
        </Flex>
      </Flex>
    );
  }
}

export default inject(s => ({
  tabId: s.APP.tabId,
  newTab: s.APP.newTab,
  query: s.QUERY,
  database: s.database,
  tableField: s.tableField,
  taskTree: s.taskTree,
  popup: s.APP.popup,
  popupOpen: s.APP.popupOpen,
  popupClose: s.APP.popupClose
}))(observer(withTheme(Slider)));
