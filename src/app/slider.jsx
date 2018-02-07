import React, { Component } from 'react';
import { withTheme } from 'styled-components';
import { Route } from 'react-router-dom';
import { lighten } from 'polished';
import SplitPane from 'react-split-pane';
import { observer } from 'mobx-react';
import Tree from './tree';

import TabList from './tabs/tab_list';
import TabContainer from './tabs/tab_container';
import Flex from '../components/flex';
import Base from '../components/base';
import Button from '../components/button';
import IconCycle from '../components/icon/cycle';
import IconPlus from '../components/icon/plus';
import IconExec from '../components/icon/exec';
import IconFindfile from '../components/icon/findfile';
import IconFunc from '../components/icon/function';
import { Href } from './href';
import Search from './search';

import AppStore from './store';

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderOn: true,
      searchString: ''
    };
  }

  toggleSlider = (state, { active }) => {
    if (typeof state === 'boolean') {
      return this.setState({ sliderOn: true });
    }
    console.log(state, active);
    return this.setState({ sliderOn: active ? !this.state.sliderOn : true });
  };

  render() {
    const { theme } = this.props;
    const { searchString } = this.state;
    return (
      <Flex full h="100%" bgc={theme.manBackageColor}>
        <TabList
          origin="input"
          column
          bgc="rgba(0, 0, 0, .15)"
          w="48px"
          miw="48px"
          maw="48px"
          hc="start"
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
        <Flex full column pt="20px" hidden={!this.state.sliderOn}>
          <Flex w="100%" as="start" hc pr="5px" pl="15px">
            <Search full onChange={e => this.setState({ searchString: e.target.value })} />
            <Button no-border p="4px" size="14px" hover-co={lighten(0.1, theme.activeColor)}>
              <IconCycle className="hco" color={theme.activeColor} />
            </Button>
            <Button
              onClick={AppStore.newTab}
              no-border
              p="4px"
              size="16px"
              hover-co={lighten(0.1, theme.activeColor)}
            >
              <IconPlus className="hco" color={theme.activeColor} />
            </Button>
          </Flex>
          <TabContainer full origin="input">
            <Flex full owner="func">
              <Tree searchString={searchString} />
            </Flex>
            <Flex full owner="func">
              <SplitPane
                split="horizontal"
                minSize={160}
                maxSize={400}
                defaultSize={248}
                primary="second"
              >
                <Flex>query</Flex>
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
            </Flex>
            <Flex full owner="func">
              func 3
            </Flex>
          </TabContainer>
        </Flex>
      </Flex>
    );
  }
}

export default observer(withTheme(Slider));
