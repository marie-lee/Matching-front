import React from 'react';
import {
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

import { PATHS } from '@/routes/paths';

const menulist = [
  {
    value: '1',
    label: 'Backend',
  },
  {
    value: '2',
    label: 'Frontend',
  },
  {
    value: '3',
    label: 'Planner',
  },
  {
    value: '4',
    label: 'Designer',
  },
  {
    value: '5',
    label: 'ALL',
  },
];
const GroupSearchBar = () => {
  return (
    <Stack>
      <Grid pt={10} pb={2}>
        <Typography variant="lg">팀원 목록</Typography>
      </Grid>
      <Grid container>
        {/* 이름 검색창, 역할 필터 추가 */}
        <Stack direction="row" spacing={2} alignItems={'center'} minWidth={400}>
          <TextField
            fullWidth
            placeholder="검색..."
            variant="standard"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField fullWidth select defaultValue={5} variant="standard">
            {menulist.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </Grid>
    </Stack>
  );
};

export default GroupSearchBar;
