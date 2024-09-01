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

// WBS 이슈 상세 조회
export const URL_GET_WBS_ISSUE = '/project/wbs/issue';
export const getWbsIssue = (pjtSn, issueSn) => {
  return instance.get(`${URL_GET_WBS_ISSUE}/${pjtSn}/${issueSn}`);
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
export const URL_POST_WBS_TASK_EDIT = '/project/wbs/task';
export const postWbsTaskEdit = (pjtSn, taskSn, payload) => {
  return instance.post(`${URL_POST_WBS_TASK_EDIT}/${pjtSn}/${taskSn}`, payload);
};

// WBS 이슈 추가
export const URL_POST_WBS_ISSUE = '/project/wbs/issue';
export const postWbsIssue = (pjtSn, taskSn, payload) => {
  return instance.post(`${URL_POST_WBS_ISSUE}/${pjtSn}/${taskSn}`, payload);
};

// WBS 이슈 덧글 생성
export const URL_POST_WBS_ISSUE_COMMENT = '/project/wbs/issue/comment';
export const postWbsIssueComment = (pjtSn, issueSn, payload) => {
  return instance.post(
    `${URL_POST_WBS_ISSUE_COMMENT}/${pjtSn}/${issueSn}`,
    payload,
  );
};
