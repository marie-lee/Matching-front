import { Box, Button, Dialog, Grid, Stack, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import Required from '@/components/required';
import { useForm } from 'react-hook-form';

import {
  RhfAutocomplete,
  RhfDatePicker,
  RhfFormProvider,
  RhfSelect,
  RhfTextField,
} from '@/components/hook-form';
import { taskAddFormDefaultValues } from '@/pages/task/constants/index.js';
import { CustomDialog } from '@/components/custom-dialog';
import { MenuPriority, MenuLevel } from '@/pages/task/components';

// ----------------------------------------------------------------------

const TaskAdd = () => {
  const [open, setOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  const taskAddForm = useForm({
    defaultValues: taskAddFormDefaultValues,
  });

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
                  Work package
                  <Required />
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <RhfSelect name={'workPackage'} options={[]} size={'small'} />
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography textAlign={'right'}>
                  Depth
                  <Required />
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <RhfSelect name={'dapth'} options={[]} size={'small'} />
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
                <Typography textAlign={'right'}>Level</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <MenuLevel />
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
                  // renderTags={() => null}
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
            </Grid>
          </Stack>
        </RhfFormProvider>
      </Dialog>
    </>
  );
};

export default TaskAdd;
