import { FC } from 'react';
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';

import { useAppDispatch } from '../../../app/store';
import { checkTodo, ITodo, removeTodo } from '../store';
import useHttp from '../../../shared/hooks/use-http';
import TodoStatus from './TodoStatus';
const TodoItem: FC<ITodo> = ({ id, content, completed }) => {
  const dispatch = useAppDispatch();
  const { isLoading, error, sendRequest } = useHttp();

  const checkTodoHandler = (id: UniqueID) => {
    dispatch(checkTodo(id, completed, sendRequest));
  };

  const deleteTodoHandler = () => {
    dispatch(removeTodo(id, sendRequest));
  };

  return (
    <>
      <ListItem>
        <ListItemButton role="checkbox" dense onClick={checkTodoHandler.bind(null, id)}>
          <ListItemIcon>
            <Checkbox edge="start" checked={completed ?? false} tabIndex={-1} disableRipple />
          </ListItemIcon>
          <ListItemText id={id} primary={content} />
        </ListItemButton>
        <ListItemIcon sx={{ position: 'absolute', right: 0 }}>
          <IconButton onClick={deleteTodoHandler}>
            <DeleteOutline />
          </IconButton>
        </ListItemIcon>
      </ListItem>
      <TodoStatus isLoading={isLoading} error={error} />
    </>
  );
};

export default TodoItem;
