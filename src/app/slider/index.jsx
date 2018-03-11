import React from 'react';
import { withTheme } from 'styled-components';
import { lighten } from 'polished';
import SplitPane from 'react-split-pane';
import { observer, inject, Observer } from 'mobx-react';
import { ContextMenu, MenuItem } from 'react-contextmenu';
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
import Search from '../search';

import store from '../store';
import sliderStore from './store';

/* eslint-disable */
injectGlobal`
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
store.registerModule('SLIDER', sliderStore);
const Slider = ({ theme, SLIDER, newTab }) => {
  SLIDER.fetchAndUpdate('taskTree', 'POST /api/task_tree');
  SLIDER.fetchAndUpdate('tableTree', 'POST /getDBTable');
  console.log('render')
  return (
    <Flex full h="100%" bgc={theme.manBackgroundColor}>
      <TabList
        origin="input"
        column
        bgc="rgba(0, 0, 0, .15)"
        w="48px"
        miw="48px"
        maw="48px"
        hc="start"
        defaultIndex={2}
        afterSelect={(index) => {
          SLIDER.activeNow(index);
        }}
      >
        <Flex column vc mt="10px" pt="8px" pb="8px" hover-bgc={theme.activeColor} hover-co="#fff">
          <IconExec className="hco" color="rgba(255, 255, 255, .6)" />
          <Base.Span className="hco" color="rgba(255, 255, 255, .6)" fosi="10px" pato="4px">
            任务
          </Base.Span>
        </Flex>
        <Flex column vc mt="10px" pt="8px" pb="8px" hover-bgc={theme.activeColor} hover-co="#fff">
          <IconFindfile className="hco" color="rgba(255, 255, 255, .6)" />
          <Base.Span className="hco" color="rgba(255, 255, 255, .6)" fosi="10px" pato="4px">
            表查询
          </Base.Span>
        </Flex>
        <Flex column vc mt="10px" pt="8px" pb="8px" hover-bgc={theme.activeColor} hover-co="#fff">
          <IconFunc className="hco" color="rgba(255, 255, 255, .6)" />
          <Base.Span className="hco" color="rgba(255, 255, 255, .6)" fosi="10px" pato="4px">
            函数
          </Base.Span>
        </Flex>
      </TabList>
      <Flex full column pt="20px" hidden={false}>
        <Flex w="100%" as="start" hc pr="5px" pl="15px" pb="15px">
          <Observer>{() => (
            <Search
              full
              value={SLIDER.getSearchNow()}
              onChange={(e) => {
                SLIDER.updateSearch(e.target.value);
              }}
            />)}
          </Observer>
          <Button
            no-border
            p="4px"
            size="14px"
            hover-co={lighten(0.1, theme.activeColor)}
            onClick={SLIDER.updateData}
          >
            <IconCycle className="hco" color={theme.activeColor} />
          </Button>
          <Button
            onClick={newTab}
            no-border
            p="4px"
            size="16px"
            hover-co={lighten(0.1, theme.activeColor)}
          >
            <IconPlus className="hco" color={theme.activeColor} />
          </Button>
        </Flex>
        <Observer>{() => (
          <TabContainer full origin="input" defaultIndex={2}>
            <Flex full>
              <Observer>
                {() => (<Tree
                  contextId="task"
                  searchString={SLIDER.getSearchNow()}
                  data={SLIDER.getSnapshot('taskTree')}
                  onChange={snapshot => SLIDER.updateBySnapshot('taskTree', snapshot)}
                />)}
              </Observer>
              <ContextMenu id="task">
                <MenuItem>abc...</MenuItem>
              </ContextMenu>
            </Flex>
            <Flex full rela>
              <SplitPane
                split="horizontal"
                minSize={160}
                maxSize={400}
                defaultSize={248}
                primary="second"
              >
                <Observer>
                  {() => (<Tree
                    contextId="table"
                    searchString={SLIDER.getSearchNow()}
                    data={SLIDER.getSnapshot('tableTree')}
                    onChange={snapshot => SLIDER.updateBySnapshot('tableTree', snapshot)}
                    onClick={(e, { node }) => {
                      console.log(e);
                      SLIDER.fetchTableColumns(node.name)
                    }}
                  />)}
                </Observer>
                <Flex w="100%" as="start" hc pr="5px" pl="15px">
                  <Search full />
                  <Button no-border p="4px" size="14px" hover-co={lighten(0.1, theme.activeColor)}>
                    <IconCycle className="hco" color={theme.activeColor} />
                  </Button>
                  <Button no-border p="4px" size="16px" hover-co={lighten(0.1, theme.activeColor)}>
                    <IconPlus className="hco" color={theme.activeColor} />
                  </Button>
                </Flex>
              </SplitPane>
              <ContextMenu id="table_context" className="table-contextmenu">
                <MenuItem onClick={(a, b, c, d) => console.log(a, b, c, d)}>select…limit 100</MenuItem>
                <MenuItem onClick={(a, b, c, d) => console.log(a, b, c, d)}>select…limit 100（no execute）</MenuItem>
                <MenuItem onClick={(a, b, c, d) => console.log(a, b, c, d)}>select count（*）</MenuItem>
                <MenuItem onClick={(a, b, c, d) => console.log(a, b, c, d)}>select count（*）（no execute）</MenuItem>
                <MenuItem onClick={(a, b, c, d) => console.log(a, b, c, d)}>show create table</MenuItem>
                <MenuItem onClick={(a, b, c, d) => console.log(a, b, c, d)}>show view ddl</MenuItem>
                <MenuItem onClick={(a, b, c, d) => console.log(a, b, c, d)}>describe</MenuItem>
              </ContextMenu>
            </Flex>
            <Flex full>
              func 3
            </Flex>
          </TabContainer>)}
        </Observer>
      </Flex>
    </Flex>)
};

export default inject(s => ({
  SLIDER: s.SLIDER,
  newTab: s.APP.newTab
}))(observer(withTheme(Slider)));
