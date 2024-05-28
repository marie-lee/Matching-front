import { Chip, Stack, Typography, useTheme } from '@mui/material';
import { Icon } from '@iconify/react';

import { BasicDataGrid } from '@/components/data-grid';

import { PROJECTS } from '@/pages/project/constants';

// ----------------------------------------------------------------------

const ProjectStatus = ({ params }) => {
  let color = '';
  const status = params.row.status;

  switch (status) {
    case '모집중':
      color = 'high';
      break;
    case '진행중':
      color = 'middle';
      break;
    case '종료':
      color = 'low';
      break;
    default:
      break;
  }

  return <Chip label={status} color={color} size={'small'} />;
};

const ProjectEmptyRows = () => {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        height: 1,
        alignItems: 'center',
        justifyContent: 'center ',
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Icon
        icon={'iconoir:multiple-pages-empty'}
        fontSize={50}
        color={theme.palette.grey[400]}
      />
      <Typography variant={'lg'} fontWeight={'fontWeightSemiBold'} mt={2}>
        프로젝트가 없습니다.
      </Typography>
      <Typography color={'text.secondary'} mt={1.5}>
        프로젝트를 등록하고, 프로젝트에 적합한 멤버를 AI로부터 추천받아보세요!
      </Typography>
      <Typography color={'text.secondary'} mt={0.3}>
        보다 적합한 멤버 추천을 위해 프로필&포트폴리오 등록도 필요해요.
      </Typography>
    </Stack>
  );
};

// ----------------------------------------------------------------------

const ProjectList = () => {
  const columns = [
    {
      field: 'nm',
      headerName: '프로젝트명',
      sortable: false,
      width: 200,
    },
    {
      field: 'desc',
      headerName: '프로젝트 설명',
      sortable: false,
      width: 350,
    },
    {
      field: 'startDt',
      headerName: '기간',
      sortable: false,
      valueGetter: (params) => `${params.row.startDt} ~ ${params.row.endDt}`,
      width: 300,
    },
    {
      field: 'status',
      headerName: '프로젝트 상태',
      sortable: false,
      renderCell: (params) => <ProjectStatus params={params} />,
      width: 150,
    },
  ];

  // ----------------------------------------------------------------------

  return (
    <BasicDataGrid
      autoHeight
      columns={columns}
      rows={PROJECTS}
      noRows={ProjectEmptyRows}
    />
  );
};

export default ProjectList;
