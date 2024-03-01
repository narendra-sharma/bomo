import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import './App.css';
import { Provider } from 'react-redux';
import store from './reduxdata/store';
import '@fortawesome/fontawesome-free/css/all.min.css';
console.error = console.warn = () => {};
const LoadingSpinner=React.lazy(() => import('./LoadingSpinner'));
const LazyApp = React.lazy(() => import('./App'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Suspense fallback={<LoadingSpinner />}>
      <LazyApp />
    </Suspense>
  </Provider>
);

reportWebVitals();
