import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Alert, Snackbar } from '@mui/material';

import { RootState } from '../../../app/store';
import { TodosStatuses } from '../store';

type ISeverity = 'info' | 'error' | 'warning' | 'success';

const TodoStatus = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [severity, setSeverity] = useState<ISeverity>('info');

  const status = useSelector((state: RootState) => state.todos.status);
  const message = useSelector((state: RootState) => state.todos.statusMsg);

  useEffect(() => {
    if (status === TodosStatuses.loading) {
      setSeverity('info');
      setIsOpen(true);
    }

    if (status === TodosStatuses.error) {
      setSeverity('error');
      setIsOpen(true);
    }

    if (status === TodosStatuses.success) {
      setSeverity('success');
      setIsOpen(true);
    }
  }, [status]);

  const closeSnackHandler = () => {
    setIsOpen(false);
  };

  return (
    <Snackbar open={isOpen} autoHideDuration={4000} onClose={closeSnackHandler}>
      <Alert severity={severity} onClose={closeSnackHandler}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default TodoStatus;
