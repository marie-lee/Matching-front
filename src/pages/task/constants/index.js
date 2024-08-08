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
