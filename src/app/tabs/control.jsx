import React, { Component } from 'react';
import clone from 'lodash/clone';
import getDisplayName from './helpers/getDisplayName';
import isTypeOf from '../../lib/is_type_of';

export default function Control(TabComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.elements = [];
      this.state = {
        selected: this.props.defaultIndex - 1 || 0,
        elements: []
      };
    }

    addTabLink = (id) => {
      const elements = clone(this.state.elements);
      if (isTypeOf(elements) === 'array') {
        this.setState({
          elements: elements.push(id)
        });
      }
    };

    doSelect = (selected) => {
      this.setState({ selected });
      // this.containerUpdater();
    };

    containerUpdater = () => {
      const { selected } = this.state;
      console.log(selected);
    };

    render() {
      const TabComponentName = getDisplayName(TabComponent);
      const { selected } = this.state;
      const newProps = {
        selected,
        containerUpdater: TabComponentName === 'TabContainer' ? this.containerUpdater : null,
        doSelect: TabComponentName === 'TabList' ? this.doSelect : null
      };
      return <TabComponent {...this.props} {...newProps} />;
    }
  };
}
