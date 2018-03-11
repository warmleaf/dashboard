import React, { Component, cloneElement } from 'react';
import isTypeOf from '../../lib/is_type_of';
import Flex from '../../components/flex';
import channel from './channel';

class TabList extends Component {
  constructor(props) {
    super(props);
    this.displayName = 'TabList';
    this.state = {
      selectedIndex: this.props.defaultIndex - 1 || 0
    };
    if (!this.props.origin) throw Error('origin is required');
  }

  setChildren = (children, index) => {
    let Index = 0;
    const { beforeSelect, afterSelect, origin } = this.props;
    if (index) Index = index;
    return cloneElement(children, {
      key: Index,
      onClick: () => {
        if (beforeSelect) beforeSelect(Index);
        this.setState({ selectedIndex: Index });
        channel.emit(origin, Index);
        if (afterSelect) afterSelect(Index);
      },
      className: this.state.selectedIndex === Index ? 'on' : null
    });
  };

  render() {
    const {
      children, origin, defaultIndex, ...rest
    } = this.props;
    return children ? (
      <Flex {...rest}>
        {isTypeOf(children) !== 'array'
          ? [this.setChildren(children)]
          : children.map((child, i) => this.setChildren(child, i))}
      </Flex>
    ) : null;
  }
}

export default TabList;
