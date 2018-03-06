import React, { Component } from 'react'
import { createPortal } from 'react-dom'
import Flex from '../components/flex'

export default class Portal extends Component {
  constructor(props) {
    super(props)
    this.el = document.createElement('div')
    this.el.setAttribute('style', 'position:absolute;top:0;left:0;width:100%;height:100%;z-index:99;')
  }

  componentDidMount() {
    document.body.appendChild(this.el)
  }

  componentWillMount() {
    console.log('here?', this.el)
    // document.body.removeChild(this.el)
  }

  render() {
    return createPortal(
      <Flex hc vc bgc="rgba(0,0,0,.7)" w="100%" h="100%">
        <Flex
          w={this.props.width}
          h={this.props.height}
          bgc="#fff"
          shadow="0 2px 4px rgba(0,0,0,.5)"
          round="2px"
          column={this.props.column}
          size={this.props.size}
        >{this.props.children}</Flex>
      </Flex>,
      this.el
    )
  }
}
