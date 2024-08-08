import { Button } from '@mui/material';
import { Icon } from '@iconify/react';

const IssueAddButton = () => {
  return (
    <Button variant={'outlined'} size={'large'}>
      <Icon icon={'ic:outline-plus'} fontSize={'28'} />
    </Button>
  );
};

export default IssueAddButton;
