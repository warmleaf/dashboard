import React, { Component, cloneElement } from 'react';
import isTypeOf from '../../lib/is_type_of';
import Flex from '../../components/flex';
import channel from './channel';

class TabContainer extends Component {
  constructor(props) {
    super(props);
    this.displayName = 'TabContainer';
    this.state = {
      selectedIndex: this.props.defaultIndex - 1 || 0
    };
  }

  componentDidMount() {
    const { origin } = this.props;
    if (!origin) throw Error('origin is required');
    channel.on(origin, selectedIndex => this.setState({ selectedIndex }));
  }

  setChildren = (children, index) => {
    let Index = 0;
    if (index) Index = index;
    return cloneElement(children, {
      key: Index,
      hidden: this.state.selectedIndex !== Index
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

export default TabContainer;
