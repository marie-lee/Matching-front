import {
  Button,
  Chip,
  Dialog,
  Grid,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import _ from 'lodash';
import { Icon } from '@iconify/react';
import { useState } from 'react';

import { MATCH_LIST } from '@/pages/match/constants';
import { ResponsiveImg } from '@/components/img';
import { ProjectDetails } from '@/pages/project/components';
import { PROJECTS } from '@/pages/project/constants';

// ----------------------------------------------------------------------

const MatchSection = ({
  title,
  keyName,
  data,
  disabled,
  handleClickProject,
}) => {
  return (
    <Grid item xs={12}>
      <Grid container bgcolor={'background.default'}>
        <Grid container p={2} spacing={2}>
          <Grid item container>
            <Typography variant={'lg'} fontWeight={'fontWeightBold'}>
              {title}
            </Typography>
          </Grid>
          {data.map((item, index) => (
            <MatchItem
              key={`match-${keyName}-${index}`}
              value={item}
              disabled={disabled}
              handleClickProject={handleClickProject}
            />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

const MatchItem = ({ value, disabled, handleClickProject }) => {
  return (
    <Grid item xs={12} md={6}>
      <Grid container p={2} border={1} borderColor={'divider'} borderRadius={1}>
        <Grid container spacing={2} alignItems={'center'}>
          <Grid item xs={12} md={3}>
            <ResponsiveImg
              src={value.img}
              alt={`${value.name}_image`}
              width={150}
              height={80}
            />
          </Grid>
          <Grid item xs={12} md>
            <Stack alignItems={'flex-start'} spacing={1}>
              <Link
                component={'button'}
                underline={'hover'}
                onClick={handleClickProject}
              >
                <Stack direction={'row'} alignItems={'center'} spacing={0.5}>
                  <Typography variant={'lg'} fontWeight={'fontWeightSemiBold'}>
                    {value.projectNm}
                  </Typography>
                  <Icon icon={'iconoir:google-docs'} />
                </Stack>
              </Link>

              <Chip label={value.roleNm} size={'small'} />
            </Stack>
          </Grid>

          {!disabled && (
            <Grid item container xs={12} md={2} spacing={1}>
              <Grid item xs={6} md={12}>
                <Button fullWidth size={'small'}>
                  수락
                </Button>
              </Grid>
              <Grid item xs={6} md={12}>
                <Button
                  fullWidth
                  variant={'outlined'}
                  color={'error'}
                  size={'small'}
                >
                  거절
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

// ----------------------------------------------------------------------

const MatchList = () => {
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);

  // const [project, setProject] = useState({});

  const projectData = _.find(PROJECTS, { id: 1 });

  const handleClickProject = () => {
    // setProject(data);
    setProjectDialogOpen(true);
  };

  return (
    <Grid container spacing={3}>
      <MatchSection
        title={'요청 온 제안'}
        data={MATCH_LIST.wait}
        keyName={'wait'}
        handleClickProject={handleClickProject}
      />

      <MatchSection
        title={'최종 제안'}
        data={MATCH_LIST.success}
        keyName={'success'}
        handleClickProject={handleClickProject}
      />

      <MatchSection
        title={'거절'}
        data={MATCH_LIST.deny}
        keyName={'deny'}
        disabled={true}
        handleClickProject={handleClickProject}
      />

      {/* 선택한 멤버의 프로필/포트폴리오 상세 조회 Dialog */}
      <Dialog
        fullWidth
        maxWidth={'md'}
        open={projectDialogOpen}
        onClose={() => setProjectDialogOpen(false)}
      >
        {/* 프로젝트 기본 정보 및 모집 인원 */}
        <ProjectDetails projectData={projectData} />
      </Dialog>
    </Grid>
  );
};

export default MatchList;
