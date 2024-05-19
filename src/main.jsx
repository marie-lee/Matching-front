import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Suspense } from 'react';

import App from '@/App';
import { persistor, store } from '@/store';
import ThemeProvider from '@/theme';

// ----------------------------------------------------------------------

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Suspense>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </Suspense>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
);
