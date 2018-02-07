import React, { Component } from 'react';
import Frame from 'react-frame-component';
import StyleSheet from 'styled-components/lib/models/StyleSheet';

export default class Iframe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      styles: null
    };
  }

  componentDidUpdate() {
    const updatedStyles = StyleSheet.instance.toHTML();
    if (this.state.styles !== updatedStyles) {
      this.updateStyles(updatedStyles);
    }
  }

  updateStyles = (newStyles) => {
    this.setState({
      styles: newStyles || StyleSheet.instance.toHTML()
    });
  };

  render() {
    return (
      <Frame
        head={
          <section>
            <style
              type="text/css"
              dangerouslySetInnerHTML={{
                __html: '.frame-root{height:100%;}.frame-content{height:100%;}'
              }}
            />
            <section
              style={{ display: 'none' }}
              dangerouslySetInnerHTML={{
                __html: this.state.styles
              }}
            />
          </section>
        }
        contentDidMount={this.updateStyles}
        scrolling="no"
        width="100%"
        height="100%"
        frameBorder="0"
      >
        {this.props.children}
      </Frame>
    );
  }
}
