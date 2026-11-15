import Card from '../pages/card/card';
import type { OfferPreviewType } from '../../types/offer-preview';

type NearPlacesListProps = {
  offers: OfferPreviewType[];
  onCardHover: (id: string | null) => void;
};

function NearPlacesList({offers, onCardHover}: NearPlacesListProps): JSX.Element {
  return(
    <div className="near-places__list places__list">
      {offers.map((offer) => (
        <Card key={offer.id} offer={offer} variant="near" onMouseEnter={() => onCardHover(offer.id)} onMouseLeave={() => onCardHover(null)}/>
      ))}
    </div>
  );
}

export default NearPlacesList;
