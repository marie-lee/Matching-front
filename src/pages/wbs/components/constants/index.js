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

export const wbsData = [
  {
    TICKET_SN: 1,
    name: '기획',
    ORDER_NUM: 1,
    child: [
      {
        TICKET_SN: 2,
        name: '사전준비',
        PARENT_SN: 1,
        ORDER_NUM: 1,
        child: [
          {
            TICKET_SN: 3,
            name: '사전준비',
            PARENT_SN: 2,
            ORDER_NUM: 1,
            data: {
              WORKER: 1,
              WORKER_NM: '홍길동',
              START_DT: '2024-01-01T00:00:00.000Z',
              END_DT: '2024-01-31T00:00:00.000Z',
              STATUS: 'WAIT',
            },
          },
          {
            TICKET_SN: 4,
            name: 'WBS 작성',
            PARENT_SN: 2,
            ORDER_NUM: 2,
            data: {
              WORKER: 1,
              WORKER_NM: '홍길동',
              START_DT: '2024-01-01T00:00:00.000Z',
              END_DT: '2024-01-31T00:00:00.000Z',
              STATUS: 'WAIT',
            },
          },
        ],
      },
      {
        TICKET_SN: 5,
        name: '화면설계',
        PARENT_SN: 1,
        ORDER_NUM: 2,
        child: [
          {
            TICKET_SN: 6,
            name: '화면 설계서 작성',
            PARENT_SN: 5,
            ORDER_NUM: 1,
            data: {
              WORKER: 1,
              WORKER_NM: '홍길동',
              START_DT: '2024-01-01T00:00:00.000Z',
              END_DT: '2024-01-31T00:00:00.000Z',
              STATUS: 'WAIT',
            },
          },
        ],
      },
    ],
  },
  {
    TICKET_SN: 7,
    name: '디자인',
    ORDER_NUM: 2,
    child: [
      {
        TICKET_SN: 8,
        name: '사전준비',
        PARENT_SN: 7,
        ORDER_NUM: 1,
        child: [
          {
            TICKET_SN: 9,
            name: '디자인 레퍼런스 스터디',
            PARENT_SN: 8,
            ORDER_NUM: 1,
            data: {
              WORKER: 1,
              WORKER_NM: '홍길동',
              START_DT: '2024-01-01T00:00:00.000Z',
              END_DT: '2024-01-31T00:00:00.000Z',
              STATUS: 'WAIT',
            },
          },
        ],
      },
      {
        TICKET_SN: 10,
        name: '시안작업',
        PARENT_SN: 7,
        ORDER_NUM: 2,
        child: [
          {
            TICKET_SN: 11,
            name: '시안작업',
            PARENT_SN: 10,
            ORDER_NUM: 1,
            data: {
              WORKER: 1,
              WORKER_NM: '홍길동',
              START_DT: '2024-01-01T00:00:00.000Z',
              END_DT: '2024-01-31T00:00:00.000Z',
              STATUS: 'WAIT',
            },
          },
        ],
      },
      {
        TICKET_SN: 12,
        name: '디자인 작업',
        PARENT_SN: 7,
        ORDER_NUM: 3,
        child: [
          {
            TICKET_SN: 13,
            name: '상세 페이지 디자인',
            PARENT_SN: 12,
            ORDER_NUM: 1,
            data: {
              WORKER: 1,
              WORKER_NM: '홍길동',
              START_DT: '2024-01-01T00:00:00.000Z',
              END_DT: '2024-01-31T00:00:00.000Z',
              STATUS: 'WAIT',
            },
          },
        ],
      },
    ],
  },
  {
    TICKET_SN: 14,
    name: '퍼블리싱',
    ORDER_NUM: 3,
    child: [
      {
        TICKET_SN: 15,
        name: '퍼블리싱 작업',
        PARENT_SN: 14,
        ORDER_NUM: 1,
        child: [
          {
            TICKET_SN: 16,
            name: '레이아웃 퍼블리싱',
            PARENT_SN: 15,
            ORDER_NUM: 1,
            data: {
              WORKER: 1,
              WORKER_NM: '홍길동',
              START_DT: '2024-01-01T00:00:00.000Z',
              END_DT: '2024-01-31T00:00:00.000Z',
              STATUS: 'WAIT',
            },
          },
          {
            TICKET_SN: 17,
            name: '페이지 퍼블리싱',
            PARENT_SN: 15,
            ORDER_NUM: 2,
            data: {
              WORKER: 1,
              WORKER_NM: '홍길동',
              START_DT: '2024-01-01T00:00:00.000Z',
              END_DT: '2024-01-31T00:00:00.000Z',
              STATUS: 'WAIT',
            },
          },
        ],
      },
    ],
  },
  {
    TICKET_SN: 18,
    name: '개발',
    ORDER_NUM: 4,
    child: [
      {
        TICKET_SN: 19,
        name: '사전준비',
        PARENT_SN: 18,
        ORDER_NUM: 1,
        child: [
          {
            TICKET_SN: 20,
            name: '개발환경 구축',
            PARENT_SN: 19,
            ORDER_NUM: 1,
            data: {
              WORKER: 1,
              WORKER_NM: '홍길동',
              START_DT: '2024-01-01T00:00:00.000Z',
              END_DT: '2024-01-31T00:00:00.000Z',
              STATUS: 'WAIT',
            },
          },
          {
            TICKET_SN: 21,
            name: '플랫폼 기본 설정',
            PARENT_SN: 19,
            ORDER_NUM: 2,
            data: {
              WORKER: 1,
              WORKER_NM: '홍길동',
              START_DT: '2024-01-01T00:00:00.000Z',
              END_DT: '2024-01-31T00:00:00.000Z',
              STATUS: 'WAIT',
            },
          },
        ],
      },
      {
        TICKET_SN: 22,
        name: 'DB',
        PARENT_SN: 18,
        ORDER_NUM: 2,
        child: [
          {
            TICKET_SN: 23,
            name: '데이터베이스 / 테이블 구성',
            PARENT_SN: 22,
            ORDER_NUM: 1,
            data: {
              WORKER: 1,
              WORKER_NM: '홍길동',
              START_DT: '2024-01-01T00:00:00.000Z',
              END_DT: '2024-01-31T00:00:00.000Z',
              STATUS: 'WAIT',
            },
          },
        ],
      },
      {
        TICKET_SN: 24,
        name: '웹 개발',
        PARENT_SN: 18,
        ORDER_NUM: 3,
        child: [
          {
            TICKET_SN: 25,
            name: 'FE 개발',
            PARENT_SN: 24,
            ORDER_NUM: 1,
            data: {
              WORKER: 1,
              WORKER_NM: '홍길동',
              START_DT: '2024-01-01T00:00:00.000Z',
              END_DT: '2024-01-31T00:00:00.000Z',
              STATUS: 'WAIT',
            },
          },
          {
            TICKET_SN: 26,
            name: 'BE 개발',
            PARENT_SN: 24,
            ORDER_NUM: 2,
            data: {
              WORKER: 1,
              WORKER_NM: '홍길동',
              START_DT: '2024-01-01T00:00:00.000Z',
              END_DT: '2024-01-31T00:00:00.000Z',
              STATUS: 'WAIT',
            },
          },
        ],
      },
    ],
  },
  {
    TICKET_SN: 27,
    name: '테스트',
    ORDER_NUM: 5,
    child: [
      {
        TICKET_SN: 28,
        name: '1차 테스트',
        PARENT_SN: 27,
        ORDER_NUM: 1,
        child: [
          {
            TICKET_SN: 29,
            name: '1차 개발자 알파 테스트 및 수정',
            PARENT_SN: 28,
            ORDER_NUM: 1,
            data: {
              WORKER: 1,
              WORKER_NM: '홍길동',
              START_DT: '2024-01-01T00:00:00.000Z',
              END_DT: '2024-01-31T00:00:00.000Z',
              STATUS: 'WAIT',
            },
          },
        ],
      },
      {
        TICKET_SN: 30,
        name: '2차 테스트',
        PARENT_SN: 27,
        ORDER_NUM: 2,
        child: [
          {
            TICKET_SN: 31,
            name: '2차 사용자 알파 테스트',
            PARENT_SN: 30,
            ORDER_NUM: 1,
            data: {
              WORKER: 1,
              WORKER_NM: '홍길동',
              START_DT: '2024-01-01T00:00:00.000Z',
              END_DT: '2024-01-31T00:00:00.000Z',
              STATUS: 'WAIT',
            },
          },
          {
            TICKET_SN: 32,
            name: '알파 테스트 수정사항 수정작업',
            PARENT_SN: 30,
            ORDER_NUM: 2,
            data: {
              WORKER: 1,
              WORKER_NM: '홍길동',
              START_DT: '2024-01-01T00:00:00.000Z',
              END_DT: '2024-01-31T00:00:00.000Z',
              STATUS: 'WAIT',
            },
          },
        ],
      },
    ],
  },
];
