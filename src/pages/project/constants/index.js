import * as yup from 'yup';
import _ from 'lodash';

export const projectAddFormDefaultValues = {
  PJT_NM: '',
  PJT_IMG: null,
  PJT_INTRO: '',
  PJT_OPEN_YN: null,
  CONSTRUCTOR_ROLE: null,
  SELECTED_DT_YN: null,
  START_DT: null,
  PERIOD: '',
  DURATION_UNIT: '',
  STACKS: [],
  WANTED: [],
  ROLES: [{ PART: '', TOTAL_CNT: '' }],
  PJT_DETAIL: '',
};

export const projectAddFormSchema = yup.object().shape({
  PJT_NM: yup.string().required('프로젝트 제목을 입력해주세요'),
  PJT_INTRO: yup.string().required('프로젝트 간단 소개를 입력해주세요'),
  PJT_OPEN_YN: yup.mixed().required('본인의 역할을 작성해주세요'),
  CONSTRUCTOR_ROLE: yup
    .mixed()
    .required('프로젝트 상세 공개 여부를 선택해주세요'),
  SELECTED_DT_YN: yup.mixed().required('예상 프로젝트 시작일을 선택해주세요'),
  START_DT: yup
    .mixed()
    .nullable()
    .test({
      message: '업무 시작일을 입력해주세요',
      test: (START_DT, context) => {
        const { SELECTED_DT_YN } = context.parent;

        if (SELECTED_DT_YN === 'true') {
          return !_.isEmpty(START_DT);
        } else {
          return true;
        }
      },
    }),
  PERIOD: yup.string().required('예상 기간을 입력해주세요'),
  DURATION_UNIT: yup.string().required('예상 기간 단위를 선택해주세요'),
  PJT_DETAIL: yup.string().required('프로젝트 상세 작성을 입력해주세요'),
  STACKS: yup
    .array()
    .min(1, '선호하는 프로젝트 관련 스킬을 최소 1개 이상 입력해주세요'),
  WANTED: yup
    .array()
    .min(1, '선호하는 프로젝트 관련 경험을 최소 1개 이상 입력해주세요'),
  ROLES: yup.array(
    yup.object().shape({
      PART: yup.string().required('분야를 입력해주세요'),
      TOTAL_CNT: yup.string().required('모집인원을 입력해주세요'),
    }),
  ),
});

export const OPEN_OPTIONS = [
  { label: '상세 공개', value: 'false' },
  { label: '일부 공개', value: 'true' },
];

export const SELECTED_DT_OPTIONS = [
  { label: '팀 모집 후 바로 시작', value: 'false' },
  { label: '날짜 선택', value: 'true' },
];

export const DURATION_UNIT_OPTIONS = [
  { label: '일', value: 'DAY' },
  { label: '개월', value: 'MONTH' },
];

export const STACK_OPTIONS = [
  'Java',
  'JavaScript',
  'PHP',
  'React',
  'Nodejs',
  'Spring',
];

export const EXPERIENCE_OPTIONS = ['깔끔한 코드', '3년 이상의 경력'];

export const PART_OPTIONS = ['프론트엔드', '백엔드', '디자이너'];

export const PROJECTS = [
  {
    id: 1,
    nm: '개발자국',
    desc: 'WBS기반의 프로젝트 관리 협업 툴 입니다. 프론트 개발이 상당히 난이도가 될 거 같아서 실력있는 프론트 개발자를 원합니다.',
    startDt: '2024-06-01',
    endDt: '2024-09-30',
    leaderNm: '홍길동',
    status: '모집중',
    stacks: [
      'Java',
      'Spring',
      'SpringBoot',
      'React',
      'JavaScript',
      'TypeScript',
      'Aws',
      'MySQL',
    ],
    img: 'https://via.placeholder.com/200x100?text=project 1',
    currentCnt: 6,
    expectCnt: 11,
    hasLeaderRole: true,
  },
  {
    id: 2,
    nm: '프로젝트명',
    desc: '프로젝트에 대한 설명',
    startDt: '2024-06-01',
    endDt: '2024-09-30',
    leaderNm: '홍길동',
    status: '진행중',
    stacks: [
      'Java',
      'Spring',
      'SpringBoot',
      'React',
      'JavaScript',
      'TypeScript',
      'Aws',
    ],
    img: 'https://via.placeholder.com/200x100?text=project 2',
    currentCnt: 6,
    expectCnt: 11,
    hasLeaderRole: false,
  },
  {
    id: 3,
    nm: '프로젝트명',
    desc: '프로젝트에 대한 설명',
    startDt: '2023-05-01',
    endDt: '2023-10-30',
    leaderNm: '홍길동',
    status: '종료',
    stacks: [
      'Java',
      'Spring',
      'SpringBoot',
      'React',
      'JavaScript',
      'TypeScript',
      'Aws',
    ],
    img: 'https://via.placeholder.com/200x100?text=project 3',
    currentCnt: 6,
    expectCnt: 11,
    hasLeaderRole: false,
  },
];

export const STACKS_OPTIONS = [
  { title: 'HTML' },
  { title: 'JavaScript' },
  { title: 'TypeScript' },
  { title: 'CSS' },
  { title: 'Java' },
  { title: 'Swift' },
  { title: 'Dart' },
  { title: 'Kotlin' },
  { title: 'Spring' },
  { title: 'Android' },
  { title: 'iOS' },
  { title: 'React Native' },
  { title: 'Flutter' },
];

export const RECOMMEND_MEMBERS = [
  {
    pfSn: 1,
    userSn: 10,
    userNm: '안성재',
    profile: {
      introduction:
        '저는 소프트웨어 엔지니어로 일하고 있습니다. 주로 자바와 리액트를 다루며, 관심 있는 기술은 자바와 리액트입니다.',
      img: 'http://example.com/profile/img.jpg',
      career: [
        {
          careerNm: 'SK하이닉스',
          enteringDt: '2023-04-01',
          quitDt: null,
        },
        {
          careerNm: '아정당',
          enteringDt: '2020-06-15',
          quitDt: '2022-12-31',
        },
      ],
      stack: 'JAVA,REACT',
      interests: 'REDUX,SPRING BOOT',
      url: 'http://example.com/project1,http://example.com/project2',
    },
    portfolio: [
      {
        name: '쇼핑몰사이트',
        startDt: '2021-03-01',
        endDt: '2021-09-01',
        period: 6,
        introduction:
          '온라인 쇼핑몰 웹 애플리케이션을 개발했습니다. 사용자 경험을 중시하여 리액트를 사용하여 프론트엔드를 개발했습니다.',
        memCnt: 4,
        contribution: 30,
        stack: 'REACT,SPRING BOOT',
        role: '백엔드,프론트엔드',
        serviceStts: 'ACTIVE',
        url: 'http://example.com/project1',
        media: '',
      },
      {
        name: '업무 관리',
        startDt: '2022-01-15',
        endDt: '2022-05-15',
        period: 4,
        introduction:
          '사내 업무 관리 애플리케이션을 개발했습니다. 자바를 사용하여 백엔드를 개발하였으며, 리액트 네이티브를 활용하여 모바일 앱으로 구현했습니다.',
        memCnt: 3,
        contribution: 40,
        stack: 'JAVA,REACT NATIVE',
        role: '모바일 개발,백엔드',
        serviceStts: 'STOP',
        url: 'http://example.com/project2',
        media: 'http://example.com/project2/image.png',
      },
    ],
    similarityScore: 0.9616608172033598,
  },
  {
    pfSn: 15,
    userSn: 4,
    userNm: '홍길동',
    profile: {
      introduction: '설명',
      img: 'http://218.232.137.30:20090/matching/profile/img.jpg',
      career: [
        {
          careerNm: '회사',
          enteringDt: '2021-01-01',
          quitDt: '2022-12-31',
        },
        {
          careerNm: '회사2',
          enteringDt: '2023-01-01',
          quitDt: '2024-01-31',
        },
      ],
      stack: 'JAVA,JS',
      interests: 'JAVA,REACT',
      url: 'www.www.com,www.www.www',
    },
    portfolio: [
      {
        name: '포트폴리오1',
        startDt: '2021-01-01',
        endDt: '2022-01-01',
        period: 5,
        introduction: '설명',
        memCnt: 5,
        contribution: 20,
        stack: null,
        role: '기획,백엔드',
        serviceStts: 'ACTIVE',
        url: 'www.url.com',
        media: 'http://218.232.137.30:20090/matching/portfolio/img.png',
      },
      {
        name: '포트폴리오2',
        startDt: '2021-01-01',
        endDt: '2022-01-01',
        period: 3,
        introduction: '설명',
        memCnt: 3,
        contribution: 40,
        stack: null,
        role: '디자인,프론트엔드',
        serviceStts: 'STOP',
        url: 'www.url4.com',
        media: 'http://218.232.137.30:20090/matching/portfolio/media.mp4',
      },
    ],
    similarityScore: 0.9607069370478575,
  },
  {
    pfSn: 23,
    userSn: 38,
    userNm: 'test',
    profile: {
      introduction: '설명',
      img: 'http://218.232.137.30:20090/matching/profile/img.jpg',
      career: [
        {
          careerNm: '회사',
          enteringDt: '2021-01-01',
          quitDt: '2022-12-31',
        },
        {
          careerNm: '회사2',
          enteringDt: '2023-01-01',
          quitDt: '2024-01-31',
        },
      ],
      stack: 'JAVA,JS',
      interests: 'JAVA,REACT',
      url: 'www.www.com,www.www.www',
    },
    portfolio: [
      {
        name: '포트폴리오1',
        startDt: '2021-01-01',
        endDt: '2022-01-01',
        period: 5,
        introduction: '설명',
        memCnt: 5,
        contribution: 20,
        stack: 'JAVA,STRING',
        role: '기획,백엔드',
        serviceStts: 'ACTIVE',
        url: 'www.url.com',
        media: 'http://218.232.137.30:20090/matching/portfolio/img.png',
      },
      {
        name: '포트폴리오2',
        startDt: '2021-01-01',
        endDt: '2022-01-01',
        period: 3,
        introduction: '설명',
        memCnt: 3,
        contribution: 40,
        stack: 'NEST.JS,REACT',
        role: '디자인,프론트엔드',
        serviceStts: 'STOP',
        url: 'www.url4.com',
        media: 'http://218.232.137.30:20090/matching/portfolio/media.mp4',
      },
    ],
    similarityScore: 0.9585953444818568,
  },
  {
    pfSn: 24,
    userSn: 40,
    userNm: 'test2',
    profile: {
      introduction: '설명',
      img: 'http://218.232.137.30:20090/matching/profile/img.jpg',
      career: [
        {
          careerNm: '회사',
          enteringDt: '2021-01-01',
          quitDt: '2022-12-31',
        },
        {
          careerNm: '회사2',
          enteringDt: '2023-01-01',
          quitDt: '2024-01-31',
        },
      ],
      stack: 'JAVA,JS',
      interests: 'JAVA,REACT',
      url: 'www.www.com,www.www.www',
    },
    portfolio: [
      {
        name: '포트폴리오1',
        startDt: '2021-01-01',
        endDt: '2022-01-01',
        period: 5,
        introduction: '설명',
        memCnt: 5,
        contribution: 20,
        stack: 'JAVA,STRING',
        role: '기획,백엔드',
        serviceStts: 'ACTIVE',
        url: 'www.url.com',
        media: 'http://218.232.137.30:20090/matching/portfolio/img.png',
      },
      {
        name: '포트폴리오2',
        startDt: '2021-01-01',
        endDt: '2022-01-01',
        period: 3,
        introduction: '설명',
        memCnt: 3,
        contribution: 40,
        stack: 'NEST.JS,REACT',
        role: '디자인,프론트엔드',
        serviceStts: 'STOP',
        url: 'www.url4.com',
        media: 'http://218.232.137.30:20090/matching/portfolio/media.mp4',
      },
    ],
    similarityScore: 0.9585953444818568,
  },
  {
    pfSn: 25,
    userSn: 41,
    userNm: 'test3',
    profile: {
      introduction: '설명',
      img: 'http://218.232.137.30:20090/matching/profile/img.jpg',
      career: [
        {
          careerNm: '회사',
          enteringDt: '2021-01-01',
          quitDt: '2022-12-31',
        },
        {
          careerNm: '회사2',
          enteringDt: '2023-01-01',
          quitDt: '2024-01-31',
        },
      ],
      stack: 'JAVA,JS',
      interests: 'JAVA,REACT',
      url: 'www.www.com,www.www.www',
    },
    portfolio: [
      {
        name: '포트폴리오1',
        startDt: '2021-01-01',
        endDt: '2022-01-01',
        period: 5,
        introduction: '설명',
        memCnt: 5,
        contribution: 20,
        stack: 'JAVA,STRING',
        role: '기획,백엔드',
        serviceStts: 'ACTIVE',
        url: 'www.url.com',
        media: 'http://218.232.137.30:20090/matching/portfolio/img.png',
      },
      {
        name: '포트폴리오2',
        startDt: '2021-01-01',
        endDt: '2022-01-01',
        period: 3,
        introduction: '설명',
        memCnt: 3,
        contribution: 40,
        stack: 'NEST.JS,REACT',
        role: '디자인,프론트엔드',
        serviceStts: 'STOP',
        url: 'www.url4.com',
        media: 'http://218.232.137.30:20090/matching/portfolio/media.mp4',
      },
    ],
    similarityScore: 0.9585953444818568,
  },
  {
    pfSn: 26,
    userSn: 42,
    userNm: 'test4',
    profile: {
      introduction: '설명',
      img: 'http://218.232.137.30:20090/matching/profile/img.jpg',
      career: [
        {
          careerNm: '회사',
          enteringDt: '2021-01-01',
          quitDt: '2022-12-31',
        },
        {
          careerNm: '회사2',
          enteringDt: '2023-01-01',
          quitDt: '2024-01-31',
        },
      ],
      stack: 'JAVA,JS',
      interests: 'JAVA,REACT',
      url: 'www.www.com,www.www.www',
    },
    portfolio: [
      {
        name: '포트폴리오1',
        startDt: '2021-01-01',
        endDt: '2022-01-01',
        period: 5,
        introduction: '설명',
        memCnt: 5,
        contribution: 20,
        stack: 'JAVA,STRING',
        role: '기획,백엔드',
        serviceStts: 'ACTIVE',
        url: 'www.url.com',
        media: 'http://218.232.137.30:20090/matching/portfolio/img.png',
      },
      {
        name: '포트폴리오2',
        startDt: '2021-01-01',
        endDt: '2022-01-01',
        period: 3,
        introduction: '설명',
        memCnt: 3,
        contribution: 40,
        stack: 'NEST.JS,REACT',
        role: '디자인,프론트엔드',
        serviceStts: 'STOP',
        url: 'www.url4.com',
        media: 'http://218.232.137.30:20090/matching/portfolio/media.mp4',
      },
    ],
    similarityScore: 0.9585953444818568,
  },
  {
    pfSn: 29,
    userSn: 44,
    userNm: 'test',
    profile: {
      introduction: '설명',
      img: 'http://218.232.137.30:20090/matching/profile/img.jpg',
      career: [
        {
          careerNm: '회사',
          enteringDt: '2021-01-01',
          quitDt: '2022-12-31',
        },
        {
          careerNm: '회사2',
          enteringDt: '2023-01-01',
          quitDt: '2024-01-31',
        },
      ],
      stack: 'JAVA,JS',
      interests: 'JAVA,REACT',
      url: 'www.www.com,www.www.www',
    },
    portfolio: [
      {
        name: '포트폴리오1',
        startDt: '2021-01-01',
        endDt: '2022-01-01',
        period: 5,
        introduction: '설명',
        memCnt: 5,
        contribution: 20,
        stack: 'JAVA,STRING',
        role: '기획,백엔드',
        serviceStts: 'ACTIVE',
        url: 'www.url.com',
        media: 'http://218.232.137.30:20090/matching/portfolio/img.png',
      },
      {
        name: '포트폴리오2',
        startDt: '2021-01-01',
        endDt: '2022-01-01',
        period: 3,
        introduction: '설명',
        memCnt: 3,
        contribution: 40,
        stack: 'NEST.JS,REACT',
        role: '디자인,프론트엔드',
        serviceStts: 'STOP',
        url: 'www.url4.com',
        media: 'http://218.232.137.30:20090/matching/portfolio/media.mp4',
      },
    ],
    similarityScore: 0.9585953444818568,
  },
  {
    pfSn: 4,
    userSn: 7,
    userNm: '박순정',
    profile: {
      introduction:
        '안녕하세요! 소프트웨어 엔지니어링에 관심이 많은 개발자입니다. 다양한 프로젝트 경험을 통해 실력을 키우고 있으며, 새로운 기술에 대한 탐구를 즐깁니다.',
      img: 'http://example.com/profile/new_image.jpg',
      career: [
        {
          careerNm: '코인',
          enteringDt: '2023-01-01',
          quitDt: null,
        },
      ],
      stack: 'DJANGO,PYTHON',
      interests: 'DOCKER,KUBERNETES',
      url: 'http://example.com/portfolio',
    },
    portfolio: [
      {
        name: '블로그 플랫폼 개발',
        startDt: '2023-03-01',
        endDt: '2023-08-31',
        period: 6,
        introduction:
          '파이썬과 장고를 사용하여 블로그 플랫폼을 개발했습니다. 사용자는 글을 작성하고 공유할 수 있으며, 관리자는 사용자와 글을 관리할 수 있습니다.',
        memCnt: 2,
        contribution: 60,
        stack: 'DJANGO,POSTGRESQL,PYTHON',
        role: '백엔드 개발',
        serviceStts: 'ACTIVE',
        url: 'http://example.com/blog-platform',
        media: 'http://example.com/blog-platform/image.png',
      },
    ],
    similarityScore: 0.9583546807610158,
  },
  {
    pfSn: 14,
    userSn: 13,
    userNm: '박철수',
    profile: {
      introduction:
        '프런트엔드 개발에 열정을 품고 있습니다. 사용자 경험을 중시하며, 최신 웹 기술을 활용하여 매력적이고 반응형 웹 애플리케이션을 개발하는 것을 즐깁니다. 팀원들과의 협업을 통해 사용자가 진정으로 필요로 하는 솔루션을 만들기 위해 노력합니다.',
      img: 'http://218.232.137.30:20090/matching/profile/img.jpg',
      career: [
        {
          careerNm: '모빌리티솔루션즈',
          enteringDt: '2023-03-10',
          quitDt: '2024-01-15',
        },
        {
          careerNm: '웹웍스',
          enteringDt: '2021-05-15',
          quitDt: '2022-11-30',
        },
      ],
      stack: 'REACT,REACT NATIVE',
      interests: 'iOS Development,MOBILE,WEB',
      url: 'http://www.github.com/CHS1,https://www.CHSBLOG.com',
    },
    portfolio: [
      {
        name: '온라인 음악 스트리밍 웹 앱',
        startDt: '2023-01-01',
        endDt: '2023-08-31',
        period: 183,
        introduction:
          '사용자들에게 고품질의 음악 스트리밍 서비스를 제공하는 웹 애플리케이션입니다. 사용자가 웹 브라우저를 통해 언제 어디서나 음악을 감상할 수 있도록 합니다.',
        memCnt: 6,
        contribution: 30,
        stack: 'NODE.JS,REACT NATIVE',
        role: '기획,프론트엔드',
        serviceStts: 'ACTIVE',
        url: 'www.musicstreamingwebapp.com',
        media: 'http://218.232.137.30:20090/matching/portfolio/portfolio.png',
      },
    ],
    similarityScore: 0.9562279260939393,
  },
  {
    pfSn: 8,
    userSn: 1,
    userNm: '이영현',
    profile: {
      introduction:
        '프론트엔드와 UI/UX 디자인을 결합한 개발자로, 사용자 중심의 직관적인 디자인과 효율적인 개발을 추구합니다. 새로운 기술과 디자인 트렌드에 관심을 가지며, 사용자 경험을 개선하는 동시에 기술적으로도 뛰어난 결과물을 창출합니다.',
      img: 'http://218.232.137.30:20090/matching/profile/img.jpg',
      career: [
        {
          careerNm: 'KB',
          enteringDt: '2023-01-01',
          quitDt: '2024-04-01',
        },
        {
          careerNm: '안동',
          enteringDt: '2021-09-01',
          quitDt: '2022-09-01',
        },
      ],
      stack: 'TS,코틀린',
      interests: 'Javascript,MOBILE',
      url: 'http://github.com/email',
    },
    portfolio: [
      {
        name: 'E-commerce Website',
        startDt: '2023-05-01',
        endDt: '2023-11-01',
        period: 180,
        introduction: 'E-commerce Website은 온라인 쇼핑을 위한 웹사이트입니다.',
        memCnt: 5,
        contribution: 35,
        stack: 'HTML/CSS,JavaScript,REACT',
        role: '디자인,프론트엔드',
        serviceStts: '운영 중',
        url: 'http://ecommercewebsite.com',
        media: 'http://example.com/ecommerce_logo.png',
      },
      {
        name: 'Inventory Management System',
        startDt: '2024-01-01',
        endDt: '2024-05-01',
        period: 121,
        introduction:
          'Inventory Management System은 재고를 효율적으로 관리할 수 있는 시스템입니다.',
        memCnt: 4,
        contribution: 40,
        stack: 'NODE.JS,REACT-NATIVE',
        role: '기획,디자인',
        serviceStts: 'ACTIVE',
        url: 'http://github.com/ims',
        media: 'http://218.232.137.30:20090/matching/portfolio/img.png',
      },
    ],
    similarityScore: 0.9556573741461487,
  },
  {
    pfSn: 3,
    userSn: 8,
    userNm: '이현진',
    profile: {
      introduction:
        '안녕하세요! 저는 백엔드 개발자로서 다양한 프로젝트에 참여한 경험이 있습니다. 주로 자바와 스프링 부트를 활용하여 서버 개발을 진행하고 있으며, 새로운 기술에 대한 학습에 관심이 많습니다.',
      img: 'http://example.com/profile/new_image.jpg',
      career: [
        {
          careerNm: 'LG',
          enteringDt: '2020-06-15',
          quitDt: '2022-12-31',
        },
        {
          careerNm: '한라산',
          enteringDt: '2023-04-01',
          quitDt: null,
        },
      ],
      stack: 'JAVA,SPRING BOOT',
      interests: 'DOCKER,PYTHON',
      url: 'http://example.com/portfolio',
    },
    portfolio: [
      {
        name: '온라인 서점 시스템',
        startDt: '2021-01-01',
        endDt: '2021-12-31',
        period: 12,
        introduction:
          '자바와 스프링 부트를 사용하여 온라인 서점 시스템을 개발하였습니다. 회원 관리, 상품 관리, 주문 처리 등의 기능을 구현하였습니다.',
        memCnt: 5,
        contribution: 70,
        stack: 'JAVA,MYSQL,SPRING BOOT',
        role: '백엔드 개발',
        serviceStts: 'ACTIVE',
        url: 'http://example.com/online-bookstore',
        media: 'http://example.com/online-bookstore/image.png',
      },
      {
        name: '주문 관리 시스템',
        startDt: '2022-03-01',
        endDt: '2022-10-31',
        period: 8,
        introduction:
          '주문 처리를 위한 관리 시스템을 구축하였습니다. 주문 상태 추적, 결제 처리 등의 기능을 자바와 스프링 부트로 구현하였습니다.',
        memCnt: 3,
        contribution: 60,
        stack: 'JAVA,REDIS,SPRING BOOT',
        role: '백엔드 개발',
        serviceStts: 'STOP',
        url: 'http://example.com/order-management',
        media: 'http://example.com/order-management/image.png',
      },
    ],
    similarityScore: 0.9526494320245157,
  },
  {
    pfSn: 5,
    userSn: 5,
    userNm: '김안녕',
    profile: {
      introduction:
        '안드로이드 개발자 입니다! 다양한 어플을 만들어 출시하는게 꿈입니다. 사람들이 원하는 서비스를 제공하고자 합니다',
      img: 'http://218.232.137.30:20090/matching/profile/4.jpg',
      career: [
        {
          careerNm: '삼성',
          enteringDt: '2020-01-01',
          quitDt: null,
        },
      ],
      stack: 'C,JAVA',
      interests: 'JAVA,WEB',
      url: 'http://github.com/hi',
    },
    portfolio: [
      {
        name: 'Weather Forecast App',
        startDt: '2024-01-01',
        endDt: '2024-05-01',
        period: 121,
        introduction:
          'Weather Forecast App은 실시간으로 날씨 정보를 제공하는 앱입니다.',
        memCnt: 5,
        contribution: 20,
        stack: 'NODE.JS,REACT-NATIVE',
        role: 'FRONTEND,기획',
        serviceStts: 'ACTIVE',
        url: 'http://github.com',
        media: 'http://218.232.137.30:20090/matching/portfolio/img.png',
      },
    ],
    similarityScore: 0.95184929889727,
  },
  {
    pfSn: 2,
    userSn: 9,
    userNm: '백종원',
    profile: {
      introduction:
        '안녕하세요! 저는 소프트웨어 개발자로서 다양한 경험을 쌓고 있는 중입니다. 주로 자바와 스프링 프레임워크를 사용하여 백엔드를 개발하며, 현재는 리액트를 공부하고 있습니다.',
      img: 'http://example.com/profile/image.jpg',
      career: [
        {
          careerNm: '탐스',
          enteringDt: '2022-03-01',
          quitDt: null,
        },
      ],
      stack: 'JAVA,SPRING',
      interests: 'NODE.JS,REACT',
      url: 'http://example.com/project3',
    },
    portfolio: [
      {
        name: '사용자 관리 시스템',
        startDt: '2023-02-01',
        endDt: '2023-10-01',
        period: 8,
        introduction:
          '사용자 관리 시스템을 구축했습니다. 자바와 스프링을 사용하여 백엔드를 개발했으며, 리액트를 활용하여 프론트엔드를 구현했습니다.',
        memCnt: 5,
        contribution: 50,
        stack: 'JAVA,REACT,SPRING',
        role: '백엔드,프론트엔드',
        serviceStts: 'ACTIVE',
        url: 'http://example.com/project3',
        media: 'http://example.com/project3/image.png',
      },
    ],
    similarityScore: 0.9505337549210802,
  },
];
