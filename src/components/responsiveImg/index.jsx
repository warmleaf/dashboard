import React, { Component } from 'react';
import Flex from '../flex';

export default class ResponsiveImg extends Component {
  constructor(props) {
    super(props)
    this.state = { src: null }
  }
  componentDidMount() {
    if (this.props.background) {
      const { width, height } = this.dom.getBoundingClientRect()
      const src = { width, height }

      if (this.props.width) src.width = this.props.width
      if (this.props.height) src.height = this.props.height

      const side = src.width - src.height >= 0 ?
        { k: 'w', v: src.width } : { k: 'h', v: src.height }
      this.setState({
        src: `${this.props.src}?imageView2/${this.props.type || 1}/${side.k}/${parseInt(side.v)}`
      })
    }
  }
  render() {
    const { background, children, ...rest } = this.props;
    if (background) {
      return <Flex
        {...rest}
        w="100%"
        h="100%"
        innerRef={loader => { this.dom = loader }}
        bg={this.state.src && `url(${this.state.src}) center center no-repeat`}
        >{children}</Flex>
    } else {
      return <img src={this.state.src} />
    }
  }
}