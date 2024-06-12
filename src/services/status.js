import { instance } from '@/services/config';

// ----------------------------------------------------------------------

// 현황 조회 (나의 현황, 내가 생성한 프로젝트 현황)
export const URL_GET_STATUS = '/status';
export const getStatus = () => {
  return instance.get(URL_GET_STATUS);
};

// 제안 요청 받은 프로젝트 상세 조회
export const getStatusProject = (pjtSn) => {
  return instance.get(`${URL_GET_STATUS}/${pjtSn}`);
};
