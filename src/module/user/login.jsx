import React from 'react';
import { observer, inject } from 'mobx-react';
import Flex from '../../components/flex';
import Base from '../../components/base';
import Button from '../../components/button';
import Logo from '../../app/logo';
import ResponsiveImg from '../../components/responsiveImg';

const Login = ({ USER }) => {
  return (
    <ResponsiveImg background type={2} src="http://ouax1fn2c.bkt.clouddn.com/lee-campbell-86958-unsplash.jpg" hc vc h="100%">
      <Flex column hc vc bgc="rgba(0,0,0,.6)" round="2px">
        <Flex pt="50px" hc vc>
          <Logo w="70px" h="32px" color="#fff" />
          <Base.Span fosi="30px" color="#fff" pale="16px">大数据查询平台</Base.Span>
        </Flex>
        <Flex column w="400px" p="40px 50px 50px">
          <Base.Input onChange={e => {
            USER.set('userName', e.target.value)
          }} border="0" bora="2px" height="40px" fosi="14px" mabo="20px" />
          <Base.Input onChange={e => { USER.set('password', e.target.value)} } border="0" bora="2px" height="40px" fosi="14px" mabo="20px" type="password" />
          <Button primary value="登录" onClick={USER.doLogin}/>
        </Flex>
      </Flex>
    </ResponsiveImg>
  );
};

export default inject('USER')(observer(Login));
