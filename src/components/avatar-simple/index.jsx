import React from 'react';
import Flex from '../flex';
import Base from '../base';
import defaultAvatar from '../../assets/img/default.svg';

const AvatarSimple = ({ title, sub, avatar }) => (
  <Flex p="15px">
    <Base.Img src={avatar || defaultAvatar} />
    <Flex column hc pl="10px">
      <Base.Span color="rgba(0,0,0,.7)" fosi="14px">{title}</Base.Span>
      <Base.Span color="rgba(0,0,0,.7)" fosi="12px">{sub}</Base.Span>
    </Flex>
  </Flex>
);

export default AvatarSimple;
