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
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { issueAddFormDefaultValues } from '@/pages/task/constants';
import { CustomDialog } from '@/components/custom-dialog';
import {
  RhfAutocomplete,
  RhfFormProvider,
  RhfSelect,
  RhfTextField,
} from '@/components/hook-form';
import Required from '@/components/required';
import { MenuPriority } from '@/pages/task/components';

const IssueAdd = () => {
  const [open, setOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  const issueAddForm = useForm({
    defaultValues: issueAddFormDefaultValues,
  });

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
                <Button>Save</Button>
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
                <RhfSelect name={'workPackage'} options={[]} size={'small'} />
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography textAlign={'right'}>
                  Title
                  <Required />
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <RhfTextField
                  name={'title'}
                  variant={'outlined'}
                  size={'small'}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography textAlign={'right'}>Priority</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <MenuPriority />
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

              <Grid item xs={12} sm={3} pb={12}>
                <Typography textAlign={'right'}>
                  Contents
                  <Required />
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <RhfTextField
                  name={'contents'}
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
