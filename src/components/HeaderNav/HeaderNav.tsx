import { useState, useEffect } from 'react';
import './HeaderNav.css';
import logo from '../../../public/logo.png';
import { tabs } from '../../constants';

const HeaderNav = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].path);
  const [underlineStyle, setUnderlineStyle] = useState({});

  const TabItem = ({ tab }: { tab: { displayName: string; path: string } }) => {
    return (
      <div
        className={`tab-item ${activeTab === tab.path ? 'active' : ''}`}
        onClick={() => setActiveTab(tab.path)}
      >
        {tab.displayName}
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
  }, [activeTab]);

  return (
    <div className="header">
      <img src={logo} className="logo" alt="Vocabularly logo" />
      <div className="navbar">
        {tabs.map((tab, index) => (
          <TabItem key={index} tab={tab} />
        ))}
        <div className="underline" style={underlineStyle}></div>
      </div>
    </div>
  );
};

export default HeaderNav;
