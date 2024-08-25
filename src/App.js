import React from 'react';
import AppRoutes from './router/index';
import { Provider } from 'react-redux';
import { Navbar } from './components/Navbar';
import store from './store/store';
import {ModalComponent} from './components/ModalComponent';

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <AppRoutes />
      <ModalComponent />
    </Provider>
  );
}

export default App;
