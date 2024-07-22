import {
  Button,
  ButtonGroup,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

import {
  ReceivedProposalList,
  SentProposalList,
} from '@/pages/match/components';
import { getStatus } from '@/services/status';
import MatchSelectedMember from './components/match-selected-member';

// ----------------------------------------------------------------------

const MatchStatusPage = () => {
  const [selectedView, setSelectedView] = useState('보낸 제안');
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedProjectSN, setSelectedProjectSN] = useState('');
  const [projectReqList, setProjectReqList] = useState([]);

  const [isFetching, setIsFetching] = useState(false);

  // const [projectReqList, setProjectReqList] = useState([]);
  const [myReqList, setMyReqList] = useState([]);
  const fetchStatus = async () => {
    setIsFetching(true);
    try {
      const res = await getStatus();
      setIsFetching(false);
      setMyReqList(res?.data?.myReqList);
      setProjectReqList(res?.data?.projectReqList);
    } catch (error) {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, [selectedView]);

  const handleChangeProject = (event) => {
    const selectedProjectReqList = projectReqList.find(
      (item) => item.PJT_SN === event.target.value,
    );
    setSelectedMember(null);
    setSelectedProject(selectedProjectReqList);
    setSelectedProjectSN(event.target.value);
  };

  // ----------------------------------------------------------------------

  return (
    <Grid container direction={'row'}>
      <Grid item xs={6} pr={2}>
        <Stack spacing={2}>
          <Typography variant={'xl'}>매칭 현황</Typography>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">내 프로젝트</InputLabel>
            <Select
              variant="standard"
              label="내 프로젝트"
              value={selectedProjectSN}
              onChange={handleChangeProject}
              placeholder={'프로젝트를 선택하세요'}
            >
              {projectReqList.map((item) => (
                <MenuItem value={item.PJT_SN} key={item.PJT_SN}>
                  {item.PJT_NM}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <ButtonGroup sx={{ pb: 2 }}>
            <Button
              sx={{ px: 2.5 }}
              variant={selectedView === '보낸 제안' ? 'contained' : 'outlined'}
              onClick={() => setSelectedView('보낸 제안')}
            >
              보낸 제안
            </Button>
            <Button
              sx={{ px: 2.5 }}
              variant={selectedView === '받은 제안' ? 'contained' : 'outlined'}
              onClick={() => {
                setSelectedView('받은 제안');
                setSelectedMember(null);
              }}
            >
              받은 제안
            </Button>
          </ButtonGroup>
        </Stack>

        {selectedView === '보낸 제안' && (
          <SentProposalList
            data={selectedProject}
            setSelectedMember={setSelectedMember}
          />
        )}

        {selectedView === '받은 제안' && (
          <ReceivedProposalList data={myReqList} />
        )}
      </Grid>
      <Grid item container xs={6}>
        {selectedMember && <MatchSelectedMember member={selectedMember} />}
      </Grid>
    </Grid>
  );
};

export default MatchStatusPage;
