import { useState } from 'react';
import { Save, Bell, Shield, Palette, Globe, Database, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AdminSettingsPage() {
  const [activeSection, setActiveSection] = useState('GENERAL');

  const sections = [
    { id: 'GENERAL', label: 'General', icon: Globe },
    { id: 'BRANDING', label: 'Branding', icon: Palette },
    { id: 'NOTIFICATIONS', label: 'Notifications', icon: Bell },
    { id: 'SECURITY', label: 'Security', icon: Shield },
    { id: 'EMAIL', label: 'Email / SMTP', icon: Mail },
    { id: 'DATABASE', label: 'Database', icon: Database },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Platform Settings</h1>
        <p className="text-slate-500">Configure system-wide platform behavior and integrations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Settings Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            {sections.map(section => {
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-medium transition-colors border-b border-slate-100 dark:border-slate-800 last:border-b-0 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                      : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'
                  }`}
                >
                  <section.icon size={18} className={isActive ? 'text-blue-600' : 'text-slate-400'} />
                  {section.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          {activeSection === 'GENERAL' && (
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 animate-in fade-in space-y-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">General Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Platform Name</Label>
                  <Input defaultValue="TravelBooking" />
                </div>
                <div className="space-y-2">
                  <Label>Support Email</Label>
                  <Input defaultValue="support@travelbooking.com" />
                </div>
                <div className="space-y-2">
                  <Label>Support Phone</Label>
                  <Input defaultValue="+91 1800-123-4567" />
                </div>
                <div className="space-y-2">
                  <Label>Default Currency</Label>
                  <select className="flex h-10 w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm dark:border-slate-800">
                    <option>INR (₹)</option>
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Default Timezone</Label>
                  <select className="flex h-10 w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm dark:border-slate-800">
                    <option>Asia/Kolkata (IST)</option>
                    <option>UTC</option>
                    <option>America/New_York (EST)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Maintenance Mode</Label>
                  <div className="flex items-center gap-3 pt-2">
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </div>
                    <span className="text-sm text-slate-500">Disabled</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-800">
                <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                  <Save size={16} /> Save Changes
                </Button>
              </div>
            </div>
          )}

          {activeSection === 'BRANDING' && (
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 animate-in fade-in space-y-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Branding & Theming</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Primary Color</Label>
                  <div className="flex items-center gap-3">
                    <input type="color" defaultValue="#3b82f6" className="w-10 h-10 rounded cursor-pointer border-0" />
                    <Input defaultValue="#3b82f6" className="font-mono" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Secondary Color</Label>
                  <div className="flex items-center gap-3">
                    <input type="color" defaultValue="#0f172a" className="w-10 h-10 rounded cursor-pointer border-0" />
                    <Input defaultValue="#0f172a" className="font-mono" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Logo URL</Label>
                  <Input defaultValue="/assets/logo.svg" />
                </div>
                <div className="space-y-2">
                  <Label>Favicon URL</Label>
                  <Input defaultValue="/favicon.ico" />
                </div>
              </div>
              <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-800">
                <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                  <Save size={16} /> Save Changes
                </Button>
              </div>
            </div>
          )}

          {activeSection === 'NOTIFICATIONS' && (
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 animate-in fade-in space-y-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Notification Settings</h2>
              <div className="space-y-4">
                {[
                  { label: 'Send booking confirmation SMS', defaultChecked: true },
                  { label: 'Send booking confirmation Email', defaultChecked: true },
                  { label: 'Send push notification on booking', defaultChecked: true },
                  { label: 'Send refund confirmation SMS', defaultChecked: false },
                  { label: 'Send promotional notifications', defaultChecked: true },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <span className="font-medium text-slate-700 dark:text-slate-300">{item.label}</span>
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={item.defaultChecked} className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-800">
                <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                  <Save size={16} /> Save Changes
                </Button>
              </div>
            </div>
          )}

          {activeSection === 'SECURITY' && (
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 animate-in fade-in space-y-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Security Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>JWT Access Token Expiry</Label>
                  <Input defaultValue="15m" />
                </div>
                <div className="space-y-2">
                  <Label>JWT Refresh Token Expiry</Label>
                  <Input defaultValue="7d" />
                </div>
                <div className="space-y-2">
                  <Label>Max Login Attempts</Label>
                  <Input type="number" defaultValue="5" />
                </div>
                <div className="space-y-2">
                  <Label>OTP Expiry (seconds)</Label>
                  <Input type="number" defaultValue="300" />
                </div>
              </div>
              <div className="space-y-4 mt-4">
                {[
                  { label: 'Enforce 2FA for Admin accounts', defaultChecked: true },
                  { label: 'Rate limit API endpoints', defaultChecked: true },
                  { label: 'Log all admin actions (Audit Trail)', defaultChecked: true },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <span className="font-medium text-slate-700 dark:text-slate-300">{item.label}</span>
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={item.defaultChecked} className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-800">
                <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                  <Save size={16} /> Save Changes
                </Button>
              </div>
            </div>
          )}

          {activeSection === 'EMAIL' && (
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 animate-in fade-in space-y-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Email / SMTP Configuration</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>SMTP Host</Label>
                  <Input defaultValue="smtp.sendgrid.net" />
                </div>
                <div className="space-y-2">
                  <Label>SMTP Port</Label>
                  <Input defaultValue="587" />
                </div>
                <div className="space-y-2">
                  <Label>SMTP Username</Label>
                  <Input defaultValue="apikey" />
                </div>
                <div className="space-y-2">
                  <Label>SMTP Password / API Key</Label>
                  <Input type="password" defaultValue="SG.xxxxxxxxxxxxxx" />
                </div>
                <div className="space-y-2">
                  <Label>From Email</Label>
                  <Input defaultValue="noreply@travelbooking.com" />
                </div>
                <div className="space-y-2">
                  <Label>From Name</Label>
                  <Input defaultValue="TravelBooking" />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
                <Button variant="outline">Send Test Email</Button>
                <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                  <Save size={16} /> Save Changes
                </Button>
              </div>
            </div>
          )}

          {activeSection === 'DATABASE' && (
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 animate-in fade-in space-y-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Database & Infrastructure</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="font-medium text-slate-700 dark:text-slate-300">PostgreSQL Status</span>
                  <span className="text-sm font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">Connected</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="font-medium text-slate-700 dark:text-slate-300">Database Size</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">2.4 GB</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="font-medium text-slate-700 dark:text-slate-300">Redis Cache Status</span>
                  <span className="text-sm font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">Connected</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="font-medium text-slate-700 dark:text-slate-300">Last Backup</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">2026-07-25 02:00 IST</span>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
                <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">Flush Cache</Button>
                <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                  <Database size={16} /> Trigger Backup
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
