import React from 'react';
import { Target, Zap, TrendingUp, CheckCircle, Gem } from 'lucide-react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

export const QuestsView = ({
  quests,
  stats,
  onClaimQuest
}) => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'target': return <Target size={28} className="text-warning" />;
      case 'zap': return <Zap size={28} className="text-primary fill-current" />;
      case 'trending-up': return <TrendingUp size={28} className="text-success" />;
      default: return <Target size={28} className="text-warning" />;
    }
  };

  const handleClaim = (q) => {
    sound.playFanfare();
    confetti({ particleCount: 70, spread: 60 });
    onClaimQuest(q.id);
  };

  return (
    <div className="container py-4 app-max-w-3xl mx-auto">
      <div 
        className="p-4 rounded-4 text-white mb-4 shadow-sm"
        style={{ background: 'linear-gradient(135deg, #ff9600 0%, #ea580c 100%)' }}
      >
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <span className="badge bg-white text-dark fw-bolder mb-1 px-2.5 py-1">DAILY OBJECTIVES</span>
            <h2 className="fs-3 fw-bolder mb-1">Earn Chests & Gems</h2>
            <p className="mb-0 text-white-50 fw-bold">Complete your daily Spanish goals before midnight!</p>
          </div>
          <span className="fs-1 d-none d-sm-inline">🎯</span>
        </div>
      </div>

      <div className="d-flex flex-column gap-3">
        {quests.map((q) => {
          const percent = Math.min(100, Math.round((q.progress / q.target) * 100));
          const canClaim = q.progress >= q.target && !q.claimed;

          return (
            <div 
              key={q.id}
              className="bg-white p-4 rounded-4 border border-2 border-light-subtle shadow-sm d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3"
            >
              <div className="d-flex align-items-center gap-3">
                <div className="p-3 bg-light border border-light-subtle rounded-4">
                  {getIcon(q.icon)}
                </div>
                <div>
                  <h3 className="fs-6 fw-bolder text-dark mb-1">{q.title}</h3>
                  <p className="text-muted fs-7 mb-2">{q.description}</p>

                  {/* Progress bar */}
                  <div className="d-flex align-items-center gap-3" style={{ minWidth: '220px' }}>
                    <div className="progress flex-grow-1 rounded-pill" style={{ height: '10px', backgroundColor: '#e9ecef' }}>
                      <div 
                        className="progress-bar rounded-pill" 
                        style={{ 
                          width: `${percent}%`,
                          backgroundColor: '#ff9600'
                        }} 
                      />
                    </div>
                    <span className="fs-8 fw-bold text-secondary">
                      {Math.min(q.target, q.progress)} / {q.target}
                    </span>
                  </div>
                </div>
              </div>

              {/* Rewards and Claim Button */}
              <div className="d-flex align-items-center gap-3 justify-content-end">
                <div className="text-end">
                  <div className="d-flex align-items-center gap-1 text-primary fw-bolder fs-7 justify-content-end">
                    <Gem size={16} className="fill-current" />
                    <span>+{q.rewardGems}</span>
                  </div>
                  <small className="text-muted fw-bold">+{q.rewardXp} XP</small>
                </div>

                {q.claimed ? (
                  <span className="badge bg-success-subtle text-success p-2.5 rounded-3 d-flex align-items-center gap-1 fw-bolder">
                    <CheckCircle size={16} /> Claimed
                  </span>
                ) : canClaim ? (
                  <button
                    onClick={() => handleClaim(q)}
                    className="duo-btn duo-btn-gold py-2 px-3 fs-7"
                  >
                    Claim Reward
                  </button>
                ) : (
                  <span className="badge bg-secondary-subtle text-secondary p-2.5 rounded-3 fw-bold">
                    In Progress
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
