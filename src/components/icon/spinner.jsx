import React from 'react';
import Icon from 'react-icon-base';

const IconSpinner = ({ ...rest }) => (
  <Icon {...rest} viewBox="4 4 92 92">
    <rect x="0" y="0" width="100" height="100" fill="none" />
    <circle cx="50" cy="50" r="40" stroke="#f1f1f1" fill="none" strokeWidth="10" strokeLinecap="round" />
    <circle cx="50" cy="50" r="40" stroke="#0690fa" fill="none" strokeWidth="6" strokeLinecap="round">
      <animate attributeName="stroke-dashoffset" dur="2s" repeatCount="indefinite" from="0" to="502" />
      <animate attributeName="stroke-dasharray" dur="2s" repeatCount="indefinite" values="125.5 125.5;1 250;125.5 125.5" />
    </circle>
  </Icon>
);

export default IconSpinner;
