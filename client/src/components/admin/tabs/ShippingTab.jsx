import React, { useState } from 'react';
import {
  Truck,
  MapPin,
  Search,
  CheckCircle2,
  AlertCircle,
  Plus,
  ShieldCheck,
  DollarSign
} from 'lucide-react';
import { INITIAL_SHIPPING_ZONES } from '../adminData';

const ShippingTab = ({ triggerToast }) => {
  const [zones, setZones] = useState(INITIAL_SHIPPING_ZONES);
  const [testPincode, setTestPincode] = useState('');
  const [pincodeResult, setPincodeResult] = useState(null);

  const handleTestPincode = (e) => {
    e.preventDefault();
    if (testPincode.length !== 6) return;

    const firstDigit = testPincode.charAt(0);
    if (firstDigit === '4' || firstDigit === '5' || firstDigit === '1') {
      setPincodeResult({
        serviceable: true,
        zone: 'Zone A - Metro Hub',
        courier: 'BlueDart Air (Delivery in 24 - 48 Hours)',
        cod: true,
        charge: 0
      });
    } else if (firstDigit === '7' || firstDigit === '8' || firstDigit === '9') {
      setPincodeResult({
        serviceable: true,
        zone: 'Zone C - Special Route',
        courier: 'Delhivery Surface (Delivery in 4 - 6 Days)',
        cod: false,
        charge: 99
      });
    } else {
      setPincodeResult({
        serviceable: true,
        zone: 'Zone B - Standard Tier 2',
        courier: 'Shadowfax / Delhivery (Delivery in 2 - 4 Days)',
        cod: true,
        charge: 70
      });
    }
  };

  const handleToggleCod = (zoneId) => {
    setZones(zones.map(z => {
      if (z.id === zoneId) {
        const updated = !z.codAvailable;
        if (triggerToast) triggerToast(`COD availability updated for ${z.name}!`);
        return { ...z, codAvailable: updated };
      }
      return z;
    }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Shipping Zones & Courier Logistics ({zones.length} Zones)
            </h2>
            <span className="bg-blue-100 text-blue-900 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-200">
              India-Wide Logistics
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure delivery zones, courier partners, free shipping rules (Free above ₹999), and COD availability
          </p>
        </div>
      </div>

      {/* Pincode Serviceability Diagnostic Tool */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Pincode Serviceability & Courier Estimator</h3>
          <p className="text-xs text-slate-500">Test courier delivery time, shipping rates and COD availability for any 6-digit Indian pincode</p>
        </div>

        <form onSubmit={handleTestPincode} className="flex flex-col sm:flex-row gap-2 max-w-md">
          <input
            type="text"
            maxLength={6}
            required
            placeholder="Enter 6-digit Pincode (e.g. 400050, 560001)"
            value={testPincode}
            onChange={(e) => setTestPincode(e.target.value.replace(/\D/g, ''))}
            className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-xl font-mono focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#dec562] text-[#0f142b] font-bold text-xs rounded-xl hover:bg-[#c9b150] cursor-pointer transition-colors"
          >
            Check Serviceability
          </button>
        </form>

        {pincodeResult && (
          <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl text-xs space-y-1.5 animate-fade-in">
            <div className="flex items-center gap-2 text-emerald-800 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Pincode {testPincode} is 100% Serviceable!</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-700 pt-1">
              <div><span className="text-slate-400 block">Assigned Zone:</span> <span className="font-bold">{pincodeResult.zone}</span></div>
              <div><span className="text-slate-400 block">Courier Partner:</span> <span className="font-bold">{pincodeResult.courier}</span></div>
              <div><span className="text-slate-400 block">COD Status:</span> <span className="font-bold text-emerald-700">{pincodeResult.cod ? 'Available' : 'Prepaid Only'}</span></div>
              <div><span className="text-slate-400 block">Free Shipping:</span> <span className="font-bold">On orders &gt; ₹999</span></div>
            </div>
          </div>
        )}
      </div>

      {/* Shipping Zones List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {zones.map((z) => (
          <div key={z.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-black text-slate-900">{z.id}</span>
                <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded">
                  {z.deliveryTime}
                </span>
              </div>

              <h4 className="text-sm font-black text-slate-900">{z.name}</h4>
              <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{z.cities}</p>
            </div>

            <div className="border-t border-slate-100 pt-3 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Standard Shipping:</span>
                <span className="font-bold text-slate-900">₹{z.standardRate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Free Shipping Rule:</span>
                <span className="font-bold text-emerald-600">Above ₹{z.freeShippingAbove}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">COD Available:</span>
                <button
                  onClick={() => handleToggleCod(z.id)}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded cursor-pointer ${
                    z.codAvailable ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {z.codAvailable ? 'YES (Active)' : 'NO (Disabled)'}
                </button>
              </div>
              <div className="pt-1 text-[10px] text-slate-400">
                <span>Couriers: {z.activeCouriers.join(', ')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShippingTab;
