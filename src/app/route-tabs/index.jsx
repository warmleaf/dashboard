import React, { Component, cloneElement } from 'react';
import { string, shape, bool, number } from 'prop-types';
import { withRouter, Switch, matchPath } from 'react-router-dom';
import WithSubRoute from './withSubRoute';
import Iframe from '../../components/iframe';
import Flex from '../../components/flex';
import Title from '../../components/title';
import Button from '../../components/button';
import { Href } from '../href';
import IconClose from '../../components/icon/close';
import Base from '../../components/base';

import shadowHas from '../../tools/shadowHas';
import shadowSet from '../../tools/shadowSet';

const PaneType = {
  title: string,
  avatar: string,
  path: string
};

class Tabs extends Component {
  constructor(props) {
    super(props);
    this._ = new Map();
    this.state = {
      panes: this.props.init || [],
      routes: new Map()
    };
  }

  componentDidMount() {
    this.applyRoute();
  }

  componentWillReceiveProps({ location }) {
    const panes = this.state.panes.slice(0);
    if (!shadowHas(this.state.panes, 'path', location.pathname)) {
      panes.push({
        avatar: '//kibey-fair.b0.upaiyun.com/2013/02/16/0d0a9f2bdeae151b3c52e982422cf641.jpg',
        active: true,
        path: location.pathname,
        title: 'Im a pane'
      });
      this.setState({ panes }, () => this.applyRoute());
    } else {
      shadowSet(panes, 'active', true);
    }
  }

  drawTab = (info, index) => {
    const {
      height, maxWidth, minWidth, scroll, widthLocked, width, avatarSize
    } = this.props;
    let active = false;
    if (typeof window !== 'undefined') {
      active = info.path === window.location.pathname;
    }
    return (
      <Flex rela w={width} h="80%" inline key={index} cid="tab">
        <Flex
          abs
          round="2px 2px 0 0"
          w="100%"
          h="100%"
          b="1px solid rgba(0,0,0,.15)"
          t="perspective(100px) rotateX(30deg)"
          bb={active ? '0 !important' : null}
          bgc={active ? '#fafafa' : '#f2f2f2'}
          z={active ? '1' : null}
        />
        <Href src={info.path} z="1">
          <Flex hc w="90%">
            {info.avatar && (
              <Base.Img
                src={info.avatar}
                width={`${avatarSize}px`}
                height={`${avatarSize}px`}
                mari="6px"
                male="4px"
              />
            )}
            <Title>{info.title}</Title>
            <Button no-border pl="6px" pr="6px">
              <IconClose />
            </Button>
          </Flex>
        </Href>
      </Flex>
    );
  };

  applyRoute = () => {
    const { panes } = this.state;
    panes.map((item) => {
      this._.set(item.path, this.matchCurrentRoute(item.path));
    });
    this.setState({ routes: this._ });
  };

  matchCurrentRoute = (path) => {
    let currentRoute = null;
    this.props.route.map((item, i) => {
      console.log('===>', path, matchPath(path, item));
      if (item.component && matchPath(path, item)) {
        currentRoute = item.component;
        // currentRoute = <WithSubRoute {...item} />
      }
    });
    return currentRoute;
  };

  getPanes = (panes) => {
    const {
      height, maxWidth, minWidth, scroll, widthLocked, width
    } = this.props;
    return (
      <Flex column full>
        <Flex h={height} bgc="rgba(0,0,0,.05)" h="42px" ofx={scroll} hc="flex-end" pl="14px">
          {panes.map((item, i) => this.drawTab(item, i))}
        </Flex>
        <Flex full bgc="#fafafa" bt="1px solid rgba(0,0,0,.15)" mt="-2px">
          {panes.map((item, i) => {
            const Pane = this.state.routes.get(item.path);
            if (Pane) {
              return (
                <Flex key={i} w="100%" h="100%" hidden={window.location.pathname !== item.path}>
                  <Iframe>
                    <Pane />
                  </Iframe>
                </Flex>
              );
            }
            return null;
          })}
        </Flex>
      </Flex>
    );
  };

  render() {
    console.log('routes', this.state);
    return (
      <Flex full>
        {this.state.panes.length === 0 ? this.props.children : this.getPanes(this.state.panes)}
      </Flex>
    );
  }
}

Tabs.propTypes = {
  height: number,
  maxWidth: number,
  minWidth: number,
  panes: shape(PaneType),
  scroll: bool,
  widthLocked: bool,
  width: number,
  avatarSize: number
};

Tabs.defaultProps = {
  height: 32,
  avatarSize: 12,
  route: []
};

export default withRouter(Tabs);
