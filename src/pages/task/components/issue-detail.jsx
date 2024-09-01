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
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import _ from 'lodash';

import {
  commentAddFormDefaultValues,
  issueEditFormDefaultValues,
  PRIORITY_LIST,
  STATUS_LIST,
} from '@/pages/task/constants';
import {
  RhfAutocomplete,
  RhfDropdown,
  RhfFormProvider,
  RhfTextField,
} from '@/components/hook-form';

import { getWbsIssue, postWbsIssueComment } from '@/services/wbs';
import { convertToUpperSnakeCase } from '@/utils';
import dayjs from 'dayjs';

// ----------------------------------------------------------------------

const IssueDetail = ({
  open,
  setOpen,
  selectedPjtSn,
  selectedIssueSn,
  optionData,
}) => {
  const [data, setData] = useState();

  const getMentionsValue = data?.MENTIONS.map((member) =>
    _.mapKeys(member, (value, key) => _.camelCase(key)),
  );

  const issueEditForm = useForm({
    defaultValues: issueEditFormDefaultValues,
    values: {
      PRIORITY: data?.PRIORITY || '',
      STATUS: data?.STATUS || '',
      MENTIONS: data?.MENTIONS ? getMentionsValue : [],
    },
  });

  const commentAddForm = useForm({
    defaultValues: commentAddFormDefaultValues,
  });

  const fetchIssue = async () => {
    try {
      const res = await getWbsIssue(selectedPjtSn, selectedIssueSn);
      setData(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedIssueSn) {
      fetchIssue();
    }
  }, [selectedIssueSn]);

  // ----------------------------------------------------------------------

  const fetchAddComment = async (payload) => {
    try {
      const res = await postWbsIssueComment(
        selectedPjtSn,
        selectedIssueSn,
        payload,
      );
      console.log(res);
      if (res?.status === 200) {
        fetchIssue();
        commentAddForm.reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitComment = commentAddForm.handleSubmit(async (_payload) => {
    console.log(_payload);

    await fetchAddComment(_payload);
  });

  // ----------------------------------------------------------------------

  return (
    <Dialog open={open} maxWidth={'false'}>
      <Stack width={'800px'} spacing={3} px={5.5} py={5}>
        <RhfFormProvider form={issueEditForm}>
          <Stack spacing={3} useFlexGap>
            <Stack direction={'row'} alignItems={'center'}>
              <Typography variant={'xl'}>Issue</Typography>
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
                <Typography></Typography>
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography textAlign={'right'}>Task</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography>{data?.TICKET}</Typography>
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography textAlign={'right'}>Title</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography>{data?.ISSUE_NM}</Typography>
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography textAlign={'right'}>Present</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography>{data?.PRESENT_NM}</Typography>
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography textAlign={'right'}>Priority</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <RhfDropdown
                  name={'PRIORITY'}
                  options={PRIORITY_LIST}
                  canEmpty={false}
                />
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

              <Grid item xs={12} sm={3}>
                <Typography textAlign={'right'}>Status</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <RhfDropdown
                  name={'STATUS'}
                  options={STATUS_LIST}
                  canEmpty={false}
                />
              </Grid>

              <Grid item xs={12} sm={3} alignSelf={'flex-start'}>
                <Typography textAlign={'right'} pt={0.5}>
                  Contents
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                {data?.CONTENT}
              </Grid>
            </Grid>
          </Stack>
        </RhfFormProvider>

        <Divider flexItem />

        <Stack spacing={1.5}>
          <Typography variant={'lg'}>Comment</Typography>

          <Divider flexItem />

          <Stack spacing={2}>
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
                  <Typography>{comment.TEXT}</Typography>
                </Stack>
              </Stack>
            ))}

            <RhfFormProvider
              form={commentAddForm}
              onSubmit={onSubmitComment}
              disabledEnterKeyDown={false}
            >
              <Stack direction={'row'} spacing={1.5} pt={1}>
                <Avatar />
                <RhfTextField
                  name={'TEXT'}
                  placeholder={'덧글 추가'}
                  sx={{ pt: 1 }}
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
            </RhfFormProvider>
          </Stack>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default IssueDetail;
