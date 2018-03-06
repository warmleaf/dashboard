import React from 'react';
import Flex from '../../components/flex';
import Base from '../../components/base';
import Button from '../../components/button';
import Title from '../../components/title';
import IconClose from '../../components/icon/close';

const Oflex = Flex.extend`
  &.on > div:first-child {
    background: #fafafa;
    border-bottom-color: #fafafa;
  }
`;

const ChromeLikeTab = ({
  avatar, active, title, closeable, ...rest
}) => (
    <Oflex rela h="80%" inline {...rest}>
      <Flex
        abs
        round="2px 2px 0 0"
        w="100%"
        h="100%"
        b="1px solid rgba(0,0,0,.15)"
        t="perspective(100px) rotateX(30deg)"
        bb={active ? '0 !important' : null}
        bgc={active ? '#fafafa' : '#f2f2f2'}
        z={active ? '1' : null}
      />
      <Flex hc w="90%" z="1">
        {avatar && <Base.Img src={avatar} mari="6px" male="4px" />}
        <Title>{title}</Title>
        {closeable && (
          <Button no-border pl="6px" pr="6px">
            <IconClose />
          </Button>
        )}
      </Flex>
    </Oflex>);

export default ChromeLikeTab;
