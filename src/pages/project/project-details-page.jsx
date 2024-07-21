import { AppBar, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import _ from 'lodash';

import { PROJECTS } from '@/pages/project/constants';
import {
  ProjectDetails,
  ProjectDetailsMemberProfiles,
  ProjectDetailsRecommendMember,
} from '@/pages/project/components';
import ProjectInformation from './components/project-information';
import ProjectDetailsSelectedMember from './components/project-details-seleted-member';

// ----------------------------------------------------------------------

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const [selectedMember, setSelectedMember] = useState(null);

  const [projectData, setProjectData] = useState({});
  const [isProjectDetailsComplete, setIsProjectDetailsComplete] =
    useState(false);

  useEffect(() => {
    const data = _.find(PROJECTS, { id: Number(id) });
    if (data !== undefined) {
      setProjectData(data);
    } else {
      setProjectData({});
    }
  }, [id]);

  // ----------------------------------------------------------------------
  const handleProjectDetailsComplete = () => {
    setIsProjectDetailsComplete(true);
  };

  return (
    <Grid container direction="row">
      <Grid item xs={6} pr={2}>
        {/* 프로젝트 기본 정보 및 모집 인원 */}
        <ProjectInformation onComplete={handleProjectDetailsComplete} />

        {/* 본인이 프로젝트 리더이면서 프로젝트 모집중인 경우, 매칭 현황 조회 가능 */}
        {/*{projectData.hasLeaderRole && <ProjectDetailsMatchStatus />}*/}

        {/* 본인이 프로젝트 리더인 경우, 멤버 추천 조회 가능 */}
        {/*{projectData.hasLeaderRole && <ProjectDetailsRecommendMember />}*/}
        {isProjectDetailsComplete && (
          <ProjectDetailsRecommendMember
            setSelectedMember={setSelectedMember}
          />
        )}
      </Grid>
      {/* 선택한 멤버의 프로필과 포트폴리오 확인 */}
      <Grid item container xs={6}>
        {selectedMember &&
          (console.log('selectedMember', selectedMember),
          (<ProjectDetailsSelectedMember member={selectedMember} />))}
      </Grid>
    </Grid>
  );
};

export default ProjectDetailsPage;
