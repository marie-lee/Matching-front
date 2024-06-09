import { instance } from '@/services/config';

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