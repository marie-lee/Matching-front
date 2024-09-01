import { Grid, Button, Box, useTheme } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const TrackingBox = ({ tracking, handleTracking, theme }) =>
  tracking ?
    <Box
      onClick={handleTracking}
      sx={{
        width: 10,
        height: 20,
        bgcolor: theme.palette.common.black,
      }}
      ml={3}
      mr={3}
    />
  : <Box
      onClick={handleTracking}
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: 10,
          height: 20,
          bgcolor: theme.palette.common.black,
        }}
        ml={3}
      />
      <Box
        sx={{
          width: 10,
          height: 20,
          bgcolor: theme.palette.common.white,
          border: '1px solid #000',
        }}
        mr={3}
      />
    </Box>;

const ActionButtons = ({ save, handleClick, handleSave, handleCancel }) =>
  save ?
    <Button onClick={handleClick} color="basicButton" sx={{ width: '80px' }}>
      Edit
    </Button>
  : <>
      <Button onClick={handleSave} color="basicButton" sx={{ width: '80px' }}>
        Save
      </Button>
      <Button
        onClick={handleCancel}
        color="greyButton"
        sx={{ width: '80px', marginLeft: 2 }}
      >
        Cancel
      </Button>
    </>;

const ViewIcon = ({ view, handleView }) =>
  view ?
    <VisibilityOffIcon onClick={handleView} />
  : <VisibilityIcon onClick={handleView} />;

const TopBar = ({
  save,
  handleClick,
  handleSave,
  handleCancel,
  view,
  handleView,
  tracking,
  handleTracking,
}) => {
  const theme = useTheme();

  return (
    <Grid mt={5} sx={{ borderBottom: '1px solid #dbdbdb', paddingBottom: 2 }}>
      <Grid container>
        <Grid item xs={10}>
          <ActionButtons
            save={save}
            handleClick={handleClick}
            handleSave={handleSave}
            handleCancel={handleCancel}
          />
        </Grid>
        <Grid item xs={2} container alignItems="center" justifyContent="right">
          <ViewIcon view={view} handleView={handleView} />
          <TrackingBox
            tracking={tracking}
            handleTracking={handleTracking}
            theme={theme}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TopBar;
