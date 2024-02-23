import './Settings.css';
import { SortKeyType, SortTypeType, SettingsData } from 'src/types';
import { sortKeys, sortTypes } from 'src/constants';
import React, { useState, useEffect } from 'react';
import GitHubButton from 'react-github-btn';

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

  const handleSortingKeyChange = (value: SortKeyType) => {
    if (value !== sortKeys.date && value !== sortKeys.alpha) return;
    setSortingKey(value);
    onSortingChange(value, sortingType);
  };

  const handleSortingTypeChange = (value: SortTypeType) => {
    if (value !== sortTypes.asc && value !== sortTypes.desc) return;
    setSortingType(value);
    onSortingChange(sortingKey, value);
  };

  return (
    <div className="mainContainer">
      <div className="container">
        <span className="optionTitle">Sort Words By</span>
        <form>
          <div className="sortKeyGroup">
            <label className="radioLabel">
              <input
                type="radio"
                name="radio"
                checked={sortingKey === sortKeys.alpha}
              />
              <span onClick={() => handleSortingKeyChange(sortKeys.alpha)}>
                Alphabet
              </span>
            </label>
            <label className="radioLabel dateLabel">
              <input
                type="radio"
                name="radio"
                checked={sortingKey === sortKeys.date}
              />
              <span onClick={() => handleSortingKeyChange(sortKeys.date)}>
                Creation Date
              </span>
            </label>
          </div>
        </form>
      </div>
      <div className="container">
        <span className="optionTitle">Sort Order</span>
        <form>
          <div className="sortKeyGroup">
            <label className="radioLabel">
              <input
                type="radio"
                name="radio"
                checked={sortingType === sortTypes.asc}
              />
              <span onClick={() => handleSortingTypeChange(sortTypes.asc)}>
                {sortingKey === sortKeys.alpha ? 'A-Z' : 'Oldest to Newest'}
              </span>
            </label>
            <label className="radioLabel dateLabel">
              <input
                type="radio"
                name="radio"
                checked={sortingType === sortTypes.desc}
              />
              <span onClick={() => handleSortingTypeChange(sortTypes.desc)}>
                {sortingKey === sortKeys.date ? 'Newest to Oldest' : 'Z-A'}
              </span>
            </label>
          </div>
        </form>
      </div>
      <div className="settingsGithub">
        <GitHubButton
          href="https://github.com/harlan-zhao/Vocabularly"
          data-color-scheme="no-preference: light; light: light; dark: dark;"
          data-icon="octicon-star"
          data-size="large"
          data-show-count="true"
          aria-label="Star harlan-zhao/Vocabularly on GitHub"
        >
          Star on GitHub
        </GitHubButton>
      </div>
    </div>
  );
};

export default Settings;
