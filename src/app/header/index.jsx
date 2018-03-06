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
              percent={Math.random()*100 || this.props.PRESTO.percentage}
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
          <Href src="//my22years.com" size="14px" mr="20px">
            <IconUser />
          </Href>
        </Flex>
      </Flex>
    );
  }
}

export default inject('PRESTO')(observer(withTheme(Header)));
