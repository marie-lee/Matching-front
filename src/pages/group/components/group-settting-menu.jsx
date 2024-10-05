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
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useState } from 'react';

const SettingMenu = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

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
                  <SelectMenuItem value="front">Front-end</SelectMenuItem>
                  <SelectMenuItem value="back">Back-end</SelectMenuItem>
                  <SelectMenuItem value="full">Full-stack</SelectMenuItem>
                </Select>
              </FormControl>
            </>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
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
