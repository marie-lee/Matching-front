import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import {
  DateField,
  DatePicker,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const WbsIssue = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const issueData = {
    no: 1,
    task: '프론트/메인페이지/구글로그인',
    title: '구글 로그인 연동',
    priority: 'L3',
    present: [
      {
        name: '김철수',
        date: '2021-10-01',
        status: '진행중',
      },
    ],
    mention: [
      {
        name: '김철수',
        date: '2021-10-01',
        status: '진행중',
      },
    ],
    // datepicker 에서 사용할 날짜
    dueDate: '2021-10-01',
    status: 'In Progress',
    contents: '구글 로그인 연동',
    comments: [
      {
        name: '김철수',
        date: '2021-10-01 10:30:00',
        contents: '구글 로그인 연동',
      },
      {
        name: '홍길동',
        date: '2021-10-01 10:00:00',
        contents: '구글 로그인 연동',
      },
    ],
  };

  const dueDate = dayjs(issueData.dueDate);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* WBS 이슈 확인 버튼*/}
        <Button
          variant={'outlined'}
          size={'large'}
          onClick={() => setOpen(true)}
        >
          <Icon icon={'ic:outline-plus'} fontSize={'28'} />
        </Button>

        {/* 이슈 추가 Dialog */}
        <Dialog open={open} maxWidth={'false'}>
          <Stack width={'700px'} px={3} py={3} spacing={3} useFlexGap>
            <Stack direction={'row'} alignItems={'center'}>
              <Typography variant={'xl'}>Issue</Typography>
              <Box flexGrow={1} />
              <Stack direction={'row'} spacing={1.5}>
                <Button variant={'outlined'} onClick={() => setOpen(false)}>
                  Close
                </Button>
              </Stack>
            </Stack>

            <Grid container spacing={3} alignItems={'center'}>
              <Grid item xs={12} sm={2}>
                <Typography align="right">No</Typography>
              </Grid>
              <Grid item xs={12} sm={10}>
                <Typography>{issueData.no}</Typography>
              </Grid>

              <Grid item xs={12} sm={2}>
                <Typography align="right">Task</Typography>
              </Grid>
              <Grid item xs={12} sm={10}>
                <Typography>{issueData.task}</Typography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Typography align="right">Priority</Typography>
              </Grid>
              <Grid item xs={12} sm={10}>
                <Chip
                  label={issueData.priority}
                  variant="filled"
                  color="secondary"
                  size="medium"
                  sx={{ borderRadius: '8px' }}
                />
              </Grid>

              <Grid item xs={12} sm={2}>
                <Typography align="right">Present</Typography>
              </Grid>
              <Grid item xs={12} sm={10}>
                <Select
                  fullWidth
                  multiple
                  value={issueData.present.map((item) => item.name) || []}
                  displayEmpty
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <em>Select Mention</em>;
                    }
                    return (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={value}
                            avatar={<Avatar></Avatar>}
                            size="small"
                            onDelete={() => {}}
                          />
                        ))}
                      </Box>
                    );
                  }}
                  size="small"
                >
                  {issueData.mention.map((item, index) => (
                    <MenuItem key={index} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              <Grid item xs={12} sm={2}>
                <Typography align="right">Mention</Typography>
              </Grid>
              <Grid item xs={12} sm={10}>
                <Select
                  fullWidth
                  multiple
                  value={issueData.mention.map((item) => item.name) || []}
                  displayEmpty
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <em>Select Mention</em>;
                    }
                    return (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={value}
                            avatar={<Avatar></Avatar>}
                            size="small"
                            onDelete={() => {}}
                          />
                        ))}
                      </Box>
                    );
                  }}
                  size="small"
                >
                  {issueData.mention.map((item, index) => (
                    <MenuItem key={index} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              <Grid item xs={12} sm={2}>
                <Typography align="right">Due Date</Typography>
              </Grid>
              <Grid item xs={12} sm={10}>
                <DateField
                  value={dueDate}
                  onChange={() => {}}
                  format={'YYYY-MM-DD'}
                  size={'small'}
                  views={['year', 'month', 'day']}
                  variant="outlined"
                ></DateField>
              </Grid>

              <Grid item xs={12} sm={2}>
                <Typography align="right">Status</Typography>
              </Grid>
              <Grid item xs={12} sm={10}>
                <Chip
                  label={issueData.status}
                  variant="filled"
                  color="secondary"
                  size="medium"
                  sx={{ borderRadius: '8px' }}
                />
              </Grid>

              <Grid item xs={12} sm={2}>
                <Typography align="right">Contents</Typography>
              </Grid>
              <Grid item xs={12} sm={10}>
                <Typography>{issueData.contents}</Typography>
              </Grid>
            </Grid>
            <Divider />
            <Stack spacing={1}>
              <Typography variant={'xl'}>Comments</Typography>
              <Divider />
              <Stack spacing={2.5}>
                {issueData.comments.map((comment, index) => (
                  <Stack
                    key={index}
                    direction="row"
                    spacing={1}
                    alignItems="center"
                  >
                    <Avatar />
                    <Grid container direction="column">
                      <Grid item>
                        <Grid
                          container
                          direction="row"
                          spacing={1}
                          alignItems="center"
                        >
                          <Grid item>
                            <Typography>{comment.name}</Typography>
                          </Grid>
                          <Grid item>
                            <Typography
                              color={theme.palette.text.secondary}
                              variant="sm"
                            >
                              {comment.date}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Typography>{comment.contents}</Typography>
                      </Grid>
                    </Grid>
                  </Stack>
                ))}
                <Divider />
                <Stack direction={'row'} spacing={1}>
                  <Avatar />
                  <TextField
                    fullWidth
                    size={'small'}
                    placeholder={'댓글 추가'}
                  />
                  <IconButton>
                    <Icon icon={'clarity:circle-arrow-solid'} />
                  </IconButton>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Dialog>
      </LocalizationProvider>
    </>
  );
};

export default WbsIssue;
