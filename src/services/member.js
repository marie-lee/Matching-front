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
