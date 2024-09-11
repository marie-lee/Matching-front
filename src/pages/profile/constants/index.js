import * as yup from 'yup';

export const profileEditFormDefaultValues = {
  profile: {
    USER_NM: '',
    USER_SN: '',
    USER_IMG: '',
    PF_INTRO: '',
    PF_SN: '',
    career: [],
    stack: [],
    interest: [],
    url: [],
  },
  portfolioInfo: [],
};

export const profileEditFormSchema = yup.object().shape({
  profile: yup.object().shape({
    USER_NM: yup.string().required('이름을 입력해주세요'),
    PF_INTRO: yup.string().required('자기소개를 입력해주세요'),
    career: yup.array().of(
      yup.object().shape({
        CAREER_NM: yup.string().required('회사명을 입력해주세요'),
        ENTERING_DT: yup.date().required('입사일을 입력해주세요'),
      }),
    ),
  }),
  portfolioInfo: yup.array().of(
    yup.object().shape({
      PFOL_NM: yup.string().required('포트폴리오명을 입력해주세요'),
      INTRO: yup.string().required('포트폴리오 설명을 입력해주세요'),
      START_DT: yup.string().required('시작일을 입력해주세요'),
      END_DT: yup.string().required('종료일을 입력해주세요'),
      MEM_CNT: yup.string().required('프로젝트 인원을 입력해주세요'),
      CONTRIBUTION: yup.string().required('기여도를 입력해주세요'),
      url: yup.array().of(
        yup.object().shape({
          URL: yup.string().required('URL을 입력해주세요'),
          URL_INTRO: yup.string().required('URL 설명을 입력해주세요'),
        }),
      ),
    }),
  ),
});

export const CAREERS = [
  {
    careerNm: '토스페이먼츠',
    enteringDt: '2024-03-01',
    quitDt: null,
  },
  {
    careerNm: '네이버',
    enteringDt: '2022-01-01',
    quitDt: '2023-12-31',
  },
];

export const STACKS = [
  {
    stNm: 'Java',
    level: 'primary',
  },
  {
    stNm: 'JavaScript',
    level: 'secondary',
  },
  {
    stNm: 'React',
    level: 'primary',
  },
  {
    stNm: 'ReactNative',
    level: 'secondary',
  },
  {
    stNm: 'Android',
    level: 'primary',
  },
];

export const INTRSTS = ['Java', 'React'];

export const URLS = [
  {
    url: 'https://github.com/test1234',
    desc: 'Github 저장소',
  },
  {
    url: 'https://www.notion.so/test1234',
    desc: 'Notion 포트폴리오',
  },
];

export const PROFILE = {
  name: '홍길동',
  intro: '안녕하세요. 홍길동입니다. 잘 부탁드립니다.',
  career: CAREERS,
  stack: STACKS,
  interest: INTRSTS,
  url: URLS,
};

export const PORTFOLIOS = [
  {
    id: 1,
    pfolNm: '포트폴리오1',
    intro: '포트폴리오1에 대한 설명',
    startDt: '2021-01-01',
    endDt: '2021-05-10',
    stacks: [
      {
        stNm: 'Java',
      },
      {
        stNm: 'Spring',
      },
    ],
    img: 'https://via.placeholder.com/230x150?text=Portfolio 1',
  },
  {
    id: 2,
    pfolNm: '포트폴리오2',
    intro: '포트폴리오2에 대한 설명',
    startDt: '2021-01-01',
    endDt: '2021-05-10',
    stacks: [
      {
        stNm: 'React',
      },
      {
        stNm: 'TypeScript',
      },
    ],
    img: 'https://via.placeholder.com/230x150?text=Porfolio 2',
  },
  {
    id: 3,
    pfolNm: '포트폴리오3',
    intro: '포트폴리오3에 대한 설명',
    startDt: '2021-01-01',
    endDt: '2021-05-10',
    stacks: [
      {
        stNm: 'React',
      },
      {
        stNm: 'TypeScript',
      },
    ],
    img: 'https://via.placeholder.com/230x150?text=Porfolio 3',
  },
  {
    id: 4,
    pfolNm: '포트폴리오4',
    intro: '포트폴리오4에 대한 설명',
    startDt: '2021-01-01',
    endDt: '2021-05-10',
    stacks: [
      {
        stNm: 'AWS',
      },
      {
        stNm: 'NodeJs',
      },
      {
        stNm: 'MySQL',
      },
    ],
    img: 'https://via.placeholder.com/230x150?text=Porfolio 4',
  },
  {
    id: 5,
    pfolNm: '포트폴리오5',
    intro: '포트폴리오5에 대한 설명',
    startDt: '2021-01-01',
    endDt: '2021-05-10',
    stacks: [
      {
        stNm: 'React',
      },
      {
        stNm: 'NextJS',
      },
      {
        stNm: 'TypeScript',
      },
      {
        stNm: 'MUI',
      },
      {
        stNm: 'MySQL',
      },
    ],
    img: 'https://via.placeholder.com/230x150?text=Porfolio 5',
  },
];
