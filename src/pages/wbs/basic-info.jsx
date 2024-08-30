import {
  Button,
  Stack,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Container,
} from '@mui/material';
import StepperComponent from '@/pages/wbs/components/stepper-component';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PATHS } from '@/routes/paths';
import ProjectInfo from '@/pages/wbs/components/project-info';
import UserAdd from '@/pages/wbs/components/user-add';
import WbsTable, { createMergedTable } from '@/pages/wbs/components/wbs-table';
import { wbsData } from '@/pages/wbs/components/constants';
import { getProjectMember } from '@/services/project';

const BasicInfo = () => {
  const navigate = useNavigate();
  const tableData = createMergedTable(wbsData);
  const location = useLocation();
  const { pjtSn } = location.state || {};

  const [userNames, setUserNames] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchProjectMembers = async () => {
      try {
        const res = await getProjectMember(pjtSn);

        const namesArray = res.data.map((member) => member.userNm);
        setUserNames(namesArray);

        const rolesArray = [...new Set(res.data.map((member) => member.part))];
        setRoles(rolesArray);
      } catch (error) {
        console.error('Failed to fetch project members:', error);
      }
    };

    if (pjtSn) {
      fetchProjectMembers();
    }
  }, [pjtSn]);

  const handleInputWbs = () => {
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
        <ProjectInfo />
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

        <UserAdd userNames={userNames} roles={roles} />
      </Stack>
    </Container>
  );
};

export default BasicInfo;
