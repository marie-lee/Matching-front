import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
} from '@mui/material';
import _ from 'lodash';
import { LoadingButton } from '@mui/lab';

const CustomDialog = ({
  title,
  open,
  setOpen,
  onClose,
  //
  cancelButtonText = '닫기',
  confirmButtonText = '저장',
  onConfirm,
  confirmDisabled = false,
  confirmLoading = false,
  //
  children,
  ...other
}) => {
  // Dialog 닫기
  const handleClose = () => {
    if (_.isFunction(onClose)) {
      onClose();
    } else {
      setOpen(false);
    }
  };

  return (
    <Dialog fullWidth open={open} setOpen={setOpen} {...other}>
      {/* Dialog 제목 및 헤더 메뉴 */}
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        spacing={2}
      >
        <DialogTitle>{title}</DialogTitle>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      {/* Dialog 콘텐츠(내용) */}
      <DialogContent>{children}</DialogContent>

      <Divider sx={{ borderStyle: 'dashed' }} />

      {/* Dialog Actions 버튼 */}
      <DialogActions>
        <Button variant={'outlined'} size={'medium'} onClick={handleClose}>
          {cancelButtonText}
        </Button>
        {onConfirm && (
          <LoadingButton
            variant={'contained'}
            size={'medium'}
            disabled={confirmDisabled}
            loading={confirmLoading}
            onClick={onConfirm}
          >
            {confirmButtonText}
          </LoadingButton>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
