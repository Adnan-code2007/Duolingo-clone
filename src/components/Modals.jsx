import React from 'react';
import { Heart, Dumbbell, Gem } from 'lucide-react';
import { DuoMascot } from './DuoMascot';
import { sound } from '../utils/audio';

export const HeartsModal = ({
  stats,
  onClose,
  onRefillWithGems,
  onStartPractice
}) => {
  return (
    <div 
      className="modal show d-block" 
      tabIndex="-1" 
      style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1070 }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-4 border-0 p-3 shadow-lg">
          <div className="modal-header border-0 pb-0 justify-content-end">
            <button type="button" className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body text-center p-3 pt-0">
            <div className="d-flex justify-content-center mb-2">
              <div className="d-flex gap-2 p-2 bg-danger-subtle rounded-pill border border-danger-subtle">
                {Array.from({ length: stats.maxHearts }).map((_, i) => (
                  <Heart
                    key={i}
                    size={28}
                    className={`transition ${i < stats.hearts ? 'text-danger fill-current' : 'text-secondary opacity-30'}`}
                  />
                ))}
              </div>
            </div>

            <h3 className="fw-bolder fs-3 text-dark mb-1">
              {stats.hearts === stats.maxHearts ? 'Hearts Full!' : `${stats.hearts} Hearts Left`}
            </h3>
            <p className="text-muted fs-7 mb-4">
              Hearts protect you from mistakes during lessons. Hearts automatically refill over time, or you can practice to earn them!
            </p>

            <div className="d-flex flex-column gap-3 mb-2">
              <button
                onClick={() => {
                  sound.playPop();
                  onClose();
                  onStartPractice();
                }}
                className="duo-btn duo-btn-blue py-3 fs-6 d-flex align-items-center justify-content-center gap-2"
              >
                <Dumbbell size={20} />
                <span>Practice to Earn Hearts (Free)</span>
              </button>

              <button
                onClick={() => {
                  if (stats.hearts >= stats.maxHearts) {
                    alert('Your hearts are already full!');
                    return;
                  }
                  if (stats.gems < 100) {
                    alert('You need 100 gems to refill hearts.');
                    return;
                  }
                  onRefillWithGems();
                }}
                disabled={stats.hearts >= stats.maxHearts || stats.gems < 100}
                className="duo-btn duo-btn-green py-3 fs-6 d-flex align-items-center justify-content-center gap-2"
              >
                <Gem size={20} className="fill-current" />
                <span>Refill 5 Hearts (100 💎)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const StreakModal = ({
  stats,
  onClose
}) => {
  return (
    <div 
      className="modal show d-block" 
      tabIndex="-1" 
      style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1070 }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-4 border-0 p-3 shadow-lg">
          <div className="modal-header border-0 pb-0 justify-content-end">
            <button type="button" className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body text-center p-3 pt-0">
            <DuoMascot mood="excited" size={120} outfit={stats.equippedOutfit} />
            <h3 className="fw-bolder fs-2 text-warning mt-3 mb-1">{stats.streak} Day Streak!</h3>
            <p className="text-muted fs-7 mb-4">
              Practicing daily builds lasting memory habits. Complete a lesson each day to keep your flame burning!
            </p>

            <div className="p-3 bg-warning-subtle rounded-4 border border-warning-subtle text-start mb-4">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="fw-bolder text-dark fs-7">Streak Protection</span>
                {stats.hasStreakFreeze ? (
                  <span className="badge bg-success text-white">Equipped</span>
                ) : (
                  <span className="badge bg-secondary text-white">Not Equipped</span>
                )}
              </div>
              <p className="mb-0 text-muted fs-8">
                {stats.hasStreakFreeze 
                  ? 'Your Streak Freeze will protect your streak if you miss a day tomorrow.' 
                  : 'Get a Streak Freeze in the Shop to guard against missed days.'}
              </p>
            </div>

            <button
              onClick={onClose}
              className="duo-btn duo-btn-green w-100 py-2.5 fs-6"
            >
              Keep Learning
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
