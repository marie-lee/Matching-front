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
import {
  COMMENT_LIST,
  commentAddFormDefaultValues,
  issueEditFormDefaultValues,
  taskEditFormDefaultValues,
} from '@/pages/task/constants';
import {
  RhfAutocomplete,
  RhfDatePicker,
  RhfFormProvider,
  RhfTextField,
} from '@/components/hook-form';
import { MenuPriority, MenuStatus } from '@/pages/task/components';
import { Icon } from '@iconify/react';

// ----------------------------------------------------------------------

const IssueDetail = ({ open, setOpen }) => {
  const issueEditForm = useForm({
    defaultValues: issueEditFormDefaultValues,
  });

  const commentAddForm = useForm({
    defaultValues: commentAddFormDefaultValues,
  });

  // ----------------------------------------------------------------------

  return (
    <Dialog open={open} maxWidth={'false'}>
      <Stack width={'700px'} spacing={3} px={5.5} py={5}>
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
                <Typography>Front-3011</Typography>
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography textAlign={'right'}>Task</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography>프론트 / 메인페이지 / 구글로그인</Typography>
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography textAlign={'right'}>Title</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography>구글 로그인</Typography>
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography textAlign={'right'}>Priority</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <MenuPriority editable={false} />
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography textAlign={'right'}>Present</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <RhfAutocomplete
                  name={'present'}
                  options={['임동현', '홍길동']}
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
                          avatar={<Avatar alt={`${option} 프로필 이미지`} />}
                          label={option}
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
                          label={option}
                          avatar={<Avatar alt={`${option} 프로필`} />}
                        />
                      </Box>
                    );
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography textAlign={'right'}>Mention</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <RhfAutocomplete
                  name={'mention'}
                  options={[
                    { name: '이영현', position: 'back' },
                    { name: '이세진', position: 'front' },
                  ]}
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
                          avatar={<Avatar alt={`${option.name} 프로필`} />}
                          label={`${option.name} / ${option.position}`}
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
                          label={`${option.name} / ${option.position}`}
                          avatar={
                            <Avatar alt={`${option.name} 프로필 이미지`} />
                          }
                        />
                      </Box>
                    );
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography textAlign={'right'}>Due Date</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <RhfDatePicker name={'dueDate'} />
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography textAlign={'right'}>Status</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <MenuStatus />
              </Grid>

              <Grid item xs={12} sm={3} alignSelf={'flex-start'}>
                <Typography textAlign={'right'} pt={0.5}>
                  Contents
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                이슈 추가할 때 썼던 상세 내용 자세히 나오는거라요 이슈 추가할 때
                썼던 상세 내용 자세 히 나오는거라요 이슈 추가할 때 썼던 상세
                내용 자세히 나오는 거
              </Grid>
            </Grid>
          </Stack>
        </RhfFormProvider>

        <Divider flexItem />

        <Stack spacing={1.5}>
          <Typography variant={'lg'}>Comment</Typography>

          <Divider flexItem />

          <Stack spacing={2}>
            {COMMENT_LIST.map((comment) => (
              <Stack
                direction={'row'}
                key={`comment-${comment.id}`}
                spacing={1.5}
                alignItems={'center'}
              >
                <Avatar />
                <Stack spacing={0.5}>
                  <Stack direction={'row'} spacing={1}>
                    <Typography variant={'sm'}>{comment.writer}</Typography>
                    <Typography variant={'xs'} color={'text.secondary'}>
                      {comment.date}
                    </Typography>
                  </Stack>
                  <Typography>{comment.content}</Typography>
                </Stack>
              </Stack>
            ))}

            <RhfFormProvider form={commentAddForm}>
              <Stack direction={'row'} spacing={1.5}>
                <Avatar />
                <RhfTextField
                  name={'content'}
                  placeholder={'덧글 추가'}
                  sx={{ pt: 1 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" sx={{ mb: 1 }}>
                        <IconButton disableRipple>
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
