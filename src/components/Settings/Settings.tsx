import './Settings.css';
import { SortKeyType, SortTypeType, SettingsData } from 'src/types';
import { sortKeys, sortTypes } from 'src/constants';
import React, { useState, useEffect } from 'react';

interface SortingOptionsProps {
  onSortingChange: (
    sortingName: SortKeyType,
    sortingType: SortTypeType
  ) => void;
  settings: SettingsData;
}

const Settings: React.FC<SortingOptionsProps> = ({
  onSortingChange,
  settings,
}) => {
  const [sortingKey, setSortingKey] = useState<SortKeyType>(settings.sortKey);
  const [sortingType, setSortingType] = useState<SortTypeType>(
    settings.sortType
  );

  useEffect(() => {
    setSortingKey(settings.sortKey);
    setSortingType(settings.sortType);
  }, [settings]);

  const handleSortingKeyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (value !== sortKeys.date && value !== sortKeys.alpha) return;
    setSortingKey(value);
    onSortingChange(value, sortingType);
  };

  const handleSortingTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (value !== sortTypes.asc && value !== sortTypes.desc) return;
    setSortingType(value);
    onSortingChange(sortingKey, value);
  };

  return (
    <div>
      <div className="sort-section">
        <h3>Sort By</h3>
        <label>
          <input
            type="radio"
            name="sortingName"
            value={sortKeys.date}
            checked={sortingKey === sortKeys.date}
            onChange={handleSortingKeyChange}
          />{' '}
          Date
        </label>
        <label>
          <input
            type="radio"
            name="sortingName"
            value={sortKeys.alpha}
            checked={sortingKey === sortKeys.alpha}
            onChange={handleSortingKeyChange}
          />
          Alphabetical
        </label>
      </div>

      <div className="sort-section">
        <h3>Sort Order</h3>
        <label>
          <input
            type="radio"
            name="sortingType"
            value="asc"
            checked={sortingType === 'asc'}
            onChange={handleSortingTypeChange}
          />
          Ascending
        </label>
        <label>
          <input
            type="radio"
            name="sortingType"
            value={sortTypes.desc}
            checked={sortingType === sortTypes.desc}
            onChange={handleSortingTypeChange}
          />{' '}
          Descending
        </label>
      </div>
    </div>
  );
};

export default Settings;
