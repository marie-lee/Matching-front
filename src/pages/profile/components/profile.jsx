import { Avatar, Chip, Divider, Link, Stack, Typography } from '@mui/material';

const Career = ({ data }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
    });
  };
  return (
    <Stack spacing={1}>
      <Typography variant={'lg'}>경력</Typography>
      {data === undefined ?
        <Typography variant={'sm'} color={'text.secondary'}>
          등록된 경력이 없습니다.
        </Typography>
      : data.map((career, index) => (
          <Stack key={`career_${index}`} spacing={0.5}>
            <Typography>{career.CARRER_NM}</Typography>
            <Stack direction={'row'} alignItems={'center'}>
              <Typography variant={'xs'} color={'text.secondary'}>
                {`${formatDate(career.ENTERING_DT)} ~ ${career.QUIT_DT != true ? formatDate(career.QUIT_DT) : '재직 중'}`}
              </Typography>
            </Stack>
          </Stack>
        ))
      }
    </Stack>
  );
};

const MajorStack = ({ data }) => {
  return (
    <Stack spacing={1}>
      <Stack direction={'row'} alignItems={'center'} spacing={1}>
        <Typography variant={'lg'}>주요 스킬</Typography>
        <Typography variant={'sm'} color={'text.secondary'}>
          {data.length}개
        </Typography>
      </Stack>
      <Stack flexWrap={'wrap'} direction={'row'} useFlexGap spacing={0.5}>
        {data.length === 0 ?
          <Typography variant={'sm'} color={'text.secondary'}>
            등록된 스킬이 없습니다.
          </Typography>
        : data.map((stack, index) => (
            <Chip
              key={`stack_${index}`}
              label={stack.ST_NM}
              size={'small'}
              color={stack.ST_LEVEL}
            />
          ))
        }
      </Stack>
    </Stack>
  );
};

const Intrst = ({ data }) => {
  return (
    <Stack spacing={1}>
      <Stack direction={'row'} alignItems={'center'} spacing={1}>
        <Typography variant={'lg'}>관심 분야</Typography>
        <Typography variant={'sm'} color={'text.secondary'}>
          {data.length}개
        </Typography>
      </Stack>
      <Stack flexWrap direction={'row'} spacing={0.5}>
        {data.map((intrst, index) => (
          <Chip
            key={`intrst_${index}`}
            label={intrst.INTEREST_NM}
            size={'small'}
          />
        ))}
      </Stack>
    </Stack>
  );
};

const Url = ({ data }) => {
  return (
    <Stack spacing={1}>
      <Typography variant={'lg'}>링크</Typography>
      {data.map((url, index) => (
        <Stack key={`url_${index}`} spacing={0.5}>
          <Typography>{url.URL_INTRO}</Typography>
          <Link
            href={url.addr}
            variant={'xs'}
            color={'text.secondary'}
            target={'_blank'}
            underline="hover"
          >
            {url.URL_ADDR}
          </Link>
        </Stack>
      ))}
    </Stack>
  );
};

const ProfilePreviewDetail = ({ profileEditForm }) => {
  const PreviewData = profileEditForm.getValues();
  const profile = PreviewData.profile;
  console.log('profile', profile);

  return (
    <Stack spacing={3} p={3} bgcolor={'background.default'}>
      <Typography variant={'xl'}>프로필</Typography>
      <Stack alignItems={'center'}>
        <Avatar alt={'프로필 이미지'} sx={{ width: 100, height: 100 }} />
      </Stack>
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        spacing={1}
      >
        <Typography variant={'xl'}>{profile.USER_NM}</Typography>
      </Stack>
      <Stack>
        <Typography variant={'lg'}>{profile.PF_INTRO}</Typography>
      </Stack>
      <Divider />
      <Career data={profile.career} />
      <Divider />
      <MajorStack data={profile.stack} />
      <Intrst data={profile.interest} />
      <Divider />
      <Url data={profile.url} />
    </Stack>
  );
};

export default ProfilePreviewDetail;
