import React from 'react';
import { Building2, Target, BarChart2, TrendingUp, Link as LinkIcon, CheckCircle2, AlertTriangle, Lightbulb, ShieldAlert, Phone, Mail, Globe, MapPin, Briefcase, BadgeCheck, Search, Users } from 'lucide-react';

export const CompanyOverviewCard = ({ data }) => {
  if (!data) return null;
  return (
    <div className="mt-4 bg-white/60 backdrop-blur-md border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 border-b border-gray-100 flex items-center gap-2">
        <Building2 className="w-5 h-5 text-blue-600" />
        <h4 className="font-semibold text-gray-800 m-0">Company Overview</h4>
      </div>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
        <div><strong className="text-gray-900 block mb-1 text-xs uppercase tracking-wider text-gray-500">Founded</strong>{data.founded || 'N/A'}</div>
        <div><strong className="text-gray-900 block mb-1 text-xs uppercase tracking-wider text-gray-500">Headquarters</strong>{data.headquarters || 'N/A'}</div>
        <div><strong className="text-gray-900 block mb-1 text-xs uppercase tracking-wider text-gray-500">Industry</strong>{data.industry || 'N/A'}</div>
        <div><strong className="text-gray-900 block mb-1 text-xs uppercase tracking-wider text-gray-500">Website</strong>{data.website ? <a href={`https://${data.website.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">{data.website}</a> : 'N/A'}</div>
        <div className="sm:col-span-2"><strong className="text-gray-900 block mb-1 text-xs uppercase tracking-wider text-gray-500">Key Products/Services</strong>{data.products || 'N/A'}</div>
      </div>
    </div>
  );
};

export const SWOTCard = ({ data }) => {
  if (!data) return null;
  return (
    <div className="mt-4 bg-white/60 backdrop-blur-md border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="bg-gradient-to-r from-purple-50 to-fuchsia-50 px-4 py-3 border-b border-gray-100 flex items-center gap-2">
        <Target className="w-5 h-5 text-purple-600" />
        <h4 className="font-semibold text-gray-800 m-0">SWOT Analysis</h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
        <div className="p-4 bg-emerald-50/30">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <h5 className="font-semibold text-emerald-800 text-sm">Strengths</h5>
          </div>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{data.strengths}</p>
        </div>
        <div className="p-4 bg-red-50/30">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <h5 className="font-semibold text-red-800 text-sm">Weaknesses</h5>
          </div>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{data.weaknesses}</p>
        </div>
        <div className="p-4 bg-blue-50/30 border-t border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-blue-600" />
            <h5 className="font-semibold text-blue-800 text-sm">Opportunities</h5>
          </div>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{data.opportunities}</p>
        </div>
        <div className="p-4 bg-orange-50/30 border-t border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert className="w-4 h-4 text-orange-600" />
            <h5 className="font-semibold text-orange-800 text-sm">Threats</h5>
          </div>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{data.threats}</p>
        </div>
      </div>
    </div>
  );
};

export const ComparisonTable = ({ data }) => {
  if (!data || !Array.isArray(data) || data.length === 0) return null;
  return (
    <div className="mt-4 bg-white/60 backdrop-blur-md border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 px-4 py-3 border-b border-gray-100 flex items-center gap-2">
        <BarChart2 className="w-5 h-5 text-orange-600" />
        <h4 className="font-semibold text-gray-800 m-0">Comparison</h4>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs text-gray-600 uppercase bg-gray-50/50 border-b border-gray-200">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold">Feature / Criteria</th>
              <th scope="col" className="px-4 py-3 font-semibold">Entity 1</th>
              <th scope="col" className="px-4 py-3 font-semibold">Entity 2</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50/50">
                <td className="px-4 py-3 font-medium text-gray-900">{item.feature}</td>
                <td className="px-4 py-3">{item.entity1}</td>
                <td className="px-4 py-3">{item.entity2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const MarketMetricsCard = ({ data }) => {
  if (!data) return null;
  return (
    <div className="mt-4 bg-white/60 backdrop-blur-md border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-3 border-b border-gray-100 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-emerald-600" />
        <h4 className="font-semibold text-gray-800 m-0">Market Metrics</h4>
      </div>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
        <div><strong className="text-gray-900 block mb-1 text-xs uppercase tracking-wider text-gray-500">Market Size</strong>{data.market_size || 'N/A'}</div>
        <div><strong className="text-gray-900 block mb-1 text-xs uppercase tracking-wider text-gray-500">Growth Rate</strong>{data.growth_rate || 'N/A'}</div>
        <div className="sm:col-span-2"><strong className="text-gray-900 block mb-1 text-xs uppercase tracking-wider text-gray-500">Major Competitors</strong>{data.competitors || 'N/A'}</div>
        <div className="sm:col-span-2"><strong className="text-gray-900 block mb-1 text-xs uppercase tracking-wider text-gray-500">Trends</strong>{data.trends || 'N/A'}</div>
      </div>
    </div>
  );
};

export const SourcesCard = ({ data }) => {
  if (!data || !Array.isArray(data) || data.length === 0) return null;
  return (
    <div className="mt-4 bg-gray-50/80 backdrop-blur-md border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
        <LinkIcon className="w-4 h-4 text-gray-500" />
        <h4 className="font-semibold text-gray-700 m-0 text-sm">Sources</h4>
      </div>
      <ul className="p-4 m-0 list-none space-y-2">
        {data.map((src, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm">
            <span className="text-gray-400 mt-0.5">•</span>
            {src.url ? (
              <a href={src.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline break-all">
                {src.name || src.url}
              </a>
            ) : (
              <span className="text-gray-600">{src.name}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const CompanyContactCard = ({ data }) => {
  if (!data) return null;
  
  const getConfidenceColor = (conf) => {
    if (!conf) return 'bg-gray-100 text-gray-700 border-gray-200';
    const lower = conf.toLowerCase();
    if (lower.includes('high')) return 'bg-green-100 text-green-800 border-green-200';
    if (lower.includes('medium')) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    if (lower.includes('low')) return 'bg-orange-100 text-orange-800 border-orange-200';
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const renderValue = (val, type = 'text') => {
    if (!val || val.toLowerCase().includes('not publicly available')) {
      return <span className="text-gray-400 italic">Not publicly available</span>;
    }
    
    if (type === 'link') {
      const href = val.startsWith('http') ? val : `https://${val}`;
      return <a href={href} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline break-all">{val}</a>;
    }
    
    if (type === 'email') {
      return <a href={`mailto:${val}`} className="text-blue-600 hover:underline break-all">{val}</a>;
    }
    
    if (type === 'phone') {
      return <a href={`tel:${val}`} className="text-blue-600 hover:underline">{val}</a>;
    }
    
    return val;
  };

  return (
    <div className="mt-4 bg-white/70 backdrop-blur-xl border border-white/60 rounded-[1.5rem] overflow-hidden shadow-[0_8px_32px_0_rgba(31,38,135,0.05)]">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-4 flex items-center justify-between relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-white text-base tracking-wide m-0">{data.company_name || 'Company Contacts'}</h4>
            <p className="text-blue-100 text-xs font-medium mt-0.5">Contact Intelligence Report</p>
          </div>
        </div>
        
        {data.confidence && (
          <div className={`relative z-10 px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 shadow-sm ${getConfidenceColor(data.confidence)}`}>
            <BadgeCheck className="w-3.5 h-3.5" />
            {data.confidence} Confidence
          </div>
        )}
      </div>

      {/* Grid Content */}
      <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-black/[0.02] transition-colors">
          <Globe className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-wider font-bold text-gray-500 mb-1">Website</p>
            <p className="text-sm font-medium text-gray-900">{renderValue(data.website, 'link')}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-black/[0.02] transition-colors">
          <MapPin className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-wider font-bold text-gray-500 mb-1">Location</p>
            <p className="text-sm font-medium text-gray-900 line-clamp-2">{renderValue(data.location)}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-black/[0.02] transition-colors">
          <Phone className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-wider font-bold text-gray-500 mb-1">Public Phone</p>
            <p className="text-sm font-medium text-gray-900">{renderValue(data.phone, 'phone')}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-black/[0.02] transition-colors">
          <Mail className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-wider font-bold text-gray-500 mb-1">Public Email</p>
            <p className="text-sm font-medium text-gray-900">{renderValue(data.email, 'email')}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-black/[0.02] transition-colors">
          <Search className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-wider font-bold text-gray-500 mb-1">Contact Page</p>
            <p className="text-sm font-medium text-gray-900">{renderValue(data.contact_page, 'link')}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-black/[0.02] transition-colors">
          <Briefcase className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-wider font-bold text-gray-500 mb-1">LinkedIn</p>
            <p className="text-sm font-medium text-gray-900">{renderValue(data.linkedin, 'link')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
