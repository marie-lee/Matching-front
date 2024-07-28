import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import {
  ProjectInformation,
  ProjectDetailsRecommendMember,
  ProjectDetailsSelectedMember,
  ProjectReqDialog,
} from '@/pages/project/components';
import { getProject } from '@/services/project';

// ----------------------------------------------------------------------

const ProjectDetailsPage = () => {
  const { pjtSn } = useParams();

  const [selectedMember, setSelectedMember] = useState(null);

  const [projectData, setProjectData] = useState({});

  const [openReqDialog, setOpenReqDialog] = useState(false);

  const fetchProject = async () => {
    try {
      const res = await getProject(pjtSn);
      setProjectData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  // ----------------------------------------------------------------------

  return (
    <Grid container direction="row">
      <Grid item xs={6} pr={2}>
        {/* 프로젝트 기본 정보 및 모집 인원 */}
        {projectData && <ProjectInformation projectData={projectData} />}

        {/* 본인이 프로젝트 리더이면서 프로젝트 모집중인 경우, 매칭 현황 조회 가능 */}
        {/*{projectData.hasLeaderRole && <ProjectDetailsMatchStatus />}*/}

        {/* 본인이 프로젝트 리더인 경우, 멤버 추천 조회 가능 */}
        {/*{projectData.hasLeaderRole && <ProjectDetailsRecommendMember />}*/}
        {projectData && (
          <ProjectDetailsRecommendMember
            setSelectedMember={setSelectedMember}
          />
        )}
      </Grid>
      {/* 선택한 멤버의 프로필과 포트폴리오 확인 */}
      <Grid item container xs={6}>
        {selectedMember && (
          <ProjectDetailsSelectedMember
            member={selectedMember}
            handleClickReq={() => setOpenReqDialog(true)}
          />
        )}
      </Grid>

      {/* 프로젝트 요청 다이얼로그 */}
      <ProjectReqDialog
        open={openReqDialog}
        setOpen={setOpenReqDialog}
        selectedUserSn={selectedMember?.userSn}
        selectedPjtSn={pjtSn}
      />
    </Grid>
  );
};

export default ProjectDetailsPage;
