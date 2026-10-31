import type { OfferPreviewType } from '../../types/offer-preview';
import Card from '../pages/card/card';

type OfferListProps = {
  offers: OfferPreviewType[];
  onCardHover: (id: string | null) => void;
};

function OfferList({ offers, onCardHover }: OfferListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <Card
          key={offer.id}
          offer={offer}
          onMouseEnter={() => onCardHover?.(offer.id)}
          onMouseLeave={() => onCardHover?.(null)}
        />
      ))}
    </div>
  );
}

export default OfferList;
