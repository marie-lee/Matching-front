import { AccountCircle } from '@mui/icons-material';
import { Button, Grid, Stack, TextField, Typography } from '@mui/material';

const ReviewInputText = ({ review, setReview }) => {
  return (
    <Grid item xs={12}>
      <Stack spacing={2}>
        <Typography variant={'lg'} fontWeight={'fontWeightSemiBold'}>
          리뷰 남기기
        </Typography>
        <Stack
          spacing={2}
          p={2}
          bgcolor={'background.default'}
          borderRadius={1}
        >
          <TextField
            size={'medium'}
            variant={'standard'}
            multiline
            rows={6}
            placeholder="해당 팀원에 대한 전반적인 리뷰를 남겨주세요"
            InputProps={{
              disableUnderline: true, // <== added this
            }}
          />
        </Stack>
        {/* 제출 버튼 */}
        <Stack direction={'row'} justifyContent={'center'} spacing={1} mt={2}>
          <Button
            variant={'contained'}
            color={'primary'}
            onClick={() => {
              // 리뷰 제출
            }}
          >
            제출
          </Button>
        </Stack>
      </Stack>
    </Grid>
  );
};

export default ReviewInputText;
