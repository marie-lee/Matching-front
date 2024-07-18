import {
    Box,
    Grid,
    Typography,
    Button,
    Stack,
    Input,
    TextField,
    useTheme,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
  } from '@mui/material';
  import React, { useState, useEffect } from 'react';
  import { RhfFormProvider, RhfTextField } from '@/components/hook-form/index';
  import { PATHS } from '@/routes/paths';
  import { Link, useNavigate } from 'react-router-dom';
import { Email } from '@mui/icons-material';



const AuthPassword = () => {
    const theme = useTheme();

    const [openDialog, setOpenDialog] = useState(false);
    const [dialogContent, setDialogContent] = useState({ title: '', message: '', buttonText: '' });

    const [emaildialog, setemaildialog] = useState({ title: '', message: '', buttonText: '' });


    const EmainCheck = () =>{
        setemaildialog({
            title:'일치하는 회원 정보가 없습니다',
            buttonText : '확인'
        })
    }


    const handleChangePassword = () => {
        if (password === confirmPassword) {
          setDialogContent({
            title: '인증번호가 틀렸습니다',
            message: '',
            buttonText: '로그인하러 가기'
          });
        } else {
          setDialogContent({
            title: '현재 비밀번호와 일치합니다.',
            message: '다른 비밀번호를 입력해 주세요',
            buttonText: '확인'
          });
        }
        setOpenDialog(true);
      };
      
      const handleCloseDialog = () => {
        setOpenDialog(false);
        if (password === confirmPassword) {
          navigate(PATHS.auth.signIn); // 로그인 페이지로 이동
        }
      };

    return(
        <Box sx={{display:'flex',justifyContent:'center'}}>
            <Box
                sx={{
                    border: '0px solid #D1D1D1',
                    padding: 5,
                    borderRadius: 2,
                    boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.1)',                    
                }}
            >
                <Stack alignItems={'center'} mb={4}>
                    <Typography variant={'xl'}>
                        비밀번호를 잊으셨나요?
                    </Typography>
                    <Typography 
                        color={'primary.light'} 
                        variant={'sm'}
                    >
                        계정에서 사용하는 이름과 이메일을 입력해 주세요.
                    </Typography>
                    <Typography
                        color={'primary.light'} 
                        variant={'sm'}
                    >
                    비밀번호를 재설정할 수 있도록 인증번호가 담긴 메일을 보내드립니다.
                    </Typography>
                </Stack>
                
                    <Stack>
                        <TextField
                            placeholder='이름을 입력해주세요'
                            sx={{marginBottom:2}}
                        />
                        <Stack direction="row" spacing={2}>
                            <TextField 
                                placeholder='이메일을 입력해주세요'
                                sx={{width:0.8}}
                            />
                            <Button
                                onClick={EmainCheck}
                                sx={{width:0.2}}
                            >인증번호 요청</Button>
                        </Stack>
                        <Stack direction="row" spacing={2} sx={{marginBottom:2,marginTop:2}}>
                            <TextField 
                                placeholder='인증번호를 입력해주세요'
                                sx={{width:0.8}}
                            />
                            <Button sx={{width:0.2}}>
                                확인
                            </Button>
                        </Stack>
                    </Stack>
                <Stack>
                    <Button sx={{marginBottom:2}} onClick={handleChangePassword}>
                        다음
                    </Button>
                    <Box sx={{display: 'flex', justifyContent: 'center',marginTop:2}}>
                        <Link
                            href="/auth/sign-in"
                            underline="hover"
                            variant={'xs'}
                        >
                        로그인하러 가기
                        </Link>
                    </Box>
                </Stack>

                <Dialog>
                    <DialogContent sx={{textAlign:'center'}}>
                        <DialogTitle >{emaildialog.title}</DialogTitle>
                    </DialogContent>
                </Dialog>


                <Dialog open={openDialog} onClose={handleCloseDialog}
                    sx={{
                    padding: 5,
                    borderRadius: 2,
                    boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <DialogContent sx={{ textAlign: 'center' }}>
                    <DialogTitle variant={'xl'}>{dialogContent.title}<br />{dialogContent.message}</DialogTitle>
                    </DialogContent>
                    <DialogActions>
                    
                    <Button onClick={handleCloseDialog} color="primary"
                        sx={{width:1}}
                    >
                        {dialogContent.buttonText}
                    </Button>
                    
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>    
    );
    
};

export default AuthPassword;