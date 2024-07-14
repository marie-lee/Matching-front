import { Button, Chip, Dialog, Grid, Stack, Typography } from '@mui/material';
import _ from 'lodash';
import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';

import { DURATION_UNIT_OPTIONS, OPEN_OPTIONS } from '@/pages/project/constants';

// ----------------------------------------------------------------------

const ProjectAddPreview = ({ open, setOpen, projectAddForm, handleSubmit }) => {
  const projectAddFormValues = projectAddForm.watch();

  const getRoleText = () => {
    let roleDetail = '';
    let roleCount = 0;

    roleDetail = projectAddFormValues.ROLES.map((item, index) => {
      roleCount = roleCount + parseInt(item.TOTAL_CNT);
      if (index === projectAddFormValues.ROLES.length - 1) {
        return `${item.PART}(${item.TOTAL_CNT})`;
      }
      return `${item.PART}(${item.TOTAL_CNT}), `;
    });

    return { roleDetail, roleCount };
  };

  const getStartDtText = () => {
    let startDt = '';

    if (projectAddFormValues.SELECTED_DT_YN === 'false') {
      startDt = '팀 모집 후 바로 시작';
    } else {
      startDt = `${dayjs(projectAddFormValues.START_DT).format('YYYY-MM-DD')} (예상 기간: ${projectAddFormValues.PERIOD}${_.find(DURATION_UNIT_OPTIONS, { value: projectAddFormValues.DURATION_UNIT })?.label})`;
    }

    return startDt;
  };

  // ----------------------------------------------------------------------

  return (
    <Dialog
      fullWidth
      maxWidth={'md'}
      open={open}
      onClose={() => setOpen(false)}
    >
      <Grid container p={2} spacing={1}>
        <Grid item xs={12} mb={2}>
          <Typography variant={'xl'}>{projectAddFormValues.PJT_NM}</Typography>
        </Grid>

        {projectAddFormValues.PJT_IMG?.preview && (
          <Grid item xs={12} textAlign={'center'} my={2}>
            <img
              src={projectAddFormValues.PJT_IMG?.preview}
              alt={'프로젝트 이미지'}
              style={{ height: 150, objectFit: 'contain' }}
            />
          </Grid>
        )}

        <Grid item xs={3}>
          <Typography fontWeight={'fontWeightMedium'}>간단 소개</Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography>{projectAddFormValues.PJT_INTRO}</Typography>
        </Grid>

        <Grid item xs={3}>
          <Typography fontWeight={'fontWeightMedium'}>
            프로젝트 등록자 역할
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography>{projectAddFormValues.CONSTRUCTOR_ROLE}</Typography>
        </Grid>

        <Grid item xs={3}>
          <Typography fontWeight={'fontWeightMedium'}>
            프로젝트 모집 인원
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Stack>
            <Typography>총 {getRoleText().roleCount}명</Typography>
            <Typography>{getRoleText().roleDetail}</Typography>
          </Stack>
        </Grid>

        <Grid item xs={3}>
          <Typography fontWeight={'fontWeightMedium'}>프로젝트 기간</Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography>{getStartDtText()}</Typography>
        </Grid>

        <Grid item xs={3}>
          <Typography fontWeight={'fontWeightMedium'}>
            프로젝트 관련 스킬
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Stack direction={'row'} spacing={0.5}>
            {projectAddFormValues.STACKS.map((stack) => (
              <Chip key={stack} label={stack} size={'small'} />
            ))}
          </Stack>
        </Grid>

        <Grid item xs={3}>
          <Typography fontWeight={'fontWeightMedium'}>
            프로젝트 관련 경험
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Stack direction={'row'} spacing={0.5}>
            {projectAddFormValues.WANTED.map((exp) => (
              <Chip key={exp} label={exp} size={'small'} />
            ))}
          </Stack>
        </Grid>

        <Grid item xs={3}>
          <Typography fontWeight={'fontWeightMedium'}>
            프로젝트 상세 공개 여부
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography>
            {
              _.find(OPEN_OPTIONS, { value: projectAddFormValues.PJT_OPEN_YN })
                ?.label
            }
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography fontWeight={'fontWeightMedium'}>
            프로젝트 상세 작성
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography>{projectAddFormValues.PJT_DETAIL}</Typography>
        </Grid>

        <Grid item container spacing={1} justifyContent={'flex-end'}>
          <Grid item>
            <Button variant={'outlined'} onClick={() => setOpen(false)}>
              이전
            </Button>
          </Grid>
          <Grid item>
            <LoadingButton onClick={handleSubmit}>등록하기</LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default ProjectAddPreview;
