import React, { useEffect, useState } from 'react';
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
import { getProjectMemberPart } from '@/services/project';
import { useSelector } from 'react-redux';
import { selectPjtSn } from '@/store/pjtsn-reducer';

const GroupPage = () => {
  const pjtSn = useSelector(selectPjtSn);
  const [memberList, setMemberList] = useState([]);
  const [partList, setPartList] = useState([]);
  const [filteredMemberList, setFilteredMemberList] = useState([]);
   // 그룹 멤버 조회
   const fetchGroupMember = async () => {
    try {
      const { data } = await getProjectMemberPart(pjtSn);
      setMemberList(data.memList);
      setPartList(data.partList);
      setFilteredMemberList(data.memList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGroupMember();
  }, []);

  const handleRoleChange = (role) => {
    if (role === 'ALL') {
      setFilteredMemberList(memberList);
    } else {
      setFilteredMemberList(memberList.filter((member) => member.part === role));
    }
  };

  return (
    <Container maxWidth="xl" sx={{ pb: 5 }}>
      <GroupSearchBar partList={partList} onRoleChange={handleRoleChange}/>
      <GroupTable memberList={filteredMemberList} partList={partList}/>
    </Container>
  );
};

export default GroupPage;
