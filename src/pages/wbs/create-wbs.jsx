import { Button, Stack, Typography, Box } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/routes/paths';

// ----------------------------------------------------------------------

const CreateWbsPage = () => {
  const [projectName, setProjectName] = useState('참새 방앗간');
  const navigate = useNavigate();

  const handleCreateWbs = () => {
    navigate(PATHS.wbs.createWbs);
  };
  // ----------------------------------------------------------------------

  return (
    <Stack py={10} spacing={6}>
      <Stack spacing={5} alignItems={'center'}>
        <Typography
          variant={'h6'}
          fontWeight={'fontWeightBold'}
          textAlign={'center'}
        >
          `{projectName}` 프로젝트의 WBS 작성 전입니다.
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
              wbs(Work Breakdown Structure)
            </span>
            란?
          </Typography>
          <Typography mt={3} variant={'base'} color={'text.disabled'}>
            협업을 진행 할 때, 업무를 카테고리로 구분하고 카테고리 별로 세부적인
            업무로 나누어서 일정 및 진행상황을 관리하는 기법입니다.
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
};

export default CreateWbsPage;
