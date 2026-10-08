import React from 'react';
import { ShieldCheck, RotateCcw, Truck, Award } from 'lucide-react';

const FEATURES = [
  {
    icon: Award,
    title: '240+ GSM Heavyweight Cotton',
    desc: 'Crafted with premium super combed French Terry for non-sheer, structured drape.'
  },
  {
    icon: RotateCcw,
    title: '7-Day Easy Returns & Exchanges',
    desc: 'Hassle-free reverse pickups right from your doorstep across 19,000+ pincodes.'
  },
  {
    icon: Truck,
    title: 'Free Express Shipping',
    desc: 'Fast delivery on all prepaid orders. Dispatched within 24 hours from our hubs.'
  },
  {
    icon: ShieldCheck,
    title: '100% Secure Payments',
    desc: 'Encrypted checkout with UPI, Credit Cards, Netbanking & Cash On Delivery.'
  }
];

const TrustFeatures = () => {
  return (
    <section className="py-10 bg-zinc-50 border-y border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 rounded-xl bg-white border border-zinc-200/60 shadow-subtle"
              >
                <div className="w-10 h-10 rounded-lg bg-zinc-900 text-white flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-zinc-900 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustFeatures;
