import React, { useState, useEffect } from 'react';
import './HeaderNav.css';
import logo from '../../../public/logo.png';
import { tabs } from '../../constants';

const HeaderNav = ({
  currentTab,
  setCurrentTab,
}: {
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [underlineStyle, setUnderlineStyle] = useState({});

  const TabItem = ({
    tabName,
    tabDisplayName,
  }: {
    tabName: string;
    tabDisplayName: string;
  }) => {
    return (
      <div
        className={`tab-item ${currentTab === tabName ? 'active' : ''}`}
        onClick={() => setCurrentTab(tabName)}
      >
        {tabDisplayName}
      </div>
    );
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
        {Array.from(tabs.entries()).map((tab, index) => (
          <TabItem key={index} tabName={tab[0]} tabDisplayName={tab[1]} />
        ))}
        <div className="underline" style={underlineStyle}></div>
      </div>
    </div>
  );
};

export default HeaderNav;
