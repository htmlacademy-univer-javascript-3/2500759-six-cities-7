import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { store } from './store';
import { Settings } from './const';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        cardsCount={Settings.CardsCount}
        reviews={[]}
        nearPlaces={[]}
      />
    </Provider>
  </React.StrictMode>
);
