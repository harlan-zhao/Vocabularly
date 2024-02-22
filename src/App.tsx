import './App.css';
import { useState, useEffect } from 'react';
import HeaderNav from './components/HeaderNav/HeaderNav';
import Words from './components/Words/Words';
import Settings from './components/Settings/Settings';
import { TabType, SettingsData, SortKeyType, SortTypeType } from './types';
import { getSettings, saveSettings } from './services';
import { Tabs, sortKeys, sortTypes } from './constants';

function App() {
  const [currentTab, setCurrentTab] = useState<TabType>(Tabs.words);
  const onWordsPage = currentTab === Tabs.words || currentTab === Tabs.mastered;
  const [settings, setSettings] = useState<SettingsData>({
    sortKey: sortKeys.alpha,
    sortType: sortTypes.asc,
  });
  const [wordsCount, setWordsCount] = useState({
    [Tabs.words]: 0,
    [Tabs.mastered]: 0,
  });

  useEffect(() => {
    const getSettingsData = async () => {
      const settingsData = await getSettings();
      setSettings(settingsData);
    };
    getSettingsData();
  }, []);

  const onSortingChange = (
    sortingName: SortKeyType,
    sortingType: SortTypeType
  ) => {
    console.log(sortingName, sortingType);
    setSettings({
      sortKey: sortingName,
      sortType: sortingType,
    });
    saveSettings({
      sortKey: sortingName,
      sortType: sortingType,
    });
  };

  return (
    <>
      <HeaderNav
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        wordsCount={wordsCount}
      />
      {onWordsPage && (
        <Words
          currentTab={currentTab}
          setWordsCount={setWordsCount}
          settings={settings}
        />
      )}
      {currentTab === Tabs.settings && (
        <Settings onSortingChange={onSortingChange} settings={settings} />
      )}
    </>
  );
}

export default App;
