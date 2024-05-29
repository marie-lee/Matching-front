import { Stack, Typography } from '@mui/material';

import { ProjectList } from '@/pages/project/components';

const ProjectListPage = () => {
  return (
    <Stack spacing={3}>
      <Typography variant={'xl'}>내 프로젝트 목록</Typography>
      <ProjectList />
    </Stack>
  );
};

export default ProjectListPage;
