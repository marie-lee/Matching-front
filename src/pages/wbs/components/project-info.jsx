import { useState } from 'react';
import { Grid, Typography, TextField, Box } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ProjectInfo = () => {
  const [startDate, setStartDate] = useState(new Date('2024-06-30'));
  const [endDate, setEndDate] = useState(new Date());

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  return (
    <Box sx={{ pl: 3 }}>
      <Grid container spacing={3}>
        <Grid container xs={12} justifyContent="flex-end" mb={5} mt={10}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Box sx={{ mr: 3 }}>
              <Typography variant="body1" fontWeight={'fontWeightSemiBold'}>
                작성자
              </Typography>
              <Typography variant="body1" fontWeight={'fontWeightSemiBold'}>
                작성일
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="body1" fontWeight={'fontWeightSemiBold'}>
                이종은
              </Typography>
              <Typography variant="body1" fontWeight={'fontWeightSemiBold'}>
                2024-06-30
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            <li>프로젝트 기간</li>
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          mt={5}
          sx={{ backgroundColor: '#fff', borderRadius: '5px' }}
          alignItems="center"
          justifyContent="flex-start"
        >
          <Grid container alignItems="center" p={2} spacing={3}>
            <Grid mr={3}>
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                dateFormat="yyyy-MM-dd"
                customInput={
                  <TextField
                    label="시작일"
                    variant="outlined"
                    fullWidth
                    InputProps={{ sx: { height: 40 } }}
                  />
                }
              />
            </Grid>

            <Grid>
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                dateFormat="yyyy-MM-dd"
                customInput={
                  <TextField
                    label="종료일"
                    variant="outlined"
                    fullWidth
                    InputProps={{ sx: { height: 40 } }}
                  />
                }
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProjectInfo;
