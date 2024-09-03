//React Import
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
//Mui Import
import { Grid, Typography, TextField, Box } from '@mui/material';

//Data Import
import { setPjtData } from '@/store/wbsSlice';
import { selectName } from '@/store/name-reducer';

//Api Import
import 'react-datepicker/dist/react-datepicker.css';

const ProjectInfo = () => {
  const dispatch = useDispatch();
  const userName = useSelector(selectName);

  const pjtData = useSelector((state) => state.wbs.pjtData || {});
  const nowData = new Date()
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\./g, '-')
    .replace(/-\s/g, '-')
    .slice(0, -1);

  const [startDate, setStartDate] = useState(
    new Date(pjtData.startDt || nowData),
  );
  const [endDate, setEndDate] = useState(new Date(pjtData.endDt || nowData));

  useEffect(() => {
    setStartDate(new Date(pjtData.startDt || nowData));
    setEndDate(new Date(pjtData.endDt || nowData));
  }, [pjtData, nowData]);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    updatePjtData(date, endDate);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    updatePjtData(startDate, date);
  };

  const updatePjtData = (start, end) => {
    dispatch(
      setPjtData({
        startDt: start.toISOString().split('T')[0],
        endDt: end.toISOString().split('T')[0],
      }),
    );
  };

  return (
    <Box sx={{ pl: 3 }}>
      <Grid container spacing={3}>
        <Grid container justifyContent="flex-end" mb={5} mt={10}>
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
                {userName}
              </Typography>
              <Typography variant="body1" fontWeight={'fontWeightSemiBold'}>
                {nowData}
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
