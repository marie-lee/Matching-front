import { useState } from 'react';
import { useForm } from 'react-hook-form';
import _ from 'lodash';
import { Box, Button, Dialog, Grid, Stack, Typography } from '@mui/material';
import { Icon } from '@iconify/react';

import {
  LEVEL_LIST,
  PRIORITY_LIST,
  taskAddFormDefaultValues,
  taskAddFormSchema,
} from '@/pages/task/constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { postWbsIssueTask } from '@/services/wbs';
import {
  RhfDatePicker,
  RhfDropdown,
  RhfFormProvider,
  RhfSelect,
  RhfTextField,
} from '@/components/hook-form';
import Required from '@/components/required';

const IssueTaskAdd = ({ selectedPjtSn, selectedIssueSn, optionData }) => {
  const [open, setOpen] = useState(false);

  const taskAddForm = useForm({
    defaultValues: taskAddFormDefaultValues,
    resolver: yupResolver(taskAddFormSchema),
  });

  const taskAddFormValues = taskAddForm.watch();
  const { formState } = taskAddForm;

  // 이슈 파생 업무 등록
  const fetchAddTask = async (payload) => {
    try {
      const { data } = await postWbsIssueTask(
        selectedPjtSn,
        selectedIssueSn,
        payload,
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = taskAddForm.handleSubmit(async (_payload) => {
    let payload = _.cloneDeep(_payload);
    const dirtyFields = formState.dirtyFields;

    let result = _.pickBy(payload, (value, key) => dirtyFields[key]);

    delete result['workPackageSn'];

    console.log(payload);
    console.log(dirtyFields);
    console.log('result: ', result);
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

  return (
    <>
      <Button variant={'outlined'} size={'large'} onClick={() => setOpen(true)}>
        <Icon icon={'ic:outline-plus'} fontSize={'24'} />
      </Button>

      <Dialog open={open} maxWidth={'false'}>
        <RhfFormProvider form={taskAddForm}>
          <Stack width={'700px'} px={5.5} py={5} spacing={3} useFlexGap>
            <Stack direction={'row'} alignItems={'center'}>
              <Typography variant={'xl'}>Task</Typography>
              <Box flexGrow={1} />
              <Stack direction={'row'} spacing={1.5}>
                <Button onClick={onSubmit}>Save</Button>
                <Button variant={'outlined'} onClick={() => setOpen(false)}>
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

export default IssueTaskAdd;
