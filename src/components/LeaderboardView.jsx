import React from 'react';
import { LEADERBOARD_USERS } from '../data/curriculum';
import { Trophy, ChevronUp, Flame } from 'lucide-react';

export const LeaderboardView = ({ stats }) => {
  // Merge current user dynamically with simulated learners and sort by XP descending
  const currentLearner = {
    id: 'current-user',
    name: 'You (Duo Learner)',
    avatar: '🦉',
    xp: stats.xp,
    streak: stats.streak,
    isCurrentUser: true
  };

  const allUsers = [
    ...LEADERBOARD_USERS.filter(u => !u.isCurrentUser),
    currentLearner
  ]
    .sort((a, b) => b.xp - a.xp)
    .map((user, idx) => ({ ...user, rank: idx + 1 }));

  return (
    <div className="container py-4 app-max-w-3xl mx-auto">
      {/* League Header */}
      <div 
        className="p-4 rounded-4 text-white mb-4 shadow-sm text-center position-relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)' }}
      >
        <span className="badge bg-white text-emerald-800 fw-bolder mb-2 px-3 py-1">
          WEEKLY COMPETITION
        </span>
        <div className="d-flex justify-content-center align-items-center gap-2 mb-1">
          <Trophy size={36} className="text-amber-300 drop-shadow" />
          <h2 className="fs-2 fw-bolder mb-0">Emerald League</h2>
        </div>
        <p className="text-white-50 fw-bold mb-0">Top 7 learners advance to the Sapphire League on Sunday!</p>
      </div>

      {/* Ranks Table Card */}
      <div className="bg-white rounded-4 border border-2 border-light-subtle shadow-sm overflow-hidden mb-4">
        {allUsers.map((user, index) => {
          const isPromotion = index < 7;
          const isDemotion = index >= allUsers.length - 2;

          return (
            <div
              key={user.id}
              className={`d-flex align-items-center justify-content-between p-3 border-bottom border-light-subtle transition ${
                user.isCurrentUser ? 'bg-amber-50 border-amber-300 fw-bolder' : 'hover:bg-light text-dark'
              }`}
              style={{
                backgroundColor: user.isCurrentUser ? '#fffbeb' : undefined,
                borderLeft: user.isCurrentUser ? '6px solid #f59e0b' : undefined
              }}
            >
              <div className="d-flex align-items-center gap-3">
                {/* Rank number badge */}
                <div 
                  className={`d-flex align-items-center justify-content-center rounded-circle fw-bolder fs-6 ${
                    index === 0
                      ? 'bg-amber-400 text-white shadow-sm'
                      : index === 1
                        ? 'bg-slate-300 text-slate-800'
                        : index === 2
                          ? 'bg-amber-700 text-white'
                          : 'text-slate-500'
                  }`}
                  style={{ width: '36px', height: '36px' }}
                >
                  {index + 1}
                </div>

                {/* Avatar */}
                <div className="fs-3 select-none">{user.avatar}</div>

                {/* User Info */}
                <div>
                  <div className="d-flex align-items-center gap-2">
                    <span className={`fs-6 ${user.isCurrentUser ? 'text-amber-900 fw-bolder' : 'text-dark fw-bold'}`}>
                      {user.name}
                    </span>
                    {user.isCurrentUser && (
                      <span className="badge bg-warning text-dark fs-8">YOU</span>
                    )}
                  </div>
                  {user.streak && (
                    <div className="d-flex align-items-center gap-1 text-orange-500 fs-8 fw-bold">
                      <Flame size={12} className="fill-current" />
                      <span>{user.streak} day streak</span>
                    </div>
                  )}
                </div>
              </div>

              {/* XP and Promotion indicator */}
              <div className="d-flex align-items-center gap-3">
                {isPromotion && (
                  <span className="badge bg-success-subtle text-success fs-8 d-none d-sm-inline d-flex align-items-center gap-1">
                    <ChevronUp size={14} /> Promote
                  </span>
                )}
                {isDemotion && (
                  <span className="badge bg-danger-subtle text-danger fs-8 d-none d-sm-inline">
                    Demotion
                  </span>
                )}
                <div className="text-end">
                  <span className="fs-6 fw-bolder text-slate-700">{user.xp}</span>
                  <small className="text-muted d-block fs-8 fw-bold">XP</small>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
