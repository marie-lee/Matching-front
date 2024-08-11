import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { tableData } from './constants';

export default function TemplateTable() {
  const [data, setData] = useState(tableData);

  const handleChange = (index, column, value) => {
    const updatedData = data.map((row, i) =>
      i === index ? { ...row, [column]: value } : row,
    );
    setData(updatedData);
  };

  const getValue = (column) => {
    return typeof column === 'object' && column !== null ?
        column.value || ''
      : column || '';
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: 'none',
            width: '100%',
            margin: 'auto',
            height: '100%',
            overflowY: 'auto',
            ml: 2,
          }}
        >
          <Table
            sx={{ tableLayout: 'fixed', width: '100%' }}
            aria-label="simple table"
          >
            <colgroup>
              <col style={{ width: '20%' }} />
              <col style={{ width: '30%' }} />
              <col style={{ width: '50%' }} />
            </colgroup>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  {row.firstColumn && (
                    <TableCell
                      align="center"
                      sx={{
                        border: '2px solid #f4f6f8',
                        wordWrap: 'break-word',
                        padding: '2px 4px',
                      }}
                      rowSpan={row.firstColumn.rowspan}
                    >
                      <TextField
                        value={getValue(row.firstColumn)}
                        onChange={(e) =>
                          handleChange(index, 'firstColumn', {
                            ...row.firstColumn,
                            value: e.target.value,
                          })
                        }
                        fullWidth
                        variant="standard"
                        InputProps={{
                          disableUnderline: true,
                          sx: { textAlign: 'center', fontSize: '0.75rem' },
                        }}
                        sx={{ margin: 0 }}
                        inputProps={{ style: { textAlign: 'center' } }}
                      />
                    </TableCell>
                  )}
                  {row.secondColumn && (
                    <TableCell
                      align="center"
                      sx={{
                        border: '2px solid #f4f6f8',
                        wordWrap: 'break-word',
                        padding: '2px 4px',
                      }}
                      rowSpan={row.secondColumn.rowspan}
                    >
                      <TextField
                        value={getValue(row.secondColumn)}
                        onChange={(e) =>
                          handleChange(index, 'secondColumn', {
                            ...row.secondColumn,
                            value: e.target.value,
                          })
                        }
                        fullWidth
                        variant="standard"
                        InputProps={{
                          disableUnderline: true,
                          sx: { fontSize: '0.75rem', textAlign: 'center' },
                        }}
                        sx={{ margin: 0 }}
                        inputProps={{ style: { textAlign: 'center' } }}
                      />
                    </TableCell>
                  )}
                  <TableCell
                    align="center"
                    sx={{
                      border: '2px solid #f4f6f8',
                      wordWrap: 'break-word',
                      padding: '2px 4px',
                    }}
                  >
                    <TextField
                      value={getValue(row.thirdColumn)}
                      onChange={(e) =>
                        handleChange(index, 'thirdColumn', e.target.value)
                      }
                      fullWidth
                      variant="standard"
                      InputProps={{
                        disableUnderline: true,
                        sx: { textAlign: 'center', fontSize: '0.75rem' },
                      }}
                      sx={{ margin: 0 }}
                      inputProps={{ style: { textAlign: 'center' } }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
