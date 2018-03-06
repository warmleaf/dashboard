import React from 'react';
import { injectGlobal } from 'styled-components';
import Base from '../../components/base';
import Flex from '../../components/flex';
import IconSearch from '../../components/icon/search';

/* eslint-disable */
injectGlobal`
  .search{
    &.on,
    &:hover{
      background-color: rgba(255,255,255,.5);
    }
    input:focus {
      outline: none;
    }
  }
`;
/* eslint-enable */

const Search = ({ ing, value, ...rest }) => (
  <Flex
    className={`search${value && value.length >= 1 ? ' on' : ''}`}
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
      placeholder="搜索..."
      value={value}
    />
    <IconSearch color="rgba(255, 255, 255, .6)" />
  </Flex>
);

export default Search;
