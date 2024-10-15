import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Select,
  MenuItem as SelectMenuItem,
  FormControl,
  InputLabel,
  Typography,
  TextField,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useState } from 'react';
import {
  putProjectMemberAdmin,
  putProjectMemberPart,
} from '@/services/project';
import { useSelector } from 'react-redux';
import { selectPjtSn } from '@/store/pjtsn-reducer';
import { useNavigate } from 'react-router-dom';

const SettingMenu = ({ user, partList }) => {
  const pjtSn = useSelector(selectPjtSn);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleAdminClick = () => {
    setDialogContent('관리자 권한 부여');
    setDialogOpen(true);
    handleClose();
  };

  const handleRoleChangeClick = () => {
    setDialogContent('역할 변경');
    setDialogOpen(true);
    handleClose();
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleConfirmClick = () => {
    if (dialogContent === '역할 변경' && selectedRole) {
      // 역할 변경
      onRoleChange(user.userSn, selectedRole);
    } else if (dialogContent === '관리자 권한 부여') {
      // 관리자 권한 부여
      onAdminAdd(user.userSn);
    }
    setDialogOpen(false);
  };

  const onAdminAdd = async (userSn) => {
    // 관리자 권한 부여 API 호출
    const payload = {
      newRole: 'leader',
    };
    try {
      const res = await putProjectMemberAdmin(payload, pjtSn, userSn);
      if (res?.status === 200) {
        navigate(0);
      } 
    } catch (error) {
      console.error(error);
    }
  };

  const onRoleChange = async (userSn, role) => {
    // 역할 변경 API 호출
    const payload = {
      newPart: role,
    };
    try {
      const res = await putProjectMemberPart(payload, pjtSn, userSn);
      if (res?.status === 200) {
        console.log('역할 변경 성공');
        navigate(0); 
      } else if (res?.status === 400) {
        alert("권한이 없습니다.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleAdminClick}>관리자 권한 부여</MenuItem>
        <MenuItem onClick={handleRoleChangeClick}>역할 변경</MenuItem>
      </Menu>
      <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth>
        <DialogTitle>{dialogContent}</DialogTitle>
        <DialogContent>
          {dialogContent === '관리자 권한 부여' ?
            <Typography>
              {user.userNm}님에게 관리자 권한을 부여하시겠습니까?
            </Typography>
          : <>
              <Typography>
                {user.userNm} 멤버의 변경할 역할을 선택해주세요.
              </Typography>
              <FormControl fullWidth>
                <Select
                  labelId="role-select-label"
                  value={selectedRole}
                  onChange={handleRoleChange}
                  variant="outlined"
                  size="small"
                >
                  {partList.map((part) => (
                    <SelectMenuItem key={part.part} value={part.part}>
                      {part.part}
                    </SelectMenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClick} color="secondary">
            확인
          </Button>
          <Button onClick={handleDialogClose} color="primary">
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SettingMenu;
