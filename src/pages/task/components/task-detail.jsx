import {
  Box,
  Button,
  ButtonBase,
  Chip,
  Dialog,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import _ from 'lodash';

import {
  RhfDatePicker,
  RhfDropdown,
  RhfFormProvider,
} from '@/components/hook-form';
import {
  LEVEL_LIST,
  PRIORITY_LIST,
  STATUS_LIST,
  taskEditFormDefaultValues,
} from '@/pages/task/constants';
import { Icon } from '@iconify/react';
import { getWbsTask, postWbsTaskEdit } from '@/services/wbs';
import TaskIssueAdd from '@/pages/task/components/task-issue-add.jsx';

// ----------------------------------------------------------------------

const TaskDetail = ({
  open,
  setOpen,
  selectedPjtSn,
  selectedTaskSn,
  optionData,
  fetchDashboard,
  handleOpenIssue,
}) => {
  // 업무 상세 정보
  const [data, setData] = useState();

  // wbs 업무 상세 조회
  const fetchTask = async () => {
    try {
      const { data } = await getWbsTask(selectedPjtSn, selectedTaskSn);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  // wbs 업무 수정
  const taskEditForm = useForm({
    defaultValues: taskEditFormDefaultValues,
    values: {
      priority: data?.priority || '',
      level: data?.level || '',
      present: '',
      startDt: data?.startDt ? dayjs(data?.startDt) : null,
      endDt: data?.endDt ? dayjs(data?.endDt) : null,
      status: data?.status || '',
    },
  });

  const { formState } = taskEditForm;

  const fetchEditTask = async (payload) => {
    try {
      const res = await postWbsTaskEdit(selectedPjtSn, selectedTaskSn, payload);
      if (res.status === 200) {
        fetchTask();
        fetchDashboard();
      }
    } catch (error) {
      console.log(error);
    } finally {
      taskEditForm.reset();
    }
  };

  const onSubmit = taskEditForm.handleSubmit(async (_payload) => {
    let payload = _.cloneDeep(_payload);
    const dirtyFields = formState.dirtyFields;

    let result = _.pickBy(payload, (value, key) => dirtyFields[key]);

    if (result['startDt']) {
      result['startDt'] = dayjs(result['startDt']).format('YYYY-MM-DD');
    }

    if (result['endDt']) {
      result['endDt'] = dayjs(result['endDt']).format('YYYY-MM-DD');
    }

    await fetchEditTask(result);
  });

  useEffect(() => {
    if (!_.isEmpty(formState?.dirtyFields)) {
      onSubmit();
    }
  }, [formState]);

  useEffect(() => {
    if (selectedTaskSn && selectedPjtSn) {
      fetchTask();
    }
  }, [selectedTaskSn, selectedPjtSn]);

  // ----------------------------------------------------------------------

  return (
    <Dialog open={open} maxWidth={'false'}>
      <Stack width={'800px'} spacing={3} px={5.5} py={5}>
        <RhfFormProvider form={taskEditForm}>
          <Stack spacing={3} useFlexGap>
            <Stack direction={'row'} alignItems={'center'}>
              <Typography variant={'xl'}>Task</Typography>
              <Box flexGrow={1} />
              <Stack direction={'row'}>
                <Button variant={'outlined'} onClick={() => setOpen(false)}>
                  Close
                </Button>
              </Stack>
            </Stack>

            <Grid container spacing={3} alignItems={'center'}>
              <Grid item xs={12} sm={3}>
                <Typography textAlign={'right'}>No</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography>{data?.ticketNum}</Typography>
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography textAlign={'right'}>Work package</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography>{data?.workPackage}</Typography>
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography textAlign={'right'}>Depth</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography>{data?.depth}</Typography>
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography textAlign={'right'}>Title</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography>{data?.title}</Typography>
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography textAlign={'right'}>Present</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                {data?.present}
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography textAlign={'right'}>Level</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <RhfDropdown
                  name={'level'}
                  options={LEVEL_LIST}
                  canEmpty={false}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography textAlign={'right'}>Priority</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <RhfDropdown
                  name={'priority'}
                  options={PRIORITY_LIST}
                  canEmpty={false}
                />
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

              <Grid item xs={12} sm={3}>
                <Typography textAlign={'right'}>Status</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <RhfDropdown
                  name={'status'}
                  options={STATUS_LIST}
                  canEmpty={false}
                />
              </Grid>
            </Grid>
          </Stack>
        </RhfFormProvider>

        <Divider flexItem />

        <Stack spacing={1.5}>
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Typography variant={'lg'}>Issue</Typography>
            <TaskIssueAdd
              selectedPjtSn={selectedPjtSn}
              selectedTaskSn={selectedTaskSn}
              optionData={optionData}
              fetchTask={fetchTask}
              fetchDashboard={fetchDashboard}
            />
          </Stack>

          <Divider flexItem />

          <Stack useFlexGap>
            {data?.issues.map((issue) => (
              <Grid
                container
                key={`issue_${issue.issueSn}`}
                p={1}
                sx={{
                  ':hover': {
                    cursor: 'pointer',
                    backgroundColor: (theme) => theme.palette.action.hover,
                  },
                }}
                onClick={() => handleOpenIssue(issue)}
              >
                <Grid
                  item
                  xs
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {issue.issueTitle}
                </Grid>
                <Grid item xs={'auto'} mx={1}>
                  <Chip size={'small'} label={issue.creater} />
                </Grid>
                <Grid item xs={'auto'}>
                  <Typography color={'text.secondary'}>
                    {dayjs(issue?.createDate).format('YYYY-MM-DD HH:mm')}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default TaskDetail;
