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
        disableElevation: true,
        type: 'button',
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        disableElevation: true,
        type: 'button',
      },
    },
    MuiLoadingButton: {
      defaultProps: {
        variant: 'contained',
        disableElevation: true,
        type: 'button',
      },
    },
  };
};
