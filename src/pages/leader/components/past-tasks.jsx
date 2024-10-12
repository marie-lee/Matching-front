import { Stack, Typography } from '@mui/material';

const PastTasks = () => {
  return (
    <Stack
      spacing={2}
      sx={{
        pt: 3,
        pb: 4,
        px: 3,
        height: '100%',
        backgroundColor: 'background.paper',
        boxShadow: (theme) => theme.customShadows.z1,
      }}
    >
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Typography variant={'xl'} fontWeight={'fontWeightBold'}>
          Past Tasks
        </Typography>
        <Typography variant={'xl'} fontWeight={'fontWeightBold'}>
          12
        </Typography>
      </Stack>
    </Stack>
  );
};

export default PastTasks;
