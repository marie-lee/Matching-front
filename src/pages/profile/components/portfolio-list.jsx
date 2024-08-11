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
import PortfolioDetail from './portfolio-detail';
// ----------------------------------------------------------------------

const PortfolioList = ({ hasProfile }) => {
  const navigate = useNavigate();
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);

  const handlePortfolioClick = (portfolio) => {
    setSelectedPortfolio(portfolio);
  };

  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get('member/profile');
        const data = response.data;
        const PORTFOLIOS = data.portfolioInfo.map((item) => ({
          id: item.PFOL_SN,
          pfolNm: item.PFOL_NM,
          startDt: item.START_DT,
          endDt: item.END_DT,
          stacks: item.stack.map((stackItem) => ({ stNm: stackItem.ST_NM })),
          img: item.IMG,
        }));
        setPortfolio(PORTFOLIOS);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchData();
  }, []);

  const renderList = () => {
    return (
      <div>
        <Grid container columnSpacing={2} rowSpacing={3}>
          {portfolio.map((pfol, index) => (
            <Grid
              item
              xs={12}
              md={4}
              key={pfol.id}
              onClick={() => handlePortfolioClick(pfol)}
            >
              <Stack spacing={0.5} sx={{ cursor: 'pointer' }}>
                {/* 대표 이미지 */}
                <ResponsiveImg
                  src={pfol.img}
                  alt={`${pfol.pfolNm}`}
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
        {selectedPortfolio && (
          <PortfolioDetail
            open={!!selectedPortfolio}
            setOpen={() => setSelectedPortfolio(null)}
            portfolioId={selectedPortfolio.id}
          />
        )}
      </div>
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
      {portfolio && renderList()}

      {/* 포트폴리오가 없고, 프로필은 있는 경우 */}
      {!portfolio.length && hasProfile && (
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
