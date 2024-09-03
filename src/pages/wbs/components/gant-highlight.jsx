import { Box } from '@mui/material';
import { useEffect } from 'react';

const GanttHighlight = ({ highlightDates, dateRange }) => {
  useEffect(() => {
    highlightDates.forEach((group) => {
      const start = group.dates[0];
      const end = group.dates[group.dates.length - 1];

      const startCell = document.querySelector(
        `[data-row-index="${start.rowIndex}"] [data-cell-index="${dateRange.findIndex((d) => d.toISOString().split('T')[0] === start.date)}"]`,
      );

      const endCell = document.querySelector(
        `[data-row-index="${end.rowIndex}"] [data-cell-index="${dateRange.findIndex((d) => d.toISOString().split('T')[0] === end.date)}"]`,
      );

      if (startCell && endCell) {
        const startRect = startCell.getBoundingClientRect();
        const endRect = endCell.getBoundingClientRect();

        const containerRect = startCell
          .closest('table')
          .getBoundingClientRect();

        const line = document.createElement('div');
        line.style.position = 'absolute';
        line.style.height = `${endRect.top - startRect.top}px`;
        line.style.width = `${endRect.left - startRect.left}px`;
        line.style.border = '2px solid black';
        line.style.zIndex = '1';

        // Set the starting point of the line
        line.style.left = `${startRect.left - containerRect.left + startRect.width / 2}px`;
        line.style.top = `${startRect.top - containerRect.top + startRect.height / 2}px`;

        // Append the line to the container
        startCell.closest('table').parentElement.appendChild(line);
      }
    });
  }, [highlightDates, dateRange]);

  return (
    <>
      {highlightDates.map((group) =>
        group.dates.map(({ rowIndex, date }) => {
          const cellIndex = dateRange.findIndex(
            (d) => d.toISOString().split('T')[0] === date,
          );

          return (
            <Box
              key={`${rowIndex}-${cellIndex}`}
              sx={{
                width: '8px',
                height: '8px',
                backgroundColor: 'red',
                borderRadius: '50%',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              data-row-index={rowIndex}
              data-cell-index={cellIndex}
            />
          );
        }),
      )}
    </>
  );
};

export default GanttHighlight;
