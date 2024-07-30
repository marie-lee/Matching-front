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
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const initialParticipants = [
  { name: '김영후', role: 'B.E.', permission: 'member' },
  { name: '박미영', role: 'F.E.', permission: 'member' },
];

const roles = ['F.E.', 'B.E.', 'Design', 'Manager', '직접 입력'];
const permissions = ['member', 'owner'];

const UserAdd = () => {
  const [participants, setParticipants] = useState(initialParticipants);
  const [isCustomRole, setIsCustomRole] = useState(
    Array(initialParticipants.length).fill(false),
  );
  const [isInitialRender, setIsInitialRender] = useState(true);
  const tableEndRef = useRef(null);

  const handleAddRow = () => {
    setParticipants((prev) => [
      ...prev,
      { name: '', role: '', permission: '' },
    ]);
    setIsCustomRole((prev) => [...prev, false]);
  };

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
    } else {
      if (tableEndRef.current) {
        tableEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [participants]);

  const handleChange = (index, field, value) => {
    setParticipants((prev) =>
      prev.map((participant, i) =>
        i === index ? { ...participant, [field]: value } : participant,
      ),
    );
  };

  const handleRoleChange = (index, value) => {
    setIsCustomRole((prev) =>
      prev.map((item, i) => (i === index ? value === '직접 입력' : item)),
    );
    handleChange(index, 'role', value === '직접 입력' ? '' : value);
  };

  const handleDeleteRow = (index) => {
    setParticipants((prev) => prev.filter((_, i) => i !== index));
    setIsCustomRole((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Grid container spacing={2} direction="column" sx={{ width: '60%' }}>
      <Grid item>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          참여자 정보
        </Typography>
      </Grid>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 'none',
          borderRadius: 0,
          ml: 1,
          mt: 1,
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <colgroup>
            <col style={{ width: '20%' }} />
            <col style={{ width: '40%' }} />
            <col style={{ width: '40%' }} />
          </colgroup>
          <TableHead>
            <TableRow>
              {['참여자', '담당', '권한', ''].map((head) => (
                <TableCell
                  align="center"
                  sx={{
                    padding: '4px',
                    border: '4px solid #f4f6f8',
                  }}
                  key={head}
                >
                  {head ?
                    head
                  : <IconButton onClick={handleAddRow}>
                      <AddIcon />
                    </IconButton>
                  }
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {participants.map((participant, index) => (
              <TableRow key={index} sx={{ border: '4px solid #f4f6f8' }}>
                {['name', 'role', 'permission'].map((field) => (
                  <TableCell
                    align="center"
                    sx={{
                      padding: '4px',
                      border: '4px solid #f4f6f8',
                    }}
                    key={field}
                  >
                    {field === 'role' && isCustomRole[index] ?
                      <TextField
                        value={participant[field]}
                        onChange={(e) =>
                          handleChange(index, field, e.target.value)
                        }
                        fullWidth
                        variant="standard"
                        InputProps={{
                          disableUnderline: true,
                        }}
                        inputProps={{
                          style: { textAlign: 'center' },
                        }}
                      />
                    : field === 'role' || field === 'permission' ?
                      <FormControl fullWidth variant="standard">
                        <Select
                          value={participant[field]}
                          onChange={(e) =>
                            field === 'role' ?
                              handleRoleChange(index, e.target.value)
                            : handleChange(index, field, e.target.value)
                          }
                        >
                          {(field === 'role' ? roles : permissions).map(
                            (option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ),
                          )}
                        </Select>
                      </FormControl>
                    : <TextField
                        value={participant[field]}
                        onChange={(e) =>
                          handleChange(index, field, e.target.value)
                        }
                        fullWidth
                        variant="standard"
                        InputProps={{
                          disableUnderline: true,
                        }}
                        inputProps={{
                          style: { textAlign: 'center' },
                        }}
                      />
                    }
                  </TableCell>
                ))}
                <TableCell
                  align="center"
                  sx={{
                    padding: '4px',
                    backgroundColor: '#f5f5f5',
                  }}
                >
                  {index === participants.length - 1 && (
                    <IconButton onClick={() => handleDeleteRow(index)}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                </TableCell>
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
