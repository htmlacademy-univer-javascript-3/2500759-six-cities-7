import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { OfferType } from '../../types/offer';

type MapProps = {
  offers: OfferType[];
};

function Map({ offers }: MapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    const map = L.map(mapRef.current).setView([52.37454, 4.897976], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    offers.forEach((offer) => {
      L.marker([offer.location.latitude, offer.location.longitude])
        .addTo(map)
        .bindPopup(`<b>${offer.title}</b><br/>€${offer.price} / night`);
    });

    return () => {
      map.remove();
    };
  }, []);

  return <div ref={mapRef} className="cities__map map" style={{ height: '100%' }} />;
}

export default Map;
