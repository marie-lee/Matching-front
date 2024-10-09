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

export const getProjectMember = (pjtSn) => {
  return instance.get(`${URL_GET_PROJECT}/member/${pjtSn}`);
};

export const URL_GET_STATUS = '/status';
export const getSTATUS = () => {
  return instance.get(URL_GET_STATUS);
};

export const URL_GET_Recommend = '/recommendation/project';
export const getRecommend = (pjtSn) => {
  return instance.get(`${URL_GET_Recommend}/${pjtSn}`);
};
// 프로젝트 정보 및 평가자 목록 조회
export const URL_GET_ReviewRate = '/project/rate';
export const getReviewRate = (pjtSn) => {
  return instance.get(`${URL_GET_ReviewRate}/${pjtSn}`);
};

// 나에 대한 평가 조회
export const URL_GET_MY_RATE = '/project/myRate';
export const getMyRate = (pjtSn) => {
  return instance.get(`${URL_GET_MY_RATE}/${pjtSn}`);
};

// 프로젝트 멤버, 파트 리스트 조회
export const URL_GET_PROJECT_MEMBER_PART = '/project/memberList';
export const getProjectMemberPart = (pjtSn) => {
  return instance.get(`${URL_GET_PROJECT_MEMBER_PART}/${pjtSn}`);
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

// ----------------------------------------------------------------------
// PUT
// ----------------------------------------------------------------------

// 프로젝트 멤버 파트 변경
export const URL_PUT_PROJECT_MEMBER_PART = '/project/memberList/part';
export const putProjectMemberPart = (payload, pjtSn, memSn) => {
  return instance.put(`${URL_PUT_PROJECT_MEMBER_PART}/${pjtSn}/${memSn}`, payload);
};

// 프로젝트 관리자 권한 부여
export const URL_PUT_PROJECT_MEMBER_ADMIN = '/project/memberList/role';
export const putProjectMemberAdmin = (payload, pjtSn, memSn) => {
  return instance.put(`${URL_PUT_PROJECT_MEMBER_ADMIN}/${pjtSn}/${memSn}`, payload);
};