import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import type { RootState } from '../../../store';
import { changeCity } from '../../../store/actions';
import CitiesList from '../../cities-list/cities-list';
import { CityName, SortType } from '../../../const';
import OfferList from '../../offer-list/offer-list';
import Map from '../../map/map';
import SortingOptions from '../../sorting-options/sorting-options';
import { sortOffers } from '../../../utils';

type MainPageProps = {
  cardsCount: number;
}

function MainPage({cardsCount}:MainPageProps): JSX.Element {
  const dispatch = useDispatch();
  const city = useSelector((state:RootState) => state.city);
  const offers = useSelector((state: RootState) => state.offers);
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const [sort, setSort] = useState(SortType.Popular);
  const filteredOffers = offers.filter((offer) => offer.city.name === city);
  const sortedOffers = sortOffers(filteredOffers, sort);
  const visibleOffers = sortedOffers.slice(0, cardsCount);

  const handleCityChange = (newCity: CityName) => {
    dispatch(changeCity(newCity));
  };

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList currentCity={city} onCityChange={handleCityChange} />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{filteredOffers.length} places to stay in {city}</b>
              <SortingOptions currentSort={sort} onSortChange={setSort} />
              <OfferList offers={visibleOffers} onCardHover={setActiveOfferId}/>
            </section>
            <div className="cities__right-section">
              <Map offers={visibleOffers} activeOfferId={activeOfferId}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
