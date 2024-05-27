import { Stack, Typography } from '@mui/material';

const FormGroup = ({ title, children }) => {
  return (
    <Stack p={2} spacing={2} bgcolor={'background.default'}>
      <Typography
        component={'p'}
        variant={'xl'}
        fontWeight={'fontWeightMedium'}
      >
        {title}
      </Typography>
      {children}
    </Stack>
  );
};

const ProfileEditForm = () => {
  return (
    <Stack spacing={4}>
      <FormGroup title={'프로필'} />
      <FormGroup title={'경력'} />
      <FormGroup title={'주요 스킬'} />
      <FormGroup title={'관심분야'} />
      <FormGroup title={'링크'} />
    </Stack>
  );
};

export default ProfileEditForm;
