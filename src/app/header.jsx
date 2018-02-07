import React from 'react';
import { withTheme } from 'styled-components';
import Flex from '../components/flex';
import Base from '../components/base';
import IconDownload from '../components/icon/download';
import IconCode from '../components/icon/code';
import IconHelp from '../components/icon/help';
import Href from './href';

const Header = ({ theme }) => (
  <Flex hc h={theme.heiderHeight || '48px'} vc="space-between">
    <Flex hc ml="20px">
      <img src={require('./logo.svg')} />
      <Base.Span male="10px">大数据查询平台</Base.Span>
    </Flex>
    <Flex>
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
      <Href
        src="/editor"
        size="14px"
        mr="20px"
        co={theme.defaultFontColor}
        hover-co={theme.activeColor}
      >
        <IconCode />
        <Base.Span male="8px">queryeditor</Base.Span>
      </Href>
      <Href src="//my22years.com" size="14px" mr="20px">
        <IconHelp />
      </Href>
    </Flex>
  </Flex>
);

export default withTheme(Header);
