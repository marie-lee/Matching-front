import { RhfTextField } from '@/components/hook-form';
import { Avatar, Stack } from '@mui/material';

export const ProfileForm = () => {
  return (
    <Stack spacing={2}>
      <Stack alignItems={'center'}>
        <Avatar alt={'프로필 이미지'} sx={{ width: 100, height: 100 }} />
      </Stack>
      <Stack>
        <RhfTextField
          name={'profile.USER_NM'}
          label={'프로필 이름'}
          variant={'outlined'}
          size={'medium'}
        />
      </Stack>
      <Stack>
        <RhfTextField
          name={'profile.PF_INTRO'}
          label={'한 줄 소개'}
          variant={'outlined'}
          helperText={'나를 표현할 수 있는 한 줄 소개를 적어주세요'}
          size={'medium'}
        />
      </Stack>
    </Stack>
  );
};
