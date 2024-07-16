import { useState } from 'react';
import { Grid, Typography, TextField } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ProjectInfo = () => {
  const [startDate, setStartDate] = useState(new Date('2024-06-30'));
  const [endDate, setEndDate] = useState(new Date('2024-12-11'));

  const projectInfos = {
    작성자: '이종은',
    작성일: '2024-06-09',
    시작일: startDate,
    종료일: endDate,
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  return (
    <Grid container spacing={2} direction="column" sx={{ width: '20%' }}>
      <Grid item>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          프로젝트 정보
        </Typography>
      </Grid>
      {Object.keys(projectInfos).map((key) => (
        <Grid ml={3} item container key={key}>
          <Grid item xs={4}>
            <Typography sx={{ color: 'grey.600' }}>{key}</Typography>
          </Grid>
          <Grid item xs={8}>
            {key === '시작일' || key === '종료일' ?
              <DatePicker
                selected={projectInfos[key]}
                onChange={
                  key === '시작일' ? handleStartDateChange : handleEndDateChange
                }
                dateFormat="yyyy-MM-dd"
                customInput={
                  <TextField
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                    }}
                  />
                }
              />
            : <Typography>{projectInfos[key]}</Typography>}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProjectInfo;
