'use client';

import React, { useState } from 'react';
import { store } from '@/lib/store';
import { ShieldCheck, Bell, Lock, User, CheckCircle2 } from 'lucide-react';

export default function SettingsPage() {
  const user = store.getActiveUser();
  const [saved, setSaved] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div className="pb-3 border-b border-surface-border">
        <h1 className="text-2xl font-extrabold text-charcoal tracking-tight">Account & Security Settings</h1>
        <p className="text-xs text-charcoal-muted mt-0.5">Manage your student credentials and notification preferences</p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-surface-border p-6 shadow-card space-y-6">
        
        {/* Verification Status */}
        <div className="bg-mint-subtle p-4 rounded-2xl border border-mint-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-fresh" />
            <div>
              <p className="text-xs font-bold text-forest">Student Verification Status</p>
              <p className="text-[11px] text-charcoal-muted">
                {user.isVerified ? 'Your student ID is verified for safe campus exchanges.' : 'Pending ID verification.'}
              </p>
            </div>
          </div>
          <span className="text-xs font-bold bg-mint text-forest px-3 py-1 rounded-xl">
            {user.isVerified ? 'Verified' : 'Pending'}
          </span>
        </div>

        {/* Notification Preferences */}
        <div className="space-y-3">
          <h3 className="font-bold text-xs uppercase tracking-wider text-charcoal-muted flex items-center gap-2">
            <Bell className="w-4 h-4 text-forest" /> Notification Alerts
          </h3>
          <div className="space-y-2 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl border border-surface-border cursor-pointer">
              <span>Push notifications for new chat messages & deal proposals</span>
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                className="rounded text-forest focus:ring-fresh"
              />
            </label>
            <label className="flex items-center justify-between p-3 rounded-xl border border-surface-border cursor-pointer">
              <span>Email alerts when wishlist books are posted nearby</span>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="rounded text-forest focus:ring-fresh"
              />
            </label>
          </div>
        </div>

        {/* Security / Password */}
        <div className="space-y-3 pt-3 border-t border-surface-border">
          <h3 className="font-bold text-xs uppercase tracking-wider text-charcoal-muted flex items-center gap-2">
            <Lock className="w-4 h-4 text-forest" /> Security
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-charcoal block mb-1">New Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full text-xs p-2.5 rounded-xl border border-surface-border bg-surface text-charcoal"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-charcoal block mb-1">Confirm Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full text-xs p-2.5 rounded-xl border border-surface-border bg-surface text-charcoal"
              />
            </div>
          </div>
        </div>

        {saved && (
          <div className="p-3 bg-mint text-forest text-xs font-bold rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-fresh" />
            <span>Settings saved successfully!</span>
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-forest hover:bg-forest-light text-white text-xs font-bold shadow-sm transition"
          >
            Save Settings
          </button>
        </div>

      </form>
    </div>
  );
}
