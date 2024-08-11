import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Suspense } from 'react';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');

import App from '@/App';
import { persistor, store } from '@/store';
import ThemeProvider from '@/theme';

import { AxiosInterceptor } from '@/services/components';

// ----------------------------------------------------------------------

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Suspense>
          <ThemeProvider>
            <AxiosInterceptor />
            <App />
          </ThemeProvider>
        </Suspense>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
);
