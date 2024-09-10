import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack, Typography } from '@mui/material';
import { useState } from 'react';

import { reqFormDefaultValues, reqFormSchema } from '@/pages/project/constants';
import { CustomDialog } from '@/components/custom-dialog';
import { RhfFormProvider, RhfSelect } from '@/components/hook-form';
import { postStatusFirstReq } from '@/services/status';
import { useToast } from '@/contexts/toast-provider';

// ----------------------------------------------------------------------

const ProjectReqDialog = ({ open, setOpen, selectedUserSn, selectedPjt }) => {
  const toast = useToast();
  const reqForm = useForm({
    defaultValues: reqFormDefaultValues,
    resolver: yupResolver(reqFormSchema),
    values: {
      ...reqFormDefaultValues,
      userSn: selectedUserSn,
    },
  });

  const [isPending, setIsPending] = useState(false);

  const getRoleOptions = selectedPjt?.role?.map((value) => {
    return { text: value.part, value: value.pjtRoleSn };
  });

  const closeDialog = () => {
    setOpen(false);
    reqForm.reset();
  };

  const onSubmit = reqForm.handleSubmit(async (payload) => {
    setIsPending(true);
    try {
      const res = await postStatusFirstReq(selectedPjt?.pjtSn, payload);
      setIsPending(false);
      if (res?.data?.message) {
        closeDialog();
        toast.show({
          msg: '참여 요청을 보냈습니다', 
          type: 'success',
        });
      }
    } catch (error) {
      setIsPending(false);
      const errorMessage = error?.response?.data?.message || '요청에 실패했습니다. 다시 시도해주세요.';
      console.error('참여 요청 실패:', errerrorMessageor); 
      toast.show({
        msg: errorMessage, 
        type: 'error',
      });
    }
  });

  // ----------------------------------------------------------------------

  return (
    <CustomDialog
      maxWidth={'sm'}
      title={'프로젝트 참여 요청'}
      open={open}
      onClose={closeDialog}
      confirmLoading={isPending}
      onConfirm={onSubmit}
      confirmButtonText={'요청'}
    >
      <RhfFormProvider form={reqForm}>
        <Stack spacing={3} alignItems={'center'}>
          <Typography textAlign={'center'}>
            프로젝트 참여 요청을 제안할 분야를 선택 후, 요청 버튼을 눌러주세요.
          </Typography>
          <RhfSelect
            label={'요청 제안할 분야'}
            name={'pjtRoleSn'}
            options={getRoleOptions}
            size={'small'}
            sx={{ width: 400 }}
          />
        </Stack>
      </RhfFormProvider>
    </CustomDialog>
  );
};

export default ProjectReqDialog;
