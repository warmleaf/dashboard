import React from 'react';
import { lighten } from 'polished';
import Flex from '../../components/flex';
import Button from '../../components/button';
import Search from '../../components/search';
import IconCycle from '../../components/icon/cycle';
import IconPlus from '../../components/icon/plus';

const SearchBar = ({ value, reload, add, theme, ...rest }) => (
  <Flex w="100%" as="start" hc p="15px 5px 15px 15px">
    <Search
      full
      value={value}
      {...rest}
    />
    <Button
      no-border
      p="4px"
      size="14px"
      onClick={reload}
    >
      <IconCycle className="hco" fill="#6991FF" />
    </Button>
    <Button
      onClick={add}
      no-border
      p="4px"
      size="16px"
    >
      <IconPlus className="hco" fill="#6991FF" />
    </Button>
  </Flex>
);

export default SearchBar;
