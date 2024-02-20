import './App.css';
import { useState } from 'react';
import HeaderNav from './components/HeaderNav/HeaderNav';
import Words from './components/Words/Words';
import { TabType } from './types';
import { Tabs } from './constants';

function App() {
  const [currentTab, setCurrentTab] = useState<TabType>(Tabs.words);
  const onWordsPage = currentTab === Tabs.words || currentTab === Tabs.mastered;

  return (
    <>
      <HeaderNav currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {onWordsPage && <Words currentTab={currentTab} />}
    </>
  );
}

export default App;
