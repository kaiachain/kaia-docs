import React, { useEffect, useState } from 'react';
import Footer from '@theme-original/Footer';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import { FeedbackButton } from 'pushfeedback-react';
import { defineCustomElements } from 'pushfeedback/loader';
import 'pushfeedback/dist/pushfeedback/pushfeedback.css';
import './custom.feedback.css';

export default function FooterWrapper(props) {
  const { i18n } = useDocusaurusContext();
  const language = i18n.currentLocale;
  const [isLoaded, setIsLoaded] = useState(false);

  const projectId = '8ou0itrmqd'; 

  const placeholders = {
    en: {
      feedbackButtonText: "Make this page better",
      modalTitle: "Your feedback makes a difference. Let us know how we can do better.",
      emailPlaceholder: "Enter your email",
      errorMessage: "Please try again later.",
      modalTitleError403: "The request URL does not match the one defined in PushFeedback for this project.",
      modalTitleError404: "We could not find the provided project id in PushFeedback.",
      messagePlaceholder: "Comments",
      modalTitleError: "Oops!",
      modalTitleSuccess: "Thanks for your feedback!",
      screenshotButtonText: "Add a Screenshot",
      screenshotTopbarText: "SELECT AN ELEMENT ON THE PAGE",
      sendButtonText: "Send",
      ratingPlaceholder: "Was this page helpful?",
      ratingStarsPlaceholder: "How would you rate this page"
    },
    ko: {
      feedbackButtonText: "페이지를 개선해 주세요",
      modalTitle: "여러분의 피드백은 소중합니다. 개선할 부분을 알려주세요.",
      emailPlaceholder: "이메일을 입력해 주세요",
      errorMessage: "나중에 다시 시도해주세요.",
      modalTitleError403: "요청 URL이 PushFeedback에서 정의된 URL과 일치하지 않습니다.",
      modalTitleError404: "PushFeedback에서 제공된 프로젝트 ID를 찾을 수 없습니다.",
      messagePlaceholder: "의견",
      modalTitleError: "이런!",
      modalTitleSuccess: "피드백을 보내주셔서 감사합니다!",
      screenshotButtonText: "스크린샷 찍기",
      screenshotTopbarText: "해당 위치를 선택하세요",
      sendButtonText: "보내기",
      ratingPlaceholder: "이 페이지가 도움이 되었나요?",
      ratingStarsPlaceholder: "이 페이지를 평가해 주세요"
    },
    vi: {
      feedbackButtonText: "Cải thiện trang này",
      modalTitle: "Hãy cho chúng tôi biết cách chúng tôi có thể làm tốt hơn.",
      emailPlaceholder: "Nhập email của bạn",
      errorMessage: "Vui lòng thử lại sau.",
      modalTitleError403: "URL yêu cầu không khớp với URL được xác định trong PushFeedback cho dự án này.",
      modalTitleError404: "Chúng tôi không thể tìm thấy ID dự án được cung cấp trong PushFeedback.",
      messagePlaceholder: "Nhận xét",
      modalTitleError: "Ôi!",
      modalTitleSuccess: "Cảm ơn bạn đã phản hồi!",
      screenshotButtonText: "Chụp ảnh màn hình",
      screenshotTopbarText: "CHỌN MỘT YẾU TỐ TRÊN TRANG",
      sendButtonText: "Gửi",
      ratingPlaceholder: "Trang này có hữu ích không?",
      ratingStarsPlaceholder: "Bạn đánh giá trang này như thế nào"
    }
  };

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

  const {
    feedbackButtonText,
    modalTitle,
    emailPlaceholder,
    errorMessage,
    modalTitleError403,
    modalTitleError404,
    messagePlaceholder,
    modalTitleError,
    modalTitleSuccess,
    screenshotButtonText,
    screenshotTopbarText,
    sendButtonText,
    ratingPlaceholder,
    ratingStarsPlaceholder
  } = placeholders[language] || placeholders.en;

  return (
    <>
      <div className={`feedback-wrapper ${isLoaded ? 'loaded' : ''}`}>
        <FeedbackButton
          project={projectId}
          button-position="bottom-right"
          modal-position="bottom-right"
          button-style="dark"
          rating-mode="stars"
          modal-title={modalTitle}
          email-placeholder={emailPlaceholder}
          error-message={errorMessage}
          modal-title-error-4-0-3={modalTitleError403}
          modal-title-error-4-0-4={modalTitleError404}
          message-placeholder={messagePlaceholder}
          modal-title-error={modalTitleError}
          modal-title-success={modalTitleSuccess}
          screenshot-button-text={screenshotButtonText}
          screenshot-topbar-text={screenshotTopbarText}
          send-button-text={sendButtonText}
          rating-placeholder={ratingPlaceholder}
          rating-stars-placeholder={ratingStarsPlaceholder}
        >
          {feedbackButtonText}
        </FeedbackButton>
      </div>
      <Footer {...props} />
    </>
  );
}