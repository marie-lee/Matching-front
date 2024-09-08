import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  issueAddFormDefaultValues,
  issueAddFormSchema,
  PRIORITY_LIST,
} from '@/pages/task/constants';
import { CustomDialog } from '@/components/custom-dialog';
import {
  RhfAutocomplete,
  RhfDropdown,
  RhfFormProvider,
  RhfSelect,
  RhfTextField,
} from '@/components/hook-form';
import Required from '@/components/required';
import { getWbsAllTaskList, postWbsIssue } from '@/services/wbs';
import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';

// ----------------------------------------------------------------------

const IssueAdd = ({ selectedPjtSn, optionData, fetchDashboard }) => {
  const [open, setOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  const [taskList, setTaskList] = useState([]);

  const issueAddForm = useForm({
    defaultValues: issueAddFormDefaultValues,
    resolver: yupResolver(issueAddFormSchema),
  });

  const {
    formState: { dirtyFields },
  } = issueAddForm;

  // 이슈 등록
  const fetchAddIssue = async (payload) => {
    const selectedTaskSn = issueAddForm.watch('ticketSn');

    try {
      const res = await postWbsIssue(selectedPjtSn, selectedTaskSn, payload);
      if (res.status === 200) {
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

    delete result['ticketSn'];

    await fetchAddIssue(result);
  });

  const fetchAllTaskList = async () => {
    try {
      const res = await getWbsAllTaskList(selectedPjtSn);

      const newWorkList = res?.data?.workList?.map((item) => {
        return {
          text: `${item?.taskNum} / ${item?.title}`,
          value: item.taskSn,
        };
      });
      setTaskList(newWorkList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (open) {
      fetchAllTaskList();
    }
  }, [open]);

  // ----------------------------------------------------------------------

  return (
    <>
      {/* 이슈 추가 버튼*/}
      <Button variant={'outlined'} size={'large'} onClick={() => setOpen(true)}>
        <Icon icon={'ic:outline-plus'} fontSize={'28'} />
      </Button>

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
                  Task
                  <Required />
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <RhfSelect
                  name={'ticketSn'}
                  options={taskList}
                  size={'small'}
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

export default IssueAdd;
