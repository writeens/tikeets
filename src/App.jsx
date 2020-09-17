import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import AppRouter from './routers/AppRouter';
import './styles/main.css';
import configureStore from './redux/configureStore';

const { store, persistor } = configureStore();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <AppRouter />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
