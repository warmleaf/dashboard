import React from 'react';
import { withTheme } from 'styled-components';
import Flex from '../../components/flex';
import Base from '../../components/base';

const SelfIconView = ({ text, Icon, theme, ...rest }) => (
  <Flex column vc mt="10px" pt="8px" pb="8px" hover-bgc={theme.activeColor} hover-co="#fff" cur="pointer"  {...rest}>
    <Icon className="hco" color="rgba(255, 255, 255, .6)" />
    <Base.Span className="hco" color="rgba(255, 255, 255, .6)" fosi="10px" pato="4px">
      {text}
    </Base.Span>
  </Flex>
);

export default withTheme(SelfIconView);
