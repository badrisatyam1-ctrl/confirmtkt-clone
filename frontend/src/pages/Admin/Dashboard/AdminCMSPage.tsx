import { useState } from 'react';
import { FileText, Plus, Edit, Trash2, Eye, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const MOCK_PAGES = [
  { id: 'CMS-01', title: 'About Us', slug: '/about', status: 'PUBLISHED', updatedAt: '2026-07-20' },
  { id: 'CMS-02', title: 'Terms & Conditions', slug: '/terms', status: 'PUBLISHED', updatedAt: '2026-06-15' },
  { id: 'CMS-03', title: 'Privacy Policy', slug: '/privacy', status: 'PUBLISHED', updatedAt: '2026-06-15' },
  { id: 'CMS-04', title: 'Refund Policy', slug: '/refund-policy', status: 'PUBLISHED', updatedAt: '2026-05-10' },
  { id: 'CMS-05', title: 'Careers', slug: '/careers', status: 'DRAFT', updatedAt: '2026-07-24' },
];

const MOCK_BANNERS = [
  { id: 'BNR-01', title: 'Summer Sale Banner', placement: 'HOME_HERO', status: 'ACTIVE', impressions: 45200 },
  { id: 'BNR-02', title: 'Monsoon Offer Strip', placement: 'HOME_OFFERS', status: 'ACTIVE', impressions: 32100 },
  { id: 'BNR-03', title: 'Diwali Flash Sale', placement: 'HOME_HERO', status: 'SCHEDULED', impressions: 0 },
];

export default function AdminCMSPage() {
  const [activeTab, setActiveTab] = useState<'PAGES' | 'BANNERS'>('PAGES');

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Content Management</h1>
          <p className="text-slate-500">Manage static pages, banners, and promotional content.</p>
        </div>
        <div className="flex gap-2">
          <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
            {(['PAGES', 'BANNERS'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors ${activeTab === tab ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500'}`}
              >
                {tab.charAt(0) + tab.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
          <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
            <Plus size={16} /> New {activeTab === 'PAGES' ? 'Page' : 'Banner'}
          </Button>
        </div>
      </div>

      {/* Pages Tab */}
      {activeTab === 'PAGES' && (
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-4 font-semibold">Page Title</th>
                  <th className="p-4 font-semibold">Slug</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold">Last Updated</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {MOCK_PAGES.map(page => (
                  <tr key={page.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <FileText size={18} className="text-slate-400" />
                        <span className="font-semibold text-slate-900 dark:text-white">{page.title}</span>
                      </div>
                    </td>
                    <td className="p-4 font-mono text-sm text-blue-600 dark:text-blue-400">{page.slug}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${
                        page.status === 'PUBLISHED' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                      }`}>
                        {page.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-slate-500">{page.updatedAt}</td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30">
                          <Eye size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800">
                          <Edit size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30">
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Banners Tab */}
      {activeTab === 'BANNERS' && (
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-4 font-semibold">Banner</th>
                  <th className="p-4 font-semibold">Placement</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold">Impressions</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {MOCK_BANNERS.map(banner => (
                  <tr key={banner.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                          IMG
                        </div>
                        <span className="font-semibold text-slate-900 dark:text-white">{banner.title}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-slate-600 dark:text-slate-300">{banner.placement}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${
                        banner.status === 'ACTIVE' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                      }`}>
                        {banner.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm font-bold text-slate-900 dark:text-white">{banner.impressions.toLocaleString()}</td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800">
                          <Edit size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30">
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
