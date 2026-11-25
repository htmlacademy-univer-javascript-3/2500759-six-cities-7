import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useState, useMemo } from 'react';
import { changeCity } from '../../../store/actions';
import CitiesList from '../../cities-list/cities-list';
import { CityName, SortType } from '../../../const';
import OfferList from '../../offer-list/offer-list';
import Map from '../../map/map';
import SortingOptions from '../../sorting-options/sorting-options';
import { sortOffers } from '../../../utils';
import Spinner from '../../spinner/spinner';
import Header from '../../header/header';

type MainPageProps = {
  cardsCount: number;
}

function MainPage({cardsCount}:MainPageProps): JSX.Element {
  const dispatch = useAppDispatch();
  const city = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers);
  const isLoading = useAppSelector((state) => state.isLoading);

  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const [sort, setSort] = useState(SortType.Popular);

  const filteredOffers = useMemo(
    () => offers.filter((offer) => offer.city.name === city),
    [offers, city]
  );

  const visibleOffers = useMemo(
    () => sortOffers(filteredOffers, sort).slice(0, cardsCount),
    [filteredOffers, sort, cardsCount]
  );

  const handleCityChange = (newCity: CityName) => {
    dispatch(changeCity(newCity));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="page page--gray page--main">
      <Header />

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
