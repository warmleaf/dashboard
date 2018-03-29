import React, { Component, cloneElement } from 'react';
import isTypeOf from '../../lib/is_type_of';
import Flex from '../../components/flex';
import channel from './channel';

class TabContainer extends Component {
  constructor(props) {
    super(props);
    this.displayName = 'TabContainer';
    this.state = {
      selected: this.props.defaultItem
    };
  }

  componentDidMount() {
    const { origin } = this.props;
    if (!origin) throw Error('origin is required');
    channel.on(origin, selected => this.setState({ selected }));
  }

  componentWillReceiveProps(nexeProps) {
    if (nexeProps.defaultItem !== this.props.defaultItem) {
      this.setState({ selected: nexeProps.defaultItem });
    }
  }

  setChildren = children => cloneElement(children, {
    hidden: this.state.selected !== children.key
  })

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

export default TabContainer;
