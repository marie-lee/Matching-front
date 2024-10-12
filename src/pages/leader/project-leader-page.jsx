import { Container, Grid, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { RhfDatePicker, RhfFormProvider } from '@/components/hook-form';
import { LoadingButton } from '@mui/lab';
import { Progress, TaskIssue, PastTasks } from '@/pages/leader/components';

// ----------------------------------------------------------------------

const ProjectLeaderPage = () => {
  const projectEditForm = useForm({
    defaultValues: {},
  });

  const onSubmit = projectEditForm.handleSubmit(() => {});

  return (
    <Container maxWidth={'xl'} sx={{ py: 5 }}>
      <Stack spacing={4}>
        {/* 상단 영역 */}
        <RhfFormProvider form={projectEditForm} onSubmit={onSubmit}>
          <Stack
            useFlexGap
            sx={{
              backgroundColor: 'background.paper',
              boxShadow: (theme) => theme.customShadows.z1,
            }}
          >
            <Grid container alignItems={'center'} spacing={2} p={2}>
              <Grid item xs={12} sm={'auto'}>
                <Typography>프로젝트 종료일</Typography>
              </Grid>
              <Grid item xs={12} sm={'auto'}>
                <RhfDatePicker name={'startDt'} />
              </Grid>
              <Grid item xs />
              <Grid item xs={12} sm={'auto'}>
                <LoadingButton>수정</LoadingButton>
              </Grid>
              <Grid item xs={12} sm={'auto'}>
                <LoadingButton>종료</LoadingButton>
              </Grid>
            </Grid>
          </Stack>
        </RhfFormProvider>

        <Stack useFlexGap>
          <Grid container spacing={4}>
            <Grid item xs={12} lg={4}>
              <Progress />
            </Grid>
            <Grid item xs={12} lg={4}>
              <TaskIssue />
            </Grid>
            <Grid item xs={12} lg={4}>
              <PastTasks />
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </Container>
  );
};

export default ProjectLeaderPage;
