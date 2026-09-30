import { INITIAL_QUESTS } from '../data/curriculum';

const STORAGE_KEY_STATS = 'duolingo_clone_user_stats';
const STORAGE_KEY_QUESTS = 'duolingo_clone_quests';
const HEART_REFILL_INTERVAL_MS = 20 * 60 * 1000; // 20 minutes per heart

export const DEFAULT_USER_STATS = {
  xp: 75,
  streak: 3,
  streakFrozenToday: false,
  hearts: 5,
  maxHearts: 5,
  lastHeartTimestamp: Date.now(),
  gems: 180,
  activeLanguage: 'es',
  completedLessonIds: ['u1-l1', 'u-hi-1-l1'],
  activeUnitId: 'unit-es-1',
  activeLessonId: 'u1-l2',
  soundEnabled: true,
  hapticEnabled: true,
  equippedOutfit: 'default',
  hasStreakFreeze: true,
  hasDoubleOrNothing: false,
  dailyGoalXp: 30,
  todayEarnedXp: 15,
  wordsLearnedCount: 18,
  accuracyRate: 94,
  totalExercisesCompleted: 24,
  totalCorrectExercises: 22
};

export function loadUserStats() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_STATS);
    if (!raw) return { ...DEFAULT_USER_STATS, lastHeartTimestamp: Date.now() };
    const parsed = JSON.parse(raw);
    const stats = { ...DEFAULT_USER_STATS, ...parsed };

    // Calculate regenerated hearts
    if (stats.hearts < stats.maxHearts) {
      const now = Date.now();
      const elapsed = now - (stats.lastHeartTimestamp || now);
      const recoveredHearts = Math.floor(elapsed / HEART_REFILL_INTERVAL_MS);
      if (recoveredHearts > 0) {
        stats.hearts = Math.min(stats.maxHearts, stats.hearts + recoveredHearts);
        stats.lastHeartTimestamp = now;
      }
    }
    return stats;
  } catch {
    return { ...DEFAULT_USER_STATS };
  }
}

export function saveUserStats(stats) {
  try {
    localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save user stats', e);
  }
}

export function loadQuests() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_QUESTS);
    if (!raw) return INITIAL_QUESTS;
    return JSON.parse(raw);
  } catch {
    return INITIAL_QUESTS;
  }
}

export function saveQuests(quests) {
  try {
    localStorage.setItem(STORAGE_KEY_QUESTS, JSON.stringify(quests));
  } catch (e) {
    console.error('Failed to save quests', e);
  }
}

export function resetAllData() {
  localStorage.removeItem(STORAGE_KEY_STATS);
  localStorage.removeItem(STORAGE_KEY_QUESTS);
  return {
    stats: { ...DEFAULT_USER_STATS, lastHeartTimestamp: Date.now() },
    quests: INITIAL_QUESTS
  };
}
