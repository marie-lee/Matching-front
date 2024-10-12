import { Box, IconButton, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Icon } from '@iconify/react';

import { IssueDetail, TaskDetail } from '@/pages/task/components';
import { getWbsPastList, getWbsTaskAdditionalInfo } from '@/services/wbs';

// ----------------------------------------------------------------------

const PastTasks = () => {
  const pjtSn = useSelector((state) => state.pjtSn.pjtSn);

  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const itemsPerPage = 5;

  // ----------------------------------------------------------------------

  const fetchWbsPastList = async () => {
    try {
      const res = await getWbsPastList(pjtSn);
      if (res.status === 200) {
        setTasks(res?.data?.Tasks);

        setTotalPage(Math.ceil(res?.data?.Tasks.length / itemsPerPage));
      }
    } catch (error) {}
  };

  const currentTasks = tasks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    if (pjtSn) {
      fetchWbsPastList();
      fetchTaskAdditionalInfo();
    }
  }, [pjtSn]);

  // ----------------------------------------------------------------------

  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [issueDialogOpen, setIssueDialogOpen] = useState(false);

  const [selectedTaskSn, setSelectedTaskSn] = useState();
  const [selectedIssueSn, setSelectedIssueSn] = useState();
  const [optionData, setOptionData] = useState({
    workPackage: [],
    depth: [],
    memberList: [],
  });

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
      const { data } = await getWbsTaskAdditionalInfo(pjtSn);
      setOptionData(data);
    } catch (error) {
      console.log(error);
    }
  };

  // ----------------------------------------------------------------------

  return (
    <Stack
      spacing={2}
      sx={{
        pt: 3,
        pb: 4,
        px: 3,
        height: '100%',
        backgroundColor: 'background.paper',
        boxShadow: (theme) => theme.customShadows.z1,
      }}
    >
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Typography variant={'xl'} fontWeight={'fontWeightBold'}>
          Past Tasks
        </Typography>
        <Typography variant={'xl'} fontWeight={'fontWeightBold'}>
          {tasks?.length}
        </Typography>
      </Stack>

      <Stack spacing={2}>
        {currentTasks?.map((task, index) => (
          <Stack
            key={`past-task-${task.ticketSn}`}
            spacing={1}
            onClick={() => handleOpenTask(task)}
            sx={{
              p: 1,
              px: 2,
              ':hover': {
                cursor: 'pointer',
                backgroundColor: (theme) => theme.palette.action.hover,
              },
            }}
          >
            <Stack direction={'row'} alignItems={'center'} spacing={1.5}>
              <Typography variant={'sm'}>{task.ticketNum}</Typography>
              <Typography variant={'sm'}>{task.title}</Typography>
              <Box flexGrow={1} />
              <Typography variant={'sm'}>{task.worker}</Typography>
            </Stack>
            <Typography variant={'xs'}>
              {dayjs(task.dueDate).format('YYYY-MM-DD')}
            </Typography>
          </Stack>
        ))}
      </Stack>

      <Stack direction={'row'} justifyContent={'center'} spacing={5} mt={4}>
        <IconButton
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          <Icon icon={'material-symbols:navigate-before'} fontSize={28} />
        </IconButton>
        <IconButton
          disabled={currentPage === totalPage}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPage))
          }
        >
          <Icon icon={'material-symbols:navigate-next'} fontSize={28} />
        </IconButton>
      </Stack>

      {/* 업무 목록 item 선택 시, 상세/수정 Dialog */}
      {taskDialogOpen && (
        <TaskDetail
          open={taskDialogOpen}
          setOpen={setTaskDialogOpen}
          selectedPjtSn={pjtSn}
          selectedTaskSn={selectedTaskSn}
          optionData={optionData}
          handleOpenIssue={handleOpenIssue}
          fetchDashboard={() => fetchWbsPastList()}
        />
      )}

      {/* 이슈 목록 item 선택 시, 상세/수정 Dialog */}
      {issueDialogOpen && (
        <IssueDetail
          open={issueDialogOpen}
          setOpen={setIssueDialogOpen}
          selectedPjtSn={pjtSn}
          selectedIssueSn={selectedIssueSn}
          optionData={optionData}
          fetchDashboard={() => fetchWbsPastList()}
        />
      )}
    </Stack>
  );
};

export default PastTasks;
