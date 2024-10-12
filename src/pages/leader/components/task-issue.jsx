import { Box, Stack, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts';
import { STATUS_LIST } from '@/pages/task/constants';

const TaskIssue = () => {
  return (
    <Stack
      spacing={2}
      useFlexGap
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
        Task & Issue
      </Typography>

      <Box>
        <PieChart
          height={300}
          margin={{ right: 5 }} // 그래프 가운데 정렬을 위해 추가
          series={[
            {
              innerRadius: 70,
              paddingAngle: 1,
              data: [
                {
                  label: STATUS_LIST[0].label,
                  value: 10,
                  color: STATUS_LIST[0].style.backgroundColor,
                },
                {
                  label: STATUS_LIST[1].label,
                  value: 20,
                  color: STATUS_LIST[1].style.backgroundColor,
                },
                {
                  label: STATUS_LIST[2].label,
                  value: 80,
                  color: STATUS_LIST[2].style.backgroundColor,
                },
                {
                  label: STATUS_LIST[3].label,
                  value: 80,
                  color: STATUS_LIST[3].style.backgroundColor,
                },
                {
                  label: STATUS_LIST[4].label,
                  value: 80,
                  color: STATUS_LIST[4].style.backgroundColor,
                },
                {
                  label: STATUS_LIST[5].label,
                  value: 80,
                  color: STATUS_LIST[5].style.backgroundColor,
                },
              ],
            },
          ]}
          slotProps={{
            legend: { hidden: true },
          }}
        />

        <Stack spacing={2} mt={4}>
          {STATUS_LIST.map((item, index) => (
            <Stack direction={'row'} key={`status-${index}`} spacing={1}>
              <Stack direction={'row'} spacing={2} alignItems={'center'}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: item.style.backgroundColor,
                  }}
                />
                <Typography>{item.label}</Typography>
              </Stack>
              <Box flexGrow={1} />
              <Stack direction={'row'} spacing={1}>
                <Typography variant={'sm'}>Task 1</Typography>
                <Typography variant={'sm'}>Issue 2</Typography>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};

export default TaskIssue;
