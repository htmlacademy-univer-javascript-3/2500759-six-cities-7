import Card from '../pages/card/card';
import type { OfferPreviewType } from '../../types/offer-preview';

type NearPlacesListProps = {
  offers: OfferPreviewType[];
};

function NearPlacesList({offers}: NearPlacesListProps): JSX.Element {
  return(
    <div className="near-places__list places__list">
      {offers.map((offer) => (
        <Card key={offer.id} offer={offer} variant="near" />
      ))}
    </div>
  );
}

export default NearPlacesList;
