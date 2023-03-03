import { Typography } from '@mui/material';
import { useAppSelector } from '@shared/hooks';

const TodosListStatus = () => {
  const uid = useAppSelector(state => state.todos.uid);
  const status = useAppSelector(state => state.todos.status);
  let info = 'Авторизуйтесь, чтобы сохранить задачи.';

  if (uid) {
    switch (status) {
      case 'success':
        info = 'Задач нет, пора создать новые!';
        break;
      case 'loading':
        info = 'Загрузка...';
        break;
      case 'error':
        info = 'Что-то пошло не так.';
        break;
    }
  }

  return (
    <Typography variant="h5" mt={5} sx={{ textAlign: 'center' }} color="grey">
      {info}
    </Typography>
  );
};

export default TodosListStatus;
