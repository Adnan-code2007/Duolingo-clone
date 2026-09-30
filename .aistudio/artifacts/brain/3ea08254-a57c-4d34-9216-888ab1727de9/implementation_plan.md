# Duolingo Clone - Spanish Learning Journey

A responsive, interactive Spanish learning application inspired by Duolingo, built with React and Bootstrap styling enhanced with Duolingo's tactile 3D design system, audio pronunciation, learning path progression, and gamification mechanics.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following user preferences were confirmed during the interview phase and are prioritized in this architecture:

- **Language Track**: Spanish for English speakers across multiple progressive thematic units (Unit 1: Essentials & Greetings, Unit 2: Café & Ordering, Unit 3: Travel & Getting Around, Unit 4: Family & Home).
- **Interactive Exercise Modalities**:
  - *Word Bank Builder*: Tap words to assemble sentences with return-to-tray interactions.
  - *Multiple Choice & Image Match*: Visual and textual selection with instant contextual explanations.
  - *Listening Comprehension*: Native-sounding audio playback powered by the browser's Web Speech API (`SpeechSynthesis`) with normal and slow-speed repetition buttons.
- **Gamification & Retention Mechanics**:
  - *Learning Path*: Winding, node-based unit tree with checkpoints, locked/unlocked stages, and milestone treasure chests.
  - *Heart Life System*: 5 hearts max; incorrect answers deduct 1 heart; players can practice to regain hearts or spend gems.
  - *Daily Streak & XP*: Live streak counter with flame effects, lesson XP calculation, and daily goal meters.
  - *Lingot / Gem Shop*: In-game store to purchase Streak Freeze, Heart Refills, and bonus badges.
  - *Audio Feedback*: Web Audio API sound generator for snappy positive "ping" on correct answers and gentle "thud" on errors.

---

## 1. Overview & Core Concept

- **What It Does**: Provides a bite-sized, gamified language learning experience. Users navigate through progressive Spanish units, take interactive quizzes, hear authentic pronunciation, track streaks, manage hearts, and earn gems to spend in the shop.
- **Target Audience / Persona**: Language learners of all levels looking for an encouraging, visual, and rewarding Spanish learning environment.
- **Key Value**: Delightful, friction-free learning mechanics with tactile satisfaction, zero dead ends, audio feedback, and local persistent progression that saves streaks, hearts, and unlocked lessons.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Learning Path View (Main Screen)**:
   - Header with active language banner (Spanish flag), streak flame counter, gem tally, and hearts counter.
   - Left navigation sidebar (Learn / Path, Practice / Hearts, Leaderboard, Shop, Profile).
   - Scrollable unit curriculum with colorful unit headers, winding lesson nodes (completed with gold crowns, active bouncing node, and locked gray nodes), plus treasure chests.
   - Clicking an available lesson opens the lesson preview card with XP rewards and a "Start Lesson" CTA.
2. **Interactive Lesson Session**:
   - Top bar: Close button (with quit confirmation modal), animated progress bar, and remaining hearts.
   - Exercise Stage: Dynamic view displaying either:
     - Word bank sentence constructor (tap words from bottom tray into the answer line, tap back to remove).
     - Multiple choice challenge (prompt in Spanish/English, choice cards with keyboard shortcuts 1–4).
     - Audio listening exercise with slow/normal speaker buttons and word selection.
   - Bottom feedback drawer: Animates up on "Check" with vibrant green (correct) or gentle coral (incorrect with correct answer explanation and sound cue).
3. **Lesson Completion & Celebration**:
   - Cheerful Duo owl celebration screen with XP gained, accuracy percentage, streak counter increment, and gem bonus chest.
4. **Lingot Shop**:
   - Purchase Heart Refill (full 5 hearts), Streak Freeze (protects against missing a day), and Double-or-Nothing XP wagers.
5. **Practice Mode**:
   - Quick review session allowing users to earn back lost hearts without risk of losing any.

### Visual Identity & Theme

- **Aesthetic Direction**: Duolingo's iconic playful, friendly, and tactile aesthetic. Bold outlines, physical 3D button press depth (`border-bottom: 4px solid ...`), round pill-free buttons, and energetic micro-interactions.
- **Color Palette**:
  - *Duolingo Green*: `#58CC02` (hover `#46A302`, shadow `#429900`)
  - *Sky Blue*: `#1CB0F6` (hover `#1899D6`, shadow `#1684B8`)
  - *Heart Red*: `#FF4B4B` (shadow `#EA2B2B`)
  - *Streak Flame / Gold*: `#FF9600` / `#FFC800`
  - *Gem Cyan*: `#00CD9C` / `#2CE2B8`
  - *Canvas Background*: `#FFFFFF` and soft `#F7F7F7`
  - *Structural Borders*: `#E5E5E5` with `#CECECE` depth lines
- **Typography**: Clean, geometric modern sans-serif typography (`system-ui`, `-apple-system`, `BlinkMacSystemFont`, "Segoe UI", Roboto) with heavy font weights (700, 800) for headers and numerals.
- **Tactile 3D Buttons**: Custom Bootstrap utility styles providing Duolingo's signature pressable button depth: `box-shadow: 0 4px 0 ...`, translating 2px downward on `:active` with reduced shadow.

---

## 3. Key Product Decisions & Trade-Offs

- **Bootstrap + Playful Tactile Design System**:
  - *Approach*: Combine Bootstrap 5 layout grid, modal, and utilities with custom tactile 3D CSS classes (`.duo-btn`, `.duo-card`, `.word-chip`, `.progress-duo`).
  - *Why*: Satisfies the user's explicit request for Bootstrap on the frontend while faithfully reproducing Duolingo's distinctive playful visual identity.
- **Audio Delivery (Web Speech API + Synthesized SFX)**:
  - *Approach*: Use browser-native `window.speechSynthesis` configured for Spanish (`es-ES` / `es-MX`) for spoken words and sentences. Use the Web Audio API (`AudioContext`) to generate instant chime and thud sound effects without external MP3 asset dependencies that could fail to load.
  - *Why*: Ultra-reliable, zero latency, offline capable, no external asset bandwidth bottlenecks.
- **Local Persistence with Full Offline State**:
  - *Approach*: Unified `localStorage` state management for user progress, current unit, completed nodes, heart count, last heart loss timestamp (for auto-regeneration), gems, streak, and unlocked store items.
  - *Why*: Instant load times, no user login required, allows immediate hands-on play with persistence across page refreshes.

---

## 4. Technical Architecture & Data Strategy

### Component Hierarchy & System Layout

```
┌─────────────────────────────────────────────────────────────────┐
│                           App.tsx                               │
│              (State Store & Persistence Provider)               │
└───────────────┬─────────────────────────────────┬───────────────┘
                │                                 │
     [Learning / Main Shell]               [Active Lesson Mode]
┌───────────────▼───────────────┐        ┌────────▼───────────────┐
│         TopNavHeader          │        │      LessonHeader      │
│  (Flag, Streak, Gems, Hearts) │        │ (Progress, Exit, Heart)│
├───────────────┬───────────────┤        ├────────────────────────┤
│ AppSidebar    │ Main Content  │        │     ExerciseStage      │
│ - Learn       │ Area:         │        │ - WordBankBuilder      │
│ - Practice    │ - LearningPath│        │ - MultipleChoice       │
│ - Shop        │ - ShopView    │        │ - AudioExercise        │
│ - Profile     │ - PracticeView│        ├────────────────────────┤
│ - Reset Data  │ - QuestWidget │        │    FeedbackDrawer      │
└───────────────┴───────────────┘        │ (Correct/Wrong/Continue)
                                         └────────────────────────┘
```

### Data Models & Entities

```typescript
export interface Exercise {
  id: string;
  type: 'word-bank' | 'multiple-choice' | 'listening';
  prompt: string;
  promptTranslation?: string;
  spanishText?: string;
  options?: string[];
  correctAnswer: string | string[];
  audioText?: string;
}

export interface LessonNode {
  id: string;
  unitId: number;
  title: string;
  icon: string;
  totalSteps: number;
  xpReward: number;
  exercises: Exercise[];
}

export interface Unit {
  id: number;
  number: number;
  title: string;
  description: string;
  bannerColor: string;
  nodes: LessonNode[];
}

export interface UserState {
  hearts: number;
  maxHearts: number;
  lastHeartLossTime: number | null;
  gems: number;
  streak: number;
  lastCompletedDate: string | null;
  xp: number;
  completedNodeIds: string[];
  activeNodeId: string;
  inventory: {
    streakFreeze: number;
    doubleOrNothing: boolean;
  };
}
```

### Interactive State Transitions

- **Lesson Selection**: User selects node $\to$ Modal displays lesson topic and XP $\to$ Starts session with 5 hearts and 0% progress.
- **Word Bank Construction**: User clicks words in bank $\to$ Word animates into current answer line $\to$ Click in answer line sends word back to bank $\to$ "Check" button activates once $\ge 1$ word is selected.
- **Answer Validation**:
  - Matches correct answer $\to$ Plays upbeat chime $\to$ Green drawer slides up with celebration message $\to$ Progress bar steps forward.
  - Incorrect $\to$ Plays gentle thud $\to$ Red drawer slides up detailing the correct translation $\to$ Hearts count drops by 1.
  - If Hearts hit 0 $\to$ "Out of Hearts" dialog with options to refill via gems or take a heart practice session.
- **Lesson Completion**: 100% progress $\to$ Victory screen $\to$ Awards +15 XP and +10 Gems $\to$ Increments streak if first completion of the day $\to$ Unlocks next node on learning path.
