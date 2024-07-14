import { Stack } from '@mui/material';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { ProjectAddForm, ProjectAddPreview } from '@/pages/project/components';
import {
  projectAddFormDefaultValues,
  projectAddFormSchema,
} from '@/pages/project/constants';

// ----------------------------------------------------------------------

const ProjectAddPage = () => {
  const [previewOpen, setPreviewOpen] = useState(false);

  const projectAddForm = useForm({
    defaultValues: projectAddFormDefaultValues,
    resolver: yupResolver(projectAddFormSchema),
  });

  const handleOpenPreview = () => setPreviewOpen(true);

  const handleSubmit = projectAddForm.handleSubmit((_payload) => {
    setPreviewOpen(false);
  });

  // ----------------------------------------------------------------------

  return (
    <Stack>
      <ProjectAddForm
        projectAddForm={projectAddForm}
        handleOpenPreview={handleOpenPreview}
      />
      <ProjectAddPreview
        open={previewOpen}
        setOpen={setPreviewOpen}
        projectAddForm={projectAddForm}
        handleSubmit={handleSubmit}
      />
    </Stack>
  );
};

export default ProjectAddPage;
