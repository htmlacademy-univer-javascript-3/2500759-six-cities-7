import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { store } from './store';
import { loadOffers } from './store/actions';
import { AuthorizationStatus, Settings } from './const';
import { offers } from './mocks/offers';
import { reviews } from './mocks/reviews';
import { nearPlaces } from './mocks/near-places';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(loadOffers(offers));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        cardsCount={Settings.CardsCount}
        authorizationStatus={AuthorizationStatus.NoAuth}
        reviews={reviews}
        nearPlaces={nearPlaces}
      />
    </Provider>
  </React.StrictMode>
);
