/* eslint-disable react/no-unescaped-entities */
// React Import
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// MUI Import
import { Button, Stack, Typography, Box } from '@mui/material';

// Data Import
import { PATHS } from '@/routes/paths';
import { setPjtSn } from '@/store/pjtsn-reducer';
import {
  resetState,
  setParticipants,
  setMemberData,
  setPjtData,
} from '@/store/wbsSlice';

// Api Import
import { getProject } from '@/services/project';
import { getWbsInfo } from '@/services/wbs';

const CreateWbsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const now = new Date();

  const { pjtSn, pjtName } = location.state || {};

  useEffect(() => {
    const wbsData = async () => {
      try {
        dispatch(resetState());

        const projectData = await getProject(pjtSn);
        const wbsDataInfo = await getWbsInfo(pjtSn);

        //날짜 설정

        const period = projectData.data.period;
        const durationUnit = projectData.data.durationUnit;

        const nowData = now
          .toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
          .replace(/\./g, '-')
          .replace(/-\s/g, '-')
          .slice(0, -1);

        let endDate = new Date(now);

        if (durationUnit === 'MONTH') {
          endDate.setMonth(endDate.getMonth() + period);
        } else if (durationUnit === 'DAY') {
          endDate.setDate(endDate.getDate() + period);
        }
        const endDt = endDate
          .toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
          .replace(/\./g, '-')
          .replace(/-\s/g, '-')
          .slice(0, -1);

        dispatch(
          setPjtData({
            startDt: nowData,
            endDt: endDt,
          }),
        );
        dispatch(setMemberData(wbsDataInfo.data.members));
        dispatch(setPjtSn(pjtSn));

        dispatch(
          setParticipants(projectData.data.role.map((role) => role.part)),
        );
      } catch (error) {
        console.log('error :', error);
      }
    };
    wbsData();
  }, [pjtSn, dispatch, now]);

  const handleCreateWbs = () => {
    navigate(PATHS.wbs.createWbs);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Stack py={10} spacing={6} sx={{ width: '100%', maxWidth: 600 }}>
        <Stack spacing={5} alignItems={'center'}>
          <Typography
            variant={'h6'}
            fontWeight={'fontWeightMedium'}
            textAlign={'center'}
          >
            <Box component="span" fontWeight="fontWeightBold" mx={0.5}>
              '{pjtName}'
            </Box>
            프로젝트의 WBS 작성 전입니다.
            <br />
            지금 작성하러 가시겠습니까?
          </Typography>
          <Button
            variant="contained"
            color="basicButton"
            sx={{ width: '250px', fontWeight: 500 }}
            onClick={handleCreateWbs}
          >
            WBS 작성하기
          </Button>
        </Stack>
        <Stack alignItems={'center'}>
          <Box
            height={200}
            width={600}
            my={5}
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            p={18}
            pt={4}
            sx={{ border: '1px solid lightgrey', borderRadius: '10px' }}
          >
            <Typography variant={'base'} color={'text.disabled'}>
              <span style={{ color: '#2196F3' }}>
                WBS(Work Breakdown Structure)
              </span>
              란?
            </Typography>
            <Typography mt={3} variant={'base'} color={'text.disabled'}>
              협업을 진행 할 때, 업무를 카테고리로 구분하고 카테고리 별로
              세부적인 업무로 나누어서 일정 및 진행상황을 관리하는 기법입니다.
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default CreateWbsPage;
