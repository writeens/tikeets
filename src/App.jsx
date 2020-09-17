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
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppRouter />
        </PersistGate>

      </Provider>
    </BrowserRouter>
  );
}

export default App;
