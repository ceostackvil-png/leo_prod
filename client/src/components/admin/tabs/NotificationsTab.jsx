import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  CreditCard,
  RotateCcw,
  Star,
  ShoppingBag,
  Send,
  MessageSquare,
  Mail,
  Smartphone
} from 'lucide-react';
import { INITIAL_ADMIN_NOTIFICATIONS, CUSTOMER_NOTIFICATION_TEMPLATES } from '../adminData';

const NotificationsTab = ({ triggerToast }) => {
  const [adminNotifs, setAdminNotifs] = useState(INITIAL_ADMIN_NOTIFICATIONS);
  const [customerTemplates, setCustomerTemplates] = useState(CUSTOMER_NOTIFICATION_TEMPLATES);
  const [activeSubTab, setActiveSubTab] = useState('admin'); // 'admin', 'customer'

  const markAllAsRead = () => {
    setAdminNotifs(adminNotifs.map(n => ({ ...n, unread: false })));
    if (triggerToast) triggerToast('All notifications marked as read!');
  };

  const toggleTemplateActive = (id) => {
    setCustomerTemplates(customerTemplates.map(t => {
      if (t.id === id) {
        return { ...t, active: !t.active };
      }
      return t;
    }));
    if (triggerToast) triggerToast('Automated notification trigger updated!');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Notifications & Automated Customer Alerts
            </h2>
            <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-300">
              WhatsApp, SMS & Email
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Admin real-time operations alerts and automated post-purchase customer communication flows
          </p>
        </div>

        {activeSubTab === 'admin' && (
          <button
            onClick={markAllAsRead}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer self-stretch sm:self-auto"
          >
            Mark All as Read
          </button>
        )}
      </div>

      {/* Subtabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveSubTab('admin')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
            activeSubTab === 'admin'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          🔔 Internal Admin Alerts ({adminNotifs.filter(n => n.unread).length} Unread)
        </button>
        <button
          onClick={() => setActiveSubTab('customer')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
            activeSubTab === 'customer'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          📱 Customer Automated Triggers ({customerTemplates.length})
        </button>
      </div>

      {/* SUBTAB 1: ADMIN NOTIFICATIONS */}
      {activeSubTab === 'admin' && (
        <div className="space-y-3">
          {adminNotifs.map((n) => (
            <div
              key={n.id}
              className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-4 ${
                n.unread
                  ? 'bg-white border-amber-300 shadow-xs ring-1 ring-amber-100'
                  : 'bg-white/80 border-slate-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  n.type === 'order'
                    ? 'bg-blue-100 text-blue-700'
                    : n.type === 'inventory'
                    ? 'bg-rose-100 text-rose-700'
                    : n.type === 'payment'
                    ? 'bg-amber-100 text-amber-700'
                    : n.type === 'return'
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {n.type === 'order' && <ShoppingBag className="w-4 h-4" />}
                  {n.type === 'inventory' && <AlertTriangle className="w-4 h-4" />}
                  {n.type === 'payment' && <CreditCard className="w-4 h-4" />}
                  {n.type === 'return' && <RotateCcw className="w-4 h-4" />}
                  {n.type === 'review' && <Star className="w-4 h-4" />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-slate-900">{n.title}</h4>
                    {n.unread && (
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">{n.message}</p>
                  <span className="text-[10px] text-slate-400 mt-1 block font-mono">{n.time}</span>
                </div>
              </div>

              {n.unread && (
                <button
                  onClick={() => setAdminNotifs(adminNotifs.map(x => x.id === n.id ? { ...x, unread: false } : x))}
                  className="text-[10px] text-slate-500 hover:text-slate-900 font-bold px-2 py-1 bg-slate-100 rounded-lg shrink-0 cursor-pointer"
                >
                  Dismiss
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* SUBTAB 2: CUSTOMER AUTOMATED TEMPLATES */}
      {activeSubTab === 'customer' && (
        <div className="space-y-4">
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-xs text-slate-600 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-900 block">Omnichannel Customer Notification Engine</span>
              <p className="text-[11px] text-slate-500">Automated transaction alerts sent via WhatsApp Business API, SMS gateway & SendGrid Email</p>
            </div>
            <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-lg text-xs">
              Gateway Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {customerTemplates.map((t) => (
              <div
                key={t.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] font-bold text-slate-400">{t.id}</span>
                    <button
                      onClick={() => toggleTemplateActive(t.id)}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full cursor-pointer transition-colors ${
                        t.active
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {t.active ? 'TRIGGER: ACTIVE' : 'TRIGGER: PAUSED'}
                    </button>
                  </div>

                  <h4 className="text-sm font-black text-slate-900">{t.trigger}</h4>
                  <span className="text-[10px] text-blue-600 font-bold flex items-center gap-1 mt-0.5">
                    <Smartphone className="w-3 h-3" /> Channel: {t.channel}
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs font-mono text-slate-700 leading-relaxed">
                  "{t.template}"
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsTab;
