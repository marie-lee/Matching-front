import { instance } from '@/services/config';

// ----------------------------------------------------------------------
// GET
// ----------------------------------------------------------------------
// 내 WBS 조회
export const URL_GET_PROJECT_WBS = '/project/wbs';
export const getWbs = (pjtSn) => {
  return instance.get(`${URL_GET_PROJECT_WBS}/${pjtSn}`);
};

// WBS 대시보드 조회
export const URL_GET_WBS_DASHBOARD = '/project/wbs/dashboard';
export const getWbsDashboard = (pjtSn) => {
  return instance.get(`${URL_GET_WBS_DASHBOARD}/${pjtSn}`);
};

// WBS 업무 상세 조회
export const URL_GET_WBS_TASK = '/project/wbs/task';
export const getWbsTask = (pjtSn, taskSn) => {
  return instance.get(`${URL_GET_WBS_TASK}/${pjtSn}/${taskSn}`);
};

// WBS 업무 추가 시 필요한 정보 조회
export const URL_GET_WBS_TASK_ADDITIONAL_INFO = '/project/wbs/task/create';
export const getWbsTaskAdditionalInfo = (pjtSn) => {
  return instance.get(`${URL_GET_WBS_TASK_ADDITIONAL_INFO}/${pjtSn}`);
};

// ----------------------------------------------------------------------
// POST
// ----------------------------------------------------------------------
// 프로젝트 등록
export const URL_POST_PROJECT = '/project/add';
export const postProject = (payload) => {
  return instance.post(URL_POST_PROJECT, payload);
};

// WBS 업무 추가
export const URL_POST_WBS_TASK = '/project/wbs/task/create';
export const postWbsTask = (pjtSn, payload) => {
  return instance.post(`${URL_POST_WBS_TASK}/${pjtSn}`, payload);
};

// WBS 이슈 파생 업무 추가
export const URL_POST_WBS_ISSUE_TASK = '/project/wbs/task/create';
export const postWbsIssueTask = (pjtSn, issueSn, payload) => {
  return instance.post(
    `${URL_POST_WBS_ISSUE_TASK}/${pjtSn}/${issueSn}`,
    payload,
  );
};

// WBS 업무 수정
export const URL_POST_WBS_TASK = '/project/wbs/task';
export const postWbsTask = (pjtSn, taskSn, payload) => {
  return instance.post(`${URL_POST_WBS_TASK}/${pjtSn}/${taskSn}`, payload);
};

// ----------------------------------------------------------------------
// PUT
// ----------------------------------------------------------------------
