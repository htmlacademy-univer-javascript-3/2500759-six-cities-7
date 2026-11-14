import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import classNames from 'classnames';
import type { OfferPreviewType } from '../../types/offer-preview';

type MapVariant = 'main' | 'offer';

type MapProps = {
  offers: OfferPreviewType[];
  variant?: MapVariant;
  activeOfferId: string | null;
};

function Map({ offers, variant = 'main', activeOfferId }: MapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<globalThis.Map<string, L.Marker>>(
    new globalThis.Map<string, L.Marker>()
  );

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    const map = L.map(mapRef.current).setView([52.37454, 4.897976], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    const defaultIcon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    offers.forEach((offer) => {
      const marker = L.marker([offer.location.latitude, offer.location.longitude], {
        icon: defaultIcon,
      })
        .addTo(map)
        .bindPopup(`<b>${offer.title}</b><br/>€${offer.price} / night`);

      markersRef.current.set(offer.id, marker);
    });

    return () => {
      map.remove();
    };
  }, [offers]);

  useEffect(() => {
    const defaultIcon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const activeIcon = L.icon({
      iconUrl: 'img/pin-active.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    markersRef.current.forEach((marker, id) => {
      marker.setIcon(id === activeOfferId ? activeIcon : defaultIcon);
    });
  }, [activeOfferId]);

  return <div ref={mapRef} className={classNames('map', {'cities__map': variant === 'main', 'offer__map': variant === 'offer',})} style={{ height: '100%' }}/>;
}

export default Map;
