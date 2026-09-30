import React, { useState } from 'react';
import { AVAILABLE_LANGUAGES } from '../data/curriculum';
import { Flame, Gem, Heart, Volume2, VolumeX, ShieldCheck, ChevronDown, Check } from 'lucide-react';
import { sound } from '../utils/audio';

export const TopHeader = ({
  stats,
  onOpenHeartsModal,
  onOpenStreakModal,
  onToggleSound,
  onSelectLanguage
}) => {
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const currentLang = AVAILABLE_LANGUAGES.find(l => l.code === stats.activeLanguage) || AVAILABLE_LANGUAGES[0];

  return (
    <header className="sticky-top bg-white border-bottom border-2 border-light-subtle py-2 px-3 px-md-4 shadow-xs" style={{ zIndex: 1020 }}>
      <div className="d-flex align-items-center justify-content-between app-max-w-5xl mx-auto position-relative">
        {/* Language Selector Dropdown */}
        <div className="position-relative">
          <button
            onClick={() => {
              sound.playPop();
              setShowLanguageDropdown(!showLanguageDropdown);
            }}
            className="btn btn-light border-2 border-light-subtle d-flex align-items-center gap-2 px-3 py-1.5 rounded-3 text-dark fw-bolder shadow-xs"
            title="Switch Language Track"
          >
            <span className="fs-5" role="img" aria-label={currentLang.name}>{currentLang.flag}</span>
            <span className="d-none d-sm-inline">{currentLang.name}</span>
            <ChevronDown size={16} className="text-secondary" />
          </button>

          {/* Language Menu Dropdown */}
          {showLanguageDropdown && (
            <>
              <div 
                className="position-fixed top-0 start-0 w-100 h-100" 
                style={{ zIndex: 1025 }} 
                onClick={() => setShowLanguageDropdown(false)} 
              />
              <div 
                className="position-absolute start-0 mt-2 bg-white rounded-4 shadow-lg border border-2 border-light-subtle p-2 animate-fade-in"
                style={{ width: '280px', zIndex: 1030 }}
              >
                <div className="px-3 py-2 text-muted fw-bold fs-8 border-bottom border-light-subtle text-uppercase">
                  My Courses
                </div>
                <div className="d-flex flex-column gap-1 my-1">
                  {AVAILABLE_LANGUAGES.map((lang) => {
                    const isSelected = lang.code === stats.activeLanguage;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => {
                          sound.playPop();
                          onSelectLanguage(lang.code);
                          setShowLanguageDropdown(false);
                        }}
                        className={`btn text-start d-flex align-items-center justify-content-between p-2.5 rounded-3 border-0 transition ${
                          isSelected ? 'bg-primary-subtle text-primary fw-bolder' : 'hover:bg-light text-dark'
                        }`}
                      >
                        <div className="d-flex align-items-center gap-2.5">
                          <span className="fs-4">{lang.flag}</span>
                          <div>
                            <div className="fw-bolder fs-6">{lang.name} <span className="text-muted fs-7 font-monospace">({lang.nativeName})</span></div>
                            <small className="text-muted d-block fs-8">{lang.tagline}</small>
                          </div>
                        </div>
                        {isSelected && <Check size={18} className="text-primary fw-bolder" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Gamification Stats: Streak, Gems, Hearts */}
        <div className="d-flex align-items-center gap-3 gap-sm-4">
          {/* Streak Flame */}
          <button
            onClick={() => {
              sound.playPop();
              onOpenStreakModal();
            }}
            className="btn btn-sm d-flex align-items-center gap-1.5 border-0 bg-transparent text-decoration-none p-1"
            title="Current Streak"
          >
            <Flame size={24} style={{ color: '#ff9600', fill: '#ff9600' }} />
            <span className="fw-bolder fs-6" style={{ color: '#ff9600' }}>
              {stats.streak}
            </span>
            {stats.hasStreakFreeze && (
              <span title="Streak Freeze Active" className="d-none d-md-inline ms-1">
                <ShieldCheck size={18} className="text-info" />
              </span>
            )}
          </button>

          {/* Gems / Lingots */}
          <div 
            className="d-flex align-items-center gap-1.5 px-2 py-1 rounded-3"
            title="Lingots / Gems"
          >
            <Gem size={22} style={{ color: '#1cb0f6', fill: '#1cb0f6' }} />
            <span className="fw-bolder fs-6" style={{ color: '#1cb0f6' }}>
              {stats.gems}
            </span>
          </div>

          {/* Hearts Life Indicator */}
          <button
            onClick={() => {
              sound.playPop();
              onOpenHeartsModal();
            }}
            className="btn btn-sm d-flex align-items-center gap-1.5 border-0 bg-transparent text-decoration-none p-1"
            title="Hearts (Health)"
          >
            <Heart 
              size={24} 
              style={{ color: '#ff4b4b', fill: '#ff4b4b' }} 
            />
            <span className="fw-bolder fs-6" style={{ color: '#ff4b4b' }}>
              {stats.hearts}
            </span>
          </button>

          {/* Audio toggle */}
          <button
            onClick={() => {
              sound.playPop();
              onToggleSound();
            }}
            className="btn btn-sm btn-light border p-1.5 rounded-circle d-flex align-items-center justify-content-center"
            title={stats.soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
            style={{ width: '36px', height: '36px' }}
          >
            {stats.soundEnabled ? <Volume2 size={18} className="text-secondary" /> : <VolumeX size={18} className="text-muted" />}
          </button>
        </div>
      </div>
    </header>
  );
};
