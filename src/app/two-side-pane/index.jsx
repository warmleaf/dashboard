import React, { Component } from 'react';
import SplitPane from 'react-split-pane';

export default class TwoSidePane extends Component {
  shouldComponentUpdate(nextProps) {
    const { minSize, maxSize, defaultSize } = this.props;
    console.log(nextProps.minSize !== minSize ||
      nextProps.maxSize !== maxSize ||
      nextProps.defaultSize !== defaultSize)
    // if (nextProps.minSize === minSize) return false;
    // if (nextProps.maxSize === maxSize) return false;
    // if (nextProps.defaultSize === defaultSize) return false;
    return nextProps.minSize !== minSize ||
      nextProps.maxSize !== maxSize ||
      nextProps.defaultSize !== defaultSize;
  }

  render() {
    console.log('render sp')
    return <SplitPane {...this.props} />;
  }
}
