import * as yup from 'yup';

// wbs 업무 추가
export const taskAddFormDefaultValues = {
  workPackageSn: '',
  depth: '',
  ticketName: '',
  priority: '',
  level: '',
  present: [],
  startDt: null,
  endDt: null,
};

export const taskAddFormSchema = yup.object().shape({
  workPackageSn: yup.string().required('Work Package를 선택해주세요'),
  depth: yup.string().required('Depth를 선택해주세요'),
  ticketName: yup.string().required('Title을 입력해주세요'),
});

// wbs 업무 수정
export const taskEditFormDefaultValues = {
  priority: '',
  level: '',
  present: [],
  startDt: null,
  endDt: null,
  status: '',
};

export const issueAddFormDefaultValues = {
  task: '',
  title: '',
  priority: '',
  present: [],
  mention: [],
  contents: '',
};

export const issueEditFormDefaultValues = {
  present: [],
  mention: [],
  dueDate: null,
  status: '',
};

export const commentAddFormDefaultValues = {
  content: '',
};

export const ISSUE_LIST = [
  {
    id: 1,
    title: '이슈명 이슈명 이슈명 이슈명 이슈명',
    present: '임동현',
    date: '2024.07.22',
  },
  { id: 2, title: '이슈명 이슈명 ', present: '임동현', date: '2024.07.22' },
  {
    id: 3,
    title:
      '이슈명을 적어보아요 이슈명을 적어보아요 이슈명을 적어보아요 이슈명을 적어보아요 이슈명을 적어보아요',
    present: '임동현',
    date: '2024.07.22',
  },
];

export const COMMENT_LIST = [
  {
    id: 1,
    content: '덧글 내용 어쩌구 저쩌구',
    writer: '홍길동',
    date: '2024.06.15',
  },
  {
    id: 2,
    content:
      '덧글 내용 어쩌구 저쩌구 덧글 내용 어쩌구 저쩌구 덧글 내용 어쩌구 저쩌구 덧글 내용 어쩌구 저쩌구',
    writer: '홍길동',
    date: '2024.07.22',
  },
];

export const LEVEL_LIST = [
  {
    label: 'High',
    value: 'HIGH',
    style: {
      backgroundColor: '#FFAA37',
      color: '#000000',
    },
  },
  {
    label: 'Medium',
    value: 'MEDIUM',
    style: {
      backgroundColor: '#FFD088',
      color: '#000000',
    },
  },
  {
    label: 'Low',
    value: 'LOW',
    style: {
      backgroundColor: '#FFE9C6',
      color: '#000000',
    },
  },
];

export const PRIORITY_LIST = [
  {
    label: 'L0',
    value: 'L0',
    style: {
      backgroundColor: '#000000',
      color: '#ffffff',
    },
  },
  {
    label: 'L1',
    value: 'L1',
    style: {
      backgroundColor: '#FFCCD9',
      color: '#000000',
    },
  },
  {
    label: 'L2',
    value: 'L2',
    style: {
      backgroundColor: '#CDE7FF',
      color: '#000000',
    },
  },
  {
    label: 'L3',
    value: 'L3',
    style: {
      backgroundColor: '#B4F1A5',
      color: '#000000',
    },
  },
];

export const STATUS_LIST = [
  {
    label: 'Wait',
    value: 'WAIT',
    style: {
      backgroundColor: '#E9E9E9',
      color: '#000000',
    },
  },
  {
    label: 'In progress',
    value: 'IN PROGERSS',
    style: {
      backgroundColor: '#E3EAFC',
      color: '#000000',
    },
  },
  {
    label: 'Complete',
    value: 'COMPLETE',
    style: {
      backgroundColor: '#E4F4EA',
      color: '#000000',
    },
  },
  {
    label: 'Hold',
    value: 'HOLD',
    style: {
      backgroundColor: '#FFE8E5',
      color: '#000000',
    },
  },
  {
    label: 'Reopen',
    value: 'REOPEN',
    style: {
      backgroundColor: '#FDE6D3',
      color: '#000000',
    },
  },
  {
    label: 'Close',
    value: 'CLOSE',
    style: {
      backgroundColor: '#9A9A9A',
      color: '#000000',
    },
  },
];
