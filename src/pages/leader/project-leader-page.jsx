import { Container, Grid, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import { RhfDatePicker, RhfFormProvider } from '@/components/hook-form';
import { Progress, TaskIssue, PastTasks } from '@/pages/leader/components';
import {
  projectEditFormDefaultValues,
  projectEditFormSchema,
} from '@/pages/leader/constants';
import {
  getProject,
  putProjectDate,
  putProjectFinish,
} from '@/services/project';
import { CustomDialog } from '@/components/custom-dialog';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/routes/paths.js';

// ----------------------------------------------------------------------

const ProjectLeaderPage = () => {
  const pjtSn = useSelector((state) => state.pjtSn.pjtSn);
  const navigate = useNavigate();

  const [project, setProject] = useState({});

  const fetchProject = async () => {
    try {
      const res = await getProject(pjtSn);
      setProject(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // ----------------------------------------------------------------------

  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const projectEditForm = useForm({
    defaultValues: projectEditFormDefaultValues,
    resolver: yupResolver(projectEditFormSchema),
    values: {
      endDate: dayjs(project?.endDt),
    },
  });

  const {
    formState: { dirtyFields },
  } = projectEditForm;

  const fetchEditProjectDate = async (payload) => {
    try {
      const res = await putProjectDate(pjtSn, payload);
      if (res.status === 200) {
        setEditDialogOpen(true);
        fetchProject();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleProjectEdit = projectEditForm.handleSubmit((_payload) => {
    if (_.isEmpty(dirtyFields)) {
      return;
    }

    const payload = {
      endDate: dayjs(_payload.endDate).format('YYYY-MM-DD'),
    };

    fetchEditProjectDate(payload);
  });

  useEffect(() => {
    if (pjtSn) {
      fetchProject();
    }
  }, [pjtSn]);

  // ----------------------------------------------------------------------

  const [finishDialogOpen, setFinishDialogOpen] = useState(false);

  const fetchEditProjectFinish = async () => {
    try {
      const res = await putProjectFinish(pjtSn);
      if (res.status === 200) {
        setFinishDialogOpen(false);
        navigate(PATHS.project.root, { replace: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ----------------------------------------------------------------------

  return (
    <Container maxWidth={'xl'} sx={{ py: 5 }}>
      <Stack spacing={4}>
        {/* 상단 영역 */}
        <RhfFormProvider form={projectEditForm}>
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
                <RhfDatePicker name={'endDate'} />
              </Grid>
              <Grid item xs />
              <Grid item xs={12} sm={'auto'}>
                <LoadingButton onClick={handleProjectEdit}>수정</LoadingButton>
              </Grid>
              <Grid item xs={12} sm={'auto'}>
                <LoadingButton onClick={() => setFinishDialogOpen(true)}>
                  종료
                </LoadingButton>
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

      {/* 프로젝트 종료일 수정 완료 안내 Dialog */}
      <CustomDialog
        open={editDialogOpen}
        setOpen={setEditDialogOpen}
        cancelButtonText={'확인'}
      >
        <Typography textAlign={'center'}>
          프로젝트 종료일이 성공적으로 수정되었습니다.
        </Typography>
      </CustomDialog>

      {/* 프로젝트 종료일 수정 완료 안내 Dialog */}
      <CustomDialog
        open={finishDialogOpen}
        setOpen={setFinishDialogOpen}
        onConfirm={() => fetchEditProjectFinish()}
        confirmButtonText={'확인'}
      >
        <Typography textAlign={'center'}>
          {dayjs(projectEditForm.watch('endDate')).format('YYYY년 MM월 DD일')}로
          프로젝트가 종료됩니다.
          <br />
          종료하시겠습니까?
        </Typography>
      </CustomDialog>
    </Container>
  );
};

export default ProjectLeaderPage;
