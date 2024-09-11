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

import { ResponsiveImg } from '@/components/img';
import { getStatusProject } from '@/services/status';

// ----------------------------------------------------------------------

const Section = ({
  title,
  keyName,
  data,
  disabled,
  confirmDisabled,
  handleClickProject,
  handleClickReq,
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

          {_.isEmpty(data) && (
            <Grid item container justifyContent={'center'} p={2}>
              <Typography variant={'lg'} color={'text.secondary'}>
                해당 내역이 없습니다.
              </Typography>
            </Grid>
          )}

          {data.map((item, index) => (
            <Item
              key={`match-${keyName}-${index}`}
              value={item}
              disabled={disabled}
              confirmDisabled={confirmDisabled}
              handleClickProject={handleClickProject}
              handleClickReq={handleClickReq}
            />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

// ----------------------------------------------------------------------

const Item = ({
  value,
  disabled,
  confirmDisabled,
  handleClickProject,
  handleClickReq,
}) => {
  return (
    <Grid item xs={12}>
      <Grid container p={2} border={1} borderColor={'divider'} borderRadius={1}>
        <Grid container spacing={2} alignItems={'center'}>
          <Grid item xs={12} md={3}>
            <ResponsiveImg
              src={value.PJT_IMG}
              alt={`${value.PJT_SN}_${value.REQ_SN}_이미지`}
              width={150}
              height={80}
            />
          </Grid>
          <Grid item xs={12} md>
            <Stack alignItems={'flex-start'} spacing={1}>
              <Link
                component={handleClickProject !== undefined && 'button'}
                underline={handleClickProject !== undefined ? 'hover' : 'none'}
                onClick={() => handleClickProject(value.PJT_SN)}
              >
                <Stack direction={'row'} alignItems={'center'} spacing={0.5}>
                  <Typography variant={'lg'} fontWeight={'fontWeightSemiBold'}>
                    {value.PJT_NM}
                  </Typography>

                  {handleClickProject !== undefined && (
                    <Icon icon={'iconoir:google-docs'} />
                  )}
                </Stack>
              </Link>

              <Chip label={value.PART} size={'small'} />
            </Stack>
          </Grid>

          {!disabled && (
            <Grid item container xs={12} md={2} spacing={1}>
              {!confirmDisabled && (
                <Grid item xs={6} md={12}>
                  <Button
                    fullWidth
                    size={'small'}
                    onClick={() =>
                      handleClickReq(value.PJT_SN, value.REQ_SN, 'AGREE')
                    }
                  >
                    수락
                  </Button>
                </Grid>
              )}
              <Grid item xs={6} md={12}>
                <Button
                  fullWidth
                  variant={'outlined'}
                  color={'error'}
                  size={'small'}
                  onClick={() =>
                    handleClickReq(value.PJT_SN, value.REQ_SN, 'REJECT')
                  }
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

const ReceivedProposalList = ({ data, setSelectedProject, handleClickReq }) => {
  const [project, setProject] = useState();

  const fetchProjectDetail = async (pjtSn) => {
    try {
      const res = await getStatusProject(pjtSn);
      setProject(res?.data);
      setSelectedProject(res?.data);
    } catch (error) {
      console.dir(error);
    }
  };

  const handleClickProject = (pjtSn) => {
    fetchProjectDetail(pjtSn);
  };

  // ----------------------------------------------------------------------

  return (
    <Grid container spacing={3}>
      <Section
        title={'요청 온 제안'}
        data={_.filter(data, { REQ_STTS: 'REQ' })}
        keyName={'req'}
        handleClickProject={handleClickProject}
        handleClickReq={handleClickReq}
      />

      <Section
        title={'승인 대기'}
        data={_.filter(data, { REQ_STTS: 'AGREE' })}
        keyName={'agree'}
        confirmDisabled
        handleClickProject={handleClickProject}
        handleClickReq={handleClickReq}
      />

      {/* 프로젝트 상태가 모집중(RECRUIT)이면서, 참여 완료(CONFIRM)인 경우에만 조회 가능 */}
      <Section
        title={'최종 참여'}
        data={_.filter(data, { REQ_STTS: 'CONFIRM' })}
        keyName={'confirm'}
        disabled={true}
        handleClickProject={handleClickProject}
        handleClickReq={handleClickReq}
      />

      <Section
        title={'거절'}
        data={_.filter(
          data,
          (value) => value.REQ_STTS === 'CANCEL' || value.REQ_STTS === 'REJECT',
        )}
        keyName={'cancel'}
        disabled={true}
        handleClickReq={handleClickReq}
      />
    </Grid>
  );
};

export default ReceivedProposalList;
