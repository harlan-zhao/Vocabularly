import React, { useState, useEffect } from 'react';
import './HeaderNav.css';
import logo from '../../../public/logo.png';
import { TabType } from '../../types';
import { TabsList, Tabs } from '../../constants';

const HeaderNav = ({
  currentTab,
  setCurrentTab,
  wordsCount,
}: {
  currentTab: TabType;
  setCurrentTab: React.Dispatch<React.SetStateAction<TabType>>;
  wordsCount: { [Tabs.words]: number; [Tabs.mastered]: number };
}) => {
  const [underlineStyle, setUnderlineStyle] = useState({});

  const TabItem = ({
    tabName,
    tabDisplayName,
    count,
  }: {
    tabName: TabType;
    tabDisplayName: string;
    count?: number;
  }) => (
    <div
      className={`tab-item ${currentTab === tabName ? 'active' : ''}`}
      onClick={() => setCurrentTab(tabName)}
    >
      {tabDisplayName} {Boolean(count) && <span>({count})</span>}
    </div>
  );

  const getWordsCount = (tabName: TabType) => {
    switch (tabName) {
      case Tabs.words:
        return wordsCount[Tabs.words];
      case Tabs.mastered:
        return wordsCount[Tabs.mastered];
      default:
        return 0;
    }
  };

  useEffect(() => {
    const activeNavItem = document.querySelector('.tab-item.active');
    const navRect = document.querySelector('.navbar')?.getBoundingClientRect();
    const activeNavItemRect = activeNavItem?.getBoundingClientRect();
    if (activeNavItemRect === undefined || navRect === undefined) return;
    const left = activeNavItemRect.left - navRect.left;
    const width = activeNavItemRect.width;

    setUnderlineStyle({
      width: `${width}px`,
      transform: `translateX(${left}px)`,
    });
  }, [currentTab]);

  return (
    <div className="header">
      <img src={logo} className="logo" alt="Vocabularly logo" />
      <div className="navbar">
        {Array.from(TabsList.entries()).map((tab, index) => (
          <TabItem
            key={index}
            tabName={tab[0]}
            tabDisplayName={tab[1]}
            count={getWordsCount(tab[0])}
          />
        ))}
        <div className="underline" style={underlineStyle}></div>
      </div>
    </div>
  );
};

export default HeaderNav;
