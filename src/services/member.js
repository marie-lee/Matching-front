import { instance } from '@/services/config';

// ----------------------------------------------------------------------

// 로그인
export const URL_POST_MEMBER_LOGIN = '/member/login';
export const postMemberLogin = (payload) => {
  return instance.post(URL_POST_MEMBER_LOGIN, payload);
};

// 포트폴리오 상세 조회
export const URL_GET_PORTFOLIO_DETAIL = '/member/profile';
export const getPortfolioDetail = (pfolSn) => {
  return instance.get(`${URL_GET_PORTFOLIO_DETAIL}/${pfolSn}`);
};

// 프로필, 포트폴리오 입력
export const URL_POST_PROFILE = '/member/profile';
export const postProfile = (payload) => {
  return instance.post(URL_POST_PROFILE, payload);
};

// 이메일 인증
export const URL_POST_EMAIL_CERTIFICATION =
  '/member/registration/certification';
export const postEmailCertification = (payload) => {
  return instance.post(URL_POST_EMAIL_CERTIFICATION, payload);
};

// 이메일 인증 확인
export const URL_POST_EMAIL_CONFIRMATION = '/member/registration/confirmation';
export const postEmailConfirmation = (payload) => {
  return instance.post(URL_POST_EMAIL_CONFIRMATION, payload);
};

// 회원가입
export const URL_POST_MEMBER_JOIN = '/member/registration/join';
export const postMemberJoin = (payload) => {
  return instance.post(URL_POST_MEMBER_JOIN, payload);
};

// 아이디 찾기
export const URL_POST_MEMBER_FIND_ID = '/member/find/id';
export const postMemberFindId = (payload) => {
  return instance.post(URL_POST_MEMBER_FIND_ID, payload);
};

// 비밀번호 재설정
export const URL_POST_RESET_PASSWORD = '/member/find/pw/confirmation';
export const postResetPassword = (payload) => {
  return instance.post(URL_POST_RESET_PASSWORD, payload);
};

// 비밀번호 찾기 - 이메일 인증 요청
export const URL_POST_PW_CERTIFICATION = '/member/find/pw';
export const postPwCertification = (payload) => {
  return instance.post(URL_POST_PW_CERTIFICATION, payload);
};

// 비밀번호 찾기 - 이메일 인증 확인
export const URL_POST_PW_CONFIRMATION = '/member/find/pw/certification';
export const postPwVerification = (payload) => {
  return instance.post(URL_POST_PW_CONFIRMATION, payload);
};
