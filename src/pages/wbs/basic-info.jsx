import { useState } from 'react';
//React Import
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
//Mui Import
import {
  Button,
  Stack,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Container,
} from '@mui/material';

//Data Import
import { PATHS } from '@/routes/paths';

//Component Import
import StepperComponent from '@/pages/wbs/components/stepper-component';
import ProjectInfo from '@/pages/wbs/components/project-info';
import UserAdd from '@/pages/wbs/components/user-add';
import WbsTable, { createMergedTable } from '@/pages/wbs/components/wbs-table';
import { wbsData } from '@/pages/wbs/components/constants';
import { setMemberData } from '@/store/wbsSlice';

const BasicInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [participants, setParticipants] = useState([]); // participants 상태 추가

  const pjtMemberData = useSelector((state) => state.wbs.memberData);
  const pjtRoleData = useSelector((state) => state.wbs.participants);

  const tableData = createMergedTable(wbsData);

  const handleInputWbs = () => {
    if (!startDate || !endDate) {
      alert('프로젝트 시작일과 종료일을 입력하세요.');
      return;
    }

    // 참여자 정보가 충분한지 체크
    const participantNames = participants.map((p) => p.userNm);
    const missingMembers = pjtMemberData.filter(
      (member) => !participantNames.includes(member.userNm),
    );

    if (missingMembers.length > 0) {
      alert('참여자 정보에 모든 유저를 추가해 주세요.');
      return;
    }
    dispatch(setMemberData(participants));

    // 모든 조건을 만족했을 때만 이동
    navigate(PATHS.wbs.wbsInput);
  };

  const handleBack = () => {
    navigate(PATHS.wbs.createWbs);
  };

  return (
    <Container maxWidth="lg" sx={{ p: 3, pb: 10 }}>
      <Stack spacing={3}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="start"
        >
          <StepperComponent activeStep={1} />
          <Stack direction="row" spacing={1}>
            <Button
              color="greyButton"
              sx={{ width: '100px' }}
              variant="contained"
              onClick={handleBack}
            >
              BACK
            </Button>
            <Button
              color="greyButton"
              sx={{ width: '100px' }}
              variant="contained"
              onClick={handleInputWbs}
            >
              NEXT
            </Button>
          </Stack>
        </Stack>
        {/* ProjectInfo에서 startDate와 endDate를 가져옴 */}
        <ProjectInfo setStartDate={setStartDate} setEndDate={setEndDate} />
        <Stack>
          <Stack direction="row" alignItems="center" mb={5}>
            <Typography variant="h6" mr={6} fontWeight="fontWeightSemiBold">
              <li>템플릿 Depth 정보</li>
            </Typography>
            <RadioGroup row sx={{ width: 'auto' }}>
              <FormControlLabel
                value="Detail"
                control={
                  <Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }} />
                }
                label={<Typography variant="sm">Detail</Typography>}
                sx={{ mr: 1 }}
              />
              <FormControlLabel
                value="Roughly"
                control={
                  <Radio
                    sx={{
                      '& .MuiSvgIcon-root': { fontSize: 18 },
                      marginLeft: '20px',
                    }}
                  />
                }
                label={<Typography variant="sm">Roughly</Typography>}
              />
            </RadioGroup>
          </Stack>
          <WbsTable
            tableData={tableData}
            borderStyle="1px solid rgba(0, 0, 0, 0.4)"
          />
        </Stack>

        {/* UserAdd 컴포넌트에 participants 상태 전달 */}
        <UserAdd
          roles={pjtRoleData}
          resData={pjtMemberData}
          participants={participants}
          setParticipants={setParticipants}
        />
      </Stack>
    </Container>
  );
};

export default BasicInfo;
