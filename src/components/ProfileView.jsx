import React from 'react';
import { DuoMascot } from './DuoMascot';
import { Flame, Zap, Award, BookOpen, CheckCircle, RotateCcw, ShieldCheck } from 'lucide-react';
import { sound } from '../utils/audio';

export const ProfileView = ({
  stats,
  onResetProgress
}) => {
  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const achievements = [
    {
      id: 'a1',
      title: 'Wildfire',
      desc: 'Reach a 3-day learning streak',
      icon: '🔥',
      unlocked: stats.streak >= 3
    },
    {
      id: 'a2',
      title: 'Word Master',
      desc: 'Learn 15+ Spanish words',
      icon: '📖',
      unlocked: stats.wordsLearnedCount >= 15
    },
    {
      id: 'a3',
      title: 'Sharpshooter',
      desc: 'Maintain over 85% accuracy',
      icon: '🎯',
      unlocked: stats.accuracyRate >= 85
    },
    {
      id: 'a4',
      title: 'Fashion Duo',
      desc: 'Equip a custom outfit on Duo',
      icon: '👔',
      unlocked: stats.equippedOutfit !== 'default'
    }
  ];

  return (
    <div className="container py-4 app-max-w-3xl mx-auto">
      {/* Profile Header Card */}
      <div className="bg-white p-4 rounded-4 border border-2 border-light-subtle shadow-sm mb-4 d-flex flex-column flex-sm-row align-items-center gap-4">
        <DuoMascot mood="happy" size={130} outfit={stats.equippedOutfit} />

        <div className="text-center text-sm-start flex-grow-1">
          <div className="d-flex align-items-center justify-content-center justify-content-sm-start gap-2 mb-1">
            <h2 className="fs-3 fw-bolder text-dark mb-0">
              {stats.activeLanguage === 'hi' ? 'Hindi Learner 🇮🇳' : 'Spanish Learner 🇪🇸'}
            </h2>
            <span className="badge bg-success-subtle text-success fs-8 fw-bolder">Active</span>
          </div>
          <p className="text-muted fw-bold fs-7 mb-3">
            {stats.activeLanguage === 'hi' ? 'Duolingo Hindi Track (हिन्दी)' : 'Duolingo Spanish Track (Español)'}
          </p>

          <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-sm-start">
            <span className="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle px-3 py-1.5 fs-7 d-flex align-items-center gap-1">
              <Flame size={16} className="fill-current" />
              <span>{stats.streak} Day Streak</span>
            </span>
            {stats.hasStreakFreeze && (
              <span className="badge bg-info-subtle text-info-emphasis border border-info-subtle px-3 py-1.5 fs-7 d-flex align-items-center gap-1">
                <ShieldCheck size={16} />
                <span>Streak Protected</span>
              </span>
            )}
            <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-1.5 fs-7 d-flex align-items-center gap-1">
              <Award size={16} />
              <span>Emerald League</span>
            </span>
          </div>
        </div>
      </div>

      {/* Streak Calendar Card */}
      <div className="bg-white p-4 rounded-4 border border-2 border-light-subtle shadow-sm mb-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h3 className="fs-5 fw-bolder text-dark mb-0 d-flex align-items-center gap-2">
            <Flame className="text-warning fill-current" size={24} />
            Streak Activity
          </h3>
          <span className="text-muted fs-7 fw-bold">{stats.streak} consecutive days</span>
        </div>

        <div className="d-flex justify-content-between text-center py-2 px-1 bg-light rounded-3 border border-light-subtle">
          {daysOfWeek.map((day, idx) => {
            const isCompleted = idx < stats.streak;
            return (
              <div key={idx} className="d-flex flex-column align-items-center gap-2">
                <span className="fs-8 fw-bold text-secondary">{day}</span>
                <div 
                  className={`rounded-circle d-flex align-items-center justify-content-center ${
                    isCompleted ? 'bg-warning text-white shadow-sm' : 'bg-secondary-subtle text-secondary'
                  }`}
                  style={{ width: '36px', height: '36px' }}
                >
                  {isCompleted ? <Flame size={18} className="fill-current" /> : '•'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Statistics 2x2 Grid */}
      <h3 className="fs-5 fw-bolder text-dark mb-3">Statistics</h3>
      <div className="row g-3 mb-4">
        <div className="col-6 col-sm-3">
          <div className="bg-white p-3 rounded-4 border border-2 border-light-subtle text-center">
            <Zap size={24} className="text-warning fill-current mb-1" />
            <div className="fs-4 fw-bolder text-dark">{stats.xp}</div>
            <div className="text-muted fs-8 fw-bold">TOTAL XP</div>
          </div>
        </div>
        <div className="col-6 col-sm-3">
          <div className="bg-white p-3 rounded-4 border border-2 border-light-subtle text-center">
            <BookOpen size={24} className="text-primary mb-1" />
            <div className="fs-4 fw-bolder text-dark">{stats.wordsLearnedCount}</div>
            <div className="text-muted fs-8 fw-bold">WORDS MASTERED</div>
          </div>
        </div>
        <div className="col-6 col-sm-3">
          <div className="bg-white p-3 rounded-4 border border-2 border-light-subtle text-center">
            <Award size={24} className="text-success mb-1" />
            <div className="fs-4 fw-bolder text-dark">{stats.accuracyRate}%</div>
            <div className="text-muted fs-8 fw-bold">ACCURACY</div>
          </div>
        </div>
        <div className="col-6 col-sm-3">
          <div className="bg-white p-3 rounded-4 border border-2 border-light-subtle text-center">
            <CheckCircle size={24} className="text-primary mb-1" />
            <div className="fs-4 fw-bolder text-dark">{stats.completedLessonIds.length}</div>
            <div className="text-muted fs-8 fw-bold">LESSONS DONE</div>
          </div>
        </div>
      </div>

      {/* Achievements Card */}
      <h3 className="fs-5 fw-bolder text-dark mb-3">Badges & Achievements</h3>
      <div className="bg-white rounded-4 border border-2 border-light-subtle shadow-sm overflow-hidden mb-5">
        {achievements.map((item) => (
          <div 
            key={item.id}
            className={`d-flex align-items-center justify-content-between p-3 border-bottom border-light-subtle ${
              item.unlocked ? '' : 'opacity-40 bg-light'
            }`}
          >
            <div className="d-flex align-items-center gap-3">
              <span className="fs-2">{item.icon}</span>
              <div>
                <div className="fw-bolder fs-6 text-dark">{item.title}</div>
                <div className="text-muted fs-7">{item.desc}</div>
              </div>
            </div>

            {item.unlocked ? (
              <span className="badge bg-success-subtle text-success fw-bolder px-2.5 py-1">
                Unlocked
              </span>
            ) : (
              <span className="badge bg-secondary-subtle text-secondary px-2.5 py-1">
                Locked
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Reset Progress Section */}
      <div className="p-4 rounded-4 bg-light border border-light-subtle text-center">
        <p className="text-muted fs-7 mb-2">Want to start over from Lesson 1?</p>
        <button
          onClick={() => {
            if (confirm('Are you sure you want to reset your learning stats and restart?')) {
              sound.playPop();
              onResetProgress();
            }
          }}
          className="duo-btn duo-btn-white py-2 px-4 fs-7 text-danger border-danger-subtle d-inline-flex align-items-center gap-2"
        >
          <RotateCcw size={16} />
          Reset All Progress
        </button>
      </div>
    </div>
  );
};
