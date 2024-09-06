import {
  Avatar,
  Chip,
  Divider,
  IconButton,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/routes/paths';
import { instance } from '@/services/config';
import { set } from 'date-fns';

const Career = ({ data }) => {
  return (
    <Stack spacing={1}>
      <Typography variant={'lg'}>경력</Typography>
      {data.map((career, index) => (
        <Stack key={`career_${index}`} spacing={0.5}>
          <Typography>{career.careerName}</Typography>
          <Stack direction={'row'} alignItems={'center'}>
            <Typography variant={'xs'} color={'text.secondary'}>
              {`${career.enteringDt} ~ ${career.quitDt != true ? career.quitDt : '재직중'}`}
            </Typography>
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};

const MajorStack = ({ data }) => {
  console.log('data', data);
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
              label={stack.stNm}
              size={'small'}
              color={stack.level}
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
        {data.length === 0 ?
          <Typography variant={'sm'} color={'text.secondary'}>
            등록된 스킬이 없습니다.
          </Typography>
        : data.map((intrst, index) => (
            <Chip key={`intrst_${index}`} label={intrst} size={'small'} />
          ))
        }
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

const ProfileDetails = ({ profileData, setProfileData }) => {
  const navigate = useNavigate();
  const [careers, setCareers] = useState([]);
  const [stack, setStack] = useState([]);
  const [interest, setInterest] = useState([]);
  const [url, setUrl] = useState([]);
  const [intro, setIntro] = useState([]);
  const [name, setName] = useState([]);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get('member/profile');
        const data = response.data;
        console.log('datadd', data);
        // 경력 데이터가 없는 경우
        if (data.profile.career === null) {
          data.profile.career = [];
        }
        const careersData = data.profile.career.map((career) => ({
          careerName: career.CAREER_NM,
          enteringDt: career.ENTERING_DT,
          quitDt: career.QUIT_DT === null ? true : career.QUIT_DT,
        }));
        setCareers(careersData);
        setName(data.profile.USER_NM);
        setAvatar(data.profile.USER_IMG);
        setIntro(data.profile.PF_INTRO);

        if (data.profile.stack === null) {
          data.profile.stack = [];
        }
        const stacksData = data.profile.stack.map((stack) => ({
          stNm: stack.ST_NM,
          level: stack.ST_LEVEL,
        }));
        setStack(stacksData);

        if (data.profile.interest === null) {
          data.profile.interest = [];
        }
        const interestData = data.profile.interest.map(
          (interest) => interest.INTEREST_NM,
        );
        setInterest(interestData);

        if (data.profile.url === null) {
          data.profile.url = [];
        }
        const urlsData = data.profile.url.map((url) => ({
          addr: url.URL_ADDR,
          intro: url.URL_INTRO,
        }));
        setUrl(urlsData);
        // Update quitDt to true if it is null
        data.profile.career = data.profile.career.map((career) => ({
          ...career,
          QUIT_DT: career.QUIT_DT === null ? true : career.QUIT_DT,
        }));
        console.log('인풋값에 넣을거', data);
        setProfileData(data);
      } catch (error) {
        console.log('error: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Stack spacing={3} p={3} bgcolor={'background.default'}>
      <Typography variant={'xl'}>프로필</Typography>
      <Stack alignItems={'center'}>
        <Avatar
          alt={'프로필 이미지'}
          sx={{ width: 100, height: 100 }}
          src={avatar}
        />
      </Stack>
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        spacing={1}
      >
        <Typography variant={'xl'}>{name}</Typography>
        <IconButton
          onClick={() =>
            navigate(PATHS.profiles.editProfile, { state: { profileData } })
          }
        >
          <Icon icon={'akar-icons:edit'} fontSize={24} />
        </IconButton>
      </Stack>
      <Stack>
        <Typography variant={'lg'}>{intro}</Typography>
      </Stack>
      <Divider />
      <Career data={careers} />
      <Divider />
      <MajorStack data={stack} />
      <Intrst data={interest} />
      <Divider />
      <Url data={url} />
    </Stack>
  );
};

export default ProfileDetails;
