export const taskAddFormDefaultValues = {
  workPackage: '',
  depth: '',
  title: '',
  priority: '',
  level: '',
  present: [],
  startDt: null,
  endDt: null,
};

export const issueAddFormDefaultValues = {
  task: '',
  title: '',
  priority: '',
  present: [],
  mention: [],
  contents: '',
};

export const taskEditFormDefaultValues = {
  present: [],
  startDt: null,
  endDt: null,
  status: '',
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

export const LEVEL_LIST = [
  {
    label: 'High',
    value: 'High',
    style: {
      backgroundColor: '#FFAA37',
      color: '#000000',
    },
  },
  {
    label: 'Medium',
    value: 'Medium',
    style: {
      backgroundColor: '#FFD088',
      color: '#000000',
    },
  },
  {
    label: 'Low',
    value: 'Low',
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
    value: 'Wait',
    style: {
      backgroundColor: '#E9E9E9',
      color: '#000000',
    },
  },
  {
    label: 'In progress',
    value: 'In progress',
    style: {
      backgroundColor: '#E3EAFC',
      color: '#000000',
    },
  },
  {
    label: 'Complete',
    value: 'Complete',
    style: {
      backgroundColor: '#E4F4EA',
      color: '#000000',
    },
  },
  {
    label: 'Hold',
    value: 'Hold',
    style: {
      backgroundColor: '#FFE8E5',
      color: '#000000',
    },
  },
  {
    label: 'Reopen',
    value: 'Reopen',
    style: {
      backgroundColor: '#FDE6D3',
      color: '#000000',
    },
  },
  {
    label: 'Close',
    value: 'Close',
    style: {
      backgroundColor: '#9A9A9A',
      color: '#000000',
    },
  },
];
