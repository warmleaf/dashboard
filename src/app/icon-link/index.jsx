import React from 'react';
import { TabLink } from '../tabs';
import Flex from '../../components/flex';

const IconLink = props => (
  <TabLink
    owner="func"
    keep
    src={{ search: "out=func" }}
    mt="10px"
    hover-bgc={theme.activeColor}
    hover-co="#fff"
  >
    <Flex column full vc pt="8px" pb="8px">
      <IconFunc className="hco" color="rgba(255, 255, 255, .6)" />
      <Base.Span
        className="hco"
        color="rgba(255, 255, 255, .6)"
        fosi="10px"
        pato="4px"
      >
        函数
      </Base.Span>
    </Flex>
  </TabLink>
);

export default IconLink;

