import React, { Component, cloneElement } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { string, shape, bool, number, oneOf, func, node, array } from 'prop-types';
import Flex from '../flex';
import OmittedText from '../omittedtext';
import config from '../config';

export default class ToolTip extends Component {
  constructor(props) {
    super(props);
    this.displayName = `${config.projectOwner}_tooltip`;
    this.tooltip = document.createElement('div');
    this.tooltip.setAttribute('style', 'position: absolute;top:0;left:0;right:0;')
    this.tooltipContainer = null;
    this.state = {
      visible: null,
      x: 0,
      y: 0,
    }
  }

  drawTip = () => {
    const { delay, placement, follow, tigger, text, maxSize, wordBreakBy, rest } = this.props;
    const { x, y } = this.state;
    return this.state.visible && createPortal(
      <Flex
        cid="tooltip"
        absolute
        lf={'0'}
        bt={'0'}
        tf={`translate(${x}px, ${y}px)`}
        mw={maxSize[0] || null}
      >
        <OmittedText breakOn={wordBreakBy} lines={maxSize[1]}>{text}</OmittedText>
      </Flex>,
      this.tooltip);
  }

  tiggerOn = (e) => {
    if (!this.isOn) {
      document.body.appendChild(this.tooltip);
      this.isOn = true;
    }
    const relative = this.tooltipContainer.getBoundingClientRect();
    this.setState({
      visible: true,
      x: e.clientX,
      y: e.clientY,
    })
  }

  tiggerOff = (e) => {
    this.setState({ visible: false })
    if (this.isOn) {
      document.body.removeChild(this.tooltip);
      this.isOn = false;
    }
  }

  render() {
    return [
      cloneElement(
        this.props.children,
        {
          innerRef: dom => { this.tooltipContainer = dom },
          onFocus: this.tiggerOn,
          onBlur: this.tiggerOff,
          onMouseMove: this.tiggerOn,
          onMouseLeave: this.tiggerOff
        }
      ),
      this.drawTip()
    ];
  }
}

ToolTip.propTypes = {
  delay: number,
  placement: string,
  follow: bool,
  tigger: func,
  maxSize: array,
  text: string | node | func,
  wordBreakBy: oneOf(["word", "letter"])
}

ToolTip.defaultProps = {
  delay: 100,
  placement: oneOf(['right']),
  follow: true,
  maxSize: [240, 2]
}
