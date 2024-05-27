export const defaultProps = () => {
  return {
    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg', // 1200px
      },
    },
    MuiButtonBase: {
      defaultProps: {
        variant: 'contained',
        type: 'button',
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        type: 'button',
      },
    },
    MuiLoadingButton: {
      defaultProps: {
        variant: 'contained',
        type: 'button',
      },
    },
  };
};
