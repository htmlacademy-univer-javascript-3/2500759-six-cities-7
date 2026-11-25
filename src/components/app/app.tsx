import { useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { checkAuth, loadOffers } from '../../store/api-actions';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import { AppRoute } from '../../const';
import MainPage from '../../components/pages/main-screen/main-screen';
import FavoritesPage from '../../components/pages/favorites-screen/favorites-screen';
import LoginPage from '../../components/pages/login-screen/login-screen';
import OfferPage from '../../components/pages/offer-screen/offer-screen';
import NotFoundPage from '../../components/pages/not-found-screen/not-found-screen';
import PrivateRoute from '../../components/private-route/private-route';

type AppProps = {
  cardsCount: number;
}

function App({cardsCount}: AppProps): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadOffers());
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage cardsCount={cardsCount}/>}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage />}
        />
        <Route
          path={AppRoute.Offer}
          element={<OfferPage />}
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
