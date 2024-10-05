import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { selectName } from '@/store/name-reducer';

import { ProjectList } from '@/pages/project/components';
import { PATHS } from '@/routes/paths';
import { BasicDataGrid } from '@/components/data-grid';
import { Icon } from '@iconify/react';
import { useTheme } from '@emotion/react';
import dayjs from 'dayjs';
import SettingMenu from './group-settting-menu';

const columns = [
  {
    field: 'userNm',
    headerName: '이름',
    sortable: false,
    width: 400,
    renderCell: (params) => (
      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar src={params.row.userImg} alt={params.row.userNm} />
        <Typography>{params.row.userNm}</Typography>
        <Chip
          size="small"
          color="secondary"
          variant="outlined"
          label="관리자"
        ></Chip>
      </Stack>
    ),
  },
  {
    field: 'part',
    headerName: '역할',
    sortable: false,
    width: 300,
  },
  {
    field: 'firstDt',
    headerName: '기간',
    sortable: false,
    valueGetter: (params) => {
      if (params.row.firstDt && params.row.endDt) {
        return `${dayjs(params.row.firstDt).format('YYYY-MM-DD')} ~ ${dayjs(params.row.endDt).format('YYYY-MM-DD')}`;
      } else if (params.row.firstDt && params.row.endDt === null) {
        return `${dayjs(params.row.firstDt).format('YYYY-MM-DD')} ~ 진행 중`;
      } else {
        return '';
      }
    },
    width: 300,
  },
  {
    field: 'delYn',
    headerName: '상태',
    sortable: false,
    width: 200,
    valueGetter: (params) => (params.row.delYn === 0 ? '참여 중' : '중단'),
  },
  {
    field: 'setting',
    headerName: '',
    sortable: false,
    width: 150,
    renderCell: (params) => <SettingMenu user={params.row} />,
  },
];

const MemberEmpty = () => {
  const theme = useTheme();
  return (
    <Stack
      sx={{
        height: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Icon
        icon={'mdi:account-off-outline'}
        fontSize={50}
        color={theme.palette.grey[400]}
      />
      <Typography variant={'lg'} fontWeight={'fontWeightSemiBold'} mt={2}>
        멤버가 없습니다.
      </Typography>
    </Stack>
  );
};

const ExampleMemberList = [
  {
    pjtMemSn: 1,
    userSn: 1,
    userNm: '임동현',
    userImg: 'http://218.232.137.30:20090/matching/profile/img.png',
    pjtRoleSn: 1,
    part: 'front',
    firstDt: '2024-05-01T00:00:00.000Z',
    endDt: null,
    delYn: 0,
  },
  {
    pjtMemSn: 2,
    userSn: 2,
    userNm: '홍길동',
    userImg: 'http://218.232.137.30:20090/matching/profile/img.png',
    pjtRoleSn: 1,
    part: 'front',
    firstDt: '2024-05-01T00:00:00.000Z',
    endDt: null,
    delYn: 0,
  },
  {
    pjtMemSn: 3,
    userSn: 3,
    userNm: '김철수',
    userImg: 'http://218.232.137.30:20090/matching/profile/img.png',
    pjtRoleSn: 2,
    part: 'end',
    firstDt: '2024-05-01T00:00:00.000Z',
    endDt: null,
    delYn: 0,
  },
];

const GroupTable = () => {
  const [data, setData] = useState([]);
  return (
    <Stack pt={1}>
      <BasicDataGrid
        autoHeight
        columns={columns}
        rows={data.length > 0 ? data : ExampleMemberList}
        getRowId={(row) => row.pjtMemSn}
        noRows={MemberEmpty}
        rowHeight={60}
      />
    </Stack>
  );
};

export default GroupTable;
