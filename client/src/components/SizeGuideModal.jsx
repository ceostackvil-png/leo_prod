import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';

const SIZE_CHARTS = {
  tops: [
    { size: 'S', chest: '42 in', length: '28 in', shoulder: '20 in' },
    { size: 'M', chest: '44 in', length: '29 in', shoulder: '21 in' },
    { size: 'L', chest: '46 in', length: '30 in', shoulder: '22 in' },
    { size: 'XL', chest: '48 in', length: '31 in', shoulder: '23 in' },
    { size: 'XXL', chest: '50 in', length: '32 in', shoulder: '24 in' }
  ],
  bottoms: [
    { size: '30 (S)', waist: '30 in', hip: '40 in', length: '39 in' },
    { size: '32 (M)', waist: '32 in', hip: '42 in', length: '40 in' },
    { size: '34 (L)', waist: '34 in', hip: '44 in', length: '40 in' },
    { size: '36 (XL)', waist: '36 in', hip: '46 in', length: '41 in' }
  ]
};

const SizeGuideModal = ({ isOpen, onClose, categoryType = 'tops' }) => {
  const [activeTab, setActiveTab] = useState(categoryType === 'joggers' ? 'bottoms' : 'tops');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div
        className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-black rounded-full hover:bg-zinc-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center">
            <Ruler className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-zinc-900">LEO Sizing & Measurement Guide</h3>
            <p className="text-xs text-zinc-500">All measurements are in inches</p>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex bg-zinc-100 p-1 rounded-lg mb-4">
          <button
            onClick={() => setActiveTab('tops')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
              activeTab === 'tops' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500'
            }`}
          >
            Tops & Oversized Tees
          </button>
          <button
            onClick={() => setActiveTab('bottoms')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
              activeTab === 'bottoms' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500'
            }`}
          >
            Cargoes & Joggers
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-zinc-200 rounded-lg">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50 text-zinc-500 font-bold uppercase text-[10px] border-b border-zinc-200">
              {activeTab === 'tops' ? (
                <tr>
                  <th className="p-3">Size</th>
                  <th className="p-3">Chest (Around)</th>
                  <th className="p-3">Length</th>
                  <th className="p-3">Shoulder</th>
                </tr>
              ) : (
                <tr>
                  <th className="p-3">Size</th>
                  <th className="p-3">Waist</th>
                  <th className="p-3">Hip</th>
                  <th className="p-3">Length</th>
                </tr>
              )}
            </thead>
            <tbody className="divide-y divide-zinc-200 text-zinc-800 font-medium">
              {activeTab === 'tops'
                ? SIZE_CHARTS.tops.map((row) => (
                    <tr key={row.size} className="hover:bg-zinc-50">
                      <td className="p-3 font-bold text-black">{row.size}</td>
                      <td className="p-3">{row.chest}</td>
                      <td className="p-3">{row.length}</td>
                      <td className="p-3">{row.shoulder}</td>
                    </tr>
                  ))
                : SIZE_CHARTS.bottoms.map((row) => (
                    <tr key={row.size} className="hover:bg-zinc-50">
                      <td className="p-3 font-bold text-black">{row.size}</td>
                      <td className="p-3">{row.waist}</td>
                      <td className="p-3">{row.hip}</td>
                      <td className="p-3">{row.length}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {/* Fit advice */}
        <div className="mt-4 p-3 bg-zinc-50 rounded-lg border border-zinc-200/80 text-[11px] text-zinc-600">
          <strong className="text-zinc-900 font-semibold">Pro Styling Tip:</strong> Our Oversized Tees are pre-engineered with a generous drop shoulder. If you prefer an authentic streetwear boxy fit, choose your standard true size.
        </div>

        <button
          onClick={onClose}
          className="w-full mt-5 bg-zinc-900 hover:bg-black text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider"
        >
          Got It
        </button>
      </div>
    </div>
  );
};

export default SizeGuideModal;
