import React from 'react';
import Truncate from './truncate';

const OmittedText = (props) => <Truncate {...props}>
  {props.children}
</Truncate>;

export default OmittedText;
