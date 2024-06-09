import { Chip, Stack, Typography, useTheme } from '@mui/material';
import { Icon } from '@iconify/react';

import { BasicDataGrid } from '@/components/data-grid';

import { PROJECTS } from '@/pages/project/constants';
import { PATHS } from '@/routes/paths';
import { getProjectList } from '@/services/project';

// ----------------------------------------------------------------------

const ProjectStatus = ({ params }) => {
  let color = '';
  let label = params.row.PJT_STTS;
  const hasLeaderRole = params.row.hasLeaderRole;

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
      color = 'LOW';
      break;
  }

  return (
    <Stack direction={'row'} spacing={1}>
      <Chip label={label} color={color} size={'small'} />
      {hasLeaderRole && <Chip label={'MY'} color={'primary'} size={'small'} />}
    </Stack>
  );
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
  const navigate = useNavigate();

  const columns = [
    {
      field: 'PJT_NM',
      headerName: '프로젝트명',
      sortable: false,
      width: 200,
    },
    {
      field: 'PJT_INTRO',
      headerName: '프로젝트 설명',
      sortable: false,
      width: 400,
    },
    {
      field: 'PERIOD',
      headerName: '기간',
    },
    {
      field: 'START_DT',
      headerName: '기간',
      sortable: false,
      // valueGetter: (params) => `${params.row.START_DT} ~ ${params.row?.END_DT}`,
      width: 250,
    },
    {
      field: 'PJT_STTS',
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
      rows={data}
      getRowId={(row) => row.PJT_SN}
      loading={isFetching}
      noRows={ProjectEmptyRows}
      onRowClick={(params) => {
        navigate(`${PATHS.project.details}/${params.row.PJT_SN}`);
      }}
    />
  );
};

export default ProjectList;
