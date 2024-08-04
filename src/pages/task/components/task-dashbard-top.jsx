import { Divider, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { Icon } from '@iconify/react';
import { useTheme } from '@mui/material/styles';

const TaskDashBoardTop = () => {
  const theme = useTheme();

  return (
    <Stack alignItems={'center'} py={3} spacing={2}>
      <Typography variant={'xl'} textAlign={'center'}>
        {dayjs().format('YYYY.MM.DD dddd')}
      </Typography>

      <Stack
        direction={'row'}
        borderRadius={3}
        px={2.5}
        py={1.5}
        spacing={2}
        backgroundColor={(theme) => theme.palette.background.default}
      >
        <Typography>Today</Typography>
        <Divider orientation={'vertical'} flexItem />
        <Stack direction={'row'} alignItems={'center'} spacing={0.5}>
          <Icon
            icon={'ic:baseline-check'}
            fontSize={24}
            color={theme.palette.grey[600]}
          />
          <Typography>완료된 Task</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} spacing={0.5}>
          <Icon
            icon={'gridicons:calendar'}
            fontSize={22}
            color={theme.palette.grey[600]}
          />
          <Typography>대기 중인 Task</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default TaskDashBoardTop;
