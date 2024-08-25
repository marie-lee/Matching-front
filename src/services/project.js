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

// ----------------------------------------------------------------------
// POST
// ----------------------------------------------------------------------
// 프로젝트 등록
export const URL_POST_PROJECT = '/project/add';
export const postProject = (payload) => {
  return instance.post(URL_POST_PROJECT, payload);
};
