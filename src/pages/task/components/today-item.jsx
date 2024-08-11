import { Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';

// ----------------------------------------------------------------------

const TodayItem = ({ onClick }) => {
  const theme = useTheme();

  const renderStatus = () => {
    return (
      <Stack bgcolor={'#E3EAFC'} borderRadius={1} px={1} py={0.5}>
        <Typography variant={'sm'}>In progress </Typography>
      </Stack>
    );
  };

  const renderPriority = () => {
    return (
      <Stack bgcolor={'#B4F1A5'} borderRadius={1} px={1} py={0.5}>
        <Typography variant={'sm'}>L3</Typography>
      </Stack>
    );
  };

  // ----------------------------------------------------------------------

  return (
    <Stack
      spacing={1}
      sx={{
        p: 2,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: 'background.default',
        borderRadius: 1,
        ':hover': {
          cursor: 'pointer',
          borderColor: theme.palette.primary.main,
        },
      }}
      onClick={onClick}
    >
      <Stack spacing={0.5}>
        <Typography variant={'sm'} color={'text.secondary'}>
          Front-3011
        </Typography>
        <Typography>구글 로그인 API 개발</Typography>
      </Stack>

      <Stack direction={'row'} spacing={1}>
        {renderStatus()}
        {renderPriority()}
      </Stack>

      <Stack
        direction={'row'}
        spacing={1}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Typography variant={'sm'}>홍길동</Typography>
        <Typography variant={'sm'}>{dayjs().format('YYYY.MM.DD')}</Typography>
      </Stack>
    </Stack>
  );
};

export default TodayItem;
