import { Box, Stack, Typography } from '@mui/material';
import { PieChart, useDrawingArea } from '@mui/x-charts';
import { palette } from '@/theme/palette.js';

const PieCenterLabel = ({ children }) => {
  const { width, height, left, top } = useDrawingArea();
  return (
    <text
      x={left + width / 2}
      y={top + height / 2}
      textAnchor={'middle'}
      dominantBaseline={'central'}
      fontSize={50}
      fontWeight={600}
    >
      {children}
    </text>
  );
};

// ----------------------------------------------------------------------

const Progress = () => {
  return (
    <Stack
      spacing={2}
      sx={{
        pt: 3,
        pb: 4,
        px: 3,
        height: '100%',
        backgroundColor: 'background.paper',
        boxShadow: (theme) => theme.customShadows.z1,
      }}
    >
      <Typography variant={'xl'} fontWeight={'fontWeightBold'}>
        Progress
      </Typography>

      <Box>
        <PieChart
          height={300}
          margin={{ right: 5 }} // 그래프 가운데 정렬을 위해 추가
          tooltip={{ trigger: 'none' }} // 마우스 호버 시, label 표시 비활성화
          series={[
            {
              data: [
                { value: 80, color: palette.info.main }, // 진척률
                { value: 100 - 80, color: palette.grey[400] }, // 남은 진척률
              ],
              innerRadius: 120,
            },
          ]}
        >
          {/* 가운데 진척률 표시 */}
          <PieCenterLabel>80%</PieCenterLabel>
        </PieChart>
      </Box>
    </Stack>
  );
};

export default Progress;
