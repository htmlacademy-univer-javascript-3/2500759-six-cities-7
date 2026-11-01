import { Link } from 'react-router-dom';
import classNames from 'classnames';
import type { OfferPreviewType } from '../../../types/offer-preview';
import { getOfferRoute } from '../../../const';

type CardVariant = 'main' | 'near';

type CardProps = {
  offer: OfferPreviewType;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  variant?: CardVariant;
}

function Card({offer, onMouseEnter, onMouseLeave, variant = 'main'}: CardProps): JSX.Element {
  const {
    id,
    title,
    type,
    price,
    previewImage,
    isPremium,
    isFavorite,
    rating,
  } = offer;

  const isMain = variant === 'main';

  return (
    <article className={classNames('place-card', {'cities__card': isMain, 'near-places__card': !isMain,})} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {isPremium && (<div className="place-card__mark"><span>Premium</span></div>)}
      <div className={classNames('place-card__image-wrapper', {'cities__image-wrapper': isMain, 'near-places__image-wrapper': !isMain,})}>
        <Link to={getOfferRoute(id)}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt={title}/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={classNames('place-card__bookmark-button', 'button', {'place-card__bookmark-button--active': isFavorite,})} type="button" >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${(rating / 5) * 100}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={getOfferRoute(id)}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default Card;
