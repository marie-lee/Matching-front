export const pxToRem = (value) => {
  return `${value / 16}rem`;
};

// ----------------------------------------------------------------------

export const typography = {
  fontFamily: 'Pretendard, Roboto, sans-serif',
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,
  xs: {
    fontSize: pxToRem(12),
  },
  sm: {
    fontSize: pxToRem(14),
  },
  base: {
    fontSize: pxToRem(16),
  },
  lg: {
    fontSize: pxToRem(18),
  },
  xl: {
    fontSize: pxToRem(20),
  },
};
