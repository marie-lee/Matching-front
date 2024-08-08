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

  const getFormData = (_payload) => {
    let payload = _.cloneDeep(_payload);
    let formData = new FormData();

    for (let key in payload) {
      if (key === 'PJT_IMG') {
        // 이미지
        if (payload['PJT_IMG'] === null) {
          formData.delete('PJT_IMG');
        } else {
          formData.append('PJT_IMG', payload['PJT_IMG']);
        }
      } else if (key === 'SELECTED_DT_YN') {
        // 예상 프로젝트 시작일
        formData.append('SELECTED_DT_YN', payload['SELECTED_DT_YN'] === 'true');

        if (payload['SELECTED_DT_YN'] === 'true') {
          formData.append(
            'START_DT',
            dayjs(payload['START_DT']).format('YYYY-MM-DD'),
          );
        }
      } else if (key === 'START_DT') {
        if (payload['SELECTED_DT_YN'] === 'false') {
          formData.delete('START_DT');
        }
      } else if (key === 'STACKS') {
        // 프로젝트 관련 스킬
        const stacks = payload['STACKS'].map((stack) => {
          return { ST_NM: stack };
        });

        formData.append('STACKS', JSON.stringify(stacks));
      } else if (key === 'ROLES') {
        // 프로젝트 관련 경험
        formData.append('ROLES', JSON.stringify(payload['ROLES']));
      } else if (key === 'PJT_OPEN_YN') {
        // 프로젝트 상세 공개 여부
        formData.append('PJT_OPEN_YN', payload['PJT_OPEN_YN'] === 'true');
      } else {
        formData.append(key, payload[key]);
      }
    }

    return formData;
  };

  const onSubmit = projectAddForm.handleSubmit(async (_payload) => {
    const formData = getFormData(_payload);

    setIsPending(true);
    try {
      const res = await postProject(formData);
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
