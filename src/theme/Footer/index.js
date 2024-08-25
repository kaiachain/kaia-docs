import React, { useEffect, useState } from 'react';
import Footer from '@theme-original/Footer';

import { FeedbackButton } from 'pushfeedback-react';
import { defineCustomElements } from 'pushfeedback/loader';
import 'pushfeedback/dist/pushfeedback/pushfeedback.css';
import './custom.feedback.css';

export default function FooterWrapper(props) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      defineCustomElements(window);
    }

    // Use the same timing as the main content load
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className={`feedback-wrapper ${isLoaded ? 'loaded' : ''}`}>
        <FeedbackButton
          project="8ou0itrmqd"
          button-position="bottom-right"
          modal-position="bottom-right"
          button-style="dark"
          modal-title="Your feedback makes a difference. Let us know how we can do better."
        >
          Make this page better
        </FeedbackButton>
      </div>
      <Footer {...props} />
    </>
  );
}