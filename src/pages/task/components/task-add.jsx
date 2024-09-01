import { Box, Button, Dialog, Grid, Stack, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import Required from '@/components/required';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import dayjs from 'dayjs';

import {
  RhfDatePicker,
  RhfFormProvider,
  RhfDropdown,
  RhfSelect,
  RhfTextField,
} from '@/components/hook-form';
import {
  LEVEL_LIST,
  PRIORITY_LIST,
  taskAddFormDefaultValues,
  taskAddFormSchema,
} from '@/pages/task/constants';
import { CustomDialog } from '@/components/custom-dialog';
import { postWbsTask } from '@/services/wbs';

// ----------------------------------------------------------------------

const TaskAdd = ({ selectedPjtSn, optionData, fetchDashboard }) => {
  const [open, setOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  const taskAddForm = useForm({
    defaultValues: taskAddFormDefaultValues,
    resolver: yupResolver(taskAddFormSchema),
  });

  const {
    formState: { dirtyFields },
  } = taskAddForm;

  const taskAddFormValues = taskAddForm.watch();

  // 업무 등록
  const fetchAddTask = async (payload) => {
    try {
      const res = await postWbsTask(selectedPjtSn, payload);
      if (res.status === 200) {
        setOpen(false);
        taskAddForm.reset();
        fetchDashboard();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = taskAddForm.handleSubmit(async (_payload) => {
    let payload = _.cloneDeep(_payload);
    let result = _.pickBy(payload, (value, key) => dirtyFields[key]);

    delete result['workPackageSn'];

    if (result['startDt']) {
      result['startDt'] = dayjs(result['startDt']).format('YYYY-MM-DD');
    }

    if (result['endDt']) {
      result['endDt'] = dayjs(result['endDt']).format('YYYY-MM-DD');
    }

    await fetchAddTask(result);
  });

  const getWorkPkgOptions = optionData?.workPackage?.map((value) => {
    return { text: value.workPackageNm, value: value.workPackageSn };
  });

  const getDepthOptions = (optionData?.depth || [])
    .filter((depth) => depth.parentSn === taskAddFormValues.workPackageSn)
    .map((item) => ({
      text: item.depthNm,
      value: item.depthSn,
    }));

  // ----------------------------------------------------------------------

  return (
    <>
      <Button variant={'outlined'} size={'large'} onClick={() => setOpen(true)}>
        <Icon icon={'ic:outline-plus'} fontSize={'28'} />
      </Button>

      <CustomDialog
        open={cancelDialogOpen}
        onClose={() => {
          setCancelDialogOpen(false);
        }}
        confirmButtonText={'확인'}
        onConfirm={() => {
          setCancelDialogOpen(false);
          setOpen(false);
          taskAddForm.reset();
        }}
      >
        <Typography textAlign={'center'}>
          업무 저장을 취소하시겠습니까?
        </Typography>
      </CustomDialog>

      <Dialog open={open} maxWidth={'false'}>
        <RhfFormProvider form={taskAddForm}>
          <Stack width={'700px'} px={5.5} py={5} spacing={3} useFlexGap>
            <Stack direction={'row'} alignItems={'center'}>
              <Typography variant={'xl'}>Task</Typography>
              <Box flexGrow={1} />
              <Stack direction={'row'} spacing={1.5}>
                <Button onClick={onSubmit}>Save</Button>
                <Button
                  variant={'outlined'}
                  onClick={() => setCancelDialogOpen(true)}
                >
                  Close
                </Button>
              </Stack>
            </Stack>

            <Grid container spacing={3} alignItems={'center'}>
              <Grid item xs={12} sm={3}>
                <Typography textAlign={'right'}>
                  Work Package
                  <Required />
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <RhfSelect
                  name={'workPackageSn'}
                  options={getWorkPkgOptions}
                  size={'small'}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography textAlign={'right'}>
                  Depth
                  <Required />
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <RhfSelect
                  name={'depth'}
                  options={getDepthOptions}
                  size={'small'}
                  helperText={
                    taskAddFormValues.workPackageSn.length < 1 &&
                    'Work Package를 먼저 선택해주세요.'
                  }
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography textAlign={'right'}>
                  Title
                  <Required />
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <RhfTextField
                  name={'ticketName'}
                  variant={'outlined'}
                  size={'small'}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography textAlign={'right'}>Priority</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <RhfDropdown name={'priority'} options={PRIORITY_LIST} />
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography textAlign={'right'}>Level</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <RhfDropdown name={'level'} options={LEVEL_LIST} />
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography textAlign={'right'}>Work Schedule</Typography>
              </Grid>
              <Grid item xs={12} sm={4.5}>
                <RhfDatePicker name={'startDt'} />
              </Grid>
              <Grid item xs={12} sm={4.5}>
                <RhfDatePicker name={'endDt'} />
              </Grid>
            </Grid>
          </Stack>
        </RhfFormProvider>
      </Dialog>
    </>
  );
};

export default TaskAdd;
