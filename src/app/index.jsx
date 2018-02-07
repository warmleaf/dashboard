import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import { observer } from 'mobx-react';
import { injectGlobal, ThemeProvider } from 'styled-components';
import SplitPane from 'react-split-pane';
import { ContextMenu } from 'react-contextmenu';
import ChromeLikeTab from './tabs/chromeLikeTab';
import Flex from '../components/flex';
import Base from '../components/base';
import Href from '../app/href';
import Header from './header';
import Slider from './slider';
import theme from '../theme.default';
import TabList from './tabs/tab_list';
import TabContainer from './tabs/tab_container';
import AppStore from './store';

import Task from '../module/task';
import TaskList from '../module/task/task-list';
import Upload from '../module/upload';

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

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderOn: true
    };
  }

  setContextNode = () => (
    <Flex bgc="#fff" pt="10px" pb="10px" round="2px" shadow="0 2px 4px rgba(0,0,0,.2)">
      <Base.Span baco="rgba(0,0,0,.03)" fosi="14px" padding="7px 15px">
        context
      </Base.Span>
    </Flex>
  );

  render() {
    return (
      <Flex h="100%">
        <SplitPane split="vertical" minSize={160} maxSize={400} defaultSize={248}>
          <Slider />
          <Flex column full h="100%">
            <Header />
            <Flex column full>
              <TabList origin="task" bgc="rgba(0,0,0,.05)" h="42px" hc="flex-end" pl="14px">
                {AppStore.tabs.map(tab => <ChromeLikeTab title={tab} />)}
              </TabList>
              <TabContainer
                full
                origin="task"
                bgc="#fafafa"
                bt="1px solid rgba(0,0,0,.15)"
                mt="-2px"
              >
                {AppStore.tabs.map(() => <Task />)}
              </TabContainer>
            </Flex>
          </Flex>
        </SplitPane>
        <ContextMenu id="tree_context" style={{ zIndex: 1 }}>
          {this.setContextNode()}
        </ContextMenu>
      </Flex>
    );
  }
}

const App = () => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={observer(Home)} />
        <Route path="/bulkUpload" component={Upload} />
        <Route path="/timingTasks" component={TaskList} />
        <Route path="/editor" component={Task} />
      </Switch>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
