import React, { Component, cloneElement } from 'react';
import isTypeOf from '../../lib/is_type_of';
import Flex from '../../components/flex';
import channel from './channel';

class TabList extends Component {
  constructor(props) {
    super(props);
    this.displayName = 'TabList';
    this.state = {
      selected: this.props.defaultItem
    };
    if (!this.props.origin) throw Error('origin is required');
  }

  componentWillReceiveProps(nexeProps) {
    if (nexeProps.defaultItem !== this.props.defaultItem) {
      this.setState({ selected: nexeProps.defaultItem });
    }
  }

  setChildren = (children) => {
    const { beforeSelect, afterSelect, origin } = this.props;
    return cloneElement(children, {
      onClick: () => {
        if (beforeSelect) beforeSelect(children.key);
        this.setState({ selected: children.key });
        channel.emit(origin, children.key);
        if (afterSelect) afterSelect(children.key);
      },
      className: this.state.selected === children.key ? 'on' : null
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
          : children.map(child => this.setChildren(child))}
      </Flex>
    ) : null;
  }
}

export default TabList;
