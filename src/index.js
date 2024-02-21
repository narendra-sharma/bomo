import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import './App.css';
import { Provider } from 'react-redux';
import store from './reduxdata/store';
import '@fortawesome/fontawesome-free/css/all.min.css';
console.error = console.warn = () => {};

const LazyApp = React.lazy(() => import('./App'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Suspense fallback={<div>Loading...</div>}>
      <LazyApp />
    </Suspense>
  </Provider>
);

reportWebVitals();
