import {
  Button,
  Chip,
  Dialog,
  Grid,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import _ from 'lodash';

import { ResponsiveImg } from '@/components/img';
import { getStatusUser } from '@/services/status';
import { UserInfo } from '@/pages/match/components';
import { Icon } from '@iconify/react';

// ----------------------------------------------------------------------

const ProjectSection = ({ data, handleClickUser }) => {
  return (
    <Grid item xs={12}>
      <Grid container bgcolor={'background.default'}>
        <Grid container p={2} spacing={2}>
          <Grid item sx={{ my: 0.5 }}>
            <Typography variant={'xl'} fontWeight={'fontWeightBold'}>
              {data.PJT_NM}
            </Typography>
          </Grid>

          {/* TODO: 응답데이터 형식 바뀔 경우 수정 필요함 */}
          {/* 데이터가 없을 경우 빈 배열이 아닌 0번째 인덱스에 값 null로 내려와서 다음과 같이 처리 */}
          {data?.REQ_LIST[0].REQ_SN === null ?
            <Grid item container justifyContent={'center'}>
              <Typography variant={'lg'} color={'text.secondary'}>
                해당 내역이 없습니다.
              </Typography>
            </Grid>
          : <Grid item container spacing={2}>
              <Section
                title={'제안 중인 요청'}
                data={_.filter(data.REQ_LIST, { REQ_STTS: 'REQ' })}
                handleClickUser={handleClickUser}
                confirmDisabled
              />

              <Section
                title={'개발자 승인'}
                data={_.filter(data.REQ_LIST, { REQ_STTS: 'AGREE' })}
                handleClickUser={handleClickUser}
              />

              <Section
                title={'거절'}
                data={_.filter(data.REQ_LIST, { REQ_STTS: 'REJECT' })}
                disabled
              />
            </Grid>
          }
        </Grid>
      </Grid>
    </Grid>
  );
};

// ----------------------------------------------------------------------

const Section = ({
  title,
  data,
  disabled,
  confirmDisabled,
  handleClickUser,
}) => {
  return (
    <Grid item xs={12}>
      <Grid container bgcolor={'grey.200'}>
        <Grid container p={2} spacing={2}>
          <Grid item container>
            <Typography variant={'lg'} fontWeight={'fontWeightBold'}>
              {title}
            </Typography>
          </Grid>

          {_.isEmpty(data) && (
            <Grid item container justifyContent={'center'} p={2}>
              <Typography variant={'lg'} color={'text.secondary'}>
                제안이 없습니다.
              </Typography>
            </Grid>
          )}

          {data.map((item, index) => (
            <Item
              key={`match-${index}`}
              value={item}
              disabled={disabled}
              confirmDisabled={confirmDisabled}
              handleClickUser={handleClickUser}
            />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

// ----------------------------------------------------------------------

const Item = ({ value, disabled, confirmDisabled, handleClickUser }) => {
  return (
    <Grid item xs={12} md={6}>
      <Grid container p={2} border={1} borderColor={'divider'} borderRadius={1}>
        <Grid container spacing={2} alignItems={'center'}>
          <Grid item xs={12} md={2.5}>
            <ResponsiveImg
              src={value.USER_IMG}
              alt={`${value.PF_SN} 프로필 이미지`}
              width={50}
              height={50}
              style={{ borderRadius: '50%', objectFit: 'cover' }}
            />
          </Grid>
          <Grid item xs={12} md>
            <Stack alignItems={'flex-start'} spacing={1}>
              <Link
                component={handleClickUser !== undefined && 'button'}
                underline={handleClickUser !== undefined ? 'hover' : 'none'}
                onClick={() => handleClickUser(value.USER_SN)}
              >
                <Stack direction={'row'} alignItems={'center'} spacing={0.5}>
                  <Typography variant={'lg'} fontWeight={'fontWeightSemiBold'}>
                    {value.USER_NM}
                  </Typography>

                  {handleClickUser !== undefined && (
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
                  <Button fullWidth size={'small'}>
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

const SentProposalList = ({ data }) => {
  const [userDialogOpen, setUserDialogOpen] = useState(false);

  const [user, setUser] = useState();

  const fetchUserDetail = async (userSn) => {
    try {
      const res = await getStatusUser(userSn);
      setUser(res?.data);
      setUserDialogOpen(true);
    } catch (error) {
      console.dir(error);
    }
  };

  const handleClickUser = (userSn) => {
    fetchUserDetail(userSn);
  };

  return (
    <Grid container spacing={3}>
      {data.map((item) => (
        <ProjectSection
          key={`project_${item.PJT_SN}`}
          data={item}
          handleClickUser={handleClickUser}
        />
      ))}

      {/* 개발자 프로필/포트폴리오 상세 조회 Dialog */}
      <Dialog
        fullWidth
        maxWidth={'md'}
        open={userDialogOpen}
        onClose={() => setUserDialogOpen(false)}
      >
        <UserInfo
          profile={user?.profile ? user?.profile[0] : {}}
          portfolioInfo={user?.portfolioInfo}
        />
      </Dialog>
    </Grid>
  );
};

export default SentProposalList;
