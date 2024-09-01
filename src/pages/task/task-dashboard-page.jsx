import { Container, Grid, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import {
  TaskDashBoardTop,
  TaskItem,
  IssueItem,
  TaskAdd,
  IssueAdd,
  TaskDetail,
  IssueDetail,
} from '@/pages/task/components';
import { getWbsDashboard, getWbsTaskAdditionalInfo } from '@/services/wbs';

// ----------------------------------------------------------------------

const TaskDashboardPage = () => {
  const selectedPjtSn = 5;

  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState({ today: [], task: [], issue: [] });
  const [optionData, setOptionData] = useState({
    workPackage: [],
    depth: [],
    memberList: [],
  });

  const [selectedTaskSn, setSelectedTaskSn] = useState();
  const [selectedIssueSn, setSelectedIssueSn] = useState();

  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [issueDialogOpen, setIssueDialogOpen] = useState(false);

  const handleOpenTask = (value) => {
    setSelectedTaskSn(value?.ticketSn);
    setTaskDialogOpen(true);
  };

  const handleOpenIssue = (value) => {
    setSelectedIssueSn(value?.issueSn);
    setIssueDialogOpen(true);
  };

  // WBS 업무 추가 정보 조회
  const fetchTaskAdditionalInfo = async () => {
    try {
      const { data } = await getWbsTaskAdditionalInfo(selectedPjtSn);
      console.log(data);
      setOptionData(data);
    } catch (error) {
      console.log(error);
    }
  };

  // WBS 대시보드 조회
  const fetchDashboard = async () => {
    setIsFetching(true);
    try {
      const { data } = await getWbsDashboard(selectedPjtSn);
      setIsFetching(false);
      setData({
        today: data?.today,
        task: data?.task,
        issue: data?.issue,
      });
    } catch (error) {
      console.log(error);
      // error.data.message = error.message;
    }
  };

  useEffect(() => {
    if (selectedPjtSn) {
      fetchDashboard();
      fetchTaskAdditionalInfo();
    }
  }, [selectedPjtSn]);

  // ----------------------------------------------------------------------

  return (
    <Container maxWidth={'xl'} sx={{ pb: 5 }}>
      {/* 상단 영역 */}
      <TaskDashBoardTop />

      {/* 업무/이슈 영역*/}
      <Grid container spacing={1.5}>
        <Grid item xs={12} md={4}>
          <Stack spacing={1}>
            <Stack direction={'row'} alignItems={'center'} spacing={1}>
              <Typography variant={'lg'}>Today</Typography>
              <Typography>{data?.today.length}</Typography>
            </Stack>
            {data?.today.map((item) => (
              <TaskItem
                key={`dashboard_today_${item.ticketSn}`}
                data={item}
                onClick={handleOpenTask}
              />
            ))}
          </Stack>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={1}>
            <Stack direction={'row'} alignItems={'center'} spacing={1}>
              <Typography variant={'lg'}>Task</Typography>
              <Typography>4</Typography>
            </Stack>

            <TaskAdd
              selectedPjtSn={selectedPjtSn}
              optionData={optionData}
              fetchDashboard={fetchDashboard}
            />

            {taskDialogOpen && (
              <TaskDetail
                open={taskDialogOpen}
                setOpen={setTaskDialogOpen}
                selectedPjtSn={selectedPjtSn}
                selectedTaskSn={selectedTaskSn}
                optionData={optionData}
                fetchDashboard={fetchDashboard}
                handleOpenIssue={handleOpenIssue}
              />
            )}

            {data?.task.map((item) => (
              <TaskItem
                key={`dashboard_task_${item.ticketSn}`}
                data={item}
                onClick={handleOpenTask}
              />
            ))}
          </Stack>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={1}>
            <Stack direction={'row'} alignItems={'center'} spacing={1}>
              <Typography variant={'lg'}>Issue</Typography>
              <Typography>1</Typography>
            </Stack>
            <IssueAdd />
            {data?.issue.map((item) => (
              <IssueItem
                key={`dashboard_issue_${item.issueSn}`}
                data={item}
                onClick={handleOpenIssue}
              />
            ))}

            {issueDialogOpen && (
              <IssueDetail
                open={issueDialogOpen}
                setOpen={setIssueDialogOpen}
                selectedPjtSn={selectedPjtSn}
                selectedIssueSn={selectedIssueSn}
                optionData={optionData}
                fetchDashboard={fetchDashboard}
              />
            )}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TaskDashboardPage;
