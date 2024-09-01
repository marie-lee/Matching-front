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
import { useDispatch, useSelector } from 'react-redux';
import { setMemberData } from '@/store/wbsSlice';

const permissions = ['member', 'owner'];

const UserAdd = ({ userNames, roles }) => {
  const dispatch = useDispatch();
  const memberData = useSelector((state) => state.wbs.memberData || []);
  const [participants, setParticipants] = useState(memberData);
  const [isCustomRole, setIsCustomRole] = useState(memberData.map(() => false));
  const tableEndRef = useRef(null);

  useEffect(() => {
    dispatch(setMemberData(participants));
  }, [participants, dispatch]);

  useEffect(() => {
    if (tableEndRef.current) {
      tableEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [participants]);

  const handleAddRow = () => {
    setParticipants((prev) => [
      ...prev,
      { name: '', role: '', permission: 'member' },
    ]);
    setIsCustomRole((prev) => [...prev, false]);
  };

  const handleChange = (index, field, value) => {
    setParticipants((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)),
    );
  };

  const handleRoleChange = (index, value) => {
    setIsCustomRole((prev) =>
      prev.map((isCustom, i) =>
        i === index ? value === '직접 입력' : isCustom,
      ),
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
                  {head || (
                    <IconButton onClick={handleAddRow}>
                      <AddIcon />
                    </IconButton>
                  )}
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
                          input: {
                            padding: 0,
                            textAlign: 'center',
                            fontSize: '16px',
                          },
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': { border: 'none' },
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
