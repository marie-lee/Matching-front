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

const permissions = ['member', 'owner'];

const UserAdd = ({ userNames, roles }) => {
  // roles를 prop으로 받음
  const [participants, setParticipants] = useState([]);
  const [isCustomRole, setIsCustomRole] = useState([]);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const tableEndRef = useRef(null);

  const handleAddRow = () => {
    const newParticipant = { name: '', role: '', permission: 'member' };
    setParticipants((prev) => [...prev, newParticipant]);
    setIsCustomRole((prev) => [...prev, false]);
  };

  // 화면 스크롤
  useEffect(() => {
    if (!isInitialRender) {
      if (tableEndRef.current) {
        tableEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setIsInitialRender(false);
    }
  }, [participants]);

  //업데이트
  const handleChange = (index, field, value) => {
    setParticipants((prev) => {
      const updatedParticipants = [...prev];
      updatedParticipants[index] = {
        ...updatedParticipants[index],
        [field]: value,
      };
      return updatedParticipants;
    });
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
    <Grid container direction="column" spacing={2}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
        <li>참여자 정보</li>
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ boxShadow: 'none', borderRadius: 0, mt: 5 }}
      >
        <Table sx={{ minWidth: 650 }}>
          <colgroup>
            <col style={{ width: '33%' }} />
            <col style={{ width: '33%' }} />
            <col style={{ width: '33%' }} />
          </colgroup>
          <TableHead>
            <TableRow>
              {['참여자', '담당', '권한', ''].map((head, index) => (
                <TableCell
                  key={index}
                  align="center"
                  sx={{ padding: '4px', border: '4px solid #f4f6f8' }}
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
                    key={field}
                    align="center"
                    sx={{ padding: '4px', border: '4px solid #f4f6f8' }}
                  >
                    {field === 'role' && isCustomRole[index] ?
                      <TextField
                        value={participant[field]}
                        onChange={(e) =>
                          handleChange(index, field, e.target.value)
                        }
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': { border: 'none' },
                          },
                          input: {
                            padding: 0,
                            textAlign: 'center',
                            fontSize: '16px',
                          },
                        }}
                      />
                    : <FormControl fullWidth variant="standard">
                        <Select
                          value={participant[field]}
                          onChange={(e) =>
                            field === 'role' ?
                              handleRoleChange(index, e.target.value)
                            : handleChange(index, field, e.target.value)
                          }
                        >
                          {(field === 'role' ? roles
                          : field === 'permission' ? permissions
                          : userNames
                          ).map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    }
                  </TableCell>
                ))}
                <TableCell
                  align="center"
                  sx={{ padding: '4px', backgroundColor: '#f5f5f5' }}
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
