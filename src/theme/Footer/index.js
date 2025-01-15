// /src/theme/Footer/index.js
import React from 'react';
import OriginalFooter from '@theme-original/Footer';
import PushFeedback from './Feedback/Feedback';
import FeelbackRating from './Rating/Rating';

export default function FooterWrapper(props) {
  return (
    <>
      <PushFeedback />
      <FeelbackRating />
      <OriginalFooter {...props} />
    </>
  );
}