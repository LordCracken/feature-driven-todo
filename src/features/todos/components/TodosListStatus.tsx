import { useSelector } from 'react-redux';

import { RootState } from '../../../app/store';
import { TodosStatuses } from '../store';

import { Typography } from '@mui/material';

const TodosListStatus = () => {
  const status = useSelector((state: RootState) => state.todos.status);
  let info = '';

  switch (status) {
    case TodosStatuses.success:
      info = 'Задач нет, пора создать новые!';
      break;
    case TodosStatuses.loading:
      info = 'Загрузка...';
      break;
    case TodosStatuses.error:
      info = 'Что-то пошло не так.';
      break;
  }

  return (
    <Typography variant="h5" mt={5} sx={{ textAlign: 'center' }} color="grey">
      {info}
    </Typography>
  );
};

export default TodosListStatus;
