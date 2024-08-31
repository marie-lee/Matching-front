import { instance } from '@/services/config';

// ----------------------------------------------------------------------
// GET
// ----------------------------------------------------------------------

// 내 WBS조회
export const URL_GET_PROJECT_WBS = '/project/wbs';
export const getWbs = (pjtSn) => {
  return instance.get(`${URL_GET_PROJECT_WBS}/${pjtSn}`);
};

// ----------------------------------------------------------------------
// POST
// ----------------------------------------------------------------------
// 프로젝트 등록
export const URL_POST_PROJECT = '/project/add';
export const postProject = (payload) => {
  return instance.post(URL_POST_PROJECT, payload);
};

export const URL_POST_WBS = '/project/wbs/create';
export const postWbs = (pjtSn, payload) => {
  return instance.post(`${URL_POST_WBS}/${pjtSn}`, payload);
};
