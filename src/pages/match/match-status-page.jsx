import { Button, ButtonGroup, Grid, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import {
  ReceivedProposalList,
  SentProposalList,
} from '@/pages/match/components';
import { getStatus } from '@/services/status';

// ----------------------------------------------------------------------

const MatchStatusPage = () => {
  const [selectedView, setSelectedView] = useState('보낸 제안');

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
    } catch (error) {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, [selectedView]);

  // ----------------------------------------------------------------------

  return (
    <Grid container gap={3}>
      <Stack spacing={2}>
        <Typography variant={'xl'}>매칭 현황</Typography>

        <ButtonGroup>
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
            onClick={() => setSelectedView('받은 제안')}
          >
            받은 제안
          </Button>
        </ButtonGroup>
      </Stack>

      {selectedView === '보낸 제안' && (
        <SentProposalList data={projectReqList} />
      )}

      {selectedView === '받은 제안' && (
        <ReceivedProposalList data={myReqList} />
      )}
    </Grid>
  );
};

export default MatchStatusPage;
