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

const ProjectInfo = ({ setStartDate, setEndDate }) => {
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

  const [localStartDate, setLocalStartDate] = useState(
    new Date(pjtData.startDt || nowData),
  );
  const [localEndDate, setLocalEndDate] = useState(
    new Date(pjtData.endDt || nowData),
  );

  useEffect(() => {
    setLocalStartDate(new Date(pjtData.startDt || nowData));
    setLocalEndDate(new Date(pjtData.endDt || nowData));
  }, [pjtData, nowData]);

  useEffect(() => {
    // 부모 컴포넌트로 startDate와 endDate 전달
    setStartDate(localStartDate);
    setEndDate(localEndDate);
  }, [localStartDate, localEndDate, setStartDate, setEndDate]);

  const handleStartDateChange = (date) => {
    setLocalStartDate(date);
    updatePjtData(date, localEndDate);
  };

  const handleEndDateChange = (date) => {
    setLocalEndDate(date);
    updatePjtData(localStartDate, date);
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
                selected={localStartDate}
                onChange={handleStartDateChange}
                dateFormat="yyyy-MM-dd"
                customInput={
                  <TextField
                    label="시작일"
                    variant="outlined"
                    fullWidth
                    InputProps={{}}
                  />
                }
              />
            </Grid>

            <Grid>
              <DatePicker
                selected={localEndDate}
                onChange={handleEndDateChange}
                dateFormat="yyyy-MM-dd"
                customInput={
                  <TextField label="종료일" variant="outlined" fullWidth />
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
