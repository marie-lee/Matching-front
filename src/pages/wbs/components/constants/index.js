export const template1 = [
  {
    id: 1,
    title: 'WBS Template',
    desc: 'Basic 2Depth',
    in: ['part', 'work'],
    chip: ['All Field', 'All Field'],
  },
  {
    id: 2,
    title: 'WBS Template',
    desc: 'Basic 3Depth',
    in: ['part', 'devision', 'work'],
    chip: ['All Part', 'All Field'],
  },
];

export const template2 = [
  {
    id: 3,
    title: 'WBS Template',
    desc: 'Planning Template',
    in: ['part', 'work'],
    chip: ['Planning Part', 'All Field'],
  },
  {
    id: 4,
    title: 'WBS Template',
    desc: 'Design Template',
    in: ['part', 'work'],
    chip: ['Design Part', 'All Field'],
  },
];
export const template3 = [
  {
    id: 5,
    title: 'WBS Template',
    desc: 'Development Template',
    in: ['part', 'work'],
    chip: ['Development Part', 'All Field'],
  },
  {
    id: 6,
    title: 'WBS Template',
    desc: 'Development F.E Template',
    in: ['part', 'work'],
    chip: ['Development Part', 'F.E Field'],
  },
  {
    id: 7,
    title: 'WBS Template',
    desc: 'Development B.E Template',
    in: ['part', 'work'],
    chip: ['Development Part', 'B.E Field'],
  },
];

export const tableData = [
  {
    firstColumn: { value: '기획', rowspan: 3 },
    secondColumn: { value: '사전 준비', rowspan: 2 },
    thirdColumn: '기획 분석',
  },
  {
    secondColumn: 'WBS 작성',
    thirdColumn: '화면설계서 작성',
  },
  {
    secondColumn: '화면 설계',
    thirdColumn: '화면 설계서 작성',
  },
  {
    firstColumn: { value: '디자인', rowspan: 3 },
    secondColumn: '사전 준비',
    thirdColumn: '디자인 레퍼런스 스터디',
  },
  {
    secondColumn: '시안 작업',
    thirdColumn: '시안 작업',
  },
  {
    secondColumn: '디자인 작업',
    thirdColumn: '상세 페이지 디자인',
  },
  {
    firstColumn: { value: '퍼블리싱', rowspan: 2 },
    secondColumn: { value: '퍼블리싱 작업', rowspan: 2 },
    thirdColumn: '레이아웃 퍼블리싱',
  },
  {
    thirdColumn: '페이지 퍼블리싱',
  },
  {
    firstColumn: { value: '개발', rowspan: 5 },
    secondColumn: { value: '사전 준비', rowspan: 2 },
    thirdColumn: '개발 환경 구축',
  },
  {
    thirdColumn: '플랫폼 기본 설정',
  },
  {
    secondColumn: 'DB',
    thirdColumn: '데이터베이스/테이블 구성',
  },
  {
    secondColumn: { value: '개발', rowspan: 2 },
    thirdColumn: 'F.E. 개발',
  },
  {
    thirdColumn: 'B.E. 개발',
  },
  {
    firstColumn: { value: '테스트', rowspan: 3 },
    secondColumn: '1차 테스트',
    thirdColumn: '1차 개발자 알파 텍스트 및 수정',
  },
  {
    secondColumn: { value: '2차 테스트', rowspan: 2 },
    thirdColumn: '2차 사용자 알파 테스트',
  },
  {
    thirdColumn: '알파 테스트 수정사항 수정진행',
  },
];
