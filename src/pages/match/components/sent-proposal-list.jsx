import {
  Button,
  Chip,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import _ from 'lodash';

import { ResponsiveImg } from '@/components/img';
import { getStatusUser } from '@/services/status';
import { Icon } from '@iconify/react';
import { ArrowDropDown } from '@mui/icons-material';

// ----------------------------------------------------------------------

const ProjectSection = ({ data, handleClickUser, handleClickReq }) => {
  return (
    <Grid item xs={12}>
      <Grid container bgcolor={'background.default'}>
        <Grid container p={2} spacing={2}>
          {/* TODO: 응답데이터 형식 바뀔 경우 수정 필요함 */}
          {/* 데이터가 없을 경우 빈 배열이 아닌 0번째 인덱스에 값 null로 내려와서 다음과 같이 처리 */}
          {data === undefined ?
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
                handleClickReq={handleClickReq}
                confirmDisabled
                pjtSn={data.PJT_SN}
              />

              <Section
                title={'개발자 승인'}
                data={_.filter(data.REQ_LIST, { REQ_STTS: 'AGREE' })}
                handleClickUser={handleClickUser}
                handleClickReq={handleClickReq}
                pjtSn={data.PJT_SN}
              />

              <Section
                title={'거절'}
                data={_.filter(data.REQ_LIST, (value) => {
                  if (
                    value.REQ_STTS === 'CANCEL' ||
                    value.REQ_STTS === 'REJECT'
                  ) {
                    return value;
                  }
                })}
                handleClickReq={handleClickReq}
                disabled
                pjtSn={data.PJT_SN}
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
  pjtSn,
  disabled,
  confirmDisabled,
  handleClickUser,
  handleClickReq,
}) => {
  return (
    <Grid item xs={12}>
      <Grid item container justifyContent={'space-between'}>
        <Typography variant={'lg'} fontWeight={'fontWeightBold'}>
          {title}
        </Typography>
        <ArrowDropDown></ArrowDropDown>
      </Grid>
      <Grid py={1}>
        <Divider></Divider>
      </Grid>
      <Grid container bgcolor={'grey.200'}>
        <Grid container p={1} spacing={2}>
          {_.isEmpty(data) && (
            <Grid item container justifyContent={'center'} m={4}>
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
              handleClickReq={handleClickReq}
              pjtSn={pjtSn}
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
  handleClickUser,
  handleClickReq,
  pjtSn,
}) => {
  console.log(value);

  return (
    <Grid item xs={12} md={6}>
      <Grid container p={1} bgcolor={'Background'}>
        <Grid container spacing={2} alignItems={'center'}>
          <Grid item xs={12} md={3}>
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
                onClick={() => handleClickUser(pjtSn, value.USER_SN)}
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
            <Grid item container xs={12} md={4} spacing={1}>
              {!confirmDisabled && (
                <Grid item xs={6} md={12}>
                  <Button
                    fullWidth
                    size={'small'}
                    onClick={() =>
                      handleClickReq(pjtSn, value?.REQ_SN, 'CONFIRM')
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
                  onClick={() => handleClickReq(pjtSn, value?.REQ_SN, 'CANCEL')}
                >
                  {confirmDisabled ? '취소' : '거절'}
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

const SentProposalList = ({ data, setSelectedMember, handleClickReq }) => {
  const [userDialogOpen, setUserDialogOpen] = useState(false);

  const [user, setUser] = useState();

  const fetchUserDetail = async (pjtSn, userSn) => {
    try {
      const res = await getStatusUser(pjtSn, userSn);
      setUser(res?.data);
      setSelectedMember(res?.data);
      setUserDialogOpen(true);
    } catch (error) {
      console.dir(error);
    }
  };

  const handleClickUser = (pjtSn, userSn) => {
    fetchUserDetail(pjtSn, userSn);
  };

  return (
    <Grid container spacing={3}>
      <ProjectSection
        key={`project_${1}`}
        data={data}
        handleClickUser={handleClickUser}
        handleClickReq={handleClickReq}
      />
    </Grid>
  );
};

export default SentProposalList;
