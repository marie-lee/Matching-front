import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import _ from 'lodash';

import {
  RhfDatePicker,
  RhfDropdown,
  RhfFormProvider,
  RhfMentions,
} from '@/components/hook-form';
import {
  commentAddFormDefaultValues,
  LEVEL_LIST,
  PRIORITY_LIST,
  STATUS_LIST,
  taskEditFormDefaultValues,
} from '@/pages/task/constants';
import {
  getWbsTask,
  postWbsTaskComment,
  postWbsTaskEdit,
} from '@/services/wbs';
import TaskIssueAdd from '@/pages/task/components/task-issue-add';
import { Icon } from '@iconify/react';

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
  const dialogRef = useRef(null);
  const commentRef = useRef(null);

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

  const [isPending, setIsPending] = useState(false);

  const getCommentMentionList =
    optionData?.memberList?.map(({ userSn, userNm }) => ({
      id: userSn,
      display: userNm,
    })) || [];

  const commentAddForm = useForm({
    defaultValues: commentAddFormDefaultValues,
  });

  const fetchAddComment = async (payload) => {
    setIsPending(true);
    try {
      const res = await postWbsTaskComment(
        selectedPjtSn,
        selectedTaskSn,
        payload,
      );
      setIsPending(false);
      if (res?.status === 200) {
        fetchTask();
        commentAddForm.reset();
      }
    } catch (error) {
      setIsPending(false);
      console.log(error);
    }
  };

  const onSubmitComment = commentAddForm.handleSubmit(async (_payload) => {
    if (!isPending) {
      let payload = {};

      const regExp = /\@\[(.+?)\]\(\d+\)/g;

      payload['TEXT'] = _payload['TEXT'].replace(regExp, '@$1');

      payload['MENTIONS'] = [
        ..._payload['TEXT'].matchAll(/\@\[(.+?)\]\((\d+)\)/g),
      ].map((match) => Number(match[2]));

      await fetchAddComment(payload);
    }
  });

  const renderCommentText = (text, mentions) => {
    _.forEach(mentions, (value) => {
      const regExp = new RegExp(`@${value.USER_NM}`, 'g');
      text = text.replace(regExp, `<b>@${value.USER_NM}</b>`);
    });

    return <Typography dangerouslySetInnerHTML={{ __html: text }} />;
  };

  // 덧글 추가될 경우, 덧글 영역 스크롤 하단으로 위치시키기 위함
  useEffect(() => {
    if (commentRef.current) {
      commentRef.current.scrollTop = commentRef.current.scrollHeight;
    }
  }, [data]);

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
                <Typography>{data?.taskNum}</Typography>
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

        {/* ----------------------- 이슈 ---------------------- */}
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
        {/* ----------------------- // 이슈 ---------------------- */}

        {/* ----------------------- 댓글 ---------------------- */}
        <Stack spacing={1.5}>
          <Typography variant={'lg'}>Comment</Typography>

          <Divider flexItem />

          <Stack
            ref={commentRef}
            spacing={2}
            sx={{ height: '20rem', overflowY: 'auto' }}
          >
            {data?.COMMENTS?.map((comment) => (
              <Stack
                direction={'row'}
                key={`comment-${comment.COMMENT_SN}`}
                spacing={1.5}
                alignItems={'center'}
              >
                <Avatar />
                <Stack spacing={0.5}>
                  <Stack direction={'row'} spacing={1}>
                    <Typography variant={'sm'}>{comment.CREATER_NM}</Typography>
                    <Typography variant={'xs'} color={'text.secondary'}>
                      {dayjs(comment?.CREATED_DT).format('YYYY-MM-DD HH:mm')}
                    </Typography>
                  </Stack>
                  <Typography>
                    {/*{comment.TEXT}*/}

                    {renderCommentText(comment.TEXT, comment.mentions)}
                  </Typography>
                </Stack>
              </Stack>
            ))}
          </Stack>
          <RhfFormProvider form={commentAddForm}>
            <Stack direction={'row'} spacing={1.5} pt={1}>
              <Avatar />
              <Stack width={1}>
                <RhfMentions
                  name={'TEXT'}
                  placeholder={'덧글 추가'}
                  sx={{ pt: 1 }}
                  containerRef={dialogRef}
                  data={getCommentMentionList}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      onSubmitComment();
                    }
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" sx={{ mb: 1 }}>
                        <IconButton disableRipple onClick={onSubmitComment}>
                          <Icon
                            icon={'clarity:circle-arrow-solid'}
                            color={'#000'}
                            fontSize={24}
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
            </Stack>
          </RhfFormProvider>
        </Stack>
        {/* ----------------------- // 댓글 ---------------------- */}
      </Stack>
    </Dialog>
  );
};

export default TaskDetail;
