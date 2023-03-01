import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeApp } from 'firebase/app';

import App from './app';
import { Provider } from 'react-redux';
import store from './app/store';

const firebaseConfig = {
  apiKey: 'AIzaSyDEFS_sKdw0tTLD1-aTYEBQdXKkIgXF7_k',
  authDomain: 'feature-driven-todos.firebaseapp.com',
  databaseURL: 'https://feature-driven-todos-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'feature-driven-todos',
  storageBucket: 'feature-driven-todos.appspot.com',
  messagingSenderId: '55624396430',
  appId: '1:55624396430:web:69a3feb043219e270b23df',
};
initializeApp(firebaseConfig);

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
