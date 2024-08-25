import { instance } from '@/services/config';

// ----------------------------------------------------------------------
// GET
// ----------------------------------------------------------------------
// 내 프로젝트 리스트 조회
export const URL_GET_PROJECT_LIST = '/project';
export const getProjectList = () => {
  return instance.get(URL_GET_PROJECT_LIST);
};

// 내 프로젝트 상세 조회
export const URL_GET_PROJECT = '/project';
export const getProject = (pjtSn) => {
  return instance.get(`${URL_GET_PROJECT}/${pjtSn}`);
};

export const URL_GET_STATUS = '/status';
export const getSTATUS = () => {
  return instance.get(URL_GET_STATUS);
};

export const URL_GET_Recommend = '/recommendation/project';
export const getRecommend = (pjtSn) => {
  return instance.get(`${URL_GET_Recommend}/${pjtSn}`);
};
// 프로젝트 평가한 멤버들 조회
export const URL_GET_ReviewMembers = '/project/rate';
export const getReviewMembers = (pjtSn) => {
  return instance.get(`${URL_GET_ReviewMembers}/${pjtSn}`);
};
// 프로젝트 팀원 평가 조회
export const URL_GET_MyPeerReview = '/project/myRate';
export const getMyPeerReview = (pjtSn) => {
  return instance.get(`${URL_GET_MyPeerReview}/${pjtSn}`);
};

// ----------------------------------------------------------------------
// POST
// ----------------------------------------------------------------------
// 프로젝트 등록
export const URL_POST_PROJECT = '/project/add';
export const postProject = (payload) => {
  return instance.post(URL_POST_PROJECT, payload);
};

// 프로젝트 멤버 평가하기
export const URL_POST_PROJECT_RATE = '/project/rate';
export const postProjectRate = (payload, pjtSn, targetSn) => {
  return instance.post(
    `${URL_POST_PROJECT_RATE}/${pjtSn}/${targetSn}`,
    payload,
  );
};
