import { Typography } from '@mui/material';

const Required = ({ ...other }) => {
  return (
    <Typography component={'span'} color={'error'} {...other}>
      *
    </Typography>
  );
};

export default Required;
