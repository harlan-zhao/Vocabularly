import './App.css';
import { useState } from 'react';
import HeaderNav from './components/HeaderNav/HeaderNav';
import Words from './components/Words/Words';
import { defaultTab } from './constants';

function App() {
  const [currentTab, setCurrentTab] = useState(defaultTab);
  return (
    <>
      <HeaderNav currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <Words />
    </>
  );
}

export default App;
