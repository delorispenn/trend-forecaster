import React, { useState, useEffect } from 'react';
import { TrendingUp, Sparkles, ShoppingBag, Calendar, Download, Shirt, Package, Sun, Cloud, Snowflake, Flower2 } from 'lucide-react';

export default function TeenTrendForecaster() {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSeason, setSelectedSeason] = useState('summer-2026');
  const [weekOf, setWeekOf] = useState(new Date().toISOString().split('T')[0]);

  const seasons = [
    { id: 'summer-2026', name: 'Summer 2026', icon: Sun, months: 'May - Aug' },
    { id: 'fall-2026', name: 'Fall 2026', icon: Cloud, months: 'Sep - Nov' },
    { id: 'winter-2026', name: 'Winter 2026/27', icon: Snowflake, months: 'Dec - Feb' },
    { id: 'spring-2027', name: 'Spring 2027', icon: Flower2, months: 'Mar - Apr' }
  ];

  const categories = [
    { id: 'all', name: 'All Trends', icon: Sparkles },
    { id: 'fashion', name: 'Fashion Styles', icon: Shirt },
    { id: 'products', name: 'Trending Products', icon: Package }
  ];

  // Sample trends for Summer 2026 - 3 months ahead
  const sampleTrends = {
    'summer-2026': {
      fashion: [
        {
          id: 1,
          category: 'fashion',
          trend: 'Tenniscore Maximalism',
          season: 'summer-2026',
          momentum: 'emerging',
          confidence: 82,
          ageGroup: 'teen (13-17)',
          platforms: ['TikTok', 'Pinterest'],
          keyPieces: [
            'White pleated tennis skirts',
            'Striped polo shirts (oversized)',
            'Low-top sneakers with colored stripes',
            'Cable knit vests',
            'Terry cloth accessories'
          ],
          colorPalette: ['White', 'Navy', 'Kelly Green', 'Tennis Ball Yellow'],
          pricePoints: {
            budget: '$15-40 (Shein, thrifted vintage)',
            mid: '$40-100 (Princess Polly, Urban Outfitters)',
            splurge: '$100+ (Tory Burch, Lacoste)'
          },
          signals: [
            'Pinterest searches for "tenniscore aesthetic" up 420% for spring/summer',
            'Zara and H&M launching tennis-inspired collections for June',
            'TikTok #tenniscore projected to hit 50M views by May'
          ],
          contentOpportunity: 94,
          josiesInsight: 'This is preppy rebellion - teens taking country club aesthetics and making them playful and accessible. Unlike Coastal Grandmother which was about sophistication, this is about fun and nostalgia for a sport most teens don\'t actually play. Strong visual potential for styling content.',
          suggestedContent: [
            'How to Style Tenniscore When You Don\'t Play Tennis',
            'Thrift Store Tenniscore: Finding Vintage Tennis Pieces',
            'Tenniscore vs Clean Girl: Which Summer Aesthetic Are You?',
            'DIY: Turn Any White Skirt Into a Tennis Skirt'
          ],
          whyNow: 'Early signals indicate this will peak in June-July as teens plan summer wardrobes. Create content NOW before it saturates.'
        },
        {
          id: 2,
          category: 'fashion',
          trend: 'Mermaidcore Maximalism',
          season: 'summer-2026',
          momentum: 'rising',
          confidence: 88,
          ageGroup: 'both (11-17)',
          platforms: ['TikTok', 'Pinterest', 'Instagram'],
          keyPieces: [
            'Iridescent fabrics (especially skirts)',
            'Shell jewelry and hair accessories',
            'Pearl details on everything',
            'Holographic swimwear',
            'Sheer overlay pieces in ocean colors'
          ],
          colorPalette: ['Seafoam Green', 'Pearl White', 'Coral Pink', 'Ocean Blue', 'Iridescent'],
          pricePoints: {
            budget: '$10-35 (Amazon, Forever 21)',
            mid: '$35-85 (Aerie, Hollister)',
            splurge: '$85+ (Free People, For Love & Lemons)'
          },
          signals: [
            'Disney\'s Little Mermaid live-action released last year - trend has 18-month lag',
            'Etsy searches for "mermaid jewelry" up 290% year-over-year',
            'TikTok mermaid makeup tutorials gaining 10M+ views',
            'Major retailers adding "ocean-inspired" summer collections'
          ],
          contentOpportunity: 91,
          josiesInsight: 'This hits the sweet spot of fantasy and wearability. Unlike costume-y trends, mermaidcore can be subtle (shell necklace) or full commitment (iridescent skirt). Appeals to both tween and teen audiences - tweens love the fantasy, teens love the aesthetic photos.',
          suggestedContent: [
            'Mermaidcore on a Budget: Amazon Finds Under $25',
            'How to Wear Mermaidcore Without Looking Like a Costume',
            'Beach Day Mermaidcore: Swimwear & Accessories Guide',
            'DIY Mermaid Hair: Waves, Braids, and Shell Accessories'
          ],
          whyNow: 'Searches spike in April/May as teens plan summer looks. Get ahead now for maximum reach.'
        }
      ],
      products: [
        {
          id: 3,
          category: 'products',
          trend: 'Strawberry Beauty Everything',
          season: 'summer-2026',
          momentum: 'peak',
          confidence: 92,
          ageGroup: 'both (11-17)',
          platforms: ['TikTok', 'Instagram'],
          specificProducts: [
            {
              item: 'Strawberry lip glosses & tints',
              brands: 'Glossier, Tower 28, Drunk Elephant',
              priceRange: '$15-24',
              availability: 'Already trending, will peak June-July'
            },
            {
              item: 'Strawberry milk nails (pink & white swirl)',
              brands: 'Olive & June, Press-On from Target',
              priceRange: '$8-16',
              availability: 'DIY kits available now'
            },
            {
              item: 'Strawberry skincare (scented)',
              brands: 'Glow Recipe, The Ordinary',
              priceRange: '$12-42',
              availability: 'Widely available'
            },
            {
              item: 'Strawberry print clothing',
              brands: 'Shein, Urban Outfitters, Brandy Melville',
              priceRange: '$18-55',
              availability: 'New collections launching April/May'
            }
          ],
          signals: [
            'TikTok #strawberrygirl hashtag at 45M views and climbing',
            'Sephora reports 380% increase in strawberry-scented product searches',
            'Google Trends shows "strawberry nails" up 520% since January',
            'Major influencers (Alix Earle, Emma Chamberlain) posting strawberry content'
          ],
          contentOpportunity: 96,
          josiesInsight: 'This is the ultimate "girl" aesthetic - sweet, pink, nostalgic. It\'s low-commitment (just buy a lip gloss) but highly shareable. Appeals across age ranges because tweens love the cuteness while teens love the retro 2000s vibes. Strong affiliate opportunity.',
          suggestedContent: [
            'Complete Strawberry Girl Starter Pack (Under $50)',
            'Strawberry Makeup Look: Step-by-Step Tutorial',
            'Best Strawberry Beauty Products: Tested & Reviewed',
            'Why Everyone Is Obsessed With Strawberries Right Now'
          ],
          whyNow: 'This trend is peaking NOW and will dominate through July. Create content immediately for maximum engagement.',
          shoppingLinks: 'High affiliate potential - Sephora, Ulta, Amazon all carrying strawberry products'
        },
        {
          id: 4,
          category: 'products',
          trend: 'Claw Clips (The Comeback)',
          season: 'summer-2026',
          momentum: 'rising',
          confidence: 85,
          ageGroup: 'teen (13-17)',
          platforms: ['TikTok', 'Pinterest'],
          specificProducts: [
            {
              item: 'Oversized acetate claw clips',
              brands: 'Emi Jay, Kitsch, Amazon dupes',
              priceRange: '$6-18',
              availability: 'Mass market saturation'
            },
            {
              item: 'Pearl & crystal embellished claws',
              brands: 'Urban Outfitters, Anthropologie',
              priceRange: '$12-28',
              availability: 'Boutique/specialty stores'
            },
            {
              item: 'Mini claw clip sets (for braids)',
              brands: 'Target, Claire\'s',
              priceRange: '$8-15',
              availability: 'Everywhere'
            }
          ],
          signals: [
            'TikTok claw clip tutorials gaining 50M+ views',
            'Google Shopping data shows 600% increase in claw clip searches',
            'Retailers like Target expanding claw clip sections',
            'Fashion Week SS25 showed models wearing decorative claws'
          ],
          contentOpportunity: 87,
          josiesInsight: 'Claw clips are having a genuine renaissance - they\'re practical (summer heat = hair up), affordable, and give instant 90s/2000s cool girl vibes. This isn\'t just nostalgia for Gen Z parents - teens are discovering them as "new." Strong tutorial content opportunity.',
          suggestedContent: [
            '10 Ways to Style a Claw Clip (Beyond the Basic)',
            'Best Claw Clips for Thick Hair: Tested & Reviewed',
            'Claw Clip Hairstyles for Summer (Heat-Proof)',
            'Amazon vs Expensive: Claw Clip Dupe Test'
          ],
          whyNow: 'Search interest building now, will peak when summer heat hits. Get content up in April/May.',
          shoppingLinks: 'Amazon Associates opportunity - clips are impulse buys under $20'
        },
        {
          id: 5,
          category: 'products',
          trend: 'Water Bottles as Status Symbols',
          season: 'summer-2026',
          momentum: 'steady',
          confidence: 90,
          ageGroup: 'both (11-17)',
          platforms: ['TikTok', 'Instagram'],
          specificProducts: [
            {
              item: 'Stanley Quencher (40oz)',
              brands: 'Stanley (duh)',
              priceRange: '$45',
              availability: 'Limited edition colors sell out instantly'
            },
            {
              item: 'Owala FreeSip',
              brands: 'Owala',
              priceRange: '$28-38',
              availability: 'Target, Amazon - good stock'
            },
            {
              item: 'Hydro Flask with stickers',
              brands: 'Hydro Flask + Redbubble stickers',
              priceRange: '$30-50 (bottle + stickers)',
              availability: 'Widely available'
            }
          ],
          signals: [
            'Stanley reported $750M in sales in 2024 (mostly from Gen Z)',
            'TikTok water bottle collection videos gaining millions of views',
            'Schools reporting "water bottle culture wars" among students',
            'Limited edition Stanley drops selling out in minutes'
          ],
          contentOpportunity: 79,
          josiesInsight: 'Water bottles have become the new sneaker culture for teens - it\'s about collecting, customizing, and displaying. This trend has staying power because it combines function with status. The sticker customization angle is huge for content.',
          suggestedContent: [
            'Stanley vs Owala vs Hydro Flask: The Ultimate Comparison',
            'How to Customize Your Water Bottle (Sticker Guide)',
            'Is a $45 Water Bottle Actually Worth It?',
            'Water Bottle Collection Tour (What Your Bottle Says About You)'
          ],
          whyNow: 'Evergreen trend but spikes in summer. Create now for sustained traffic.',
          shoppingLinks: 'Amazon Associates for bottles, Redbubble affiliate for stickers'
        }
      ]
    }
  };

  const analyzeTrends = async () => {
    setLoading(true);
    
    try {
      // Call Netlify serverless function (not Anthropic API directly)
      const response = await fetch('/.netlify/functions/analyze-trends', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          season: selectedSeason,
          category: selectedCategory
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Check for API errors
      if (data.error) {
        throw new Error(data.error.message || data.error);
      }
      
      const trendsJson = extractJsonFromResponse(data.content[0].text);
      setTrends(trendsJson);
      
      // Cache results
      localStorage.setItem('josies-trends', JSON.stringify(trendsJson));
      localStorage.setItem('josies-trends-timestamp', Date.now());
      
    } catch (error) {
      console.error('Error analyzing trends:', error);
      alert(`Error analyzing trends: ${error.message}\n\nMake sure you've deployed the Netlify function and set your API key in environment variables.`);
    } finally {
      setLoading(false);
    }
  };
  
  // Helper to generate Claude API prompt
  const generateTrendAnalysisPrompt = (season, category) => {
    return `You are analyzing teen girl trends for Josie's Journal, targeting 11-17 year olds.

SEASON: ${season} (3+ months from now)
CATEGORY: ${category === 'all' ? 'fashion and products' : category}

Based on current signals from Google Trends, TikTok, Pinterest, and retail data, identify 3-4 ${category} trends that will be relevant for ${season}.

IMPORTANT REQUIREMENTS:
${category === 'fashion' || category === 'all' ? `
For FASHION trends:
- Break down into SPECIFIC subcategories: vintage styles, jewelry trends, denim/pants trends, accessories, occasion-specific (school vs weekend)
- For each subcategory, provide concrete examples
- Include WHERE to buy (not just brands - actual retailers: Amazon, Target, Walmart, Shein, Depop, Poshmark)
- Price points should include SPECIFIC products with approximate prices
- Example: "Baggy cargo pants at Target ($25-40), Amazon Essentials ($20-30), Dickies ($45-60)"` : ''}

${category === 'products' || category === 'all' ? `
For PRODUCT trends:
- Must include SPECIFIC PRODUCTS available at major retailers
- For each product, list:
  * Exact product name (e.g., "Maybelline Sky High Mascara" not just "mascara")
  * WHERE TO BUY: Amazon, Target, Walmart, Ulta, Sephora (with current availability)
  * Exact price or price range
  * Links or search terms that will find the exact product
- Focus on products teens can actually FIND and BUY at accessible retailers
- Example: "Bubble Skincare Slam Dunk Moisturizer - Target $16, Amazon $16, Ulta $16"` : ''}

For each trend, provide a JSON object with:

${category === 'fashion' || category === 'all' ? `
For FASHION trends:
{
  "id": unique_number,
  "category": "fashion",
  "trend": "Creative Trend Name",
  "subcategory": "vintage" or "jewelry" or "denim" or "accessories" or "school-style" or "weekend-style",
  "season": "${season}",
  "momentum": "rising/peak/emerging/steady",
  "confidence": 0-100,
  "ageGroup": "tween (11-13)" or "teen (13-17)" or "both (11-17)",
  "platforms": ["TikTok", "Pinterest", etc],
  "keyPieces": ["5 specific items with WHERE to buy"],
  "colorPalette": ["3-5 colors"],
  "pricePoints": {
    "budget": "$X-Y at Target, Walmart, Amazon (specific items)",
    "mid": "$X-Y at Urban Outfitters, Princess Polly (specific items)",
    "splurge": "$X+ at specific stores (specific items)"
  },
  "whereToShop": {
    "amazon": "Specific search terms or product links",
    "target": "Department or specific items to look for",
    "walmart": "Specific items available",
    "online": "Shein, Depop, Poshmark specific searches"
  },
  "signals": ["3-4 specific data points"],
  "contentOpportunity": 0-100,
  "josiesInsight": "Why this matters for the audience",
  "suggestedContent": ["4 specific content ideas"],
  "whyNow": "Why create content now for this future trend"
}
` : ''}

${category === 'products' || category === 'all' ? `
For PRODUCT trends:
{
  "id": unique_number,
  "category": "products",
  "trend": "Creative Trend Name",
  "season": "${season}",
  "momentum": "rising/peak/emerging/steady",
  "confidence": 0-100,
  "ageGroup": "tween (11-13)" or "teen (13-17)" or "both (11-17)",
  "platforms": ["TikTok", "Instagram", etc],
  "specificProducts": [
    {
      "item": "EXACT product name (e.g., 'Maybelline Sky High Mascara in Black')",
      "brands": "Specific brand name",
      "priceRange": "Exact price (e.g., '$12.99')",
      "availability": "Amazon (in stock), Target (in stock), Ulta (online only), Walmart (select stores)",
      "searchTerms": "Exact terms to find this product on each retailer site",
      "productLinks": "If known, specific SKU or product codes"
    }
  ],
  "retailerBreakdown": {
    "amazon": ["Specific product 1 ($X)", "Specific product 2 ($Y)"],
    "target": ["Specific product 1 ($X)", "Specific product 2 ($Y)"],
    "walmart": ["Specific product 1 ($X)"],
    "ulta": ["Specific product 1 ($X)"],
    "sephora": ["Specific product 1 ($X)"]
  },
  "signals": ["3-4 specific data points"],
  "contentOpportunity": 0-100,
  "josiesInsight": "Why this matters",
  "suggestedContent": ["4 content ideas including specific haul/review videos"],
  "whyNow": "Timing guidance",
  "shoppingLinks": "Affiliate opportunities with specific retailers"
}
` : ''}

Return ONLY a valid JSON array of trend objects. No markdown, no explanation.`;
  };
  
  const extractJsonFromResponse = (text) => {
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('Could not parse response');
  };

  useEffect(() => {
    const cached = localStorage.getItem('josies-trends');
    if (cached) {
      setTrends(JSON.parse(cached));
    }
  }, []);

  useEffect(() => {
    if (trends.length > 0) {
      localStorage.setItem('josies-trends', JSON.stringify(trends));
    }
  }, [trends]);

  // Auto-analyze when season or category changes (if trends already loaded)
  useEffect(() => {
    if (trends.length > 0) {
      // Clear trends when switching season/category so user knows to re-analyze
      setTrends([]);
    }
  }, [selectedSeason, selectedCategory]);

  const filteredTrends = selectedCategory === 'all' 
    ? trends 
    : trends.filter(t => t.category === selectedCategory);

  const getMomentumColor = (momentum) => {
    switch(momentum) {
      case 'rising': return 'text-emerald-700 bg-emerald-50';
      case 'peak': return 'text-amber-700 bg-amber-50';
      case 'emerging': return 'text-blue-700 bg-blue-50';
      case 'steady': return 'text-gray-700 bg-gray-50';
      default: return 'text-gray-700 bg-gray-50';
    }
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

  const downloadReport = () => {
    const report = filteredTrends.map(t => {
      const base = {
        Season: t.season,
        Trend: t.trend,
        Category: t.category,
        Momentum: t.momentum,
        'Confidence Score': t.confidence,
        'Age Group': t.ageGroup,
        'Content Opportunity': t.contentOpportunity,
        'Josie\'s Insight': t.josiesInsight,
        'Why Create Now': t.whyNow,
        'Suggested Content': t.suggestedContent.join(' | ')
      };

      if (t.category === 'fashion') {
        return {
          ...base,
          'Key Pieces': t.keyPieces.join(', '),
          'Color Palette': t.colorPalette.join(', '),
          'Budget Price Range': t.pricePoints.budget,
          'Mid Price Range': t.pricePoints.mid,
          'Splurge Price Range': t.pricePoints.splurge
        };
      } else {
        return {
          ...base,
          'Specific Products': t.specificProducts.map(p => `${p.item} (${p.brands}, ${p.priceRange})`).join(' | '),
          'Shopping Links': t.shoppingLinks || ''
        };
      }
    });

    const csv = [
      Object.keys(report[0]).join(','),
      ...report.map(row => Object.values(row).map(val => `"${val}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `josies-journal-trends-${selectedSeason}.csv`;
    a.click();
  };

  const currentSeasonObj = seasons.find(s => s.id === selectedSeason);
  const SeasonIcon = currentSeasonObj?.icon || Sun;

  return (
    <div className="min-h-screen bg-[#fdfdfd] p-6 md:p-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap');
        
        * {
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Montserrat', sans-serif;
          margin: 0;
          padding: 0;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Playfair Display', serif;
        }
        
        /* Override Tailwind colors with Mom Dashboard palette */
        .bg-terracotta { background-color: #cd7f77 !important; }
        .hover\\:bg-terracotta-dark:hover { background-color: #b86d65 !important; }
        .text-terracotta { color: #cd7f77 !important; }
        .hover\\:text-terracotta-dark:hover { color: #b86d65 !important; }
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
              <h1 className="text-4xl md:text-5xl font-bold text-[#373737] mb-2" style={{fontFamily: "'Playfair Display', serif"}}>
                Josie's Journal Trend Forecaster
              </h1>
              <p className="text-[#888888] font-medium">
                Product & fashion intelligence for teen content planning
              </p>
            </div>
            <div className="flex items-center gap-3">
              {trends.length > 0 && (
                <button
                  onClick={downloadReport}
                  className="flex items-center gap-2 bg-[#cd7f77] text-white px-5 py-2.5 rounded-lg hover:bg-[#b86d65] transition font-semibold text-sm"
                >
                  <Download className="w-4 h-4" />
                  Export Report
                </button>
              )}
            </div>
          </div>

          {/* Season Selector */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-[#e0e0e0] mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-5 h-5 text-[#cd7f77]" />
              <h3 className="text-lg font-semibold text-[#373737]" style={{fontFamily: "'Playfair Display', serif"}}>
                Select Season (3+ Months Ahead)
              </h3>
            </div>
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

          {/* Category Filter */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map(cat => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg whitespace-nowrap transition font-semibold text-sm ${
                    selectedCategory === cat.id
                      ? 'bg-[#cd7f77] text-white'
                      : 'bg-white text-[#373737] hover:bg-[#F4F1E8] border border-[#e0e0e0]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Analyze Button */}
        {trends.length === 0 && (
          <div className="text-center py-20 bg-white rounded-lg border border-[#e0e0e0]">
            <SeasonIcon className="w-20 h-20 text-[#cd7f77] mx-auto mb-4 opacity-60" />
            <h2 className="text-3xl font-semibold text-[#373737] mb-3" style={{fontFamily: "'Playfair Display', serif"}}>
              Forecast {currentSeasonObj?.name} Trends
            </h2>
            <p className="text-[#888888] mb-8 max-w-md mx-auto">
              Discover trending products and fashion styles 3+ months in advance to plan your content calendar
            </p>
            <button
              onClick={analyzeTrends}
              disabled={loading}
              className="bg-[#cd7f77] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#b86d65] transition disabled:opacity-50"
            >
              {loading ? 'Analyzing Trends...' : `Analyze ${currentSeasonObj?.name}`}
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#cd7f77] mx-auto mb-4"></div>
            <p className="text-[#888888]">Analyzing {currentSeasonObj?.name} trend signals...</p>
          </div>
        )}

        {/* Trend Cards */}
        {trends.length > 0 && !loading && (
          <>
            {/* Stats Dashboard */}
            <div className="mb-6 bg-white rounded-lg p-6 shadow-sm border border-[#e0e0e0]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-[#cd7f77]" style={{fontFamily: "'Playfair Display', serif"}}>
                    {filteredTrends.length}
                  </div>
                  <div className="text-sm text-[#888888] font-medium">Trends Tracked</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-600" style={{fontFamily: "'Playfair Display', serif"}}>
                    {filteredTrends.filter(t => t.momentum === 'rising').length}
                  </div>
                  <div className="text-sm text-[#888888] font-medium">Rising</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-600" style={{fontFamily: "'Playfair Display', serif"}}>
                    {filteredTrends.filter(t => t.momentum === 'peak').length}
                  </div>
                  <div className="text-sm text-[#888888] font-medium">At Peak</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#cd7f77]" style={{fontFamily: "'Playfair Display', serif"}}>
                    {Math.round(filteredTrends.reduce((sum, t) => sum + t.contentOpportunity, 0) / filteredTrends.length)}
                  </div>
                  <div className="text-sm text-[#888888] font-medium">Avg Opportunity</div>
                </div>
              </div>
            </div>

            {/* Trends Grid */}
            <div className="grid gap-6">
              {filteredTrends.map(trend => (
                <div key={trend.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6 border border-[#e0e0e0]">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="text-2xl font-semibold text-[#373737]" style={{fontFamily: "'Playfair Display', serif"}}>
                          {trend.trend}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getMomentumColor(trend.momentum)}`}>
                          {getMomentumIcon(trend.momentum)} {trend.momentum}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-[#888888] flex-wrap">
                        <span className="capitalize font-medium">{trend.category}</span>
                        <span>•</span>
                        <span>{trend.ageGroup}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5 flex-wrap">
                          {trend.platforms.map((p, i) => (
                            <span key={i} className="bg-[#F4F1E8] px-2.5 py-0.5 rounded text-[#373737] font-medium">
                              {p}
                            </span>
                          ))}
                        </span>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-4xl font-bold text-[#cd7f77]" style={{fontFamily: "'Playfair Display', serif"}}>
                        {trend.confidence}%
                      </div>
                      <div className="text-xs text-[#888888] font-medium">Confidence</div>
                    </div>
                  </div>

                  {/* Fashion-Specific Details */}
                  {trend.category === 'fashion' && (
                    <div className="grid md:grid-cols-2 gap-4 mb-5">
                      <div className="bg-[#F4F1E8] rounded-lg p-4">
                        <h4 className="font-semibold text-[#373737] mb-2 text-sm">Key Pieces</h4>
                        <ul className="space-y-1">
                          {trend.keyPieces.map((piece, i) => (
                            <li key={i} className="text-sm text-[#373737] flex items-start">
                              <span className="text-[#cd7f77] mr-2">•</span>
                              {piece}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-[#F4F1E8] rounded-lg p-4">
                        <h4 className="font-semibold text-[#373737] mb-2 text-sm">Color Palette</h4>
                        <div className="flex flex-wrap gap-2">
                          {trend.colorPalette.map((color, i) => (
                            <span key={i} className="bg-white px-3 py-1 rounded-full text-sm text-[#373737] font-medium border border-[#e0e0e0]">
                              {color}
                            </span>
                          ))}
                        </div>
                        <div className="mt-3 text-xs text-[#888888]">
                          <div><strong>Budget:</strong> {trend.pricePoints.budget}</div>
                          <div><strong>Mid:</strong> {trend.pricePoints.mid}</div>
                          <div><strong>Splurge:</strong> {trend.pricePoints.splurge}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Product-Specific Details */}
                  {trend.category === 'products' && (
                    <div className="mb-5 bg-[#F4F1E8] rounded-lg p-4">
                      <h4 className="font-semibold text-[#373737] mb-3 text-sm">Specific Products to Feature</h4>
                      <div className="space-y-3">
                        {trend.specificProducts.map((product, i) => (
                          <div key={i} className="bg-white rounded-lg p-3 border border-[#e0e0e0]">
                            <div className="font-semibold text-[#373737] text-sm mb-1">{product.item}</div>
                            <div className="text-xs text-[#888888] space-y-0.5">
                              <div><strong>Brands:</strong> {product.brands}</div>
                              <div><strong>Price Range:</strong> {product.priceRange}</div>
                              <div><strong>Availability:</strong> {product.availability}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {trend.shoppingLinks && (
                        <div className="mt-3 text-xs text-[#cd7f77] font-medium">
                          {trend.shoppingLinks}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Trend Signals */}
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

                  {/* Why Now */}
                  <div className="mb-5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-100">
                    <h4 className="font-semibold text-[#373737] mb-2 text-sm flex items-center gap-2">
                      Why Create Content Now
                    </h4>
                    <p className="text-sm text-[#373737] font-medium">{trend.whyNow}</p>
                  </div>

                  {/* Josie's Insight */}
                  <div className="mb-5 bg-gradient-to-br from-[#F4F1E8] to-[#e0e0e0] rounded-lg p-4 border-l-4 border-[#cd7f77]">
                    <h4 className="font-semibold text-[#373737] mb-2 text-sm flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#cd7f77]" />
                      Why This Matters for Josie's Journal
                    </h4>
                    <p className="text-sm text-[#373737]">{trend.josiesInsight}</p>
                  </div>

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

                  {/* Suggested Content */}
                  <div>
                    <h4 className="font-semibold text-[#373737] mb-3 text-sm">Content Ideas Ready to Create</h4>
                    <div className="grid gap-2">
                      {trend.suggestedContent.map((content, i) => (
                        <div key={i} className="flex items-start gap-3 bg-[#FEFDF9] rounded-lg p-3 border border-[#e0e0e0] hover:border-[#cd7f77] transition">
                          <span className="text-[#cd7f77] font-bold text-sm min-w-[24px]">{i + 1}.</span>
                          <span className="text-[#373737] text-sm font-medium">{content}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={analyzeTrends}
                className="text-[#cd7f77] hover:text-[#b86d65] font-semibold text-sm"
              >
                ↻ Refresh Trend Analysis
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
