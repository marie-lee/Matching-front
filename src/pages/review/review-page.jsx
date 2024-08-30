import { Container, Grid } from '@mui/material';

import {
  ProjectData,
  MemberFeedback,
  MemberReview,
} from '@/pages/review/components';
import { getMyRate, getReviewRate } from '@/services/project';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

const PeerReviewPage = () => {
  // ----------------------------------------------------------------------
  const { pjtSn } = useParams();
  const [reviewMembers, setReviewMembers] = useState([]);
  const [projectInfo, setProjectInfo] = useState({});
  const [peerReview, setPeerReview] = useState([]);

  const fetchReviewRate = async () => {
    try {
      const reviewData = await getReviewRate(pjtSn);
      console.log('reviewMembers', reviewData.data);
      setReviewMembers(reviewData.data.rateMemberList);
      setProjectInfo(reviewData.data.projectInfo);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPeerReview = async () => {
    try {
      const peerReview = await getMyRate(pjtSn);
      setPeerReview(peerReview.data);
      console.log('peerReview', peerReview.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReviewRate();
    fetchPeerReview();
  }, []);

  return (
    <Container maxWidth={'xl'}>
      <Grid container spacing={1.5} px={20} pt={3}>
        <ProjectData reviewMembers={reviewMembers} projectInfo={projectInfo} />
        <MemberFeedback feedback={peerReview} />
        <MemberReview review={peerReview} />
      </Grid>
    </Container>
  );
};

export default PeerReviewPage;
