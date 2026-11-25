import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReviewForm from '../../review-form/review-form';
import NotFoundPage from '../not-found-screen/not-found-screen';
import { AuthorizationStatus } from '../../../const';
import ReviewList from '../../review-list/review-list';
import NearPlacesList from '../../near-places-list/near-places-list';
import Map from '../../map/map';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchOffer, fetchNearPlaces, fetchReviews } from '../../../store/api-actions';
import Spinner from '../../spinner/spinner';
import Header from '../../header/header';

function OfferPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const offer = useAppSelector((state) => state.offer);
  const nearPlaces = useAppSelector((state) => state.nearPlaces);
  const reviews = useAppSelector((state) => state.reviews);
  const isOfferLoading = useAppSelector((state) => state.isOfferLoading);
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  useEffect(() => {
    if (id) {
      dispatch(fetchOffer(id));
      dispatch(fetchNearPlaces(id));
      dispatch(fetchReviews(id));
    }
  }, [id, dispatch]);

  if (isOfferLoading) {
    return <Spinner />;
  }

  if (!offer) {
    return <NotFoundPage/>;
  }

  const {
    title,
    type,
    price,
    rating,
    isPremium,
    isFavorite,
    bedrooms,
    maxAdults,
    description,
    goods,
    host,
    images,
  } = offer;

  return(
    <div className="page" >
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images.map((image) => (
                <div className="offer__image-wrapper" key={image}>
                  <img className="offer__image" src={image} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {title}
                </h1>
                <button className={`offer__bookmark-button button${isFavorite ? ' offer__bookmark-button--active' : ''}`} type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${(rating / 5) * 100}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {goods.map((good) => (
                    <li className="offer__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div
                    className={`offer__avatar-wrapper user__avatar-wrapper${host.isPro ? ' offer__avatar-wrapper--pro' : ''}`}
                  >
                    <img className="offer__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="offer__user-name">{host.name}</span>
                  {host.isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <ReviewList reviews={reviews} />
                {authorizationStatus === AuthorizationStatus.Auth && (
                  <ReviewForm offerId={offer.id} />
                )}
              </section>
            </div>
          </div>
          <Map offers={nearPlaces} variant="offer" activeOfferId={activeOfferId}/>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <NearPlacesList offers={nearPlaces} onCardHover={setActiveOfferId}/>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
