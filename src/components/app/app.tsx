import {Route, BrowserRouter, Routes} from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import MainPage from '../../components/pages/main-screen/main-screen';
import FavoritesPage from '../../components/pages/favorites-screen/favorites-screen';
import LoginPage from '../../components/pages/login-screen/login-screen';
import OfferPage from '../../components/pages/offer-screen/offer-screen';
import NotFoundPage from '../../components/pages/not-found-screen/not-found-screen';
import PrivateRoute from '../../components/private-route/private-route';
import { OfferType } from '../../types/offer';

type AppProps = {
  cardsCount: number;
  authorizationStatus: AuthorizationStatus;
  offers: OfferType[];
}

function App({cardsCount, authorizationStatus, offers}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage cardsCount={cardsCount} offers={offers}/>}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <FavoritesPage offers={offers}/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage />}
        />
        <Route
          path={AppRoute.Offer}
          element={<OfferPage offers={offers}/>}
        />
        <Route
          path={AppRoute.NotFound}
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
