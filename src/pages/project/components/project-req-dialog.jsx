import { Dialog } from '@mui/material';

const ProjectReqDialog = ({ open, setOpen }) => {
  return (
    <Dialog open={open} maxWidth={'md'} onClose={() => setOpen(false)}></Dialog>
  );
};

export default ProjectReqDialog;
