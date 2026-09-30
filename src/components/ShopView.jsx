import React from 'react';
import { SHOP_ITEMS } from '../data/curriculum';
import { Gem, Heart, Snowflake, Zap, Award, Crown, Check } from 'lucide-react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

export const ShopView = ({
  stats,
  onBuyItem,
  onEquipOutfit
}) => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'snowflake': return <Snowflake size={32} className="text-cyan-500" />;
      case 'heart': return <Heart size={32} className="text-rose-500 fill-current" />;
      case 'zap': return <Zap size={32} className="text-amber-500 fill-current" />;
      case 'award': return <Award size={32} className="text-indigo-500" />;
      case 'crown': return <Crown size={32} className="text-amber-500 fill-current" />;
      default: return <Gem size={32} className="text-sky-500" />;
    }
  };

  const handlePurchase = (item) => {
    if (stats.gems < item.cost) {
      sound.playWrong();
      alert(`You need ${item.cost - stats.gems} more gems to purchase ${item.name}! Complete more lessons to earn gems.`);
      return;
    }

    sound.playFanfare();
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.5 } });
    onBuyItem(item);
  };

  return (
    <div className="container py-4 app-max-w-4xl mx-auto">
      {/* Banner */}
      <div 
        className="p-4 rounded-4 text-white mb-4 d-flex flex-column flex-sm-row align-items-center justify-content-between shadow-sm gap-3"
        style={{ background: 'linear-gradient(135deg, #1cb0f6 0%, #1168df 100%)' }}
      >
        <div>
          <span className="badge bg-white text-primary fw-bolder mb-1 px-2.5 py-1">SHOP & INVENTORY</span>
          <h2 className="fs-3 fw-bolder mb-1">Lingot & Gems Store</h2>
          <p className="mb-0 text-white-50 fw-bold">Spend your hard-earned gems on streak freezes, hearts, and outfits!</p>
        </div>

        <div className="d-flex align-items-center gap-2 bg-white text-dark px-3 py-2 rounded-3 shadow-sm">
          <Gem size={26} className="text-primary fill-current" />
          <span className="fs-4 fw-bolder text-dark">{stats.gems}</span>
          <small className="text-muted fw-bold">Gems</small>
        </div>
      </div>

      {/* Grid of Items */}
      <div className="row g-4">
        {SHOP_ITEMS.map((item) => {
          const isHeartFull = item.id === 'heart-refill' && stats.hearts >= stats.maxHearts;
          const isOutfitEquipped = stats.equippedOutfit === item.id;
          const isStreakFreezeActive = item.id === 'streak-freeze' && stats.hasStreakFreeze;

          return (
            <div key={item.id} className="col-12 col-md-6">
              <div className="bg-white p-4 rounded-4 border border-2 border-light-subtle shadow-sm h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-start justify-content-between mb-3">
                    <div className="p-3 bg-light border border-light-subtle rounded-4">
                      {getIcon(item.icon)}
                    </div>
                    {item.badge && (
                      <span className="badge bg-amber-100 text-amber-850 border border-amber-200 fw-bold px-2 py-1 fs-8">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="fs-5 fw-bolder text-dark mb-1">{item.name}</h3>
                  <p className="text-muted fs-7 mb-4">{item.description}</p>
                </div>

                <div className="d-flex align-items-center justify-content-between pt-3 border-top border-light-subtle">
                  <div className="d-flex align-items-center gap-1.5 fw-bolder fs-6 text-primary">
                    <Gem size={18} className="fill-current" />
                    <span>{item.cost}</span>
                  </div>

                  {item.type === 'outfit' ? (
                    isOutfitEquipped ? (
                      <button
                        onClick={() => onEquipOutfit('default')}
                        className="duo-btn duo-btn-white py-2 px-3 fs-8 d-flex align-items-center gap-1"
                      >
                        <Check size={16} />
                        <span>Equipped (Tap to remove)</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handlePurchase(item)}
                        className="duo-btn duo-btn-blue py-2 px-4 fs-7"
                      >
                        Equip Outfit
                      </button>
                    )
                  ) : isStreakFreezeActive ? (
                    <span className="badge bg-info-subtle text-info fw-bolder p-2">
                      Shield Active
                    </span>
                  ) : isHeartFull ? (
                    <span className="badge bg-secondary-subtle text-secondary fw-bolder p-2">
                      Hearts Full (5/5)
                    </span>
                  ) : (
                    <button
                      onClick={() => handlePurchase(item)}
                      disabled={stats.gems < item.cost}
                      className="duo-btn duo-btn-green py-2 px-4 fs-7"
                    >
                      Buy Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
