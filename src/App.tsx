import './App.css';
import { useState } from 'react';
import HeaderNav from './components/HeaderNav/HeaderNav';
import Words from './components/Words/Words';
import { TabType } from './types';
import { Tabs } from './constants';

function App() {
  const [currentTab, setCurrentTab] = useState<TabType>(Tabs.words);
  const onWordsPage = currentTab === Tabs.words || currentTab === Tabs.mastered;
  const [wordsCount, setWordsCount] = useState({
    [Tabs.words]: 0,
    [Tabs.mastered]: 0,
  });
  return (
    <>
      <HeaderNav
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        wordsCount={wordsCount}
      />
      {onWordsPage && (
        <Words currentTab={currentTab} setWordsCount={setWordsCount} />
      )}
    </>
  );
}

export default App;
