import { Stack } from '@mui/material';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import _ from 'lodash';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import { ProjectAddForm, ProjectAddPreview } from '@/pages/project/components';
import {
  projectAddFormDefaultValues,
  projectAddFormSchema,
} from '@/pages/project/constants';
import { postProject } from '@/services/project';

// ----------------------------------------------------------------------

const ProjectAddPage = () => {
  const navigate = useNavigate();

  const [previewOpen, setPreviewOpen] = useState(false);

  const projectAddForm = useForm({
    defaultValues: projectAddFormDefaultValues,
    resolver: yupResolver(projectAddFormSchema),
  });

  const [isPending, setIsPending] = useState(false);

  const handleOpenPreview = () => setPreviewOpen(true);

  const getPayload = (_payload) => {
    let payload = _.cloneDeep(_payload);

    if (payload['PJT_IMG'] === null) {
      delete payload['PJT_IMG'];
    }

    if (payload['SELECTED_DT_YN'] === 'false') {
      delete payload['START_DT'];
    } else {
      payload['START_DT'] = dayjs(payload['START_DT']).format('YYYY-MM-DD');
    }

    payload['STACKS'] = payload['STACKS'].map((stack) => {
      return { ST_NM: stack };
    });

    payload['SELECTED_DT_YN'] = payload['SELECTED_DT_YN'] === 'true';
    payload['PJT_OPEN_YN'] = payload['PJT_OPEN_YN'] === 'true';

    return payload;
  };

  const onSubmit = projectAddForm.handleSubmit(async (_payload) => {
    const payload = getPayload(_payload);

    setIsPending(true);
    try {
      const res = await postProject(payload);
      setIsPending(false);
      if (res?.status === 200) {
        setPreviewOpen(false);
        navigate(-1);
      }
    } catch (error) {
      setIsPending(false);
    }
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
        isPending={isPending}
        onSubmit={onSubmit}
      />
    </Stack>
  );
};

export default ProjectAddPage;
