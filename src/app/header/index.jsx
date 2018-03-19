import React, { Component } from 'react';
import { withTheme } from 'styled-components';
import { observer, inject, Observer } from 'mobx-react';
import Flex from '../../components/flex';
import Base from '../../components/base';
import Button from '../../components/button';
import IconDownload from '../../components/icon/download';
import IconCode from '../../components/icon/code';
import IconHelp from '../../components/icon/help';
import IconUser from '../../components/icon/user';
import Href from '../href';
import Status from './status';
import Logo from '../logo';
import AvatarSimple from '../../components/avatar-simple';

import store from '../store';
import HeaderStore from './store';

store.registerModule('PRESTO', HeaderStore);
class Header extends Component {
  componentDidMount() {
    this.timer = setInterval(this.props.PRESTO.fetchAndUpdate, 10000000000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { theme } = this.props;
    return (
      <Flex hc h={theme.heiderHeight || '48px'} vc="space-between">
        <Flex hc ml="20px">
          <Logo />
          <Base.Span male="10px">大数据查询平台</Base.Span>
        </Flex>
        <Flex>
          <Observer>
            {() => (
              <Status
                mr="20px"
                size={24}
                percent={Math.random() * 100 || this.props.PRESTO.percentage}
                tips={[
                  "0-25|ok",
                  "26-50|normal",
                  "51-75|height",
                  "76-100|trouble"
                ]} />
            )}
          </Observer>
          <Href
            src="/bulkUpload"
            size="14px"
            mr="20px"
            co={theme.defaultFontColor}
            hover-co={theme.activeColor}
          >
            <IconDownload />
            <Base.Span male="8px">批量插入</Base.Span>
          </Href>
          <Href
            src="/timingTasks"
            size="14px"
            mr="20px"
            co={theme.defaultFontColor}
            hover-co={theme.activeColor}
          >
            <IconCode />
            <Base.Span male="8px">定时任务</Base.Span>
          </Href>
          <Href src="//my22years.com" size="14px" mr="20px">
            <IconHelp />
          </Href>
          <Flex size="14px" mr="20px" hover-show="flex">
            <IconUser />
            <Flex hidden abs column className="hshow" tp="36px" rt="4px" bgc="#fff" z="9" shadow="-2px 4px 4px 0 rgba(0,0,0,.06)">
              <AvatarSimple title={'title'} sub={'sub'} />
              <Flex bt="1px solid #ebebeb" column pt="10px" pb="10px">
                <Button size="14px" hover-bgc="rgba(0,0,0,.03)" lh="34px" no-border mb="10px">修改密码</Button>
                <Button size="14px" hover-bgc="rgba(0,0,0,.03)" lh="34px" no-border onClick={this.props.USER.logout}>退出</Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    );
  }
}

export default inject('PRESTO', 'USER')(observer(withTheme(Header)));
