import React, { useState } from 'react';
import {
  ShieldCheck,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Lock,
  UserCheck
} from 'lucide-react';
import { INITIAL_TEAM_USERS } from '../adminData';

const ALL_PERMISSIONS = ['View', 'Create', 'Edit', 'Delete', 'Approve', 'Export'];

const UsersTab = ({ triggerToast }) => {
  const [users, setUsers] = useState(INITIAL_TEAM_USERS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'Product Manager',
    permissions: ['View', 'Create', 'Edit'],
    status: 'Active'
  });

  const handleTogglePermission = (perm) => {
    if (newUser.permissions.includes(perm)) {
      setNewUser({ ...newUser, permissions: newUser.permissions.filter(p => p !== perm) });
    } else {
      setNewUser({ ...newUser, permissions: [...newUser.permissions, perm] });
    }
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const created = {
      ...newUser,
      id: `USR-${Date.now().toString().slice(-2)}`,
      lastLogin: 'Never'
    };
    setUsers([...users, created]);
    setIsAddModalOpen(false);
    if (triggerToast) triggerToast(`Team member "${created.name}" invited!`);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Revoke access for this administrator?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Admin Users & Role Permissions ({users.length})
            </h2>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
              Role-Based Access (RBAC)
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage administrative access for Super Admin, Product Managers, Order Managers, Support Staff and define granular rights
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 text-xs font-bold text-[#0f142b] bg-[#dec562] hover:bg-[#c9b150] rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer self-stretch sm:self-auto justify-center"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Invite Team Member</span>
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-4">Admin Name & Email</th>
                <th className="p-4">Assigned Role</th>
                <th className="p-4">Granular Permissions</th>
                <th className="p-4">Status</th>
                <th className="p-4">Last Login</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-800 text-[#dec562] font-black flex items-center justify-center text-xs shrink-0">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{u.name}</p>
                        <p className="text-[11px] text-slate-400">{u.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg text-xs inline-block">
                      {u.role}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {ALL_PERMISSIONS.map((perm) => {
                        const hasPerm = u.permissions.includes(perm);
                        return (
                          <span
                            key={perm}
                            className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                              hasPerm
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-100 text-slate-400 line-through'
                            }`}
                          >
                            {perm}
                          </span>
                        );
                      })}
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full inline-block">
                      {u.status}
                    </span>
                  </td>

                  <td className="p-4 text-slate-500 text-[11px]">
                    {u.lastLogin}
                  </td>

                  <td className="p-4 text-right">
                    {u.role !== 'Super Admin' && (
                      <button
                        onClick={() => handleDeleteUser(u.id)}
                        className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Revoke Access"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Member Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-black text-slate-900">Invite Team Member</h3>
            <form onSubmit={handleAddUser} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-bold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ankit Verma"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Official Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="ankit@leo.com"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                >
                  <option value="Product Manager">Product Manager</option>
                  <option value="Order Manager">Order Manager</option>
                  <option value="Marketing Manager">Marketing Manager</option>
                  <option value="Support Staff">Support Staff</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1.5">Grant Permissions</label>
                <div className="grid grid-cols-3 gap-2">
                  {ALL_PERMISSIONS.map((perm) => (
                    <label key={perm} className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newUser.permissions.includes(perm)}
                        onChange={() => handleTogglePermission(perm)}
                        className="rounded text-amber-500"
                      />
                      <span className="text-[11px] font-semibold text-slate-700">{perm}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-[#0f142b] bg-[#dec562] hover:bg-[#c9b150] rounded-lg font-bold cursor-pointer"
                >
                  Send Admin Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersTab;
