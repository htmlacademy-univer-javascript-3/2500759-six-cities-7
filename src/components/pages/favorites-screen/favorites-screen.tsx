import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';
import type { OfferType } from '../../../types/offer';
import { AppRoute, getOfferRoute } from '../../../const';
import Header from '../../header/header';

function FavoritesPage(): JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  const grouped = favoriteOffers.reduce<Record<string, OfferType[]>>(
    (acc, offer) => {
      const city = offer.city.name;
      if (!acc[city]) {
        acc[city] = [];
      }
      acc[city].push(offer);
      return acc;
    },
    {}
  );

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className={`favorites${favoriteOffers.length === 0 ? ' favorites--empty' : ''}`}>
            <h1 className="favorites__title">Saved listing</h1>
            {favoriteOffers.length === 0 ? (
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">
                  Save properties to narrow down search or plan your future trips.
                </p>
              </div>
            ) : (
              <ul className="favorites__list">
                {Object.entries(grouped).map(([city, cityOffers]) => (
                  <li className="favorites__locations-items" key={city}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{city}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {cityOffers.map((offer) => (
                        <article className="favorites__card place-card" key={offer.id}>
                          {offer.isPremium && (
                            <div className="place-card__mark">
                              <span>Premium</span>
                            </div>
                          )}
                          <div className="favorites__image-wrapper place-card__image-wrapper">
                            <Link to={getOfferRoute(offer.id)}>
                              <img className="place-card__image" src={offer.previewImage} width="150" height="110" alt={offer.title}/>
                            </Link>
                          </div>
                          <div className="favorites__card-info place-card__info">
                            <div className="place-card__price-wrapper">
                              <div className="place-card__price">
                                <b className="place-card__price-value">&euro;{offer.price}</b>
                                <span className="place-card__price-text">&#47;&nbsp;night</span>
                              </div>
                              <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
                                <svg className="place-card__bookmark-icon" width="18" height="19">
                                  <use xlinkHref="#icon-bookmark"></use>
                                </svg>
                                <span className="visually-hidden">In bookmarks</span>
                              </button>
                            </div>
                            <div className="place-card__rating rating">
                              <div className="place-card__stars rating__stars">
                                <span style={{width: `${(offer.rating / 5) * 100}%`,}}></span>
                                <span className="visually-hidden">Rating</span>
                              </div>
                            </div>
                            <h2 className="place-card__name">
                              <Link to={getOfferRoute(offer.id)}>
                                {offer.title}
                              </Link>
                            </h2>
                            <p className="place-card__type">{offer.type}</p>
                          </div>
                        </article>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>

      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Main}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesPage;
