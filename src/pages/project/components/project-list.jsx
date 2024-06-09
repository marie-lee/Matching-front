import { Chip, Stack, Typography, useTheme } from '@mui/material';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { BasicDataGrid } from '@/components/data-grid';

import { PATHS } from '@/routes/paths';
import { getProjectList } from '@/services/project';

// ----------------------------------------------------------------------

const ProjectStatus = ({ params }) => {
  let color = '';
  let label = params.row.PJT_STTS;
  const hasLeaderRole = params.row.hasLeaderRole;

  switch (params.row.PJT_STTS) {
    case 'RECRUIT':
      color = 'HIGH';
      label = '모집중';
      break;
    case 'PROGRESS':
      color = 'MEDIUM';
      label = '진행중';
      break;
    case 'FINISH':
      color = 'LOW';
      label = '완료';
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

  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState([]);

  const fetchProjectList = async () => {
    setIsFetching(true);
    try {
      const res = await getProjectList();
      setIsFetching(false);
      setData(res?.data);
    } catch (error) {
      console.log(error);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchProjectList();
  }, []);

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
      headerName: '인원 수 ',
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
        navigate(`${PATHS.project.details}/${params.row.PJT_SN}`, {
          state: { projectData: params.row },
        });
      }}
    />
  );
};

export default ProjectList;
