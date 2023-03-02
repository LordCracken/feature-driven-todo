import { useSelector } from 'react-redux';

import { RootState } from '../../../app/store';
import { Typography } from '@mui/material';
import { Statuses } from '../../../shared/components/Status';

const TodosListStatus = () => {
  const uid = useSelector((state: RootState) => state.todos.uid);
  const status = useSelector((state: RootState) => state.todos.status);
  let info = 'Авторизуйтесь, чтобы сохранить задачи.';

  if (uid) {
    switch (status) {
      case Statuses.success:
        info = 'Задач нет, пора создать новые!';
        break;
      case Statuses.loading:
        info = 'Загрузка...';
        break;
      case Statuses.error:
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
