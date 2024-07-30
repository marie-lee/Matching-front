export const PATHS = {
  // 메인
  root: '/',
  // 인증
  auth: {
    root: '/auth',
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
    findId: '/auth/find-id',
    findPw: '/auth/find-pw',
    resetPw: '/auth/reset-pw',
  },
  // 프로필&포트폴리오
  profiles: {
    root: '/profiles',
    editProfile: '/profiles/edit-profile',
    editPortfolio: '/profiles/edit-portfolio',
  },
  // 프로젝트
  project: {
    root: '/project',
    details: '/project/details',
    add: '/project/add',
  },
  recommend: {
    root: '/recommend',
  },
  // 매칭
  match: {
    root: '/match',
  },
  wbs: {
    root: '/wbs',
    createWbs: '/wbs/create-wbs',
    basicinfo: '/wbs/basic-info',
  },
};
