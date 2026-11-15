import { useState } from 'react';
import { SortType } from '../../const';

type SortingOptionsProps = {
  currentSort: SortType;
  onSortChange: (sort: SortType) => void;
};

type SortingOption = {
  value: SortType;
  label: string;
};

const SORTING_OPTIONS: SortingOption[] = [
  { value: SortType.Popular, label: 'Popular' },
  { value: SortType.PriceLowToHigh, label: 'Price: low to high' },
  { value: SortType.PriceHighToLow, label: 'Price: high to low' },
  { value: SortType.TopRatedFirst, label: 'Top rated first' },
];

function SortingOptions({ currentSort, onSortChange }: SortingOptionsProps): JSX.Element{
  const [isOpen, setIsOpen] = useState(false);
  const currentLabel = SORTING_OPTIONS.find((o) => o.value === currentSort)?.label;

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => setIsOpen((prev) => !prev)}>
        {currentLabel}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom${isOpen ? ' places__options--opened' : ''}`}>
        {SORTING_OPTIONS.map((option) => (
          <li key={option.value}
            className={`places__option${option.value === currentSort ? ' places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => {
              onSortChange(option.value);
              setIsOpen(false);
            }}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortingOptions;
