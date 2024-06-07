import { instance } from '@/services/config';

// ----------------------------------------------------------------------

// 로그인
export const URL_POST_MEMBER_LOGIN = '/member/login';
export const postMemberLogin = (payload) => {
  return instance.post(URL_POST_MEMBER_LOGIN, payload);
};
