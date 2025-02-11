// /src/theme/Footer/Feedback/Feedback.js
import React, { useEffect, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { FeedbackButton } from 'pushfeedback-react';
import { defineCustomElements } from 'pushfeedback/loader';
import 'pushfeedback/dist/pushfeedback/pushfeedback.css';
import styles from './Feedback.module.css';

const placeholders = {
  'en': {
      feedbackButtonText: "Make this page better",
      modalTitle: "Your feedback helps us improve.",
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
      ratingStarsPlaceholder: "How would you rate this page?"
  },
  'ko': {
      feedbackButtonText: "페이지를 개선해 주세요",
      modalTitle: "여러분의 피드백은 문서 개선에 큰 도움이 됩니다.",
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
      ratingStarsPlaceholder: "이 페이지를 평가해 주세요."
  },
  'ja': {
    feedbackButtonText: "ページを改善してください。",
    modalTitle: "あなたのフィードバックは、ドキュメントの改善に大いに役立ちます。",
    emailPlaceholder: "メールアドレスを入力してください。",
    errorMessage: "後で再試行してください。",
    modalTitleError403: "リクエストのURLがPushFeedbackで定義されたURLと一致しません。",
    modalTitleError404: "PushFeedbackで提供されたプロジェクトIDが見つかりません。",
    messagePlaceholder: "フィードバック",
    modalTitleError: "おっとっと！",
    modalTitleSuccess: "フィードバックをありがとうございます！",
    screenshotButtonText: "スクリーンショットを撮る",
    screenshotTopbarText: "該当する場所を選択してください。",
    sendButtonText: "送信する",
    ratingPlaceholder: "このページは役に立ちましたか?",
    ratingStarsPlaceholder: "このページを評価してください。"
},
  'zh-CN': {
      feedbackButtonText: "让这个页面变得更好",
      modalTitle: "您的反馈有助于我们改进工作。",
      emailPlaceholder: "请输入您的电子邮件",
      errorMessage: "请稍后再试",
      modalTitleError403: "请求的 URL 与 PushFeedback 中为该项目定义的 URL 不匹配。",
      modalTitleError404: "我们无法在 PushFeedback 中找到所提供的项目 ID。",
      messagePlaceholder: "评论",
      modalTitleError: "哎呀！",
      modalTitleSuccess: "感谢您的反馈！",
      screenshotButtonText: "添加截图",
      screenshotTopbarText: "在页面上选择一个元素",
      sendButtonText: "发送",
      ratingPlaceholder: "本页对您有帮助吗？",
      ratingStarsPlaceholder: "您如何评价本页面？"
  },
  'zh-TW': {
    feedbackButtonText: "讓這個頁面變得更好",
    modalTitle: "您的反饋有助於我們改進工作。",
    emailPlaceholder: "輸入您的電子郵件",
    errorMessage: "請稍後再試",
    modalTitleError403: "請求的 URL 與 PushFeedback 中爲該項目定義的 URL 不匹配",
    modalTitleError404: "我們無法在 PushFeedback 中找到所提供的項目 ID。",
    messagePlaceholder: "評論",
    modalTitleError: "哎呀！",
    modalTitleSuccess: "感謝您的反饋！",
    screenshotButtonText: "添加截圖",
    screenshotTopbarText: "在頁面上選擇一個元素",
    sendButtonText: "發送",
    ratingPlaceholder: "本頁對您有幫助嗎？",
    ratingStarsPlaceholder: "您如何評價本頁面？"
  },
  'vi': {
      feedbackButtonText: "Cải thiện trang này",
      modalTitle: "Phản hồi của bạn giúp chúng tôi cải thiện.",
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

export default function PushFeedback() {
  const { i18n } = useDocusaurusContext();
  const language = i18n.currentLocale;
  const [isLoaded, setIsLoaded] = useState(false);
  const projectId = '8ou0itrmqd';

useEffect(() => {
  if (typeof window !== 'undefined') {
    defineCustomElements(window);
    setIsLoaded(true); // Set loaded immediately after defining elements
  }
}, []);

  const texts = placeholders[language] || placeholders.en;

  return (
    <div className={`${styles.feedbackWrapper} ${isLoaded ? styles.loaded : ''}`}>
      <FeedbackButton
        project={projectId}
        button-position="bottom-right"
        modal-position="bottom-right"
        button-style="dark"
        rating-mode="stars"
        {...texts}
      >
        {texts.feedbackButtonText}
      </FeedbackButton>
    </div>
  );
}