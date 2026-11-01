import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { AuthorizationStatus, Settings } from './const';
import { offers } from './mocks/offers';
import { reviews } from './mocks/reviews';
import { nearPlaces } from './mocks/near-places';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      cardsCount={Settings.CardsCount}
      authorizationStatus={AuthorizationStatus.NoAuth}
      offers={offers}
      reviews={reviews}
      nearPlaces={nearPlaces}
    />
  </React.StrictMode>
);
