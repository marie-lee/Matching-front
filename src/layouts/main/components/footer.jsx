import { Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.common.white,
        padding: '20px',
        textAlign: 'center',
        width: '100%',
        marginTop: '50px',
      }}
    >
      <Typography variant="body1">
        © 2024 Your Company. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
