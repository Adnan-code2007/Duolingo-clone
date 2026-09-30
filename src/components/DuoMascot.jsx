import React from 'react';

export const DuoMascot = ({
  mood = 'happy',
  size = 120,
  outfit = 'default',
  bubbleText,
  className = '',
  onClick
}) => {
  return (
    <div 
      className={`d-inline-flex align-items-center gap-3 position-relative ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div 
        style={{ width: size, height: size }}
        className="d-flex align-items-center justify-content-center position-relative select-none"
      >
        <svg
          viewBox="0 0 160 160"
          width={size}
          height={size}
          className="transition-transform duration-300 hover:scale-105"
        >
          <defs>
            {/* Feathers and gradients */}
            <linearGradient id="duoBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#78c800" />
              <stop offset="100%" stopColor="#58a700" />
            </linearGradient>
            <linearGradient id="duoBellyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#b4f400" />
              <stop offset="100%" stopColor="#8ee000" />
            </linearGradient>
            <linearGradient id="duoGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffd700" />
              <stop offset="100%" stopColor="#ff9600" />
            </linearGradient>
            <filter id="duoShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* Feet */}
          <ellipse cx="62" cy="146" rx="14" ry="6" fill="#e07700" />
          <ellipse cx="98" cy="146" rx="14" ry="6" fill="#e07700" />
          <ellipse cx="62" cy="145" rx="13" ry="5" fill="#ff9600" />
          <ellipse cx="98" cy="145" rx="13" ry="5" fill="#ff9600" />

          {/* Main Body */}
          <g filter="url(#duoShadow)">
            <ellipse cx="80" cy="85" rx="55" ry="58" fill="url(#duoBodyGrad)" />
            {/* Ear Tufts */}
            <path d="M 32 46 Q 30 18 52 32 Z" fill="#58a700" />
            <path d="M 128 46 Q 130 18 108 32 Z" fill="#58a700" />
            <path d="M 36 44 Q 38 24 50 34 Z" fill="#78c800" />
            <path d="M 124 44 Q 122 24 110 34 Z" fill="#78c800" />
          </g>

          {/* Belly */}
          <ellipse cx="80" cy="100" rx="36" ry="38" fill="url(#duoBellyGrad)" />

          {/* Wings */}
          {mood === 'excited' || mood === 'celebrating' ? (
            // Raised joyful wings
            <>
              <path d="M 28 85 C 10 65 15 45 35 60 C 35 75 30 85 28 85 Z" fill="#58a700" />
              <path d="M 132 85 C 150 65 145 45 125 60 C 125 75 130 85 132 85 Z" fill="#58a700" />
            </>
          ) : mood === 'thinking' ? (
            // One wing on chin
            <>
              <path d="M 26 80 Q 22 105 38 115 Q 32 95 26 80 Z" fill="#58a700" />
              <path d="M 134 85 Q 120 70 88 88 Q 110 95 134 85 Z" fill="#58a700" />
            </>
          ) : (
            // Relaxed resting wings
            <>
              <ellipse cx="26" cy="94" rx="8" ry="24" fill="#58a700" transform="rotate(-15 26 94)" />
              <ellipse cx="134" cy="94" rx="8" ry="24" fill="#58a700" transform="rotate(15 134 94)" />
            </>
          )}

          {/* Eyes Background Ring */}
          <ellipse cx="58" cy="68" rx="20" ry="20" fill="#ffffff" />
          <ellipse cx="102" cy="68" rx="20" ry="20" fill="#ffffff" />

          {/* Pupils & Expressions */}
          {mood === 'sad' ? (
            // Sad droopy eyes + tear
            <>
              <ellipse cx="58" cy="72" rx="9" ry="9" fill="#4b4b4b" />
              <ellipse cx="102" cy="72" rx="9" ry="9" fill="#4b4b4b" />
              <circle cx="55" cy="69" r="3" fill="#ffffff" />
              <circle cx="99" cy="69" r="3" fill="#ffffff" />
              {/* Eyelids droop */}
              <path d="M 38 62 Q 58 72 78 62" stroke="#58a700" strokeWidth="6" fill="none" strokeLinecap="round" />
              <path d="M 82 62 Q 102 72 122 62" stroke="#58a700" strokeWidth="6" fill="none" strokeLinecap="round" />
              {/* Tear drop */}
              <ellipse cx="50" cy="90" rx="3.5" ry="6" fill="#1cb0f6" />
            </>
          ) : mood === 'excited' || mood === 'celebrating' ? (
            // Star/sparkle eyes
            <>
              <ellipse cx="58" cy="68" rx="12" ry="12" fill="#2d3748" />
              <ellipse cx="102" cy="68" rx="12" ry="12" fill="#2d3748" />
              <circle cx="54" cy="64" r="4.5" fill="#ffffff" />
              <circle cx="98" cy="64" r="4.5" fill="#ffffff" />
              <circle cx="62" cy="72" r="2" fill="#ffffff" />
              <circle cx="106" cy="72" r="2" fill="#ffffff" />
            </>
          ) : mood === 'thinking' ? (
            // Glancing up-right
            <>
              <ellipse cx="64" cy="62" rx="9" ry="9" fill="#4b4b4b" />
              <ellipse cx="108" cy="62" rx="9" ry="9" fill="#4b4b4b" />
              <circle cx="62" cy="60" r="3" fill="#ffffff" />
              <circle cx="106" cy="60" r="3" fill="#ffffff" />
            </>
          ) : (
            // Happy cheerful eyes
            <>
              <ellipse cx="59" cy="68" rx="10" ry="10" fill="#4b4b4b" />
              <ellipse cx="101" cy="68" rx="10" ry="10" fill="#4b4b4b" />
              <circle cx="56" cy="65" r="3.5" fill="#ffffff" />
              <circle cx="98" cy="65" r="3.5" fill="#ffffff" />
              <circle cx="62" cy="72" r="1.5" fill="#ffffff" />
              <circle cx="104" cy="72" r="1.5" fill="#ffffff" />
            </>
          )}

          {/* Cheeks (blush) */}
          <ellipse cx="40" cy="85" rx="7" ry="4" fill="#ff7f7f" opacity="0.45" />
          <ellipse cx="120" cy="85" rx="7" ry="4" fill="#ff7f7f" opacity="0.45" />

          {/* Beak */}
          {mood === 'speaking' || mood === 'celebrating' ? (
            // Open laughing beak
            <>
              <path d="M 70 76 Q 80 72 90 76 L 80 96 Z" fill="#ff9600" />
              <path d="M 73 80 Q 80 88 87 80 L 80 92 Z" fill="#d03000" />
            </>
          ) : (
            // Friendly triangular beak
            <path d="M 68 76 Q 80 72 92 76 L 80 92 Z" fill="#ff9600" />
          )}

          {/* Outfits */}
          {outfit === 'suit-duo' && (
            <g>
              {/* Tuxedo V-jacket */}
              <path d="M 52 110 L 80 142 L 108 110 L 100 138 L 80 148 L 60 138 Z" fill="#1e293b" />
              {/* White collar shirt */}
              <polygon points="72,112 80,126 88,112 80,118" fill="#ffffff" />
              {/* Red bowtie */}
              <polygon points="74,116 80,118 74,122" fill="#ea2b2b" />
              <polygon points="86,116 80,118 86,122" fill="#ea2b2b" />
              <circle cx="80" cy="119" r="2.5" fill="#c01515" />
            </g>
          )}

          {outfit === 'gold-duo' && (
            <g>
              {/* Golden Crown */}
              <polygon points="60,34 66,16 74,26 80,12 86,26 94,16 100,34" fill="url(#duoGoldGrad)" filter="url(#duoShadow)" />
              <rect x="62" y="32" width="36" height="5" rx="2" fill="#e5a500" />
              {/* Jewels on crown */}
              <circle cx="80" cy="20" r="2.5" fill="#ea2b2b" />
              <circle cx="68" cy="24" r="2" fill="#1cb0f6" />
              <circle cx="92" cy="24" r="2" fill="#1cb0f6" />
              {/* Champion sash */}
              <path d="M 44 92 L 116 128 L 110 136 L 38 100 Z" fill="url(#duoGoldGrad)" />
            </g>
          )}

          {/* Party Hat for celebrating mood */}
          {mood === 'celebrating' && outfit !== 'gold-duo' && (
            <g filter="url(#duoShadow)">
              <polygon points="80,10 64,38 96,38" fill="#ff4b4b" />
              <polygon points="80,10 74,38 86,38" fill="#ffd900" />
              <circle cx="80" cy="9" r="4" fill="#1cb0f6" />
            </g>
          )}
        </svg>
      </div>

      {/* Comic Speech Bubble */}
      {bubbleText && (
        <div 
          className="bg-white px-3 py-2 rounded-4 shadow-sm border border-2 border-slate-200 position-relative animate-fade-in"
          style={{
            maxWidth: '280px',
            fontSize: '0.95rem',
            fontWeight: 700,
            color: '#3c3c3c',
            lineHeight: 1.35
          }}
        >
          {bubbleText}
          {/* Arrow pointing left */}
          <div 
            style={{
              position: 'absolute',
              top: '50%',
              left: '-8px',
              transform: 'translateY(-50%)',
              width: 0,
              height: 0,
              borderTop: '7px solid transparent',
              borderBottom: '7px solid transparent',
              borderRight: '8px solid #cbd5e1'
            }}
          />
          <div 
            style={{
              position: 'absolute',
              top: '50%',
              left: '-6px',
              transform: 'translateY(-50%)',
              width: 0,
              height: 0,
              borderTop: '6px solid transparent',
              borderBottom: '6px solid transparent',
              borderRight: '7px solid #ffffff'
            }}
          />
        </div>
      )}
    </div>
  );
};
