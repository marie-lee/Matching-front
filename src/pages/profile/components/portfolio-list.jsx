import {
  Button,
  Chip,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { ResponsiveImg } from '@/components/img';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/routes/paths';
import { useEffect, useState } from 'react';
import { instance } from '@/services/config';
// ----------------------------------------------------------------------

const PortfolioList = ({ hasProfile, hasPortfolio }) => {
  const navigate = useNavigate();

  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get('member/profile');
        const data = response.data;
        console.log('data', data.portfolioInfo);
        const PORTFOLIOS = data.portfolioInfo.map((item) => ({
          id: item.PFOL_SN,
          pfolNm: item.PFOL_NM,
          //인트로가 없음 추가해야함
          intro: '인트로가 없어서 임의로 추가 합니다.',
          startDt: item.START_DT,
          endDt: item.END_DT,
          stacks: item.stack.map((stackItem) => ({ stNm: stackItem.ST_NM })),
          img: item.IMG,
        }));
        console.log('PORTFOLIOS', PORTFOLIOS);
        setPortfolio(PORTFOLIOS);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchData();
  }, []);

  const renderList = () => {
    return (
      <Grid container columnSpacing={2} rowSpacing={3}>
        {portfolio.map((pfol) => (
          <Grid item xs={12} md={4} key={pfol.id}>
            <Stack spacing={0.5} sx={{ cursor: 'pointer' }}>
              {/* 대표 이미지 */}
              <ResponsiveImg
                src={pfol.img}
                alt={`${pfol.pfolNm}_image`}
                width={230}
                height={150}
              />

              {/* 포트폴리오 제목 */}
              <Typography component={'p'} variant={'lg'}>
                {pfol.pfolNm}
              </Typography>

              {/* 프로젝트 기간 */}
              <Typography
                component={'p'}
                variant={'sm'}
                color={'text.secondary'}
              >
                {`${pfol.startDt} ~ ${pfol.endDt}`}
              </Typography>

              {/* 사용 스킬 */}
              <Stack useFlexGap flexWrap={'wrap'} direction={'row'} gap={0.7}>
                {pfol.stacks.map((stack, index) => (
                  <Chip
                    key={`${pfol.pfolNm}_stack_${index}`}
                    label={stack.stNm}
                    size={'small'}
                  />
                ))}
              </Stack>
            </Stack>
          </Grid>
        ))}
      </Grid>
    );
  };

  // ----------------------------------------------------------------------

  return (
    <Stack p={3} rowGap={3} bgcolor={'background.default'}>
      <Stack direction={'row'} justifyContent={'space-between'} spacing={1}>
        <Typography variant={'xl'}>포트폴리오</Typography>
        <IconButton>
          <Icon icon={'akar-icons:edit'} fontSize={24} />
        </IconButton>
      </Stack>

      {/* 포트폴리오가 있는 경우 */}
      {hasPortfolio && renderList()}

      {/* 포트폴리오가 없고, 프로필은 있는 경우 */}
      {!hasPortfolio && hasProfile && (
        <Stack spacing={2} p={3} bgcolor={'background.neutral'}>
          <Typography textAlign={'center'}>
            아직 등록한 포트폴리오가 없어요! 🥲
          </Typography>
          <Button onClick={() => navigate(PATHS.profiles.editPortfolio)}>
            포트폴리오 추가하러 가기
          </Button>
        </Stack>
      )}
    </Stack>
  );
};

export default PortfolioList;
