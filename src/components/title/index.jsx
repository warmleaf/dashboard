import React from 'react';
import styled from 'styled-components';

const Title = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
  flex: 1;
  flex-direction: ${props => props.column ? 'column' : 'row'};
`;

export default ({ children, label }) => <Title>{label || children}</Title>;
