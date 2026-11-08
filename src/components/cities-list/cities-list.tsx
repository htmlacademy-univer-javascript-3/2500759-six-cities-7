import { CityName } from '../../const';

type CitiesListProps = {
  currentCity: CityName;
  onCityChange: (city: CityName) => void;
};

function CitiesList({ currentCity, onCityChange }: CitiesListProps): JSX.Element {
  const cities = Object.values(CityName);

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li className="locations__item" key={city}>
          <a className={`locations__item-link tabs__item${city === currentCity ? ' tabs__item--active' : ''}`}
            href="#"
            onClick={(evt) => {
              evt.preventDefault();
              onCityChange(city);
            }}
          >
            <span>{city}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default CitiesList;
