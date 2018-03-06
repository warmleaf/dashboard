import React, { Component } from 'react';
import { stepGYR } from '../../lib/color';
import Flex from '../../components/flex';

const Status = ({ percent, tips, size, stroke, ...rest }) => {
  const coordinate = size / 2;
  const strokeWidth = stroke || coordinate / 4;
  const radius = size / 2 - strokeWidth;
  const perimeter = 2 * radius * Math.PI;
  const start = (perimeter * (1 - percent / 100)).toFixed(2);
  const end = (perimeter * percent / 100).toFixed(2);

  return (<Flex vc hc {...rest}>
  <svg width={size} height={size}>
    <circle cx={coordinate} cy={coordinate} r={radius} strokeWidth={strokeWidth} stroke="#ebebeb" strokeLinecap="round" transform={`matrix(0,-1,1,0,0,${size})`} fill="none" />
    <circle cx={coordinate} cy={coordinate} r={radius} strokeWidth={strokeWidth} strokeDasharray={`${end}, ${start}`} stroke={stepGYR(percent)} fill="none" />
  </svg>
  <Flex pl="6px">{tips.map(tip => {
    const tipArray = tip.split('|');
    const blockArray = tipArray[0].split('-');
    if (percent >= blockArray[0] && percent <= blockArray[1]) {
      return tipArray[1];
    }
  })}</Flex>
</Flex>)};

export default Status;
