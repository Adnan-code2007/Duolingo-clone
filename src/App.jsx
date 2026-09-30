/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { UNITS_DATA } from './data/curriculum';
import { loadUserStats, saveUserStats, loadQuests, saveQuests, resetAllData } from './utils/storage';
import { sound } from './utils/audio';
import { Sidebar, MobileBottomNav } from './components/Navigation';
import { TopHeader } from './components/TopHeader';
import { PathView } from './components/PathView';
import { LessonView } from './components/LessonView';
import { PracticeView } from './components/PracticeView';
import { ShopView } from './components/ShopView';
import { LeaderboardView } from './components/LeaderboardView';
import { QuestsView } from './components/QuestsView';
import { ProfileView } from './components/ProfileView';
import { HeartsModal, StreakModal } from './components/Modals';

export default function App() {
  const [stats, setStats] = useState(loadUserStats);
  const [quests, setQuests] = useState(loadQuests);
  const [activeTab, setActiveTab] = useState('learn');
  const [activeLesson, setActiveLesson] = useState(null);
  const [showHeartsModal, setShowHeartsModal] = useState(false);
  const [showStreakModal, setShowStreakModal] = useState(false);
  const [claimedChests, setClaimedChests] = useState(['chest-unit-0']);

  // Sync sound setting and language
  useEffect(() => {
    sound.setEnabled(stats.soundEnabled);
    sound.setLanguage(stats.activeLanguage || 'es');
  }, [stats.soundEnabled, stats.activeLanguage]);

  // Persist stats and quests
  useEffect(() => {
    saveUserStats(stats);
  }, [stats]);

  useEffect(() => {
    saveQuests(quests);
  }, [quests]);

  // Calculate unclaimed quests
  const unclaimedQuestsCount = quests.filter(q => q.progress >= q.target && !q.claimed).length;

  // Handle lesson start
  const handleStartLesson = (lesson) => {
    if (stats.hearts <= 0) {
      setShowHeartsModal(true);
      return;
    }
    setActiveLesson(lesson);
  };

  // Handle lesson completion
  const handleCompleteLesson = (xpEarned, gemsEarned, accuracy) => {
    if (!activeLesson) return;

    setStats(prev => {
      const alreadyCompleted = prev.completedLessonIds.includes(activeLesson.id);
      const updatedCompletedIds = alreadyCompleted
        ? prev.completedLessonIds
        : [...prev.completedLessonIds, activeLesson.id];

      const newTotalCompleted = prev.totalExercisesCompleted + activeLesson.exercises.length;
      const newCorrect = prev.totalCorrectExercises + Math.round((accuracy / 100) * activeLesson.exercises.length);
      const updatedAccuracy = Math.round((newCorrect / newTotalCompleted) * 100);

      return {
        ...prev,
        xp: prev.xp + xpEarned,
        gems: prev.gems + gemsEarned,
        todayEarnedXp: prev.todayEarnedXp + xpEarned,
        wordsLearnedCount: prev.wordsLearnedCount + 4,
        completedLessonIds: updatedCompletedIds,
        totalExercisesCompleted: newTotalCompleted,
        totalCorrectExercises: newCorrect,
        accuracyRate: updatedAccuracy
      };
    });

    // Update daily quests
    setQuests(prevQuests =>
      prevQuests.map(q => {
        let newProgress = q.progress;
        if (q.id === 'q1') {
          newProgress = Math.min(q.target, q.progress + 1);
        } else if (q.id === 'q2' && accuracy >= 90) {
          newProgress = 1;
        } else if (q.id === 'q3') {
          newProgress = Math.min(q.target, q.progress + xpEarned);
        }
        return {
          ...q,
          progress: newProgress,
          completed: newProgress >= q.target
        };
      })
    );

    setActiveLesson(null);
  };

  // Heart deduction
  const handleLoseHeart = () => {
    setStats(prev => ({
      ...prev,
      hearts: Math.max(0, prev.hearts - 1),
      lastHeartTimestamp: Date.now()
    }));
  };

  // Refill hearts with gems
  const handleRefillHearts = () => {
    if (stats.gems < 100) return;
    setStats(prev => ({
      ...prev,
      gems: prev.gems - 100,
      hearts: prev.maxHearts
    }));
    setShowHeartsModal(false);
  };

  // Earn heart via practice
  const handleEarnHeartPractice = () => {
    setStats(prev => ({
      ...prev,
      hearts: Math.min(prev.maxHearts, prev.hearts + 1)
    }));
  };

  // Shop item purchase
  const handleBuyShopItem = (item) => {
    if (stats.gems < item.cost) return;

    setStats(prev => {
      let updated = { ...prev, gems: prev.gems - item.cost };
      if (item.type === 'hearts') {
        updated.hearts = prev.maxHearts;
      } else if (item.type === 'streak') {
        updated.hasStreakFreeze = true;
      } else if (item.type === 'wager') {
        updated.hasDoubleOrNothing = true;
      } else if (item.type === 'outfit') {
        updated.equippedOutfit = item.id;
      }
      return updated;
    });
  };

  const handleEquipOutfit = (outfitId) => {
    setStats(prev => ({ ...prev, equippedOutfit: outfitId }));
  };

  // Claim quest reward
  const handleClaimQuest = (questId) => {
    const q = quests.find(item => item.id === questId);
    if (!q || q.claimed || q.progress < q.target) return;

    setStats(prev => ({
      ...prev,
      gems: prev.gems + q.rewardGems,
      xp: prev.xp + q.rewardXp
    }));

    setQuests(prev =>
      prev.map(item => (item.id === questId ? { ...item, claimed: true } : item))
    );
  };

  // Claim unit chest
  const handleClaimChest = (gems) => {
    setStats(prev => ({ ...prev, gems: prev.gems + gems }));
    setClaimedChests(prev => [...prev, `chest-unit-${prev.length}`]);
  };

  // Sound toggle
  const handleToggleSound = () => {
    setStats(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  // Reset Progress
  const handleResetProgress = () => {
    const reset = resetAllData();
    setStats(reset.stats);
    setQuests(reset.quests);
    setActiveTab('learn');
    setActiveLesson(null);
  };

  // Full-screen Lesson Mode
  if (activeLesson) {
    return (
      <LessonView
        lesson={activeLesson}
        stats={stats}
        onComplete={handleCompleteLesson}
        onLoseHeart={handleLoseHeart}
        onRefillHearts={handleRefillHearts}
        onExit={() => setActiveLesson(null)}
        onPracticeRefill={() => {
          setActiveLesson(null);
          setActiveTab('practice');
        }}
      />
    );
  }

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Desktop Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        unclaimedQuestsCount={unclaimedQuestsCount}
        activeLanguage={stats.activeLanguage}
      />

      {/* Main Content Area */}
      <div className="d-flex flex-column flex-grow-1 min-vh-100 pb-5 pb-md-0">
        {/* Sticky Top Header */}
        <TopHeader
          stats={stats}
          onOpenHeartsModal={() => setShowHeartsModal(true)}
          onOpenStreakModal={() => setShowStreakModal(true)}
          onToggleSound={handleToggleSound}
          onSelectLanguage={(lang) => {
            setStats(prev => ({ ...prev, activeLanguage: lang }));
            sound.setLanguage(lang);
          }}
        />

        {/* Tab Views */}
        <main className="flex-grow-1">
          {activeTab === 'learn' && (
            <PathView
              units={UNITS_DATA.filter(u => u.language === stats.activeLanguage)}
              stats={stats}
              onStartLesson={handleStartLesson}
              onOpenHeartsModal={() => setShowHeartsModal(true)}
              onClaimChest={handleClaimChest}
              claimedChests={claimedChests}
            />
          )}

          {activeTab === 'practice' && (
            <PracticeView
              stats={stats}
              onEarnHeart={handleEarnHeartPractice}
              onBackToLearn={() => setActiveTab('learn')}
            />
          )}

          {activeTab === 'leaderboard' && (
            <LeaderboardView stats={stats} />
          )}

          {activeTab === 'quests' && (
            <QuestsView
              quests={quests}
              stats={stats}
              onClaimQuest={handleClaimQuest}
            />
          )}

          {activeTab === 'shop' && (
            <ShopView
              stats={stats}
              onBuyItem={handleBuyShopItem}
              onEquipOutfit={handleEquipOutfit}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileView
              stats={stats}
              onResetProgress={handleResetProgress}
            />
          )}
        </main>

        {/* Mobile Bottom Navigation */}
        <MobileBottomNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          unclaimedQuestsCount={unclaimedQuestsCount}
        />
      </div>

      {/* Quick Modals */}
      {showHeartsModal && (
        <HeartsModal
          stats={stats}
          onClose={() => setShowHeartsModal(false)}
          onRefillWithGems={handleRefillHearts}
          onStartPractice={() => {
            setShowHeartsModal(false);
            setActiveTab('practice');
          }}
        />
      )}

      {showStreakModal && (
        <StreakModal
          stats={stats}
          onClose={() => setShowStreakModal(false)}
        />
      )}
    </div>
  );
}
