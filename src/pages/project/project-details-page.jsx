import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import _ from 'lodash';

import { PROJECTS } from '@/pages/project/constants';
import {
  ProjectDetails,
  ProjectDetailsMatchStatus,
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
      {/* 프로젝트 기본 정보 및 모집 인원 */}
      <ProjectDetails projectData={projectData} />

      {/* 본인이 프로젝트 리더이면서 프로젝트 모집중인 경우, 매칭 현황 조회 가능 */}
      {/*{projectData.hasLeaderRole && <ProjectDetailsMatchStatus />}*/}

      {/* 본인이 프로젝트 리더인 경우, 멤버 추천 조회 가능 */}
      {projectData.hasLeaderRole && <ProjectDetailsRecommendMember />}
    </Grid>
  );
};

export default ProjectDetailsPage;
