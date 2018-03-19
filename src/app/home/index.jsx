import React from 'react';
import { observer, inject } from 'mobx-react';
import { injectGlobal } from 'styled-components';
import SplitPane from 'react-split-pane';
import Redirect from 'react-router-dom/Redirect';
import ChromeLikeTab from '../tabs/chromeLikeTab';
import Flex from '../../components/flex';
import Header from '../header';
import Slider from '../slider';
import TabList from '../tabs/tab_list';
import TabContainer from '../tabs/tab_container';
import Task from '../../module/task';
import Portal from '../portal';

import store from '../store';
import appStore from './store';

store.registerModule('APP', appStore);
/* eslint-disable */
injectGlobal`
    html {
        overflow: hidden;
        font-family: sans-serif;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        height: 100%;
    }
    body {
        overflow: auto;
        height: 100%;
        margin: 0;
        font-size: 14px;
    }
    #root {
        height: 100%;
    }
    .Resizer {
        z-index: 1;
        position: relative;
        &:after {
            content: '';
            position: absolute;
        }
        &:before {
          content: '';
          position: absolute;
        }
        &.vertical {
            &:before{
              cursor: col-resize;
              left: -5px;
              width: 10px;
              height: 100%;
            }
            &:after {
                width: 1px;
                height: 20px;
                left: -2px;
                top: 50%;
                border-left: 1px solid rgba(0, 0, 0, 0.1);
                border-right: 1px solid rgba(0, 0, 0, 0.1);
            }
        }
        &.horizontal {
            &:before{
              cursor: row-resize;
              top: -5px;
              width: 100%;
              height: 10px;
            }
            &:after {
                height: 1px;
                width: 20px;
                top: 3.5px;
                left: 50%;
                border-top: 1px solid rgba(0, 0, 0, 0.1);
                border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            }
        }
    }
`;
/* eslint-enable */

const Home = ({ APP, USER }) => {
  console.log(USER.isLoggedIn());
  if (!USER.isLoggedIn()) {
    return <Redirect to="/login" />;
  }

  return (
    <Flex h="100%">
      {APP.message &&
        <Portal notice>{APP.message}</Portal>
      }
      <SplitPane split="vertical" minSize={160} maxSize={400} defaultSize={248}>
        <Slider />
        <Flex column full h="100%">
          <Header />
          <Flex column full>
            <TabList
              origin="task"
              bgc="rgba(0,0,0,.05)"
              h="42px"
              hc="flex-end"
              pl="14px"
              defaultItem={APP.nowTab}
              beforeSelect={APP.activeTab}
            >
              {APP.tabs.size > 0 ? APP.tabs.entries().map(tab => (
                <ChromeLikeTab
                  key={tab[0]}
                  title={tab[1].title}
                  onClose={(e) => {
                    e.stopPropagation();
                    APP.closeTab(tab[0]);
                  }}
                />
              )) : null}
            </TabList>
            <TabContainer
              full
              origin="task"
              bgc="#fafafa"
              bt="1px solid rgba(0,0,0,.15)"
              mt="-2px"
              defaultItem={APP.nowTab}
            >
              {APP.tabs.size > 0 ? APP.tabs.entries().map(tab => <Task key={tab[0]} />) : null}
            </TabContainer>
          </Flex>
        </Flex>
      </SplitPane>
    </Flex>
  );
};

export default inject('APP', 'USER')(observer(Home));
