import React, { useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  useTheme,
  Link,
  Modal,
  Button,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RhfFormProvider, RhfTextField } from '@/components/hook-form';
import {
  findIdFormDefaultValues,
  findIdFormSchema,
} from '@/pages/auth/constants';
import { PATHS } from '@/routes/paths';
import { postMemberFindId } from '@/services/member';

const FindIdPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [isPending, setIsPending] = useState(false);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');

  const findIdForm = useForm({
    defaultValues: findIdFormDefaultValues,
    resolver: yupResolver(findIdFormSchema),
  });

  const { handleSubmit } = findIdForm;

  const onSubmit = handleSubmit(async (data) => {
    setIsPending(true);
    try {
      const response = await postMemberFindId({
        USER_NM: data.name,
        PHONE: data.phone.replace(/-/g, ''),
      });
      setEmail(response.data.USER_ID);
      setOpen(true);
    } catch (error) {
      findIdForm.setError('name', {
        message: error?.response?.data || 'Error fetching ID',
      });
    } finally {
      setIsPending(false);
    }
  });

  const handleClose = () => {
    setOpen(false);
    navigate(PATHS.auth.signIn);
  };

  return (
    <>
      <RhfFormProvider form={findIdForm} onSubmit={onSubmit}>
        <Stack
          sx={{
            m: 'auto',
            minHeight: '100vh',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <Box
            sx={{
              border: '1px solid #D1D1D1',
              paddingY: 8,
              paddingX: 5,
              borderRadius: 2,
              justifyContent: 'center',
              width: '100%',
              maxWidth: 600,
              mt: '15%',
              mb: 'auto',
            }}
          >
            <Stack spacing={2} sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                textAlign="center"
                color={theme.palette.text.primary}
              >
                아이디 찾기
              </Typography>
              <Typography
                variant="body2"
                textAlign="center"
                color={theme.palette.text.secondary}
              >
                계정에서 사용하는 이름과 전화번호를 입력해 주세요.
              </Typography>
            </Stack>
            <Stack spacing={3}>
              <RhfTextField
                name="name"
                label="이름을 입력해 주세요"
                variant="outlined"
              />
              <RhfTextField
                name="phone"
                label="전화번호를 입력해 주세요 (-없이)"
                variant="outlined"
              />
            </Stack>
            <LoadingButton
              loading={isPending}
              fullWidth
              type="submit"
              variant="contained"
              sx={{ mt: 3, height: '5vh' }}
            >
              아이디 찾기
            </LoadingButton>
            <Link
              href={PATHS.auth.signIn}
              variant="body2"
              sx={{ display: 'block', textAlign: 'center', mt: 2 }}
              color={theme.palette.text.secondary}
            >
              로그인하러 가기
            </Link>
          </Box>
        </Stack>
      </RhfFormProvider>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box
          sx={{
            backgroundColor: theme.palette.background.paper,
            padding: 4,
            borderRadius: 1,
            boxShadow: 24,
            width: '60%',
            maxWidth: '520px',
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" gutterBottom>
            아이디는 {email} 입니다.
          </Typography>
          <Button
            variant="contained"
            fullWidth
            onClick={handleClose}
            sx={{
              mt: 2,
              backgroundColor: theme.palette.primary.main,
              '&:hover': { backgroundColor: theme.palette.primary.dark },
            }}
          >
            확인
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default FindIdPage;
