import React, { useState } from 'react';
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

const GroupSearchBar = ({partList, onRoleChange, onSearchChange}) => {
  // "ALL" 옵션을 partList에 추가
  const updatedPartList = [{part: 'ALL'}, ...partList];
  const [selectedPart, setSelectedPart] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const handleRoleChange = (event) => {
    const role = event.target.value;
    setSelectedPart(role);
    onRoleChange(role);
  }

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearchChange(term);
  }

  return (
    <Stack>
      <Grid pt={10} pb={2}>
        <Typography variant="lg">팀원 목록</Typography>
      </Grid>
      <Grid container>
        {/* 검색창, 역할 필터 추가 */}
        <Stack direction="row" spacing={2} alignItems={'center'} minWidth={400}>
          <TextField
            fullWidth
            placeholder="검색..."
            variant="standard"
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField fullWidth select defaultValue={'ALL'} variant="standard" onChange={handleRoleChange} value={selectedPart}>
            {updatedPartList.map((option) => (
              <MenuItem key={option.part} value={option.part}>
                {option.part}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </Grid>
    </Stack>
  );
};

export default GroupSearchBar;
