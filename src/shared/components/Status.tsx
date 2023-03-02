import { FC, useEffect, useState } from 'react';
import { Alert, Snackbar, SnackbarOrigin } from '@mui/material';

type ISeverity = 'info' | 'error' | 'warning' | 'success';

export enum Statuses {
  success = 'done',
  loading = 'loading',
  error = 'fail',
}

interface IStatusProps {
  status: Statuses;
  message: string;
  position?: SnackbarOrigin;
}

const Status: FC<IStatusProps> = ({
  status,
  message,
  position = { vertical: 'bottom', horizontal: 'left' },
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [severity, setSeverity] = useState<ISeverity>('info');

  useEffect(() => {
    if (status === Statuses.loading) {
      setSeverity('info');
      setIsOpen(true);
    }

    if (status === Statuses.error) {
      setSeverity('error');
      setIsOpen(true);
    }

    if (status === Statuses.success) {
      setSeverity('success');
      setIsOpen(true);
    }
  }, [status]);

  const closeSnackHandler = () => {
    setIsOpen(false);
  };

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={4000}
      onClose={closeSnackHandler}
      anchorOrigin={position}
    >
      <Alert severity={severity} onClose={closeSnackHandler}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Status;
