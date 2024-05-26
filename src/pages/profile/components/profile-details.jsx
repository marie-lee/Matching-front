import {
  Avatar,
  Chip,
  Divider,
  IconButton,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { Icon } from '@iconify/react';

// ----------------------------------------------------------------------

const Career = ({ data }) => {
  return (
    <Stack spacing={1}>
      <Typography variant={'lg'}>경력</Typography>

      {data.map((career, index) => (
        <Stack key={`career_${index}`} spacing={0.5}>
          <Typography>{career.careerNm}</Typography>
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
          <Chip key={`intrst_${index}`} label={intrst} size={'small'} />
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
          <Typography>{url.desc}</Typography>
          <Link
            href={url.url}
            variant={'xs'}
            color={'text.secondary'}
            target={'_blank'}
            underline="hover"
          >
            {url.url}
          </Link>
        </Stack>
      ))}
    </Stack>
  );
};

const ProfileDetails = ({ data }) => {
  // ----------------------------------------------------------------------

  return (
    <Stack spacing={3} p={3} bgcolor={'background.default'}>
      <Typography variant={'xl'}>프로필</Typography>

      <Stack alignItems={'center'}>
        <Avatar alt={'프로필 이미지'} sx={{ width: 100, height: 100 }} />
      </Stack>

      {/* 이름, 프로필 수정 버튼 */}
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        spacing={1}
      >
        <Typography variant={'xl'}>홍길동</Typography>
        <IconButton>
          <Icon icon={'akar-icons:edit'} fontSize={24} />
        </IconButton>
      </Stack>

      {/* 한 줄 소개 */}
      <Stack>
        <Typography variant={'lg'}>나를 표현하는 한 줄 소개</Typography>
      </Stack>

      {/* 구분선 */}
      <Divider />

      {/* 경력 */}
      <Career data={data.careers} />

      {/* 구분선 */}
      <Divider />

      {/*/!* 주요 스킬 *!/*/}
      <MajorStack data={data.stacks} />

      {/*/!* 관심 분야 *!/*/}
      <Intrst data={data.intrsts} />

      {/*/!* 구분선 *!/*/}
      <Divider />

      {/*/!* 링크 *!/*/}
      <Url data={data.urls} />
    </Stack>
  );
};

export default ProfileDetails;
