import React, { Component } from 'react'
import { string, shape, bool, number } from 'prop-types'
import styled from 'styled-components'
import Base from '../base'
import Flex from '../flex'
import Title from '../title'

export 

export default class Menu extends Component {
  constructor(props) {
    super(props)
    this.menu = []
    this.register = null
    this.state = {
      items: this.props.items,
      deepItems: {
        0: [{
          root: {
            id: '1001',
            label: 'menu label 1',
            type: '1'
            
          }
        }, {
          root: {
            id: '1002',
            label: 'menu label 2',
            type: '1'
            
          }
        }],
        1: [{}]
      }
    }
    this.autoDrawMenu(this.props.items)
  }

  autoDrawMenu = (items) => {
    if (items.length === 0) return
    items.map(item => {

      this.register = <MenuItem>
        <Title label={item.label} />
      </MenuItem>

      if (item.children) {
        this.register = <MenuItemGroup>
          <MenuItem>
            <Title label={item.label} />
          </MenuItem>
          {this.autoDrawMenu(item.children)}
        </MenuItemGroup>
      }
      this.menu.push(this.register)
    })
  }

  render() {
    const { items, children } = this.props
    return (<Flex>
      {items ? this.menu : children}
    </Flex>)
  }
}

Menu.propTypes = {
  openId: string,
}

Menu.defaultProps = {
}

export class MenuItem extends Component {
  render() {
    const { children, label } = this.props
    return (<Flex>
      {label ? <Title label={label} /> : children}
    </Flex>)
  }
}

export class MenuItemGroup extends Component {
  render() {
    return (<Flex>
      {this.props.children}
    </Flex>)
  }
}
