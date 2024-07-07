import React from 'react';
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  useTheme,
} from '@mui/material';

const StepOne = () => {
  const theme = useTheme();

  return (
    <>
      <Box sx={{ mb: 4, width: '100%', mx: 'auto' }}>
        <Typography variant="h6" fontWeight="bold" sx={{ ml: 1 }}>
          서비스 이용 약관
        </Typography>
        <Box
          sx={{
            border: '1px solid #e0e0e0',
            borderRadius: 1,
            padding: 2,
            mt: 2,
            height: 300,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              whiteSpace: 'pre-wrap',
              height: '100%',
              overflowY: 'auto',
            }}
          >
            {
              '제1조(목적) \n 1. ‘프로젝트명’의 서비스를 이용하기 위한 약관을 규정함을 목적으로 합니다. \n\n제2조(약관의 효력 및 변경)\n 1. 본 약관은 회원이 서비스를 이용함에 있어 회사와 회원간의 권리 의무 관계를 구체화 합니다.\n 2. 회사는 필요 시 이용약관을 변경할 수 있으며, 변경된 약관은 즉시 시행됩니다.\n\n제3조(회원의 의무)\n 1. 회원은 회사의 서비스를 이용함에 있어 본 약관과 관련 법령을 준수하여야 합니다.\n 2. 회원은 서비스 이용시 타인의 권리를 침해하지 않아야 하며, 회사의 명시적인 동의 없이 서비스를 상업적으로 이용할 수 없습니다.'
            }
          </Typography>
        </Box>
        <RadioGroup row sx={{ ml: 2 }}>
          <FormControlLabel
            value="agreeService"
            control={<Radio />}
            label="동의함"
          />
          <FormControlLabel
            value="disagreeService"
            control={<Radio />}
            label="동의안함"
          />
        </RadioGroup>
      </Box>

      <Box sx={{ mb: 6, width: '100%', mx: 'auto' }}>
        <Typography variant="h6" fontWeight="bold" sx={{ ml: 1 }}>
          개인정보 처리 방침
        </Typography>
        <Box
          sx={{
            border: '1px solid #e0e0e0',
            borderRadius: 1,
            padding: 2,
            mt: 2,
            height: 300,
            overflowY: 'auto', // 수직 스크롤 활성화
          }}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: `
                <table style="width: 100%; border: 1px solid #e0e0e0; border-collapse: collapse;">
                  <thead>
                    <tr>
                      <th style="border: 1px solid #e0e0e0; padding: 8px;">수집 목적</th>
                      <th style="border: 1px solid #e0e0e0; padding: 8px;">수집 항목</th>
                      <th style="border: 1px solid #e0e0e0; padding: 8px;">보유 기간</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style="border: 1px solid #e0e0e0; padding: 8px;">회원 가입의사 확인, 이용자 식별 및 본인여부, 회원자격 유지·관리, 계약 이행 및 약관변경 등의 고지를 위한 연락, 본인 의사 확인 및 민원 등의 고객 고충 처리, 분쟁 대응 및 처리, 서비스 제공 및 계약의 이행, 서비스 이용 및 상담, 문의, 후기 등 원활한 의사소통 경로 확보, 맞춤형 회원 서비스 제공, 거점 기반 서비스 제공</td>
                      <td style="border: 1px solid #e0e0e0; padding: 8px;">이름, 아이디, 비밀번호, 휴대폰번호, 이메일, 주소</td>
                      <td style="border: 1px solid #e0e0e0; padding: 8px;">회원 탈퇴 즉시 파기<br><br>부정 이용 방지를 위하여 30일 동안 보관 (이메일, 휴대폰 번호) 후 파기</td>
                    </tr>
                    <tr>
                      <td style="border: 1px solid #e0e0e0; padding: 8px;">서비스 방문 및 이용 기록 분석, 부정 이용 방지 등을 위한 기록 관리</td>
                      <td style="border: 1px solid #e0e0e0; padding: 8px;">서비스 이용 기록, IP 주소, 쿠키, MAC 주소, 모바일 기기 정보(광고식별자, OS/앱 버전)</td>
                      <td style="border: 1px solid #e0e0e0; padding: 8px;">회원 탈퇴 즉시 또는 이용 목적 달성 즉시 파기</td>
                    </tr>
                  </tbody>
                </table>
                <p>서비스 제공을 위해서 필요한 최소한의 개인정보입니다. 동의를 해 주셔야 서비스를 이용하실 수 있으며, 동의하지 않으실 경우 서비스에 제한이 있을 수 있습니다.</p>
              `,
            }}
          />
        </Box>
        <RadioGroup row sx={{ ml: 2 }}>
          <FormControlLabel
            value="agreePrivacy"
            control={<Radio />}
            label="동의함"
          />
          <FormControlLabel
            value="disagreePrivacy"
            control={<Radio />}
            label="동의안함"
          />
        </RadioGroup>
      </Box>

      <Box sx={{ mb: 6, width: '100%', mx: 'auto' }}>
        <Typography variant="h6" fontWeight="bold" sx={{ ml: 1 }}>
          만 14세 확인 여부
        </Typography>
        <RadioGroup row sx={{ ml: 2 }}>
          <FormControlLabel
            value="over14"
            control={<Radio />}
            label="만 14세 이상"
          />
          <FormControlLabel
            value="under14"
            control={<Radio />}
            label="만 14세 미만"
          />
        </RadioGroup>
      </Box>
    </>
  );
};

export default StepOne;
