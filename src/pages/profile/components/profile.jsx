import { Avatar, Chip, Divider, Link, Stack, Typography } from '@mui/material';

const Career = ({ data }) => {
  return (
    <Stack spacing={1}>
      <Typography variant={'lg'}>경력</Typography>
      {data.map((career, index) => (
        <Stack key={`career_${index}`} spacing={0.5}>
          <Typography>{career.careerName}</Typography>
          <Stack direction={'row'} alignItems={'center'}>
            <Typography variant={'xs'} color={'text.secondary'}>
              {`${career.enteringDt} ~ ${career.quitDt != null ? career.quitDt : '재직중'}`}
            </Typography>
          </Stack>
        </Stack>
      ))}
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
        {data.map((stack, index) => (
          <Chip
            key={`stack_${index}`}
            label={stack.stNm}
            size={'small'}
            color={`${stack.level}`}
          />
        ))}
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
            label={intrst.interest}
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
          <Typography>{url.intro}</Typography>
          <Link
            href={url.addr}
            variant={'xs'}
            color={'text.secondary'}
            target={'_blank'}
            underline="hover"
          >
            {url.addr}
          </Link>
        </Stack>
      ))}
    </Stack>
  );
};

const ProfilePreviewDetail = ({ profileEditForm }) => {
  const profile = profileEditForm.getValues();

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
        <Typography variant={'xl'}>{profile.NAME}</Typography>
      </Stack>
      <Stack>
        <Typography variant={'lg'}>{profile.INTRO}</Typography>
      </Stack>
      <Divider />
      <Career data={profile.CAREER} />
      <Divider />
      <MajorStack data={profile.STACK} />
      <Intrst data={profile.INTEREST} />
      <Divider />
      <Url data={profile.URL} />
    </Stack>
  );
};

export default ProfilePreviewDetail;
