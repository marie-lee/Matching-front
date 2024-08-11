import { Box, Button, Stack, Typography } from '@mui/material';

import { ProjectList } from '@/pages/project/components';
import { PATHS } from '@/routes/paths';

const ProjectListPage = () => {
  return (
    <Stack spacing={3}>
      <Stack direction={'row'} alignItems={'center'} spacing={1}>
        <Typography variant={'xl'}>내 프로젝트 목록</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button variant={'outlined'} href={PATHS.project.add}>
          프로젝트 등록하기
        </Button>
      </Stack>
      <ProjectList />
    </Stack>
  );
};

export default ProjectListPage;
