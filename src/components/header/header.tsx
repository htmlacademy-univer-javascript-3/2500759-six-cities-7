import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { AppRoute, AuthorizationStatus } from '../../const';
import { setAuthorizationStatus, setUser } from '../../store/actions';

function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const user = useAppSelector((state) => state.user);
  const offers = useAppSelector((state) => state.offers);

  const favoriteCount = offers.filter((offer) => offer.isFavorite).length;

  const handleSignOut = (evt: React.MouseEvent) => {
    evt.preventDefault();
    localStorage.removeItem('token');
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    dispatch(setUser(null));
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={AppRoute.Main}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {authorizationStatus === AuthorizationStatus.Auth ? (
                <>
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__user-name user__name">{user?.email}</span>
                      <span className="header__favorite-count">{favoriteCount}</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <a className="header__nav-link" href="#" onClick={handleSignOut}>
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </>
              ) : (
                <li className="header__nav-item">
                  <Link className="header__nav-link" to={AppRoute.Login}>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
