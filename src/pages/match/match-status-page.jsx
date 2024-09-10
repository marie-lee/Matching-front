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
  MatchReqDialog,
} from '@/pages/match/components';
import { getStatus } from '@/services/status';
import MatchSelectedMember from './components/match-selected-member';
import { ProjectDetails } from '../project/components';
import MatchSelectedProject from './components/match-selected-project';

// ----------------------------------------------------------------------

const MatchStatusPage = () => {
  const [selectedView, setSelectedView] = useState('보낸 제안');
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedProjectSN, setSelectedProjectSN] = useState('');

  const [openReqDialog, setOpenReqDialog] = useState(false);
  const [reqDialogData, setReqDialogData] = useState({});

  const [isFetching, setIsFetching] = useState(false);

  const [projectReqList, setProjectReqList] = useState([]);
  const [myReqList, setMyReqList] = useState([]);

  const fetchStatus = async () => {
    setIsFetching(true);
    try {
      const res = await getStatus();
      setIsFetching(false);
      setMyReqList(res?.data?.myReqList);
      setProjectReqList(res?.data?.projectReqList);

      if (res?.data?.projectReqList && res?.data?.projectReqList.length > 0) {
        setSelectedProjectSN(res?.data?.projectReqList[0].PJT_SN);
      }
    } catch (error) {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, [selectedView]);

  const handleChangeProject = (event) => {
    setSelectedMember(null);
    setSelectedProjectSN(event.target.value);
  };

  // 보낸/받은 제안에 대해서 요청 상태 변경
  const handleClickReq = (pjtSn, reqSn, reqStts) => {
    setReqDialogData({ pjtSn, reqSn, reqStts });
    setOpenReqDialog(true);
  };

  // ----------------------------------------------------------------------

  return (
    <Grid container direction={'row'}>
      <Grid item xs={6} pr={2}>
        <Stack spacing={2}>
          <Typography variant={'xl'}>매칭 현황</Typography>

          {selectedView == '받은 제안' && (
            <Typography variant={'lg'} px={2} pt={2}>
              나의 현황
            </Typography>
          )}
          {selectedView == '보낸 제안' && (
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
          )}

          <ButtonGroup sx={{ pb: 2 }}>
            <Button
              sx={{ px: 2.5 }}
              variant={selectedView === '보낸 제안' ? 'contained' : 'outlined'}
              onClick={() => {
                setSelectedView('보낸 제안');
                setSelectedProject(null);
              }}
            >
              보낸 제안
            </Button>
            <Button
              sx={{ px: 2.5 }}
              variant={selectedView === '받은 제안' ? 'contained' : 'outlined'}
              onClick={() => {
                setSelectedView('받은 제안');
                setSelectedMember(null);
                setSelectedProjectSN(null);
              }}
            >
              받은 제안
            </Button>
          </ButtonGroup>
        </Stack>

        {selectedView === '보낸 제안' && (
          <SentProposalList
            data={projectReqList.find(
              (item) => item.PJT_SN === selectedProjectSN,
            )}
            setSelectedMember={setSelectedMember}
            handleClickReq={handleClickReq}
          />
        )}

        {selectedView === '받은 제안' && (
          <ReceivedProposalList
            data={myReqList}
            setSelectedProject={setSelectedProject}
            handleClickReq={handleClickReq}
          />
        )}
      </Grid>
      <Grid item container xs={6}>
        {selectedMember && <MatchSelectedMember member={selectedMember} />}
        <MatchSelectedProject data={selectedProject}></MatchSelectedProject>
      </Grid>

      <MatchReqDialog
        open={openReqDialog}
        setOpen={setOpenReqDialog}
        data={reqDialogData}
        fetchStatus={fetchStatus}
      />
    </Grid>
  );
};

export default MatchStatusPage;
