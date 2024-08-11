import { Grid, Button, Box, useTheme } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const TopBar = ({ save, handleClick, handleSave, view, handleView }) => {
  const theme = useTheme();

  return (
    <Grid mt={5} sx={{ borderBottom: '1px solid #dbdbdb', paddingBottom: 2 }}>
      {save ?
        <Grid container>
          <Grid item xs={10}>
            <Button
              onClick={handleClick}
              color="basicButton"
              sx={{ width: '80px' }}
            >
              Edit
            </Button>
          </Grid>
          <Grid
            item
            xs={2}
            container
            alignItems="center"
            justifyContent="right"
          >
            {view ?
              <>
                <VisibilityOffIcon onClick={handleView} />
                <Box
                  sx={{
                    width: 10,
                    height: 20,
                    bgcolor: theme.palette.common.black,
                  }}
                  ml={3}
                  mr={3}
                />
              </>
            : <>
                <VisibilityIcon onClick={handleView} />
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
              </>
            }
          </Grid>
        </Grid>
      : <Grid container>
          <Grid item xs={10}>
            <Button
              onClick={handleSave}
              color="basicButton"
              sx={{ width: '80px' }}
            >
              Save
            </Button>
            <Button
              onClick={handleClick}
              color="greyButton"
              sx={{ width: '80px', marginLeft: 2 }}
            >
              Cancel
            </Button>
          </Grid>
          <Grid
            item
            xs={2}
            container
            alignItems="center"
            justifyContent="right"
          >
            {view ?
              <>
                <VisibilityOffIcon onClick={handleView} />
                <Box
                  sx={{
                    width: 10,
                    height: 20,
                    bgcolor: theme.palette.common.black,
                  }}
                  ml={3}
                  mr={3}
                />
              </>
            : <>
                <VisibilityIcon onClick={handleView} />
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
              </>
            }
          </Grid>
        </Grid>
      }
    </Grid>
  );
};

export default TopBar;
