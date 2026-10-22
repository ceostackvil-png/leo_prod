import React from 'react';
import StorefrontContainer from './StorefrontContainer';
import { Sparkles, Feather, ShieldCheck, Plane } from 'lucide-react';

const CampaignBanner = () => {
  const FEATURES = [
    { icon: Sparkles, label: 'BIO-WASHED FINISH' },
    { icon: Feather, label: 'COTTON RICH' },
    { icon: ShieldCheck, label: 'HEAVY 240 GSM' },
    { icon: Plane, label: 'TRAVEL FRIENDLY' }
  ];

  return (
    <section className="py-6 sm:py-10 bg-white">
      <StorefrontContainer>
        <div className="overflow-hidden rounded-none border border-gray-100 shadow-xs">
          {/* Main Action Banner */}
          <div className="w-full overflow-hidden bg-gray-100">
            <img
              src="https://nobero.com/cdn/shop/files/Frame_2147227724_039c03ef-8b02-4455-b6c6-51e167d9e68b.png"
              alt="100% Pure Combed Cotton - Engineered for Transit"
              loading="lazy"
              className="w-full h-auto object-cover block"
              onError={(e) => {
                e.currentTarget.src = "/images/leo_campaign_banner.jpg";
              }}
            />
          </div>

          {/* 4 Feature Badges Bar underneath the image */}
          <div className="bg-[#F8F9FA] border-t border-gray-200/80 py-3.5 px-4 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 items-center justify-around select-none">
            {FEATURES.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="flex items-center justify-center gap-2 text-center">
                  <Icon className="w-4 h-4 text-[#1A1E31] shrink-0 stroke-[1.8]" />
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#1A1E31]">
                    {feat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </StorefrontContainer>
    </section>
  );
};

export default CampaignBanner;
