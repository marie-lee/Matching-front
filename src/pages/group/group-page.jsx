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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('ALL');
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
    setSelectedRole(role);
    filterMembers(role, searchTerm);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    filterMembers(selectedRole, term);
  };

  const filterMembers = (role, term) => {
    let filtered = memberList;
    if (role !== 'ALL') {
      filtered = filtered.filter((member) => member.part === role);
    }
    if (term) {
      filtered = filtered.filter((member) =>
        member.userNm.toLowerCase().includes(term.toLowerCase())
      );
    }
    setFilteredMemberList(filtered);
  };

  return (
    <Container maxWidth="xl" sx={{ pb: 5 }}>
      <GroupSearchBar partList={partList} onRoleChange={handleRoleChange} onSearchChange={handleSearchChange}/>
      <GroupTable memberList={filteredMemberList} partList={partList}/>
    </Container>
  );
};

export default GroupPage;
