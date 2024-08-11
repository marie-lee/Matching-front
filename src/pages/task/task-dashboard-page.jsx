import { Container, Grid, Stack, Typography } from '@mui/material';

import {
  TaskDashBoardTop,
  TodayItem,
  TaskItem,
  IssueItem,
  TaskAdd,
  IssueAdd,
  TaskDetail,
} from '@/pages/task/components';
import { useState } from 'react';

// ----------------------------------------------------------------------

const TaskDashboardPage = () => {
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);

  const handleOpenTask = (value) => {
    setTaskDialogOpen(true);
  };

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
            <TodayItem onClick={handleOpenTask} />
            <TodayItem onClick={handleOpenTask} />
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={1}>
            <Stack direction={'row'} alignItems={'center'} spacing={1}>
              <Typography variant={'lg'}>Task</Typography>
              <Typography>4</Typography>
            </Stack>
            <TaskAdd />
            <TaskDetail open={taskDialogOpen} setOpen={setTaskDialogOpen} />
            <TaskItem onClick={handleOpenTask} />
            <TaskItem onClick={handleOpenTask} />
            <TaskItem onClick={handleOpenTask} />
            <TaskItem onClick={handleOpenTask} />
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
