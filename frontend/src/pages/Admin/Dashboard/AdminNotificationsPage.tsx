import { useState } from 'react';
import { Bell, Send, Users, Plane, Bus, Train, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const NOTIFICATION_LOG = [
  { id: 'NTF-301', title: 'Flash Sale: 50% Off Flights!', channel: 'PUSH', audience: 'ALL_USERS', sentAt: '2026-07-25 10:30', delivered: 12400, opened: 3200, status: 'DELIVERED' },
  { id: 'NTF-300', title: 'Booking Confirmed #BUS-1029', channel: 'SMS', audience: 'INDIVIDUAL', sentAt: '2026-07-24 18:45', delivered: 1, opened: 1, status: 'DELIVERED' },
  { id: 'NTF-299', title: 'Train Delay Alert: Rajdhani Exp', channel: 'PUSH', audience: 'SEGMENT', sentAt: '2026-07-24 14:00', delivered: 890, opened: 650, status: 'DELIVERED' },
  { id: 'NTF-298', title: 'Your Refund Has Been Processed', channel: 'EMAIL', audience: 'INDIVIDUAL', sentAt: '2026-07-23 09:15', delivered: 1, opened: 0, status: 'PENDING' },
];

export default function AdminNotificationsPage() {
  const [isComposing, setIsComposing] = useState(false);
  const [channel, setChannel] = useState('PUSH');
  const [audience, setAudience] = useState('ALL_USERS');

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Notifications Center</h1>
          <p className="text-slate-500">Send push notifications, SMS, and email campaigns.</p>
        </div>
        <Button onClick={() => setIsComposing(!isComposing)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
          <Send size={16} /> Compose Notification
        </Button>
      </div>

      {/* Compose Panel */}
      {isComposing && (
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-blue-200 dark:border-blue-800 animate-in fade-in slide-in-from-top-4">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Bell size={18} className="text-blue-600" /> New Notification
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input placeholder="Notification headline..." />
            </div>
            <div className="space-y-2">
              <Label>Channel</Label>
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                className="flex h-10 w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm dark:border-slate-800"
              >
                <option value="PUSH">Push Notification (FCM)</option>
                <option value="SMS">SMS (Twilio)</option>
                <option value="EMAIL">Email</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Audience</Label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="flex h-10 w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm dark:border-slate-800"
              >
                <option value="ALL_USERS">All Users</option>
                <option value="BUS_USERS">Bus Travelers</option>
                <option value="TRAIN_USERS">Train Travelers</option>
                <option value="FLIGHT_USERS">Flight Travelers</option>
                <option value="INDIVIDUAL">Individual User (by ID)</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Body</Label>
              <textarea
                placeholder="Notification message..."
                rows={3}
                className="flex w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm dark:border-slate-800 resize-none"
              />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setIsComposing(false)}>Cancel</Button>
            <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
              <Send size={14} /> Send Now
            </Button>
          </div>
        </div>
      )}

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <p className="text-3xl font-bold text-slate-900 dark:text-white">13,291</p>
          <p className="text-xs font-semibold text-slate-500 mt-1">Total Sent (MTD)</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <p className="text-3xl font-bold text-green-600">89.2%</p>
          <p className="text-xs font-semibold text-slate-500 mt-1">Delivery Rate</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <p className="text-3xl font-bold text-blue-600">31.4%</p>
          <p className="text-xs font-semibold text-slate-500 mt-1">Open Rate</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <p className="text-3xl font-bold text-orange-500">3</p>
          <p className="text-xs font-semibold text-slate-500 mt-1">Failed</p>
        </div>
      </div>

      {/* Log Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
          <h3 className="font-bold text-slate-900 dark:text-white">Notification History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-4 font-semibold">ID</th>
                <th className="p-4 font-semibold">Title</th>
                <th className="p-4 font-semibold">Channel</th>
                <th className="p-4 font-semibold">Audience</th>
                <th className="p-4 font-semibold">Delivered</th>
                <th className="p-4 font-semibold">Opened</th>
                <th className="p-4 font-semibold">Sent At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {NOTIFICATION_LOG.map(ntf => (
                <tr key={ntf.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-mono text-sm font-semibold text-slate-900 dark:text-white">{ntf.id}</td>
                  <td className="p-4 text-sm font-medium text-slate-900 dark:text-white max-w-xs truncate">{ntf.title}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${
                      ntf.channel === 'PUSH' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                      ntf.channel === 'SMS' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
                      'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                      {ntf.channel}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-300">{ntf.audience}</td>
                  <td className="p-4 text-sm font-bold text-slate-900 dark:text-white">{ntf.delivered.toLocaleString()}</td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-300">{ntf.opened.toLocaleString()}</td>
                  <td className="p-4 text-sm text-slate-500 flex items-center gap-1"><Clock size={14} /> {ntf.sentAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
