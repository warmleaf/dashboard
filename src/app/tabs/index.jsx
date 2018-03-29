import React, { PureComponent } from 'react';
import { observer, inject } from 'mobx-react';
import ChromeLikeTab from '../../components/tabs/chromeLikeTab';
import Flex from '../../components/flex';
import TabList from '../../components/tabs/tab_list';
import TabContainer from '../../components/tabs/tab_container';
import Task from '../../module/task';
import IconSpinner from '../../components/icon/spinner';

class Tabs extends PureComponent {
  componentDidMount() {
    this.props.tabs.doFetch();
  }
  render() {
    if (this.props.tabs.state === 'loading') return <Flex hc vc full><IconSpinner style={{ fontSize: '80px' }} /></Flex>;
    if (this.props.tabs.state === 'done' && this.props.tabs.isUpdate) {
      const tabsList = [];
      const tabsContainer = [];
      if (this.props.tabs.data.size > 0) {
        this.props.tabs.data.forEach((tab) => {
          tabsList.push(<ChromeLikeTab
            key={tab.sqlindex}
            title={tab.indexname || '未命名'}
            onClose={(e) => {
              e.stopPropagation();
              this.props.tabs.closeTab(tab.sqlindex);
            }}
          />);
          tabsContainer.push(<Task key={tab.sqlindex} />);
        });
      }
      return [
        <TabList
          origin="task"
          bgc="rgba(0,0,0,.05)"
          h="42px"
          hc="flex-end"
          pl="14px"
          defaultItem={this.props.tabs.activeTabId}
          beforeSelect={this.props.tabs.selectTab}
        >
          {tabsList}
        </TabList>,
        <TabContainer
          full
          origin="task"
          bgc="#fafafa"
          bt="1px solid rgba(0,0,0,.15)"
          mt="-2px"
          defaultItem={this.props.tabs.activeTabId}
        >
          {tabsContainer}
        </TabContainer>
      ];
    }
    return null;
  }
}

export default inject('tabs')(observer(Tabs));
