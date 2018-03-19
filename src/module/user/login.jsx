import React from 'react';
import { observer, inject } from 'mobx-react';
import Redirect from 'react-router-dom/Redirect';
import Flex from '../../components/flex';
import Base from '../../components/base';
import Button from '../../components/button';
import Logo from '../../app/logo';
import ResponsiveImg from '../../components/responsiveImg';
import Portal from '../../app/portal';

import store from '../../app/store';
import UserStore from './store';

store.registerModule('USER', UserStore);
const Login = ({ USER, APP }) => {
  if (window !== 'undefined') {
    window.document.addEventListener('keyup', (e) => {
      if (e.key === 'Enter' || e.code === 'Enter' || e.keyCode === 13) {
        USER.doLogin();
      }
    });
  }
  return (USER.isLoggedIn() ? <Redirect to="/" /> : (
    <ResponsiveImg background type={2} src="http://ouax1fn2c.bkt.clouddn.com/lee-campbell-86958-unsplash.jpg" hc vc h="100%">
      {APP.message &&
        <Portal
          notice
          type={APP.state}
          beforeUnmount={() => {
            APP.stateChange('done');
            APP.setMessage('');
          }}
        >
          {APP.message}
        </Portal>
      }
      <Flex column hc vc bgc="rgba(0,0,0,.6)" round="2px">
        <Flex pt="50px" hc vc>
          <Logo w="70px" h="32px" color="#fff" />
          <Base.Span fosi="30px" color="#fff" pale="16px">大数据查询平台</Base.Span>
        </Flex>
        <Flex column w="400px" p="40px 50px 50px">
          <Base.Input
            onChange={(e) => {
              USER.set('userName', e.target.value);
            }}
            border="0"
            bora="2px"
            height="40px"
            fosi="14px"
            mabo="20px"
            pale="15px"
            pari="15px"
            placeholder="用户名/邮箱"
          />
          <Base.Input
            onChange={(e) => { USER.set('password', e.target.value); }}
            border="0"
            bora="2px"
            height="40px"
            fosi="14px"
            mabo="20px"
            type="password"
            pale="15px"
            pari="15px"
            placeholder="输入密码"
          />
          <Button vc bgc="#509BFF" size="16px" co="#fff" h="40px" round="4px" onClick={USER.doLogin}>登录</Button>
        </Flex>
      </Flex>
    </ResponsiveImg>
  ));
};

export default inject('APP', 'USER')(observer(Login));
