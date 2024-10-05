import React from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

import { PATHS } from '@/routes/paths';
import GroupSearchBar from './components/group-search-bar';
import GroupTable from './components/group-table';

const GroupPage = () => {
  return (
    <Container maxWidth="xl" sx={{ pb: 5 }}>
      <GroupSearchBar />
      <GroupTable />
    </Container>
  );
};

export default GroupPage;
