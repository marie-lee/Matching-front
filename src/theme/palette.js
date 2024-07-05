import { alpha } from '@mui/material/styles';

export const grey = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
};

export const common = {
  black: '#000000',
  white: '#FFFFFF',
};

// 100 300 500 700 900

export const primary = {
  lighter: '#F3F3F3',
  light: '#BCBCBC',
  main: '#282424',
  dark: '#171011',
  darker: '#0F0609',
  contrastText: '#FFFFFF',
};

export const secondary = {
  lighter: '#E0CEFC',
  light: '#986DF1',
  main: '#4713D3',
  dark: '#280997',
  darker: '#130365',
  contrastText: '#FFFFFF',
};

export const success = {
  lighter: '#F0FCD1',
  light: '#C2F174',
  main: '#7DD11D',
  dark: '#4A960E',
  darker: '#266405',
  contrastText: '#FFFFFF',
};
export const basicButton = {
  main: '#2196F3',
  contrastText: '#FFFFFF',
};

export const info = {
  lighter: '#D9FEFE',
  light: '#8EEDFD',
  main: '#43C6F9',
  dark: '#2176B3',
  darker: '#0C3C77',
  contrastText: '#FFFFFF',
};

export const warning = {
  lighter: '#FFF5D9',
  light: '#FFD98D',
  main: '#FFB042',
  dark: '#B76C21',
  darker: '#7A390C',
  contrastText: '#FFFFFF',
};

export const error = {
  lighter: '#FFE1D8',
  light: '#FF8F8B',
  main: '#FF3F5C',
  dark: '#B71F53',
  darker: '#7A0C45',
  contrastText: '#FFFFFF',
};

export const low = {
  lighter: '#F8ECFE',
  light: '#E5C6FD',
  main: '#CAA0FA',
  dark: '#7550B3',
  darker: '#371E77',
  contrastText: '#FFFFFF',
};

export const high = {
  lighter: '#DCC9F8',
  light: '#865ED6',
  main: '#270877',
  dark: '#160455',
  darker: '#0A0139',
  contrastText: '#FFFFFF',
};
export const login = {
  main: '#9C27B0',
};

export const palette = {
  grey,
  common,
  //
  primary,
  secondary,
  info,
  success,
  warning,
  login,
  error,
  basicButton,
  //
  LOW: low,
  MEDIUM: { ...secondary },
  HIGH: high,
  //
  divider: alpha(grey[500], 0.5),
  text: {
    primary: grey[800],
    secondary: grey[600],
    disabled: grey[500],
  },
  background: {
    default: '#FFFFFF',
    neutral: grey[200],
  },
};
