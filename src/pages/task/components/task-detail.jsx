import {
  Avatar,
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

import {
  RhfAutocomplete,
  RhfDatePicker,
  RhfFormProvider,
} from '@/components/hook-form';
import { MenuPriority, MenuStatus } from '@/pages/task/components';
import { ISSUE_LIST, taskEditFormDefaultValues } from '@/pages/task/constants';
import { Icon } from '@iconify/react';

// ----------------------------------------------------------------------

const TaskDetail = ({ open, setOpen }) => {
  const taskEditForm = useForm({
    defaultValues: taskEditFormDefaultValues,
  });

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
                <Typography>Front-3011</Typography>
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography textAlign={'right'}>Work package</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography>프론트</Typography>
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography textAlign={'right'}>Depth</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography>메인페이지</Typography>
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
                <MenuStatus />
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
            <ButtonBase>
              <Icon icon={'ic:baseline-plus'} fontSize={24} />
            </ButtonBase>
          </Stack>

          <Divider flexItem />

          <Stack useFlexGap>
            {ISSUE_LIST.map((issue) => (
              <Grid
                container
                key={`issue_${issue.id}`}
                p={1}
                sx={{
                  ':hover': {
                    cursor: 'pointer',
                    backgroundColor: (theme) => theme.palette.action.hover,
                  },
                }}
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
                  {issue.title}
                </Grid>
                <Grid item xs={'auto'} mx={1}>
                  <Chip
                    size={'small'}
                    label={issue.present}
                    avatar={<Avatar alt={`${issue.id} 프로필 이미지`} />}
                  />
                </Grid>
                <Grid item xs={'auto'}>
                  <Typography color={'text.secondary'}>{issue.date}</Typography>
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
