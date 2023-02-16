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
import { ITodo, todosActions } from '../store';

const TodoItem: FC<ITodo> = ({ id, content, completed }) => {
  const dispatch = useAppDispatch();

  const checkTodoHandler = (id: UniqueID) => {
    dispatch(todosActions.checkTodo(id));
  };

  const deleteTodoHandler = () => {
    dispatch(todosActions.removeTodo(id));
  };

  return (
    <ListItem>
      <ListItemButton role="checkbox" dense onClick={checkTodoHandler.bind(null, id)}>
        <ListItemIcon>
          <Checkbox edge="start" checked={completed} tabIndex={-1} disableRipple />
        </ListItemIcon>
        <ListItemText id={id} primary={content} />
        <ListItemIcon>
          <IconButton onClick={deleteTodoHandler}>
            <DeleteOutline />
          </IconButton>
        </ListItemIcon>
      </ListItemButton>
    </ListItem>
  );
};

export default TodoItem;
