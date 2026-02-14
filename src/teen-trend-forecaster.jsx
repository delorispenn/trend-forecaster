import React, { useState, useEffect } from 'react';
import { Download, Sun, Cloud, Snowflake, Flower2 } from 'lucide-react';

const TrendForecaster = () => {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAudience, setSelectedAudience] = useState('teen-girls');
  const [selectedSeason, setSelectedSeason] = useState('summer-2026');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const seasons = [
    { id: 'summer-2026', name: 'Summer 2026', icon: Sun, months: 'May - Aug' },
    { id: 'fall-2026', name: 'Fall 2026', icon: Cloud, months: 'Sep - Nov' },
    { id: 'winter-2026', name: 'Winter 2026/27', icon: Snowflake, months: 'Dec - Feb' },
    { id: 'spring-2027', name: 'Spring 2027', icon: Flower2, months: 'Mar - Apr' }
  ];

  const audiences = {
    'teen-girls': {
      name: 'Teen Girls (13-17)',
      description: 'Fashion & beauty trends for Josie\'s Journal audience',
      categories: [
        { id: 'tops', name: 'Tops & Shirts', description: 'T-shirts, crop tops, blouses, hoodies' },
        { id: 'bottoms', name: 'Bottoms & Pants', description: 'Jeans, skirts, shorts, leggings' },
        { id: 'shoes', name: 'Shoes', description: 'Sneakers, boots, sandals' },
        { id: 'accessories', name: 'Accessories', description: 'Jewelry, bags, phone cases, hair accessories' },
        { id: 'beauty', name: 'Beauty & Makeup', description: 'Skincare, makeup products, trends' },
      ]
    },
    'moms': {
      name: 'Millennial Moms (30-50)',
      description: 'Topics & challenges for Mom Dashboard users',
      categories: [
        { id: 'mental-load', name: 'Mental Load', description: 'Invisible labor, decision fatigue, overwhelm' },
        { id: 'time-management', name: 'Time Management', description: 'Productivity, scheduling, balance' },
        { id: 'self-care', name: 'Self-Care', description: 'Burnout prevention, wellness, boundaries' },
        { id: 'parenting', name: 'Parenting', description: 'Age-specific challenges, behavior, development' },
        { id: 'organization', name: 'Home Organization', description: 'Decluttering, systems, routines' },
      ]
    }
  };

  useEffect(() => {
    setTrends([]);
    setSelectedCategory(null);
  }, [selectedSeason, selectedAudience]);

  const analyzeTrends = async () => {
    if (!selectedCategory) {
      alert('Please select a category first');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('/.netlify/functions/analyze-trends', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audience: selectedAudience,
          season: selectedSeason,
          category: selectedCategory
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message || data.error);
      }
      
      const trendsJson = extractJsonFromResponse(data.content[0].text);
      setTrends(trendsJson);
      
      localStorage.setItem('josies-trends', JSON.stringify(trendsJson));
      localStorage.setItem('josies-trends-timestamp', Date.now());
      
    } catch (error) {
      console.error('Error analyzing trends:', error);
      alert(`Error analyzing trends: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const extractJsonFromResponse = (text) => {
    try {
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return JSON.parse(text);
    } catch (e) {
      console.error('Failed to parse JSON:', e);
      return [];
    }
  };

  const exportToCSV = () => {
    if (trends.length === 0) return;
    
    const headers = ['Trend', 'Category', 'Momentum', 'Confidence', 'Age Group', 'Content Opportunity'];
    const rows = trends.map(t => [
      t.trend,
      t.category,
      t.momentum,
      t.confidence,
      t.ageGroup,
      t.contentOpportunity
    ]);
    
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trends-${selectedAudience}-${selectedCategory}-${selectedSeason}.csv`;
    a.click();
  };

  const getMomentumIcon = (momentum) => {
    switch(momentum) {
      case 'rising': return '↗';
      case 'peak': return '●';
      case 'emerging': return '◆';
      case 'steady': return '→';
      default: return '→';
    }
  };

  const getMomentumColor = (momentum) => {
    switch(momentum) {
      case 'rising': return 'text-emerald-700 bg-emerald-50';
      case 'peak': return 'text-amber-700 bg-amber-50';
      case 'emerging': return 'text-blue-700 bg-blue-50';
      case 'steady': return 'text-gray-700 bg-gray-50';
      default: return 'text-gray-700 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfdfd] p-6 md:p-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap');
        
        * { box-sizing: border-box; }
        body { font-family: 'Montserrat', sans-serif; margin: 0; padding: 0; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Playfair Display', serif; }
        
        .bg-terracotta { background-color: #cd7f77 !important; }
        .hover\\:bg-terracotta-dark:hover { background-color: #b86d65 !important; }
        .text-terracotta { color: #cd7f77 !important; }
        .border-terracotta { border-color: #cd7f77 !important; }
        .bg-cream { background-color: #fdfdfd !important; }
        .bg-cream-accent { background-color: #f9f1f0 !important; }
        .text-charcoal { color: #373737 !important; }
        .text-gray-light { color: #888888 !important; }
        .border-tan { border-color: #e0e0e0 !important; }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#373737] mb-2 font-playfair">
                Josie's Journal Content Trend Forecaster
              </h1>
              <p className="text-[#888888] font-medium">
                AI-powered trend intelligence for content planning
              </p>
            </div>
            {trends.length > 0 && (
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 bg-[#cd7f77] text-white px-5 py-2.5 rounded-lg hover:bg-[#b86d65] transition font-semibold text-sm"
              >
                <Download className="w-4 h-4" />
                Export Report
              </button>
            )}
          </div>

          {/* Season Selector - STEP 1 */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-[#e0e0e0] mb-6">
            <h3 className="text-lg font-semibold text-[#373737] font-playfair mb-4">
              Step 1: Select Season (3+ Months Ahead)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {seasons.map(season => {
                const Icon = season.icon;
                return (
                  <button
                    key={season.id}
                    onClick={() => setSelectedSeason(season.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition ${
                      selectedSeason === season.id
                        ? 'bg-[#cd7f77] text-white border-[#cd7f77]'
                        : 'bg-white text-[#373737] border-[#e0e0e0] hover:border-[#cd7f77]'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    <div className="text-center">
                      <div className="font-semibold text-sm">{season.name}</div>
                      <div className={`text-xs ${selectedSeason === season.id ? 'text-white/80' : 'text-[#888888]'}`}>
                        {season.months}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Audience Selection - STEP 2 */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-[#e0e0e0] mb-6">
            <h3 className="text-lg font-semibold text-[#373737] font-playfair mb-4">
              Step 2: Select Audience
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(audiences).map(([key, audience]) => (
                <button
                  key={key}
                  onClick={() => setSelectedAudience(key)}
                  className={`p-4 rounded-lg border-2 transition text-left ${
                    selectedAudience === key
                      ? 'bg-[#cd7f77] text-white border-[#cd7f77]'
                      : 'bg-white text-[#373737] border-[#e0e0e0] hover:border-[#cd7f77]'
                  }`}
                >
                  <div className="font-semibold text-lg mb-1">{audience.name}</div>
                  <div className={`text-sm ${selectedAudience === key ? 'text-white/80' : 'text-[#888888]'}`}>
                    {audience.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Category Selection - STEP 3 */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-[#e0e0e0] mb-6">
            <h3 className="text-lg font-semibold text-[#373737] font-playfair mb-4">
              Step 3: Select Category to Analyze
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {audiences[selectedAudience].categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 rounded-lg border-2 transition text-left ${
                    selectedCategory === category.id
                      ? 'bg-[#cd7f77] text-white border-[#cd7f77]'
                      : 'bg-white text-[#373737] border-[#e0e0e0] hover:border-[#cd7f77]'
                  }`}
                >
                  <div className="font-semibold mb-1">{category.name}</div>
                  <div className={`text-xs ${selectedCategory === category.id ? 'text-white/80' : 'text-[#888888]'}`}>
                    {category.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Analyze Button */}
          {selectedCategory && (
            <div className="text-center">
              <button
                onClick={analyzeTrends}
                disabled={loading}
                className="bg-[#cd7f77] text-white px-8 py-3 rounded-lg hover:bg-[#b86d65] transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Analyzing...' : `Analyze ${audiences[selectedAudience].categories.find(c => c.id === selectedCategory)?.name}`}
              </button>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#e0e0e0] border-t-[#cd7f77]"></div>
            <p className="mt-4 text-[#888888]">Analyzing trends... This may take up to 60 seconds</p>
          </div>
        )}

        {/* Results */}
        {trends.length > 0 && !loading && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#373737] font-playfair">
              {trends.length} Trends for {audiences[selectedAudience].name} - {seasons.find(s => s.id === selectedSeason)?.name}
            </h2>

            {trends.map((trend, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6 border border-[#e0e0e0]">
                {/* Trend Header */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-2xl font-semibold text-[#373737] font-playfair">
                        {trend.trend}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getMomentumColor(trend.momentum)}`}>
                        {getMomentumIcon(trend.momentum)} {trend.momentum}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[#888888] flex-wrap">
                      <span className="capitalize font-medium">{trend.category}</span>
                      {trend.ageGroup && (
                        <>
                          <span>•</span>
                          <span>{trend.ageGroup}</span>
                        </>
                      )}
                      {trend.platforms && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1.5 flex-wrap">
                            {trend.platforms.map((platform, i) => (
                              <span key={i} className="bg-[#f9f1f0] px-2.5 py-0.5 rounded text-[#373737] font-medium">
                                {platform}
                              </span>
                            ))}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-4xl font-bold text-[#cd7f77] font-playfair">{trend.confidence}%</div>
                    <div className="text-xs text-[#888888] font-medium">Confidence</div>
                  </div>
                </div>

                {/* Trend Details */}
                {trend.keyPieces && (
                  <div className="mb-5 bg-[#f9f1f0] rounded-lg p-4">
                    <h4 className="font-semibold text-[#373737] mb-2 text-sm">Key Items</h4>
                    <ul className="space-y-1">
                      {trend.keyPieces.map((piece, i) => (
                        <li key={i} className="text-sm text-[#373737] flex items-start">
                          <span className="text-[#cd7f77] mr-2">•</span>
                          {piece}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Signals */}
                {trend.signals && (
                  <div className="mb-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                    <h4 className="font-semibold text-[#373737] mb-2 text-sm">Trend Signals</h4>
                    <ul className="space-y-1.5">
                      {trend.signals.map((signal, i) => (
                        <li key={i} className="text-sm text-[#373737] flex items-start">
                          <span className="text-blue-600 mr-2">▸</span>
                          {signal}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Why Now */}
                {trend.whyNow && (
                  <div className="mb-5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-100">
                    <h4 className="font-semibold text-[#373737] mb-2 text-sm">Why Create Content Now</h4>
                    <p className="text-sm text-[#373737] font-medium">{trend.whyNow}</p>
                  </div>
                )}

                {/* Insight */}
                {trend.josiesInsight && (
                  <div className="mb-5 bg-gradient-to-br from-[#f9f1f0] to-[#e0e0e0] rounded-lg p-4 border-l-4 border-[#cd7f77]">
                    <h4 className="font-semibold text-[#373737] mb-2 text-sm">Why This Matters</h4>
                    <p className="text-sm text-[#373737]">{trend.josiesInsight}</p>
                  </div>
                )}

                {/* Content Opportunity */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-semibold text-[#373737]">Content Opportunity Score</span>
                      <span className="text-sm font-bold text-[#cd7f77]">{trend.contentOpportunity}/100</span>
                    </div>
                    <div className="w-full bg-[#e0e0e0] rounded-full h-2.5">
                      <div 
                        className="bg-[#cd7f77] h-2.5 rounded-full transition-all" 
                        style={{ width: `${trend.contentOpportunity}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Content Ideas */}
                {trend.suggestedContent && (
                  <div>
                    <h4 className="font-semibold text-[#373737] mb-3 text-sm">Content Ideas Ready to Create</h4>
                    <div className="grid gap-2">
                      {trend.suggestedContent.map((idea, i) => (
                        <div key={i} className="flex items-start gap-3 bg-[#fdfdfd] rounded-lg p-3 border border-[#e0e0e0] hover:border-[#cd7f77] transition">
                          <span className="text-[#cd7f77] font-bold text-sm min-w-[24px]">{i + 1}.</span>
                          <span className="text-[#373737] text-sm font-medium">{idea}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendForecaster;
