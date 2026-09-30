import React, { useState, useEffect, useCallback } from 'react';
import { DuoMascot } from './DuoMascot';
import { X, Heart, Volume2, Turtle, CheckCircle2, XCircle, ArrowRight, RefreshCw } from 'lucide-react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

export const LessonView = ({
  lesson,
  stats,
  onComplete,
  onLoseHeart,
  onRefillHearts,
  onExit,
  onPracticeRefill
}) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedWordBank, setSelectedWordBank] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [selectedPairLeft, setSelectedPairLeft] = useState(null);
  const [selectedPairRight, setSelectedPairRight] = useState(null);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [status, setStatus] = useState('idle'); // 'idle' | 'correct' | 'wrong' | 'completed' | 'game-over'
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [duoMood, setDuoMood] = useState('happy');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const currentExercise = lesson.exercises[currentExerciseIndex];
  const progressPercent = Math.round((currentExerciseIndex / lesson.exercises.length) * 100);

  // Play audio phrase
  const handlePlayAudio = useCallback((rate = 0.95) => {
    if (!currentExercise?.audioPhrase) return;
    setIsSpeaking(true);
    sound.speak(currentExercise.audioPhrase, rate).then(() => {
      setIsSpeaking(false);
    });
  }, [currentExercise]);

  // Autoplay audio on new listening exercise
  useEffect(() => {
    if (currentExercise?.type === 'listening' && currentExercise.audioPhrase) {
      handlePlayAudio(0.9);
    }
    // Reset state for new exercise
    setSelectedOption(null);
    setSelectedWordBank([]);
    setMatchedPairs([]);
    setSelectedPairLeft(null);
    setSelectedPairRight(null);
    setStatus('idle');
    setDuoMood('happy');
  }, [currentExerciseIndex, currentExercise, handlePlayAudio]);

  // Pair Matching Logic
  const handleSelectPairItem = (id, side) => {
    sound.playPop();
    if (side === 'left') {
      setSelectedPairLeft(id);
      if (selectedPairRight) {
        checkPair(id, selectedPairRight);
      }
    } else {
      setSelectedPairRight(id);
      if (selectedPairLeft) {
        checkPair(selectedPairLeft, id);
      }
    }
  };

  const checkPair = (leftId, rightId) => {
    if (leftId === rightId) {
      sound.playCorrect();
      const updated = [...matchedPairs, leftId];
      setMatchedPairs(updated);
      setSelectedPairLeft(null);
      setSelectedPairRight(null);
      if (currentExercise?.pairs && updated.length === currentExercise.pairs.length) {
        setStatus('correct');
        setCorrectAnswersCount(prev => prev + 1);
        setDuoMood('excited');
      }
    } else {
      sound.playWrong();
      setSelectedPairLeft(null);
      setSelectedPairRight(null);
    }
  };

  // Word Bank Tapping
  const handleTapWordBankItem = (word, poolIndex) => {
    sound.playPop();
    const token = `${word}__${poolIndex}`;
    if (selectedWordBank.includes(token)) {
      setSelectedWordBank(prev => prev.filter(t => t !== token));
    } else {
      setSelectedWordBank(prev => [...prev, token]);
    }
  };

  // Check Answer Handler
  const handleCheck = () => {
    if (!currentExercise || status !== 'idle') return;

    let isCorrect = false;

    if (currentExercise.type === 'multiple-choice' || currentExercise.type === 'fill-blank') {
      isCorrect = selectedOption === currentExercise.correctOptionIndex;
    } else if (currentExercise.type === 'word-bank' || currentExercise.type === 'listening') {
      const submittedSentence = selectedWordBank.map(t => t.split('__')[0]);
      const targetSentence = currentExercise.correctSentence || [];
      isCorrect = 
        submittedSentence.length === targetSentence.length &&
        submittedSentence.every((val, index) => val.toLowerCase() === targetSentence[index].toLowerCase());
    } else if (currentExercise.type === 'pair-matching') {
      isCorrect = matchedPairs.length === (currentExercise.pairs?.length || 0);
    }

    if (isCorrect) {
      sound.playCorrect();
      setStatus('correct');
      setCorrectAnswersCount(prev => prev + 1);
      setDuoMood('excited');
    } else {
      sound.playWrong();
      setStatus('wrong');
      setDuoMood('sad');
      onLoseHeart();

      if (stats.hearts - 1 <= 0) {
        setTimeout(() => {
          setStatus('game-over');
        }, 1200);
      }
    }
  };

  // Continue to Next Exercise or Complete
  const handleContinue = () => {
    sound.playPop();

    if (currentExerciseIndex + 1 < lesson.exercises.length) {
      setCurrentExerciseIndex(prev => prev + 1);
    } else {
      sound.playFanfare();
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
      setStatus('completed');
      setDuoMood('celebrating');
    }
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        if (status === 'idle') {
          const canCheck = 
            (currentExercise?.type === 'multiple-choice' && selectedOption !== null) ||
            (currentExercise?.type === 'fill-blank' && selectedOption !== null) ||
            ((currentExercise?.type === 'word-bank' || currentExercise?.type === 'listening') && selectedWordBank.length > 0) ||
            (currentExercise?.type === 'pair-matching' && matchedPairs.length === (currentExercise?.pairs?.length || 0));
          if (canCheck) handleCheck();
        } else if (status === 'correct' || status === 'wrong') {
          handleContinue();
        }
      } else if (status === 'idle' && (currentExercise?.type === 'multiple-choice' || currentExercise?.type === 'fill-blank')) {
        const num = parseInt(e.key);
        if (num >= 1 && num <= (currentExercise.options?.length || 0)) {
          setSelectedOption(num - 1);
          sound.playPop();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const isCheckDisabled = () => {
    if (!currentExercise) return true;
    if (status !== 'idle') return true;
    if (currentExercise.type === 'multiple-choice' || currentExercise.type === 'fill-blank') {
      return selectedOption === null;
    }
    if (currentExercise.type === 'word-bank' || currentExercise.type === 'listening') {
      return selectedWordBank.length === 0;
    }
    if (currentExercise.type === 'pair-matching') {
      return matchedPairs.length !== (currentExercise.pairs?.length || 0);
    }
    return false;
  };

  if (status === 'completed') {
    const accuracy = Math.round((correctAnswersCount / lesson.exercises.length) * 100);
    return (
      <div className="min-h-screen d-flex flex-column align-items-center justify-content-center p-4 bg-white">
        <div className="text-center max-w-md w-100 animate-fade-in">
          <DuoMascot mood="celebrating" size={170} outfit={stats.equippedOutfit} />
          <h1 className="fw-bolder fs-2 text-dark mt-4 mb-2">Lesson Complete!</h1>
          <p className="text-muted fw-bold fs-6 mb-4">You did an amazing job with Spanish today!</p>

          <div className="row g-3 mb-5">
            <div className="col-4">
              <div className="p-3 bg-warning-subtle rounded-4 text-center border-2 border-warning">
                <div className="fs-7 fw-bold text-secondary mb-1">TOTAL XP</div>
                <div className="fs-3 fw-bolder text-warning">+{lesson.xpReward}</div>
              </div>
            </div>
            <div className="col-4">
              <div className="p-3 bg-info-subtle rounded-4 text-center border-2 border-info">
                <div className="fs-7 fw-bold text-secondary mb-1">ACCURACY</div>
                <div className="fs-3 fw-bolder text-primary">{accuracy}%</div>
              </div>
            </div>
            <div className="col-4">
              <div className="p-3 bg-emerald-50 rounded-4 text-center border-2 border-success">
                <div className="fs-7 fw-bold text-secondary mb-1">GEMS</div>
                <div className="fs-3 fw-bolder text-success">+{lesson.gemsReward}</div>
              </div>
            </div>
          </div>

          <button
            onClick={() => onComplete(lesson.xpReward, lesson.gemsReward, accuracy)}
            className="duo-btn duo-btn-green w-100 py-3 fs-5"
          >
            CONTINUE
          </button>
        </div>
      </div>
    );
  }

  if (status === 'game-over') {
    return (
      <div className="min-h-screen d-flex flex-column align-items-center justify-content-center p-4 bg-white">
        <div className="text-center max-w-md w-100 animate-fade-in">
          <DuoMascot mood="sad" size={160} outfit={stats.equippedOutfit} />
          <h2 className="fw-bolder fs-2 text-dark mt-4 mb-2">You ran out of hearts!</h2>
          <p className="text-muted fw-bold mb-4">
            Practice mistakes to regain hearts, or refill instantly using your Lingots / Gems.
          </p>

          <div className="d-flex flex-column gap-3">
            <button
              onClick={() => {
                if (stats.gems >= 100) {
                  onRefillHearts();
                  setStatus('idle');
                } else {
                  alert('Not enough gems! Practice to earn hearts for free.');
                }
              }}
              className="duo-btn duo-btn-blue py-3 fs-6 d-flex align-items-center justify-content-center gap-2"
            >
              <Heart className="fill-current" size={20} />
              Refill All Hearts (100 💎)
            </button>

            <button
              onClick={onPracticeRefill}
              className="duo-btn duo-btn-green py-3 fs-6 d-flex align-items-center justify-content-center gap-2"
            >
              <RefreshCw size={20} />
              Practice to Earn a Heart
            </button>

            <button
              onClick={onExit}
              className="duo-btn duo-btn-white py-2.5 fs-7"
            >
              Quit to Learning Path
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen d-flex flex-column justify-content-between bg-white position-relative">
      {/* Top Header with Progress and Hearts */}
      <div className="w-100 py-3 px-3 px-md-5 border-bottom border-light-subtle">
        <div className="app-max-w-3xl mx-auto d-flex align-items-center gap-3">
          <button
            onClick={() => setShowExitConfirm(true)}
            className="btn btn-link text-secondary p-1 border-0"
            title="Quit Lesson"
          >
            <X size={28} />
          </button>

          {/* Duolingo Progress Bar */}
          <div className="progress flex-grow-1 rounded-pill" style={{ height: '16px', backgroundColor: '#e9ecef' }}>
            <div 
              className="progress-bar rounded-pill"
              style={{ 
                width: `${progressPercent}%`,
                backgroundColor: '#58cc02',
                transition: 'width 0.3s ease'
              }} 
            />
          </div>

          {/* Hearts Life counter */}
          <div className="d-flex align-items-center gap-1.5 text-danger fw-bolder fs-6">
            <Heart size={24} style={{ color: '#ff4b4b', fill: '#ff4b4b' }} />
            <span>{stats.hearts}</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Exercise Body */}
      <main className="container flex-grow-1 d-flex flex-column justify-content-center py-4 app-max-w-2xl mx-auto">
        {currentExercise && (
          <div>
            {/* Prompt Instruction */}
            <h2 className="fs-4 fw-bolder text-dark mb-4">{currentExercise.prompt}</h2>

            {/* Character & Audio Bubble Header */}
            {(currentExercise.type === 'multiple-choice' || currentExercise.type === 'word-bank' || currentExercise.type === 'fill-blank') && currentExercise.audioPhrase && (
              <div className="d-flex align-items-start gap-3 mb-4">
                <DuoMascot mood={duoMood} size={84} outfit={stats.equippedOutfit} />

                {/* Speech Bubble with Audio */}
                <div className="bg-light border border-2 border-light-subtle p-3 rounded-4 position-relative d-flex align-items-center gap-3">
                  <button
                    onClick={() => handlePlayAudio(0.95)}
                    className="duo-btn duo-btn-blue p-2 rounded-circle"
                    style={{ width: '44px', height: '44px' }}
                    title="Play Audio"
                  >
                    <Volume2 size={22} className={isSpeaking ? 'opacity-75' : ''} />
                  </button>

                  <div>
                    <div className="fs-5 fw-bolder text-dark">
                      {currentExercise.targetText || currentExercise.spanishText || currentExercise.audioPhrase}
                    </div>
                    {currentExercise.englishText && (
                      <div className="text-muted fs-7">{currentExercise.englishText}</div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Exercise Type 1: Listening Audio Challenge */}
            {currentExercise.type === 'listening' && (
              <div className="text-center my-4">
                <div className="d-flex justify-content-center gap-3 mb-4">
                  <button
                    onClick={() => handlePlayAudio(0.95)}
                    className="duo-btn duo-btn-blue p-4 rounded-4 shadow-sm"
                    style={{ minWidth: '120px' }}
                    title="Play audio normal speed"
                  >
                    <Volume2 size={42} />
                  </button>

                  <button
                    onClick={() => handlePlayAudio(0.65)}
                    className="duo-btn duo-btn-blue p-4 rounded-4 shadow-sm"
                    style={{ minWidth: '80px', backgroundColor: '#38bdf8' }}
                    title="Slow turtle audio"
                  >
                    <Turtle size={36} />
                  </button>
                </div>

                {currentExercise.phonetic && (
                  <p className="text-muted fs-7 mb-4">
                    💡 Phonetic pronunciation: <span className="fw-bold">{currentExercise.phonetic}</span>
                  </p>
                )}
              </div>
            )}

            {/* Exercise Type 2: Word Bank Sentence Assembler */}
            {(currentExercise.type === 'word-bank' || currentExercise.type === 'listening') && (
              <div className="mb-4">
                {/* Assembled Sentence Tray */}
                <div 
                  className="p-3 rounded-4 mb-4 d-flex flex-wrap gap-2 align-items-center"
                  style={{ 
                    minHeight: '80px', 
                    borderBottom: '3px solid #dee2e6',
                    backgroundColor: '#f8f9fa'
                  }}
                >
                  {selectedWordBank.length === 0 ? (
                    <span className="text-secondary fs-6 fw-bold fst-italic">Tap words below to build your answer...</span>
                  ) : (
                    selectedWordBank.map((tokenKey) => {
                      const word = tokenKey.split('__')[0];
                      return (
                        <button
                          key={tokenKey}
                          onClick={() => handleTapWordBankItem(word, parseInt(tokenKey.split('__')[1]))}
                          className="duo-word-token text-primary border-primary"
                        >
                          {word}
                        </button>
                      );
                    })
                  )}
                </div>

                {/* Available Pool of Words */}
                <div className="d-flex flex-wrap justify-content-center gap-2 pt-2">
                  {currentExercise.wordBankPool?.map((word, idx) => {
                    const tokenKey = `${word}__${idx}`;
                    const isSelected = selectedWordBank.includes(tokenKey);
                    return (
                      <button
                        key={idx}
                        onClick={() => handleTapWordBankItem(word, idx)}
                        disabled={isSelected}
                        className={`duo-word-token ${isSelected ? 'selected' : ''}`}
                      >
                        {word}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Exercise Type 3: Multiple Choice & Fill-in-the-blank */}
            {(currentExercise.type === 'multiple-choice' || currentExercise.type === 'fill-blank') && currentExercise.options && (
              <div className="d-flex flex-column gap-3 mb-4">
                {currentExercise.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  let cardClass = 'duo-choice-card';
                  if (isSelected) {
                    if (status === 'correct') cardClass += ' correct';
                    else if (status === 'wrong') cardClass += ' incorrect';
                    else cardClass += ' active';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        sound.playPop();
                        setSelectedOption(idx);
                      }}
                      className={cardClass}
                    >
                      <span className="badge rounded-circle bg-light text-dark px-2.5 py-1.5 fs-7 border">
                        {idx + 1}
                      </span>
                      <span className="flex-grow-1 text-start">{option}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Exercise Type 4: Pair Matching */}
            {currentExercise.type === 'pair-matching' && currentExercise.pairs && (
              <div className="row g-3 mb-4">
                {/* Left Side */}
                <div className="col-6 d-flex flex-column gap-2">
                  {currentExercise.pairs.map((p) => {
                    const isMatched = matchedPairs.includes(p.id);
                    const isSelected = selectedPairLeft === p.id;
                    return (
                      <button
                        key={`left-${p.id}`}
                        onClick={() => handleSelectPairItem(p.id, 'left')}
                        disabled={isMatched}
                        className={`duo-choice-card py-2.5 px-3 fs-6 ${
                          isMatched ? 'opacity-25 border-light-subtle' : isSelected ? 'active' : ''
                        }`}
                      >
                        {p.target || p.spanish}
                      </button>
                    );
                  })}
                </div>

                {/* Right Side */}
                <div className="col-6 d-flex flex-column gap-2">
                  {[...currentExercise.pairs].reverse().map((p) => {
                    const isMatched = matchedPairs.includes(p.id);
                    const isSelected = selectedPairRight === p.id;
                    return (
                      <button
                        key={`right-${p.id}`}
                        onClick={() => handleSelectPairItem(p.id, 'right')}
                        disabled={isMatched}
                        className={`duo-choice-card py-2.5 px-3 fs-6 ${
                          isMatched ? 'opacity-25 border-light-subtle' : isSelected ? 'active' : ''
                        }`}
                      >
                        {p.english}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Bottom Action Drawer Bar */}
      <footer 
        className={`w-100 py-3 py-md-4 px-3 px-md-5 border-top border-2 transition-colors duration-200 ${
          status === 'correct' 
            ? 'bg-success-subtle border-success-subtle' 
            : status === 'wrong' 
              ? 'bg-danger-subtle border-danger-subtle' 
              : 'bg-white border-light-subtle'
        }`}
      >
        <div className="app-max-w-3xl mx-auto d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3">
          {status === 'correct' ? (
            <div className="d-flex align-items-center gap-3">
              <CheckCircle2 size={38} className="text-success fill-current text-white bg-success rounded-circle" />
              <div>
                <h3 className="fs-5 fw-bolder text-success mb-0">Nicely done! / ¡Excelente!</h3>
                {currentExercise?.explanation && (
                  <p className="text-muted fs-8 mb-0">{currentExercise.explanation}</p>
                )}
              </div>
            </div>
          ) : status === 'wrong' ? (
            <div className="d-flex align-items-center gap-3">
              <XCircle size={38} className="text-danger fill-current text-white bg-danger rounded-circle" />
              <div>
                <h3 className="fs-5 fw-bolder text-danger mb-0">Incorrect solution</h3>
                {currentExercise?.correctSentence ? (
                  <p className="text-dark fs-7 mb-0">
                    Correct: <span className="fw-bolder">{currentExercise.correctSentence.join(' ')}</span>
                  </p>
                ) : currentExercise?.options && currentExercise.correctOptionIndex !== undefined ? (
                  <p className="text-dark fs-7 mb-0">
                    Correct: <span className="fw-bolder">{currentExercise.options[currentExercise.correctOptionIndex]}</span>
                  </p>
                ) : null}
                {currentExercise?.explanation && (
                  <small className="text-muted d-block mt-0.5">{currentExercise.explanation}</small>
                )}
              </div>
            </div>
          ) : (
            <div className="d-none d-sm-block text-muted fs-7 fw-bold">
              Tip: Press <kbd className="bg-light text-dark px-1.5 py-0.5 border rounded">Enter ↵</kbd> to check
            </div>
          )}

          <div className="w-100 w-sm-auto d-flex gap-2">
            {status === 'idle' ? (
              <button
                onClick={handleCheck}
                disabled={isCheckDisabled()}
                className="duo-btn duo-btn-green w-100 w-sm-auto px-5 py-3 fs-6"
              >
                CHECK
              </button>
            ) : (
              <button
                onClick={handleContinue}
                className={`duo-btn ${status === 'correct' ? 'duo-btn-green' : 'duo-btn-red'} w-100 w-sm-auto px-5 py-3 fs-6 d-flex align-items-center justify-content-center gap-2`}
              >
                <span>CONTINUE</span>
                <ArrowRight size={20} />
              </button>
            )}
          </div>
        </div>
      </footer>

      {/* Quit Confirmation Modal */}
      {showExitConfirm && (
        <div 
          className="modal show d-block" 
          tabIndex="-1" 
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 p-3 shadow-lg">
              <div className="modal-body text-center p-4">
                <DuoMascot mood="sad" size={100} outfit={stats.equippedOutfit} />
                <h3 className="fw-bolder mt-3 mb-1 text-dark">Quit this lesson?</h3>
                <p className="text-muted mb-4">You will lose your progress for this session if you leave now.</p>
                <div className="d-flex flex-column gap-2">
                  <button
                    onClick={() => setShowExitConfirm(false)}
                    className="duo-btn duo-btn-blue w-100 py-2.5 fs-6"
                  >
                    Keep Learning
                  </button>
                  <button
                    onClick={onExit}
                    className="duo-btn duo-btn-white w-100 py-2 fs-7 text-danger"
                  >
                    End Session
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
