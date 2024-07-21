import { instance } from '@/services/config';

// ----------------------------------------------------------------------

// 로그인
export const URL_POST_MEMBER_LOGIN = '/member/login';
export const postMemberLogin = (payload) => {
  return instance.post(URL_POST_MEMBER_LOGIN, payload);
};

//이메일 인증 요청
export const URL_POST_EMAIL_CERTIFICATION ='/member/registeration/certification';
export const postEmailCertification = (USER_EMAIL) => {
  console.log(USER_EMAIL);
  return instance.post(URL_POST_EMAIL_CERTIFICATION,
  {
    USER_EMAIL:USER_EMAIL
  });
}

//이메일 인증 확인
export const URL_POST_EMAIL_CONFIRMATION = '/member/registeration/confirmation';
export const postEmailConfirmation = (USER_EMAIL,verificationCode) => {
  console.log(USER_EMAIL,verificationCode)
  return instance.post(URL_POST_EMAIL_CONFIRMATION,
    {
      verificationCode : verificationCode,
      USER_EMAIL : USER_EMAIL
    }
  );
}
