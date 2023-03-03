import { FC } from 'react';

import { checkTodo, ITodo, removeTodo } from '../store';

import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import { useAppDispatch } from '@shared/hooks';

const TodoItem: FC<ITodo> = ({ id, content, completed }) => {
  const dispatch = useAppDispatch();

  const checkTodoHandler = (id: UniqueID) => {
    dispatch(checkTodo(id, completed));
  };

  const deleteTodoHandler = () => {
    dispatch(removeTodo(id));
  };

  return (
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
  );
};

export default TodoItem;
