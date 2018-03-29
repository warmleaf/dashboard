import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import Flex from '../flex';
import Base from '../base';
import IconError from '../icon/error';
import IconSuccess from '../icon/success';
import IconWarning from '../icon/warning';
import IconInfo from '../icon/info';

export default class Portal extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
    this.el.setAttribute('id', 'portal');
    this.el.setAttribute(
      'style',
      `position:absolute;top:0;left:0;width:100%;display: flex;justify-content: center;height:${!this.props.notice ? '100%;z-index: 99' : 0}`
    );
    this.state = {
      marginTop: '-200px'
    };
  }

  componentDidMount() {
    document.body.appendChild(this.el);
    if (this.props.notice) {
      this._timeOut();
      this._aminateTop(200, '20px');
      this._aminateTop(1800, '-200px');
    }
  }

  componentWillUnmount() {
    try {
      document.body.removeChild(this.el);
    } catch (error) {
      return true;
    }
  }

  _timeOut = () => {
    const that = this;
    const timer = setTimeout(() => {
      document.body.removeChild(that.el);
      that.props.beforeUnmount();
      clearTimeout(timer);
    }, 2000);
  }

  _aminateTop = (time, marginTop) => {
    const that = this;
    const timer = setTimeout(() => {
      that.setState({ marginTop });
      clearTimeout(timer);
    }, time);
  }

  render() {
    const {
      notice,
      conform,
      type,
      children,
      ...rest
    } = this.props;
    if (notice) {
      return createPortal(
        <Base.Span
          baco="#fff"
          bosh="0 2px 4px rgba(0,0,0,.5)"
          bora="3px"
          padding="6px 10px"
          display="table"
          transition="margin 200ms"
          z="999"
          mato={this.state.marginTop}
          {...rest}
        >
          {type === 'success' && <IconSuccess style={{ paddingBottom: '3px' }} />}
          {type === 'error' && <IconError style={{ paddingBottom: '3px' }} />}
          {type === 'warning' && <IconWarning style={{ paddingBottom: '3px' }} />}
          {type === 'info' && <IconInfo style={{ paddingBottom: '3px' }} />}
          <Base.Span pale="10px" color="rgba(0,0,0,.7)">{children}</Base.Span>
        </Base.Span>,
        this.el
      );
    }
    return createPortal(
      <Flex hc vc bgc="rgba(0,0,0,.7)" w="100%" h="100%">
        <Flex
          nonOverflow
          w={this.props.width}
          h={this.props.height}
          bgc="#fff"
          shadow="0 2px 4px rgba(0,0,0,.5)"
          round="2px"
          column={this.props.column}
          size={this.props.size}
        >{this.props.children}
        </Flex>
      </Flex>,
      this.el
    );
  }
}
