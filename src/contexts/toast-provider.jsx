import { createContext, useContext, useState } from 'react';
import { Box, Button, Slide, Snackbar, Stack } from '@mui/material';
import { Alert, AlertTitle } from '@mui/lab';

// ----------------------------------------------------------------------

const ToastContext = createContext(null);
export const useToast = () => useContext(ToastContext);

const initialState = {
  open: false,
  msg: '',
  anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
  slideTransition: 'left',
  autoHideDuration: 2000,
  actionButtonText: '닫기',
  onAction: undefined,
  title: '',
  type: 'info',
  variant: 'standard',
};

const SlideTransition = (direction) => (props) => (
  <Slide {...props} direction={direction} />
);

// ----------------------------------------------------------------------

const ToastProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const {
    open,
    anchorOrigin,
    slideTransition,
    autoHideDuration,
    actionButtonText,
    variant,
    type,
    title,
    msg,
    onAction,
  } = state;

  const handleShow = (props) => setState({ ...state, ...props, open: true });

  const handleClose = () => setState({ ...state, open: false });

  const handleCustomAction = () => {
    if (typeof onAction === 'function') onAction();
    handleClose();
  };

  const value = { show: handleShow, close: handleClose };

  // ----------------------------------------------------------------------

  return (
    <ToastContext.Provider value={value}>
      <Snackbar
        open={open}
        anchorOrigin={anchorOrigin}
        TransitionComponent={SlideTransition(slideTransition)}
        autoHideDuration={autoHideDuration}
        onClose={handleClose}
      >
        <Alert
          variant={variant}
          severity={type}
          onClose={handleClose}
          sx={{ lineHeight: 1.8 }}
        >
          {title && <AlertTitle>{title}</AlertTitle>}
          <Box sx={{ whiteSpace: 'pre-line', mr: 2 }}>{msg}</Box>
          {typeof onAction === 'function' && (
            <Stack direction={'row'} justifyContent={'flex-end'} mt={1}>
              <Button size={'small'} onClick={handleCustomAction}>
                {actionButtonText}
              </Button>
            </Stack>
          )}
        </Alert>
      </Snackbar>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
