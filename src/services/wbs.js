import { instance } from '@/services/config';

// ----------------------------------------------------------------------
// GET
// ----------------------------------------------------------------------
// 내 WBS 조회
export const URL_GET_PROJECT_WBS = '/project/wbs';
export const getWbs = (pjtSn) => {
  return instance.get(`${URL_GET_PROJECT_WBS}/${pjtSn}`);
};
export const getWbsInfo = (pjtSn) => {
  return instance.get(`${URL_GET_PROJECT_WBS}/create/${pjtSn}`);
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

export const URL_GET_WBS_Tracking = '/project/wbs/tracking';
export const getWbsIssueTracking = (pjtSn) => {
  return instance.get(`${URL_GET_WBS_Tracking}/${pjtSn}`);
};

// WBS 이슈 등록 시, 업무 선택을 위한 전체 업무 목록 조회
export const URL_GET_WBS_ALL_TASK_LIST = '/project/wbs/create/issue';
export const getWbsAllTaskList = (pjtSn) => {
  return instance.get(`${URL_GET_WBS_ALL_TASK_LIST}/${pjtSn}`);
};

// 전체 지난 업무 및 이슈 목록 조회
export const URL_GET_PROJECT_WBS_PAST_LIST = '/project/wbs/past';
export const getWbsPastList = (pjtSn) => {
  return instance.get(`${URL_GET_PROJECT_WBS_PAST_LIST}/${pjtSn}`);
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

// WBS 업무 댓글 생성
export const URL_POST_WBS_TASK_COMMENT = '/project/wbs/task/comment';
export const postWbsTaskComment = (pjtSn, taskSn, payload) => {
  return instance.post(
    `${URL_POST_WBS_TASK_COMMENT}/${pjtSn}/${taskSn}`,
    payload,
  );
};

// WBS 이슈 추가
export const URL_POST_WBS_ISSUE = '/project/wbs/issue';
export const postWbsIssue = (pjtSn, taskSn, payload) => {
  return instance.post(`${URL_POST_WBS_ISSUE}/${pjtSn}/${taskSn}`, payload);
};

// WBS 이슈 댓글 생성
export const URL_POST_WBS_ISSUE_COMMENT = '/project/wbs/issue/comment';
export const postWbsIssueComment = (pjtSn, issueSn, payload) => {
  return instance.post(
    `${URL_POST_WBS_ISSUE_COMMENT}/${pjtSn}/${issueSn}`,
    payload,
  );
};

export const URL_POST_WBS = '/project/wbs/create';
export const postWbs = (pjtSn, payload) => {
  return instance.post(`${URL_POST_WBS}/${pjtSn}`, payload);
};

export const URL_POST_PROJECT_WBS = '/project/wbs';
export const postEditWbs = (pjtSn, payload) => {
  return instance.post(`${URL_POST_PROJECT_WBS}/edit/${pjtSn}`, payload);
};
// ----------------------------------------------------------------------
// PUT
// ----------------------------------------------------------------------
// WBS 이슈 수정
export const URL_PUT_WBS_ISSUE = '/project/wbs/issue';
export const putWbsIssue = (pjtSn, issueSn, payload) => {
  return instance.put(`${URL_PUT_WBS_ISSUE}/${pjtSn}/${issueSn}`, payload);
};
