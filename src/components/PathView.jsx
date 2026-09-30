import React, { useState } from 'react';
import { DuoMascot } from './DuoMascot';
import { BookOpen, Check, Lock, Star, Sparkles, Gift } from 'lucide-react';
import { sound } from '../utils/audio';

export const PathView = ({
  units,
  stats,
  onStartLesson,
  onOpenHeartsModal,
  onClaimChest,
  claimedChests
}) => {
  const [activeGuidebook, setActiveGuidebook] = useState(null);
  const [selectedLessonModal, setSelectedLessonModal] = useState(null);

  // Serpentine horizontal offsets for winding path
  const getOffset = (index) => {
    const pattern = [0, -45, -60, -35, 0, 35, 60, 45];
    return pattern[index % pattern.length];
  };

  const isLessonCompleted = (lessonId) => {
    return stats.completedLessonIds.includes(lessonId);
  };

  const isLessonUnlocked = (lesson, unitIndex, lessonIndex) => {
    if (unitIndex === 0 && lessonIndex === 0) return true;
    if (isLessonCompleted(lesson.id)) return true;

    // Check if previous lesson in current unit is completed
    const currentUnit = units[unitIndex];
    if (lessonIndex > 0) {
      const prevLesson = currentUnit.lessons[lessonIndex - 1];
      return isLessonCompleted(prevLesson.id);
    }

    // Check if the last lesson of previous unit is completed
    if (unitIndex > 0) {
      const prevUnit = units[unitIndex - 1];
      const lastLessonOfPrevUnit = prevUnit.lessons[prevUnit.lessons.length - 1];
      return isLessonCompleted(lastLessonOfPrevUnit.id);
    }

    return false;
  };

  const handleNodeClick = (lesson, unlocked, completed) => {
    if (!unlocked) {
      sound.playWrong();
      return;
    }
    if (stats.hearts <= 0) {
      sound.playWrong();
      onOpenHeartsModal();
      return;
    }

    sound.playPop();
    setSelectedLessonModal(lesson);
  };

  return (
    <div className="container py-4 pb-5 app-max-w-4xl mx-auto">
      <div className="row g-4 justify-content-center">
        {/* Main Center Path */}
        <div className="col-12 col-lg-8 d-flex flex-column align-items-center">
          {units.map((unit, uIdx) => {
            const chestId = `chest-${unit.id}`;
            const isChestClaimed = claimedChests.includes(chestId);
            const allUnitLessonsCompleted = unit.lessons.every(l => isLessonCompleted(l.id));

            return (
              <div key={unit.id} className="w-100 mb-5 d-flex flex-column align-items-center">
                {/* Unit Header Card */}
                <div 
                  className="w-100 p-4 rounded-4 shadow-sm text-white mb-5 position-relative overflow-hidden"
                  style={{ background: unit.headerBg }}
                >
                  <div className="d-flex align-items-start justify-content-between position-relative z-10">
                    <div>
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <span className="badge bg-white text-dark fw-bolder px-2.5 py-1 rounded-pill fs-8">
                          UNIT {unit.unitNumber}
                        </span>
                      </div>
                      <h2 className="fs-4 fw-bolder mb-1">{unit.title}</h2>
                      <p className="mb-0 text-white-50 fw-bold fs-6">{unit.subtitle}</p>
                    </div>

                    <button
                      onClick={() => {
                        sound.playPop();
                        setActiveGuidebook(unit);
                      }}
                      className="duo-btn duo-btn-white py-2 px-3 fs-7 text-uppercase d-flex align-items-center gap-1.5 shadow-sm text-dark bg-white"
                      style={{ fontSize: '0.8rem', padding: '0.5rem 0.9rem' }}
                    >
                      <BookOpen size={16} />
                      <span>Guidebook</span>
                    </button>
                  </div>
                </div>

                {/* Serpentine Stepping Nodes */}
                <div className="d-flex flex-column align-items-center position-relative w-100" style={{ maxWidth: '420px' }}>
                  {unit.lessons.map((lesson, lIdx) => {
                    const completed = isLessonCompleted(lesson.id);
                    const unlocked = isLessonUnlocked(lesson, uIdx, lIdx);
                    const isNextActive = unlocked && !completed;
                    const offsetPx = getOffset(lIdx);

                    return (
                      <div 
                        key={lesson.id} 
                        className="my-3 d-flex flex-column align-items-center position-relative"
                        style={{ transform: `translateX(${offsetPx}px)` }}
                      >
                        {/* Duo speech bubble helper next to the next active lesson */}
                        {isNextActive && (
                          <div 
                            className="position-absolute"
                            style={{ 
                              top: '-34px', 
                              left: offsetPx < 0 ? '78px' : '-130px', 
                              zIndex: 10,
                              whiteSpace: 'nowrap'
                            }}
                          >
                            <div className="bg-white border-2 border-light-subtle px-3 py-1.5 rounded-4 shadow-sm fw-bolder text-uppercase fs-7 text-success bounce-slow d-flex align-items-center gap-1">
                              <Sparkles size={14} className="text-warning fill-current" />
                              <span>Start +{lesson.xpReward} XP</span>
                            </div>
                          </div>
                        )}

                        {/* Interactive Circular Step Button */}
                        <button
                          onClick={() => handleNodeClick(lesson, unlocked, completed)}
                          className={`path-node-btn ${
                            completed 
                              ? 'path-node-completed' 
                              : isNextActive 
                                ? 'path-node-active pulse-target' 
                                : 'path-node-locked'
                          }`}
                          aria-label={lesson.title}
                        >
                          {completed ? (
                            <Check size={36} strokeWidth={3.5} className="text-white drop-shadow" />
                          ) : isNextActive ? (
                            <Star size={34} strokeWidth={2.8} className="text-white drop-shadow fill-white" />
                          ) : (
                            <Lock size={26} className="text-secondary" />
                          )}
                        </button>

                        {/* Lesson title label */}
                        <span className="mt-2 fw-bolder fs-7 text-dark text-center" style={{ maxWidth: '140px' }}>
                          {lesson.title}
                        </span>
                      </div>
                    );
                  })}

                  {/* End of Unit Mystery Chest */}
                  <div className="my-4 text-center">
                    <button
                      onClick={() => {
                        if (!allUnitLessonsCompleted) {
                          sound.playWrong();
                          alert('Complete all lessons in this unit to unlock this treasure chest!');
                          return;
                        }
                        if (isChestClaimed) {
                          sound.playPop();
                          return;
                        }
                        sound.playFanfare();
                        onClaimChest(30);
                      }}
                      className={`btn p-3 rounded-4 shadow-sm border-2 transition-all ${
                        allUnitLessonsCompleted && !isChestClaimed
                          ? 'btn-warning border-yellow-400 pulse-target'
                          : isChestClaimed
                            ? 'btn-light border-light-subtle opacity-50'
                            : 'btn-secondary opacity-75'
                      }`}
                      style={{ width: '84px', height: '84px' }}
                    >
                      <Gift size={38} className={allUnitLessonsCompleted && !isChestClaimed ? 'text-white' : 'text-secondary'} />
                    </button>
                    <div className="mt-2 fw-bolder fs-7 text-secondary">
                      {isChestClaimed ? 'Chest Opened (+30 💎)' : allUnitLessonsCompleted ? 'Open Chest (+30 💎)!' : 'Unit Reward'}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop Right Rail */}
        <div className="col-lg-4 d-none d-lg-flex flex-column gap-4">
          <div className="bg-white p-4 rounded-4 border border-2 border-light-subtle shadow-sm text-center">
            <DuoMascot 
              mood="happy" 
              size={130} 
              outfit={stats.equippedOutfit} 
              bubbleText={
                stats.hearts <= 1 
                  ? "Careful! You're low on hearts! Practice to refill." 
                  : stats.streak >= 3
                    ? `You're on a ${stats.streak}-day streak! Keep going!`
                    : stats.activeLanguage === 'hi'
                      ? "नमस्ते! Let's learn Hindi today!"
                      : "¡Hola! Let's learn Spanish today!"
              }
            />
          </div>

          {/* Daily XP Progress */}
          <div className="bg-white p-4 rounded-4 border border-2 border-light-subtle shadow-sm">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h3 className="fs-6 fw-bolder mb-0 text-dark">Daily Quest</h3>
              <span className="badge bg-warning text-dark fw-bold">Active</span>
            </div>
            <p className="text-muted fs-7 mb-2">Earn {stats.dailyGoalXp} XP today to keep Duo satisfied!</p>
            <div className="progress rounded-pill mb-2" style={{ height: '14px', backgroundColor: '#e9ecef' }}>
              <div 
                className="progress-bar rounded-pill" 
                style={{ 
                  width: `${Math.min(100, (stats.todayEarnedXp / stats.dailyGoalXp) * 100)}%`,
                  backgroundColor: '#58cc02'
                }} 
              />
            </div>
            <div className="d-flex justify-content-between fs-8 fw-bold text-secondary">
              <span>{stats.todayEarnedXp} / {stats.dailyGoalXp} XP</span>
              <span>{Math.round((stats.todayEarnedXp / stats.dailyGoalXp) * 100)}%</span>
            </div>
          </div>

          {/* Emerald League */}
          <div className="bg-white p-4 rounded-4 border border-2 border-light-subtle shadow-sm">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <h3 className="fs-6 fw-bolder mb-0 text-dark">Emerald League</h3>
              <span className="badge bg-success-subtle text-success fw-bolder">Rank #5</span>
            </div>
            <p className="text-muted fs-7 mb-3">Top 7 learners advance to the Sapphire League on Sunday!</p>
            <div className="d-flex align-items-center gap-3 p-2 bg-light rounded-3 border border-light-subtle">
              <span className="fs-4">🏆</span>
              <div>
                <p className="mb-0 fw-bold fs-7 text-dark">Promotion Zone</p>
                <small className="text-muted">You are safely in the advancing tier</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lesson Launcher Modal */}
      {selectedLessonModal && (
        <div 
          className="modal show d-block" 
          tabIndex="-1" 
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 p-3 shadow-lg">
              <div className="modal-body text-center p-4">
                <DuoMascot mood="excited" size={110} outfit={stats.equippedOutfit} />
                <h3 className="fw-bolder mt-3 mb-1 text-dark">{selectedLessonModal.title}</h3>
                <p className="text-muted mb-4">{selectedLessonModal.description}</p>

                <div className="d-flex justify-content-center gap-4 mb-4 text-center">
                  <div className="px-3 py-2 bg-light rounded-3">
                    <div className="fs-7 text-muted fw-bold">XP Reward</div>
                    <div className="fs-5 fw-bolder text-warning">+{selectedLessonModal.xpReward} XP</div>
                  </div>
                  <div className="px-3 py-2 bg-light rounded-3">
                    <div className="fs-7 text-muted fw-bold">Gems</div>
                    <div className="fs-5 fw-bolder text-info">+{selectedLessonModal.gemsReward} 💎</div>
                  </div>
                  <div className="px-3 py-2 bg-light rounded-3">
                    <div className="fs-7 text-muted fw-bold">Exercises</div>
                    <div className="fs-5 fw-bolder text-dark">{selectedLessonModal.exercises.length}</div>
                  </div>
                </div>

                <div className="d-flex flex-column gap-2">
                  <button
                    onClick={() => {
                      const lesson = selectedLessonModal;
                      setSelectedLessonModal(null);
                      onStartLesson(lesson);
                    }}
                    className="duo-btn duo-btn-green w-100 py-3 fs-6"
                  >
                    Start Lesson (+{selectedLessonModal.xpReward} XP)
                  </button>
                  <button
                    onClick={() => setSelectedLessonModal(null)}
                    className="duo-btn duo-btn-white w-100 py-2.5 fs-7"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Guidebook Modal */}
      {activeGuidebook && (
        <div 
          className="modal show d-block" 
          tabIndex="-1" 
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1055 }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content rounded-4 border-0 p-2 shadow-lg">
              <div className="modal-header border-0 pb-0">
                <h3 className="modal-title fw-bolder text-dark">{activeGuidebook.guidebook.title}</h3>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setActiveGuidebook(null)}
                />
              </div>
              <div className="modal-body p-4">
                <div className="alert alert-primary rounded-3 mb-4 border-0" style={{ backgroundColor: '#ddf4ff', color: '#1899d6' }}>
                  <h4 className="fw-bolder fs-6 mb-1">Grammar & Pronunciation Tip</h4>
                  <p className="mb-0 fs-7">{activeGuidebook.guidebook.grammarTip}</p>
                </div>

                <h4 className="fw-bolder fs-6 mb-3 text-dark">Key Phrases to Master</h4>
                <div className="d-flex flex-column gap-2.5">
                  {activeGuidebook.guidebook.keyPhrases.map((phrase, idx) => (
                    <div 
                      key={idx}
                      className="d-flex align-items-center justify-content-between p-3 rounded-3 border border-2 border-light-subtle bg-white shadow-xs"
                    >
                      <div>
                        <div className="fw-bolder fs-6 text-dark">{phrase.target || phrase.spanish}</div>
                        <div className="text-muted fs-7">{phrase.english}</div>
                        {phrase.audioTip && (
                          <div className="text-primary fs-8 fw-semibold mt-1">
                            🗣️ {phrase.audioTip}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => sound.speak(phrase.target || phrase.spanish || '')}
                        className="duo-btn duo-btn-blue py-1.5 px-3 fs-8"
                      >
                        🔊 Listen
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-footer border-0">
                <button
                  onClick={() => setActiveGuidebook(null)}
                  className="duo-btn duo-btn-green py-2 px-4"
                >
                  Got It!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
