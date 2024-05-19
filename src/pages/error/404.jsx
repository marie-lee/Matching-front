import { Button, Container, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Stack minHeight={'100vh'} justifyContent={'center'}>
        {/* 안내 문구 */}
        <Stack spacing={1}>
          <Typography
            variant={'xl'}
            fontWeight={'bold'}
            component={'p'}
            align={'center'}
          >
            원하시는 페이지를 찾을 수 없습니다.
          </Typography>
          <Typography variant={'base'} component={'p'} align={'center'}>
            찾으려는 페이지 주소가 잘못 입력되었거나, <br />
            주소의 변경 혹은 삭제로 인해 사용하실 수 없습니다.
          </Typography>
        </Stack>

        {/* 버튼 */}
        <Stack direction={'row'} spacing={2} mt={4} alignSelf={'center'}>
          <Button variant={'outlined'} onClick={() => navigate(-1)}>
            이전 화면으로 돌아가기
          </Button>
          <Button variant={'contained'} onClick={() => navigate('/')}>
            홈으로 가기
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default NotFoundPage;
