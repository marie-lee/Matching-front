// ** dependencies Imports
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

// ** Router Imports
import App from './App.jsx';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
);
