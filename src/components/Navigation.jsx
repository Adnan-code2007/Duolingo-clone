import React from 'react';
import { Compass, Dumbbell, Trophy, Target, ShoppingBag, User } from 'lucide-react';
import { sound } from '../utils/audio';

export const Sidebar = ({
  activeTab,
  onTabChange,
  unclaimedQuestsCount = 0,
  activeLanguage = 'es'
}) => {
  const navItems = [
    { id: 'learn', label: 'LEARN', icon: Compass, color: '#58cc02' },
    { id: 'practice', label: 'PRACTICE', icon: Dumbbell, color: '#1cb0f6' },
    { id: 'leaderboard', label: 'LEADERBOARD', icon: Trophy, color: '#ffc800' },
    { id: 'quests', label: 'QUESTS', icon: Target, color: '#ff9600', badge: unclaimedQuestsCount },
    { id: 'shop', label: 'SHOP', icon: ShoppingBag, color: '#ce82ff' },
    { id: 'profile', label: 'PROFILE', icon: User, color: '#ff4b4b' }
  ];

  return (
    <aside 
      className="d-none d-md-flex flex-column p-3 bg-white border-end border-2 border-light-subtle"
      style={{ width: '256px', minHeight: '100vh', position: 'sticky', top: 0 }}
    >
      {/* Brand Logo */}
      <div 
        onClick={() => {
          sound.playPop();
          onTabChange('learn');
        }}
        className="d-flex align-items-center gap-2 mb-4 px-3 py-2 cursor-pointer select-none"
      >
        <span className="fs-2" role="img" aria-label="Duolingo Owl">🦉</span>
        <span 
          className="fs-3 fw-bolder tracking-tight"
          style={{ color: '#58cc02', letterSpacing: '-0.03em' }}
        >
          duolingo
        </span>
      </div>

      {/* Nav Link List */}
      <nav className="d-flex flex-column gap-2 flex-grow-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                sound.playPop();
                onTabChange(item.id);
              }}
              className="btn text-start d-flex align-items-center gap-3 px-3 py-2.5 rounded-3 fw-bolder border-2"
              style={{
                borderColor: isActive ? '#84d8ff' : 'transparent',
                backgroundColor: isActive ? '#ddf4ff' : 'transparent',
                color: isActive ? '#1899d6' : '#495057',
                fontSize: '0.95rem',
                letterSpacing: '0.04em',
                transition: 'all 0.15s ease'
              }}
            >
              <Icon 
                size={24} 
                style={{ color: isActive ? '#1899d6' : '#6c757d' }} 
              />
              <span className="flex-grow-1">{item.label}</span>
              {item.badge ? item.badge > 0 && (
                <span className="badge rounded-pill bg-danger px-2 py-1 fs-8">
                  {item.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="pt-3 border-top border-light-subtle text-muted fs-8 px-2 text-center">
        <p className="mb-0 fw-bold text-secondary">
          {activeLanguage === 'hi' ? 'Hindi Course 🇮🇳' : 'Spanish Course 🇪🇸'}
        </p>
        <small className="text-secondary">Duolingo Experience Clone</small>
      </div>
    </aside>
  );
};

export const MobileBottomNav = ({
  activeTab,
  onTabChange,
  unclaimedQuestsCount = 0
}) => {
  const navItems = [
    { id: 'learn', label: 'Learn', icon: Compass },
    { id: 'practice', label: 'Practice', icon: Dumbbell },
    { id: 'leaderboard', label: 'Ranks', icon: Trophy },
    { id: 'quests', label: 'Quests', icon: Target, badge: unclaimedQuestsCount },
    { id: 'shop', label: 'Shop', icon: ShoppingBag },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className="d-flex d-md-none fixed-bottom bg-white border-top border-2 border-light-subtle justify-content-around py-2 px-1 z-40">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => {
              sound.playPop();
              onTabChange(item.id);
            }}
            className={`btn border-0 p-1 position-relative d-flex flex-column align-items-center ${
              isActive ? 'text-primary' : 'text-secondary'
            }`}
            style={{ minWidth: '48px', color: isActive ? '#58cc02' : '#6c757d' }}
          >
            <Icon size={22} />
            <span style={{ fontSize: '0.7rem', fontWeight: 800 }}>{item.label}</span>
            {item.badge ? item.badge > 0 && (
              <span 
                className="position-absolute top-0 end-0 badge rounded-pill bg-danger p-1"
                style={{ fontSize: '0.55rem', transform: 'translate(20%, -20%)' }}
              >
                {item.badge}
              </span>
            ) : null}
          </button>
        );
      })}
    </nav>
  );
};
