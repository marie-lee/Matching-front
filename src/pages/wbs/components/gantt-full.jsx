import React, { memo, useCallback, useEffect, useRef } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
} from '@mui/material';
import 'react-datepicker/dist/react-datepicker.css';

const GanttFull = ({ tableData, projectStartDate, projectEndDate }) => {
  {
    /* 테이블 스타일 */
  }
  const cellStyle = {
    border: '1px solid #000',
    padding: '2px 4px',
  };

  {
    /* gantt 날짜 구간 생성 */
  }
  const generateDateRange = (startDate, endDate) => {
    const dates = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  {
    /* 월별 날짜 구분 */
  }
  const groupDatesByMonth = (dates) => {
    const groupedDates = [];
    let currentMonth = null;
    let currentMonthDates = [];

    dates.forEach((date) => {
      const month = date.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      });

      if (currentMonth === null || currentMonth === month) {
        currentMonthDates.push(date);
      } else {
        groupedDates.push({ month: currentMonth, dates: currentMonthDates });
        currentMonthDates = [date];
      }

      currentMonth = month;
    });

    if (currentMonthDates.length) {
      groupedDates.push({ month: currentMonth, dates: currentMonthDates });
    }

    return groupedDates;
  };

  const dateRange = generateDateRange(projectStartDate, projectEndDate);
  const groupedDateRange = groupDatesByMonth(dateRange);

  {
    /* gantt 동시 스크롤 */
  }
  const ganttHeaderRef = useRef(null);
  const ganttBodyRef = useRef(null);

  const syncScroll = (source) => {
    if (!source || !ganttHeaderRef.current || !ganttBodyRef.current) return;

    if (source === ganttHeaderRef.current) {
      ganttBodyRef.current.scrollLeft = ganttHeaderRef.current.scrollLeft;
    } else if (source === ganttBodyRef.current) {
      ganttHeaderRef.current.scrollLeft = ganttBodyRef.current.scrollLeft;
    }
  };

  useEffect(() => {
    const header = ganttHeaderRef.current;
    const body = ganttBodyRef.current;

    if (header && body) {
      const handleScroll = (e) => syncScroll(e.target);

      header.addEventListener('scroll', handleScroll);
      body.addEventListener('scroll', handleScroll);

      return () => {
        header.removeEventListener('scroll', handleScroll);
        body.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  {
    /* 렌더링 */
  }
  return (
    <>
      {/* 간트 차트 헤더 */}
      <TableContainer
        component={Paper}
        ref={ganttHeaderRef}
        sx={{
          width: '100vh',
          overflowX: 'auto',
          overflowY: 'hidden',
          borderRadius: '0',
          '&::-webkit-scrollbar': { display: 'none' },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        }}
        elevation={0}
      >
        <Table sx={{ tableLayout: 'fixed' }}>
          <colgroup>
            {dateRange.map((_, index) => (
              <col key={index} style={{ width: '20px' }} />
            ))}
          </colgroup>
          <TableHead>
            {/* Month Header */}
            <TableRow>
              {groupedDateRange.map(({ month, dates }, index) => (
                <TableCell
                  key={index}
                  colSpan={dates.length}
                  sx={{
                    ...cellStyle,
                    textAlign: 'left',
                    fontSize: '11px',
                    fontWeight: 'fontWeightSemiBold',
                    borderRight: 'none',
                    height: '30px',
                  }}
                >
                  {month}
                </TableCell>
              ))}
            </TableRow>
            {/* Day Header */}
            <TableRow>
              {dateRange.map((date, index) => (
                <TableCell
                  key={index}
                  sx={{
                    ...cellStyle,
                    textAlign: 'center',
                    fontSize: '11px',
                    fontWeight: 'fontWeightSemiBold',
                    borderRight: 'none',
                    height: '30px',
                  }}
                >
                  {date.toLocaleDateString('en-US', { day: 'numeric' })}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
      {/* 간트 차트 내용 */}
      <TableContainer
        component={Paper}
        ref={ganttBodyRef}
        sx={{
          width: '100vh',
          height: '100vh',
          overflowX: 'auto',
          overflowY: 'hidden',
          borderRadius: '0',
          '&::-webkit-scrollbar': { display: 'none' },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        }}
        elevation={0}
      >
        <Table sx={{ tableLayout: 'fixed', height: '100%' }}>
          <colgroup>
            {dateRange.map((_, index) => (
              <col key={index} style={{ width: '20px' }} />
            ))}
          </colgroup>
          <TableBody>
            {tableData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {dateRange.map((date, dateIndex) => {
                  const taskStartDate =
                    row[4]?.value ? new Date(row[4].value) : null;
                  const taskDueDate =
                    row[5]?.value ?
                      new Date(
                        new Date(row[5].value).setDate(
                          new Date(row[5].value).getDate() + 1,
                        ),
                      )
                    : null;
                  const isInRange =
                    taskStartDate &&
                    taskDueDate &&
                    date >= taskStartDate &&
                    date <= taskDueDate;

                  return (
                    <TableCell
                      key={dateIndex}
                      sx={{
                        borderRight: 'none',
                        backgroundColor: isInRange ? '#3f51b5' : 'transparent',
                        width: '20px',
                        minWidth: '20px',
                        height: '30px',
                      }}
                    ></TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default GanttFull;
