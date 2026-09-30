import React, { useState } from 'react';
import { DuoMascot } from './DuoMascot';
import { Heart, Dumbbell, Volume2, ArrowRight } from 'lucide-react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

const PRACTICE_QUESTIONS = [
  {
    prompt: 'How do you say "Thank you very much"?',
    spanish: 'Muchas gracias',
    english: 'Thank you very much',
    options: ['Muchas gracias', 'De nada', 'Por favor', 'Disculpe'],
    correctIndex: 0,
    tip: '"Muchas gracias" is used across all Spanish-speaking countries.'
  },
  {
    prompt: 'Translate: "Good night, see you tomorrow"',
    spanish: 'Buenas noches, hasta mañana',
    english: 'Good night, see you tomorrow',
    options: ['Buenas tardes, adiós', 'Buenas noches, hasta mañana', 'Hola, ¿cómo estás?', 'Hasta luego, amigo'],
    correctIndex: 1,
    tip: '"Buenas noches" is used for evening greetings and bedtime.'
  },
  {
    prompt: 'Which word means "The check / The bill"?',
    spanish: 'La cuenta',
    english: 'The bill',
    options: ['El menú', 'El agua', 'La cuenta', 'El dinero'],
    correctIndex: 2,
    tip: 'Say "La cuenta, por favor" when you are ready to pay.'
  }
];

const HINDI_PRACTICE_QUESTIONS = [
  {
    prompt: 'How do you say "Thank you very much" in Hindi?',
    spanish: 'बहुत धन्यवाद (Bahut dhanyavaad)',
    english: 'Thank you very much',
    options: ['बहुत धन्यवाद (Bahut dhanyavaad)', 'नमस्ते (Namaste)', 'अलविदा (Alvida)', 'माफ़ कीजिए (Maaf kijiye)'],
    correctIndex: 0,
    tip: '"धन्यवाद" (Dhanyavaad) is the formal expression for thank you.'
  },
  {
    prompt: 'Which phrase means "How are you?" in polite Hindi?',
    spanish: 'आप कैसे हैं? (Aap kaise hain?)',
    english: 'How are you?',
    options: ['आप कैसे हैं?', 'मेरा नाम राज है', 'पानी दीजिए', 'खाना स्वादिष्ट है'],
    correctIndex: 0,
    tip: '"आप" (Aap) is the respectful way to address someone.'
  },
  {
    prompt: 'Translate: "Please give one cup of tea"',
    spanish: 'एक कप चाय दीजिए (Ek cup chai deejie)',
    english: 'Please give one cup of tea',
    options: ['एक कप चाय दीजिए', 'गरम पानी', 'रोटी और सब्ज़ी', 'नमस्ते मित्र'],
    correctIndex: 0,
    tip: '"दीजिए" (deejie) is the polite imperative for "please give".'
  }
];

export const PracticeView = ({
  stats,
  onEarnHeart,
  onBackToLearn
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const activeQuestions = stats.activeLanguage === 'hi' ? HINDI_PRACTICE_QUESTIONS : PRACTICE_QUESTIONS;
  const q = activeQuestions[currentIdx];

  const handleSelectOption = (idx) => {
    if (isAnswered) return;
    sound.playPop();
    setSelectedIdx(idx);
  };

  const handleCheck = () => {
    if (selectedIdx === null) return;
    setIsAnswered(true);
    if (selectedIdx === q.correctIndex) {
      sound.playCorrect();
    } else {
      sound.playWrong();
    }
  };

  const handleNext = () => {
    sound.playPop();
    if (currentIdx + 1 < activeQuestions.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedIdx(null);
      setIsAnswered(false);
    } else {
      sound.playFanfare();
      confetti({ particleCount: 80, spread: 60 });
      setIsFinished(true);
      onEarnHeart();
    }
  };

  if (isFinished) {
    return (
      <div className="container py-5 app-max-w-xl mx-auto text-center">
        <DuoMascot mood="celebrating" size={150} outfit={stats.equippedOutfit} />
        <h2 className="fw-bolder fs-2 text-dark mt-4 mb-2">Practice Complete!</h2>
        <p className="text-muted fw-bold mb-4">You reviewed key phrases and restored health.</p>

        <div className="d-inline-flex align-items-center gap-2 p-3 bg-danger-subtle border border-2 border-danger-subtle rounded-4 text-danger mb-5">
          <Heart size={32} className="fill-current animate-bounce" />
          <span className="fs-5 fw-bolder">+1 Heart Restored!</span>
        </div>

        <div>
          <button
            onClick={onBackToLearn}
            className="duo-btn duo-btn-green py-3 px-5 fs-6"
          >
            Return to Learning Path
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4 app-max-w-2xl mx-auto">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-4 pb-3 border-bottom border-light-subtle">
        <div className="d-flex align-items-center gap-2">
          <Dumbbell className="text-primary" size={28} />
          <div>
            <h2 className="fs-4 fw-bolder mb-0 text-dark">Practice Hub</h2>
            <small className="text-muted fw-bold">Earn +1 Heart upon completing this review</small>
          </div>
        </div>

        <div className="d-flex align-items-center gap-2 bg-danger-subtle px-3 py-1.5 rounded-pill border border-danger-subtle text-danger fw-bolder">
          <Heart size={20} className="fill-current" />
          <span>{stats.hearts} / {stats.maxHearts}</span>
        </div>
      </div>

      {/* Progress pill */}
      <div className="mb-4">
        <div className="d-flex justify-content-between fs-8 fw-bold text-muted mb-1">
          <span>Question {currentIdx + 1} of {activeQuestions.length}</span>
          <span>Earn Heart</span>
        </div>
        <div className="progress rounded-pill" style={{ height: '10px' }}>
          <div 
            className="progress-bar rounded-pill" 
            style={{ 
              width: `${((currentIdx + (isAnswered ? 1 : 0)) / activeQuestions.length) * 100}%`,
              backgroundColor: '#1cb0f6' 
            }} 
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white p-4 rounded-4 border border-2 border-light-subtle shadow-sm mb-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h3 className="fs-5 fw-bolder text-dark mb-0">{q.prompt}</h3>
          <button
            onClick={() => sound.speak(q.spanish)}
            className="btn btn-sm btn-light border p-2 rounded-circle"
            title="Listen to Spanish"
          >
            <Volume2 size={20} className="text-primary" />
          </button>
        </div>

        <div className="d-flex flex-column gap-2.5">
          {q.options.map((option, idx) => {
            const isSelected = selectedIdx === idx;
            let btnClass = 'duo-choice-card';
            if (isAnswered) {
              if (idx === q.correctIndex) btnClass += ' correct';
              else if (isSelected) btnClass += ' incorrect';
            } else if (isSelected) {
              btnClass += ' active';
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className={btnClass}
              >
                <span className="badge rounded-circle bg-light text-dark px-2.5 py-1.5 fs-8 border">
                  {idx + 1}
                </span>
                <span className="flex-grow-1 text-start">{option}</span>
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className={`mt-3 p-3 rounded-3 fs-7 fw-bold ${selectedIdx === q.correctIndex ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}>
            {selectedIdx === q.correctIndex ? '¡Excelente! ' : 'Good try! '} {q.tip}
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="d-flex justify-content-end">
        {!isAnswered ? (
          <button
            onClick={handleCheck}
            disabled={selectedIdx === null}
            className="duo-btn duo-btn-green py-2.5 px-5"
          >
            Check
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="duo-btn duo-btn-blue py-2.5 px-5 d-flex align-items-center gap-2"
          >
            <span>{currentIdx + 1 === activeQuestions.length ? 'Finish & Restore Heart' : 'Next Question'}</span>
            <ArrowRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
};
