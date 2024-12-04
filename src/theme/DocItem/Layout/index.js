import React from 'react';
import OriginalDocItemLayout from '@theme-original/DocItem/Layout';
import Disclaimer from '../../../components/Disclaimer';

export default function DocItemLayout(props) {
  return (
    <OriginalDocItemLayout {...props}>
      <Disclaimer />
      {props.children}
    </OriginalDocItemLayout>
  );
}