import { Dispatch } from '@reduxjs/toolkit';
import { todosActions } from './slice';
import { Statuses } from '../../../shared/components/Status';

interface IReqConf<Body> {
  url: string;
  method?: 'POST' | 'GET' | 'DELETE' | 'PATCH';
  headers?: HeadersInit;
  body?: Body;
}

export const sendTodosRequest = async <ReqBody>(
  dispatch: Dispatch,
  requestConfig: IReqConf<ReqBody>,
  successMsg = 'Готово!',
  failMsg = 'Ошибка!',
) => {
  dispatch(todosActions.updateStatus({ status: Statuses.loading, message: 'Загрузка...' }));

  try {
    const { url, method, headers, body } = requestConfig;
    const response = await fetch(url, {
      method: method ? method : 'GET',
      headers: headers ? headers : {},
      body: body ? JSON.stringify(body) : null,
    });

    if (response.ok) {
      dispatch(todosActions.updateStatus({ status: Statuses.success, message: successMsg }));
    }

    return response;
  } catch (error) {
    dispatch(todosActions.updateStatus({ status: Statuses.error, message: failMsg }));
  }
};
