import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { PROJECTS } from '@/pages/project/constants';
import {
  ProjectDetails,
  ProjectDetailsRecommendMember,
} from '@/pages/project/components';

// ----------------------------------------------------------------------

const ProjectDetailsPage = () => {
  const { id } = useParams();

  const [projectData, setProjectData] = useState({});

  useEffect(() => {
    const data = _.find(PROJECTS, { id: Number(id) });

    if (data !== undefined) {
      setProjectData(data);
    } else {
      setProjectData({});
    }
  }, [id]);

  // ----------------------------------------------------------------------

  return (
    <Grid container gap={3}>
      <ProjectDetails projectData={projectData} />

      {/* 본인이 프로젝트 리더인 경우, 멤버 추천 조회 가능 */}
      {projectData.hasLeaderRole && <ProjectDetailsRecommendMember />}
    </Grid>
  );
};

export default ProjectDetailsPage;
