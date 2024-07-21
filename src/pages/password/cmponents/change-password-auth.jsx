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
import { PATHS } from '@/routes/paths';
import { Link, useNavigate } from 'react-router-dom';
import { Email } from '@mui/icons-material';
import {postEmailCertification,postEmailConfirmation} from '@/services/member';



const AuthPassword = () => {
    
    const [name, setName] = useState('');
    const [USER_EMAIL, setEmail] = useState('');
    const [authCode, setAuthCode] = useState('');


    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');

    const [redirectPath, setRedirectPath] = useState(null);
    const navigate = useNavigate();


    const isNameFilled = name.trim() !== '';
    const isEmailFilled = USER_EMAIL.trim() !== '';
    const isAuthCodeFilled = authCode.trim() !== '';

    const [isEmailSent, setIsEmailSent] = useState(false);


  //인증번호 전송
  const handleEmailCertification = async () => {
    try{    
        const response = postEmailCertification(USER_EMAIL);
        if (response.status === 200) {
            setDialogMessage('해당 이메일로 인증번호를 보냈습니다.');
        } else {
            setDialogMessage('일치하는 회원 정보가 없습니다.');
        }

    } catch (error) {
        setDialogMessage('오류가 발생했습니다. 나중에 다시 시도해 주세요.');
    } finally {
        setDialogOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
};

// 인증번호 확인
  const handelEmailConfirmation = async () => {
    try{
        const response = postEmailConfirmation(USER_EMAIL,authCode);

        if (response.status === 200) {
            setDialogMessage('인증 완료되었습니다.');
            setRedirectPath(PATHS.somePath); //이동경로 설정
        } else {
            setDialogMessage('인증번호가 틀렸습니다.');
        }
    }catch {
        setDialogMessage('오류가 발생했습니다. 나중에 다시 시도해 주세요.');
    } finally {
        setDialogOpen(true);
    }
  }


    
    return(
        <Box sx={{ maxWidth: 800, margin: '0 auto', mt: 10}}>
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Stack direction="row" spacing={2}>
                            <TextField 
                                placeholder='이메일을 입력해주세요'
                                sx={{width:0.8}}
                                value={USER_EMAIL}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button
                                sx={{ width: 0.2, backgroundColor: isEmailFilled ? '#000000' : '#0000001F' }}
                                disabled={!isEmailFilled}
                                onClick={handleEmailCertification}
                            >인증번호 요청</Button>
                        </Stack>
                            <TextField 
                                placeholder='인증번호를 입력해주세요'
                                sx={{marginBottom:2,marginTop:2}}
                                value={authCode}
                                onChange={(e) => setAuthCode(e.target.value)}
                            />
                        
                    </Stack>
                <Stack>
                    <Button 
                        sx={{ marginBottom: 2, backgroundColor: isAuthCodeFilled ? '#000000' : '#0000001F' }}
                        disabled={!isAuthCodeFilled}
                        onClick={handelEmailConfirmation}
                    >
                        다음
                    </Button>
                    <Box sx={{display: 'flex', justifyContent: 'center',marginTop:2}}>
                        <Link
                            href="#"
                            variant={'xs'}
                        >
                        로그인하러 가기
                        </Link>
                    </Box>
                </Stack>
            </Box>

            <Dialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle sx={{ textAlign: 'center' }}>{dialogMessage}</DialogTitle>
                <DialogActions>
                    <Button 
                        onClick={handleCloseDialog} 
                        color="primary"
                        sx={{ width: '100%', textAlign: 'center' }}
                    >
                        확인
                    </Button>
                </DialogActions>
            </Dialog>

        </Box>    
    );
    
};

export default AuthPassword;