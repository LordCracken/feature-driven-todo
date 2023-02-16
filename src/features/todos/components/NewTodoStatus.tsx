import { FC, useEffect, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

interface INewTodoStatus {
  isLoading: boolean;
  error: string | null;
}

type ISeverity = 'info' | 'error' | 'warning' | 'success';

const NewTodoStatus: FC<INewTodoStatus> = ({ isLoading, error }) => {
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [severity, setSeverity] = useState<ISeverity>('info');
  const [isLoadingStart, setIsLoadingStart] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setIsLoadingStart(true);
      setSeverity('info');
      setMessage('Загрузка...');
      setIsOpen(true);
    }

    if (isLoadingStart && !isLoading && error) {
      setSeverity('error');
      setMessage('Не удалось создать задачу.');
      setIsOpen(true);
      setIsLoadingStart(false);
    }

    if (isLoadingStart && !isLoading && !error) {
      setSeverity('success');
      setMessage('Задача добавлена.');
      setIsOpen(true);
      setIsLoadingStart(false);
    }
  }, [isLoading]);

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

export default NewTodoStatus;
