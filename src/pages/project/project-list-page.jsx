import { Box, Button, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectName } from '@/store/name-reducer';

import { ProjectList } from '@/pages/project/components';
import { PATHS } from '@/routes/paths';
import FloatingButton from '@/pages/guide/components/floating-button';

const ProjectListPage = () => {
  const name = useSelector(selectName);

  return (
    <Stack spacing={3}>
      <Stack direction={'row'} alignItems={'center'} spacing={1}>
        <Typography variant={'xl'}>내 프로젝트 목록</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button variant={'outlined'} href={PATHS.project.add}>
          프로젝트 등록하기
        </Button>
      </Stack>
      <ProjectList name={name} />
      <FloatingButton initialTab={2} />
    </Stack>
  );
};

export default ProjectListPage;
