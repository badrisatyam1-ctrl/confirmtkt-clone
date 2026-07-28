import { Bell, Info, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MOCK_NOTIFICATIONS = [
  { id: 'N-1', type: 'ALERT', title: 'Trip TRP-101 is delayed', message: 'The bus KA-01-AB-1234 reported a delay of 45 mins due to traffic.', time: '10 mins ago', read: false },
  { id: 'N-2', type: 'SUCCESS', title: 'Payout Processed', message: 'Your payout of ₹9,90,000 for June 2026 has been credited to your bank account.', time: '2 hours ago', read: false },
  { id: 'N-3', type: 'INFO', title: 'New Route Added', message: 'Your route request for Delhi → Jaipur has been approved by the admin.', time: '1 day ago', read: true },
  { id: 'N-4', type: 'WARNING', title: 'Maintenance Due', message: 'Bus MH-12-EF-9012 is due for its scheduled maintenance on 30 Jul 2026.', time: '2 days ago', read: true },
  { id: 'N-5', type: 'SUCCESS', title: 'Driver KYC Approved', message: 'Driver Vikram Singh has been successfully verified.', time: '5 days ago', read: true },
];

export default function OperatorNotificationsPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Notifications</h1>
          <p className="text-slate-500">Alerts, updates, and messages regarding your fleet.</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <CheckCircle2 size={16} /> Mark all as read
        </Button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {MOCK_NOTIFICATIONS.map(notification => (
            <div 
              key={notification.id} 
              className={`p-6 flex gap-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 ${notification.read ? 'opacity-70' : 'bg-blue-50/50 dark:bg-blue-900/10'}`}
            >
              <div className="flex-shrink-0 mt-1">
                {notification.type === 'SUCCESS' && <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><CheckCircle2 size={20} /></div>}
                {notification.type === 'ALERT' && <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center"><AlertTriangle size={20} /></div>}
                {notification.type === 'WARNING' && <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center"><AlertTriangle size={20} /></div>}
                {notification.type === 'INFO' && <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"><Info size={20} /></div>}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className={`font-semibold text-slate-900 dark:text-white ${!notification.read ? 'font-bold' : ''}`}>
                    {notification.title}
                  </h3>
                  <span className="text-xs font-medium text-slate-500 whitespace-nowrap ml-4">
                    {notification.time}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {notification.message}
                </p>
              </div>
              {!notification.read && (
                <div className="flex-shrink-0 flex items-center justify-center px-2">
                  <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
