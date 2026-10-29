import React, { useState } from 'react';
import {
  History,
  Search,
  Download,
  Filter,
  ShieldAlert,
  Clock,
  ArrowRight
} from 'lucide-react';
import { INITIAL_AUDIT_LOGS, exportToCsv } from '../adminData';

const AuditLogsTab = () => {
  const [logs, setLogs] = useState(INITIAL_AUDIT_LOGS);
  const [search, setSearch] = useState('');

  const filteredLogs = logs.filter((l) => {
    return (
      l.admin.toLowerCase().includes(search.toLowerCase()) ||
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.entity.toLowerCase().includes(search.toLowerCase()) ||
      l.id.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleExportCsv = () => {
    const headers = ['Log ID', 'Admin User', 'Action Performed', 'Target Entity', 'Previous Value', 'New Value', 'Timestamp', 'IP Address'];
    const rows = filteredLogs.map(l => [
      l.id,
      l.admin,
      l.action,
      l.entity,
      l.prevValue,
      l.newValue,
      l.timestamp,
      l.ip
    ]);
    exportToCsv('leo_activity_audit_logs', headers, rows);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Activity & Security Audit Logs ({filteredLogs.length})
            </h2>
            <span className="bg-slate-100 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-200">
              Immutable Trail
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Complete audit trail recording every price change, status update, refund processing, and configuration edit
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer self-stretch sm:self-auto justify-center"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Logs</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search audit trail by admin name, action, product entity, SKU..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 font-medium"
          />
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-4">Log ID & Time</th>
                <th className="p-4">Authorized Admin</th>
                <th className="p-4">Action & Target Entity</th>
                <th className="p-4">State Transition (Old → New)</th>
                <th className="p-4 text-right">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredLogs.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4">
                    <span className="font-mono font-bold text-slate-900">{l.id}</span>
                    <p className="text-[10px] text-slate-400 mt-0.5">{l.timestamp}</p>
                  </td>

                  <td className="p-4">
                    <span className="font-bold text-slate-900 block">{l.admin}</span>
                  </td>

                  <td className="p-4">
                    <p className="font-semibold text-slate-800 text-[11px]">{l.action}</p>
                    <span className="font-mono text-[10px] text-slate-400">{l.entity}</span>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-2 text-[11px]">
                      <span className="bg-rose-50 text-rose-700 border border-rose-200 px-1.5 py-0.5 rounded font-mono truncate max-w-[130px]">
                        {l.prevValue}
                      </span>
                      <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded font-mono font-bold truncate max-w-[130px]">
                        {l.newValue}
                      </span>
                    </div>
                  </td>

                  <td className="p-4 text-right">
                    <span className="font-mono text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                      {l.ip}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuditLogsTab;
