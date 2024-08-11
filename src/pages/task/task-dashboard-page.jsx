import { Container, Grid, Stack, Typography } from '@mui/material';

import {
  TaskDashBoardTop,
  TodayItem,
  TaskItem,
  IssueItem,
  TaskAdd,
  IssueAdd,
} from '@/pages/task/components';

// ----------------------------------------------------------------------

const TaskDashboardPage = () => {
  // ----------------------------------------------------------------------

  return (
    <Container maxWidth={'xl'}>
      {/* 상단 영역 */}
      <TaskDashBoardTop />

      {/* 업무/이슈 영역*/}
      <Grid container spacing={1.5}>
        <Grid item xs={12} md={4}>
          <Stack spacing={1}>
            <Stack direction={'row'} alignItems={'center'} spacing={1}>
              <Typography variant={'lg'}>Today</Typography>
              <Typography>2</Typography>
            </Stack>
            <TodayItem />
            <TodayItem />
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={1}>
            <Stack direction={'row'} alignItems={'center'} spacing={1}>
              <Typography variant={'lg'}>Task</Typography>
              <Typography>4</Typography>
            </Stack>
            <TaskAdd />
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={1}>
            <Stack direction={'row'} alignItems={'center'} spacing={1}>
              <Typography variant={'lg'}>Issue</Typography>
              <Typography>1</Typography>
            </Stack>
            <IssueAdd />
            <IssueItem />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TaskDashboardPage;
