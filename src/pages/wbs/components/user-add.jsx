//React Import
import { useState, useRef, useEffect } from 'react';

//Mui Import
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
  IconButton,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

//Data Import
import { useDispatch } from 'react-redux';
import { setData } from '@/store/wbsSlice';

const permissions = ['member', 'owner'];

const UserAdd = ({ roles, resData }) => {
  const dispatch = useDispatch();
  const tableEndRef = useRef(null);

  const [participants, setParticipants] = useState([]);

  const member = resData.map((member) => member.userNm);

  useEffect(() => {
    dispatch(setData(participants));
  }, [participants, dispatch]);

  //화면 자동이동 이팩트
  useEffect(() => {
    if (tableEndRef.current) {
      tableEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [participants]);

  const handleAddRow = () => {
    setParticipants((prev) => [
      ...prev,
      { userNm: '', part: '', role: 'owner', userSn: null },
    ]);
  };

  const handleChange = (index, field, value) => {
    setParticipants((prev) =>
      prev.map((p, i) => {
        if (i === index) {
          const updatedParticipant = { ...p, [field]: value };

          if (field === 'userNm') {
            const user = resData.find((user) => user.userNm === value);
            updatedParticipant.userSn = user ? user.userSn : null;
          }

          return updatedParticipant;
        }
        return p;
      }),
    );
  };

  const handleDeleteRow = (index) => {
    setParticipants((prev) => prev.filter((_, i) => i !== index));
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
                {['userNm', 'part', 'role'].map((field) => (
                  <TableCell
                    key={field}
                    align="center"
                    sx={{ padding: '4px', border: '4px solid #f4f6f8' }}
                  >
                    <FormControl fullWidth variant="standard">
                      <Select
                        value={participant[field]}
                        onChange={(e) =>
                          handleChange(index, field, e.target.value)
                        }
                      >
                        {(field === 'role' ? permissions
                        : field === 'part' ? roles
                        : member
                        ).map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                ))}
                <TableCell
                  align="center"
                  sx={{ padding: '4px', backgroundColor: '#f5f5f5' }}
                >
                  <IconButton onClick={() => handleDeleteRow(index)}>
                    <DeleteIcon />
                  </IconButton>
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
