import React, { PureComponent } from 'react';
import { injectGlobal } from 'styled-components';
import Base from '../../components/base';
import Flex from '../../components/flex';
import IconSearch from '../../components/icon/search';
import IconError from '../../components/icon/error';

/* eslint-disable */
injectGlobal`
  .search{
    &.on,
    &:hover{
      background-color: rgba(0,0,0,.5);

      input {
        color: rgba(255,255,255,.8)
      }
    }
    input:focus {
      outline: none;
    }
  }
`;
/* eslint-enable */

class Search extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFocus: this.props.focus,
      value: this.props.value || ''
    };
  }

  _changeHandle = (value) => {
    this.setState({ value });
  }

  _changeFocus = (bool) => {
    this.setState({ isFocus: bool });
  }

  render() {
    const { placeholder, ...rest } = this.props;
    return (
      <Flex
        className={`search${this.state.isFocus ? ' on' : ''}`}
        of
        hc
        p="2px 10px"
        mr="5px"
        round="200px"
        h="28px"
        bgc="rgba(0,0,0,.2)"
        outline="none"
        {...rest}
      >
        <Base.Input
          type="text"
          border="none"
          heigt="100%"
          padding="0"
          baco="rgba(0,0,0,0)"
          bosi="border-box"
          pari="8px"
          height="100%"
          width="100%"
          placeholder={placeholder || 'search...'}
          value={this.state.value}
          onFocus={() => { this._changeFocus(true); }}
          onBlur={() => { this._changeFocus(false); }}
          onChange={(e) => { this._changeHandle(e.target.value); }}
        />
        {this.state.value.length > 0 ?
          <IconError /> : <IconSearch color="rgba(255, 255, 255, .6)" />}
      </Flex>
    );
  }
}

export default Search;
