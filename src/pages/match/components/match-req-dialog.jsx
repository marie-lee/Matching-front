import { useState } from 'react';
import { FormHelperText, Stack, Typography } from '@mui/material';

import { putStatusReq } from '@/services/status';
import { CustomDialog } from '@/components/custom-dialog';

// ----------------------------------------------------------------------

const MatchReqDialog = ({ open, setOpen, data, fetchStatus }) => {
  const [isPending, setIsPending] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const getReqString = () => {
    let str = '';
    switch (data?.reqStts) {
      case 'REQ':
        str = '요청';
        break;
      case 'FINAL_REQ':
        str = '최종 요청';
        break;
      case 'CANCEL':
        str = '요청 취소';
        break;
      case 'AGREE':
        str = '1차 수락';
        break;
      case 'CONFIRM':
        str = '확정';
        break;
      case 'REJECT':
        str = '거절';
        break;
      default:
        break;
    }
    return str;
  };

  const onSubmit = async () => {
    setIsPending(true);

    try {
      const res = await putStatusReq(data?.pjtSn, data?.reqSn, {
        reqStts: data?.reqStts,
      });
      setIsPending(false);
      setOpen(false);
      setErrorMessage('');
      fetchStatus();
    } catch (error) {
      console.log(error);
      setIsPending(false);
      setErrorMessage(error.data);
    }
  };

  // ----------------------------------------------------------------------

  return (
    <CustomDialog
      maxWidth={'sm'}
      open={open}
      onClose={() => {
        setOpen(false);
        setErrorMessage('');
      }}
      cancelButtonText={errorMessage ? '닫기' : '취소'}
      confirmLoading={isPending}
      onConfirm={!errorMessage && onSubmit}
      confirmButtonText={getReqString()}
    >
      <Stack spacing={2}>
        <Typography textAlign={'center'}>
          프로젝트 참여를{' '}
          <Typography component={'span'} fontWeight={'fontWeightSemiBold'}>
            {getReqString()}
          </Typography>{' '}
          하시겠습니까?
        </Typography>

        {errorMessage && (
          <FormHelperText error sx={{ textAlign: 'center' }}>
            {errorMessage}
          </FormHelperText>
        )}
      </Stack>
    </CustomDialog>
  );
};

export default MatchReqDialog;
