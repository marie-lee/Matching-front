import { useState, useRef, useEffect } from 'react';
import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const initialParticipants = [
  { name: '김영후', role: 'B.E.', permission: 'member' },
  { name: '박미영', role: 'F.E.', permission: 'member' },
];

const UserAdd = () => {
  const [participants, setParticipants] = useState(initialParticipants);
  const tableEndRef = useRef(null);

  const handleAddRow = () => {
    setParticipants([...participants, { name: '', role: '', permission: '' }]);
  };

  useEffect(() => {
    if (tableEndRef.current) {
      tableEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [participants]);

  const handleChange = (index, field, value) => {
    const updatedParticipants = participants.map((participant, i) =>
      i === index ? { ...participant, [field]: value } : participant,
    );
    setParticipants(updatedParticipants);
  };

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      sx={{ width: '60%', margin: 'auto' }}
    >
      <Grid item>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          참여자 정보
        </Typography>
      </Grid>
      <TableContainer
        component={Paper}
        sx={{ boxShadow: 'none', borderRadius: 0, ml: 1, mt: 1 }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                sx={{ border: '5px solid #f4f6f8', padding: '4px' }}
              >
                참여자
              </TableCell>
              <TableCell
                align="center"
                sx={{ border: '5px solid #f4f6f8', padding: '4px' }}
              >
                담당
              </TableCell>
              <TableCell
                align="center"
                sx={{ border: '5px solid #f4f6f8', padding: '4px' }}
              >
                권한
              </TableCell>
              <TableCell
                align="center"
                sx={{ border: '5px solid #f4f6f8', padding: '4px' }}
              >
                <IconButton onClick={handleAddRow}>
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {participants.map((participant, index) => (
              <TableRow key={index}>
                <TableCell
                  align="center"
                  sx={{ border: '5px solid #f4f6f8', padding: '4px' }}
                >
                  <TextField
                    value={participant.name}
                    onChange={(e) =>
                      handleChange(index, 'name', e.target.value)
                    }
                    fullWidth
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      sx: { textAlign: 'center' },
                    }}
                    inputProps={{
                      style: { textAlign: 'center' },
                    }}
                    sx={{ margin: 0 }}
                  />
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ border: '5px solid #f4f6f8', padding: '4px' }}
                >
                  <TextField
                    value={participant.role}
                    onChange={(e) =>
                      handleChange(index, 'role', e.target.value)
                    }
                    fullWidth
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      sx: { textAlign: 'center' },
                    }}
                    inputProps={{
                      style: { textAlign: 'center' },
                    }}
                    sx={{ margin: 0 }}
                  />
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ border: '5px solid #f4f6f8', padding: '4px' }}
                >
                  <TextField
                    value={participant.permission}
                    onChange={(e) =>
                      handleChange(index, 'permission', e.target.value)
                    }
                    fullWidth
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      sx: { textAlign: 'center' },
                    }}
                    inputProps={{
                      style: { textAlign: 'center' },
                    }}
                    sx={{ margin: 0 }}
                  />
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    border: '5px solid #f4f6f8',

                    backgroundColor: '#f4f6f8',
                  }}
                ></TableCell>
              </TableRow>
            ))}
            <TableRow ref={tableEndRef} />
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default UserAdd;
