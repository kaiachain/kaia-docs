import React from 'react';
import OriginalDocItemLayout from '@theme-original/DocItem/Layout';
import Disclaimer from '../../../components/Disclaimer';
import useUmamiScroll from '@site/src/common/useUmamiScroll';

export default function DocItemLayout(props) {
  useUmamiScroll();
  return (
    <OriginalDocItemLayout {...props}>
      <Disclaimer />
      {props.children}
    </OriginalDocItemLayout>
  );
}