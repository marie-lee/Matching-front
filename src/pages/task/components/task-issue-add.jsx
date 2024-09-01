import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  Chip,
  Dialog,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';

import {
  PRIORITY_LIST,
  taskIssueAddFormDefaultValues,
  taskIssueAddFormSchema,
} from '@/pages/task/constants';
import { CustomDialog } from '@/components/custom-dialog';
import {
  RhfAutocomplete,
  RhfDropdown,
  RhfFormProvider,
  RhfTextField,
} from '@/components/hook-form';
import Required from '@/components/required';

import { postWbsIssue } from '@/services/wbs';

// ----------------------------------------------------------------------

const TaskIssueAdd = ({
  selectedPjtSn,
  selectedTaskSn,
  optionData,
  fetchTask,
  fetchDashboard,
}) => {
  const [open, setOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  const issueAddForm = useForm({
    defaultValues: taskIssueAddFormDefaultValues,
    resolver: yupResolver(taskIssueAddFormSchema),
  });

  const {
    formState: { dirtyFields },
  } = issueAddForm;

  // 이슈 등록
  const fetchAddIssue = async (payload) => {
    try {
      const res = await postWbsIssue(selectedPjtSn, selectedTaskSn, payload);
      console.log(res);
      if (res.status === 200) {
        fetchTask();
        fetchDashboard();
        setOpen(false);
        issueAddForm.reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = issueAddForm.handleSubmit(async (_payload) => {
    let payload = _.cloneDeep(_payload);

    let result = _.pickBy(payload, (value, key) => dirtyFields[key]);

    if (result?.MENTIONS?.length > 0) {
      result['MENTIONS'] = _.map(result['MENTIONS'], 'userSn');
    }

    await fetchAddIssue(result);
  });

  // ----------------------------------------------------------------------

  return (
    <>
      {/* 이슈 추가 버튼*/}
      <ButtonBase onClick={() => setOpen(true)}>
        <Icon icon={'ic:baseline-plus'} fontSize={24} />
      </ButtonBase>

      {/* 이슈 저장 취소 Dialog */}
      <CustomDialog
        open={cancelDialogOpen}
        onClose={() => {
          setCancelDialogOpen(false);
        }}
        confirmButtonText={'확인'}
        onConfirm={() => {
          setCancelDialogOpen(false);
          setOpen(false);
          issueAddForm.reset();
        }}
      >
        <Typography textAlign={'center'}>
          이슈 저장을 취소하시겠습니까?
        </Typography>
      </CustomDialog>

      {/* 이슈 추가 Dialog */}
      <Dialog open={open} maxWidth={'false'}>
        <RhfFormProvider form={issueAddForm}>
          <Stack width={'700px'} px={5.5} py={5} spacing={3} useFlexGap>
            <Stack direction={'row'} alignItems={'center'}>
              <Typography variant={'xl'}>Issue</Typography>
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
                  Title
                  <Required />
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <RhfTextField
                  name={'ISSUE_NM'}
                  variant={'outlined'}
                  size={'small'}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography textAlign={'right'}>Priority</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <RhfDropdown name={'PRIORITY'} options={PRIORITY_LIST} />
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography textAlign={'right'}>Mention</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <RhfAutocomplete
                  name={'MENTIONS'}
                  options={optionData?.memberList}
                  multiple
                  size={'small'}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => {
                      const { key, ...tagProps } = getTagProps({ index });
                      return (
                        <Chip
                          {...tagProps}
                          key={key}
                          size={'small'}
                          avatar={<Avatar alt={`${option.userNm} 프로필`} />}
                          label={`${option.userNm}${option.part === null ? '' : ` / ${option.part}`}`}
                        />
                      );
                    })
                  }
                  renderOption={(props, option) => {
                    const { key, ...optionProps } = props;
                    return (
                      <Box key={key} component={'li'} {...optionProps}>
                        <Chip
                          size={'small'}
                          label={`${option.userNm}${option.part === null ? '' : ` / ${option.part}`}`}
                          avatar={
                            <Avatar alt={`${option.userNm} 프로필 이미지`} />
                          }
                        />
                      </Box>
                    );
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={3} alignSelf={'flex-start'}>
                <Typography textAlign={'right'} pt={0.5}>
                  Contents
                  <Required />
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <RhfTextField
                  name={'CONTENT'}
                  variant={'outlined'}
                  size={'small'}
                  multiline
                  rows={5}
                />
              </Grid>
            </Grid>
          </Stack>
        </RhfFormProvider>
      </Dialog>
    </>
  );
};

export default TaskIssueAdd;
