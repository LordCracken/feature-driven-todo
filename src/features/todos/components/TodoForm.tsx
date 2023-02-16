import { ChangeEvent, FormEvent, useState } from 'react';
import { IconButton, InputBase, Paper } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

import { useAppDispatch } from '../../../app/store';
import { todosActions } from '../store';

const TodoForm = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState('');

  const changeValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValue(value);
  };

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    if (value.length > 0) {
      const newTodo = {
        id: performance.now(),
        content: value,
        completed: false,
      };

      dispatch(todosActions.addNewTodo(newTodo));
      setValue('');
    }
  };

  return (
    <Paper
      component="form"
      sx={{ p: '5px 10px', display: 'flex', alignItems: 'center' }}
      onSubmit={submitHandler}
    >
      <InputBase
        sx={{ flex: 1 }}
        fullWidth
        placeholder="Add New Todo"
        value={value}
        onChange={changeValueHandler}
      />
      <IconButton type="submit" color="primary" sx={{ p: '10px' }}>
        <ArrowForward />
      </IconButton>
    </Paper>
  );
};

export default TodoForm;
