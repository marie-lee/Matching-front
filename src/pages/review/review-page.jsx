import { Container, Grid } from '@mui/material';

import {
  ProjectData,
  MemberFeedback,
  MemberReview,
} from '@/pages/review/components';
import { getMyPeerReview, getReviewMembers } from '@/services/project';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

const PeerReviewPage = () => {
  // ----------------------------------------------------------------------
  const { pjtSn } = useParams();
  const [reviewMembers, setReviewMembers] = useState([]);
  const [peerReview, setPeerReview] = useState([]);

  const fetchReviewMembers = async () => {
    try {
      const reviewMembers = await getReviewMembers(pjtSn);
      setReviewMembers(reviewMembers.data);
      console.log('reviewMembers', reviewMembers.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPeerReview = async () => {
    try {
      const peerReview = await getMyPeerReview(pjtSn);
      setPeerReview(peerReview.data);
      console.log('peerReview', peerReview.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReviewMembers();
    fetchPeerReview();
  }, []);

  return (
    <Container maxWidth={'xl'}>
      <Grid container spacing={1.5} px={20} pt={3}>
        <ProjectData reviewMembers={reviewMembers} />
        <MemberFeedback feedback={peerReview} />
        <MemberReview review={peerReview} />
      </Grid>
    </Container>
  );
};

export default PeerReviewPage;
