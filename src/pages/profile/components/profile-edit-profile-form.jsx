import { useEffect, useState } from 'react';
import { RhfTextField } from '@/components/hook-form';
import { Avatar, Stack, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useController } from 'react-hook-form';

export const ProfileForm = ({ profileEditForm }) => {
  const [showEditIcon, setShowEditIcon] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const handleMouseEnter = () => {
    setShowEditIcon(true);
  };

  const handleMouseLeave = () => {
    setShowEditIcon(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // 여기에 파일 업로드 후 처리 로직을 추가하세요
        setAvatar(e.target.result);
      };
      reader.readAsDataURL(file);
      profileEditForm.setValue('USER_IMG', file);
    }
  };

  // 처음 렌더링 시 프로필 이미지가 존재하면 미리보기 이미지로 설정
  useEffect(() => {
    if (profileEditForm.getValues('profile')?.USER_IMG) {
      setAvatar(profileEditForm.getValues('profile').USER_IMG);
    }
  }, []);

  return (
    <Stack spacing={2}>
      <Stack alignItems={'center'}>
        <Stack
          alignItems={'center'}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          position="relative"
          sx={{ width: 100, height: 100 }}
        >
          <Avatar
            alt={'프로필 이미지'}
            sx={{ width: 100, height: 100 }}
            src={avatar}
          />
          {showEditIcon && (
            <IconButton
              color="primary"
              component="label"
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <EditIcon />
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileChange}
              />
            </IconButton>
          )}
        </Stack>
      </Stack>

      <Stack>
        <RhfTextField
          name={'profile.USER_NM'}
          label={'프로필 이름'}
          variant={'outlined'}
          size={'medium'}
        />
      </Stack>
      <Stack>
        <RhfTextField
          name={'profile.PF_INTRO'}
          label={'한 줄 소개'}
          variant={'outlined'}
          helperText={'나를 표현할 수 있는 한 줄 소개를 적어주세요'}
          size={'medium'}
        />
      </Stack>
    </Stack>
  );
};
