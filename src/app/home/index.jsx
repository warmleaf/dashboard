import React from 'react';
import { observer, inject } from 'mobx-react';
import { injectGlobal } from 'styled-components';
import SplitPane from 'react-split-pane';
import Redirect from 'react-router-dom/Redirect';
import Flex from '../../components/flex';
import Header from '../header';
import Slider from '../slider';
import Portal from '../portal';

import Tabs from '../tabs';
import Recover from '../recover';
import TaskPost from '../../module/task/post';
import ResultAll from '../../module/task/result_all';

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

function getPopup(id) {
  switch (id) {
    case 'taskPost':
      return <TaskPost />;
    case 'recover':
      return <Recover />;
    case 'resultAll':
      return <ResultAll />;
    case null:
    case undefined:
    case '':
    default:
      return null;
  }
}

const Home = ({ app, user }) => {
  if (!user.isLoggedIn()) return <Redirect to="/login" />;

  return (
    <Flex h="100%">
      {app.message &&
        <Portal
          notice
          type={app.state}
          beforeUnmount={() => {
            app.stateChange('done');
            app.setMessage(null);
          }}
        >
          {app.message}
        </Portal>
      }
      {getPopup(app.popup)}
      <SplitPane split="vertical" minSize={160} maxSize={400} defaultSize={248}>
        <Slider />
        <Flex column full h="100%">
          <Header />
          <Flex column full>
            <Tabs />
          </Flex>
        </Flex>
      </SplitPane>
    </Flex>
  );
};

export default inject('app', 'user')(observer(Home));
