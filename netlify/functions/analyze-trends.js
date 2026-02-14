// Netlify Function to call Anthropic API
// This runs on Netlify's servers, not in the browser

export async function handler(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { audience, season, category } = JSON.parse(event.body);
    
    const apiKey = process.env.VITE_ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY;
    
    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'API key not configured' })
      };
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
        'x-api-key': apiKey
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        messages: [{
          role: 'user',
          content: generateTrendPrompt(audience, season, category)
        }]
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data)
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}

function generateTrendPrompt(audience, season, category) {
  const categoryInfo = {
    // Teen Girls categories
    'tops': 'tops and shirts (t-shirts, crop tops, blouses, hoodies, sweaters)',
    'bottoms': 'bottoms and pants (jeans, skirts, shorts, leggings, pants)',
    'shoes': 'shoes and footwear (sneakers, boots, sandals, heels)',
    'accessories': 'accessories (jewelry, bags, phone cases, hair accessories, belts)',
    'beauty': 'beauty and makeup (skincare products, makeup, hair products, specific brands)',
    'products': 'trending products and items (tech, lifestyle, room decor, accessories)',
    
    // Moms categories
    'mental-load': 'mental load and invisible labor challenges',
    'time-management': 'time management and productivity struggles',
    'self-care': 'self-care, burnout prevention, and wellness needs',
    'parenting': 'parenting challenges and concerns',
    'organization': 'home organization and systems'
  };

  const audienceInfo = {
    'teen-girls': 'teen girls ages 13-17',
    'moms': 'millennial moms ages 30-50'
  };

  if (audience === 'teen-girls') {
    if (category === 'products') {
      // Special prompt for products category
      return `Identify 4-5 specific trending products for ${audienceInfo[audience]} for ${season}.

CRITICAL: Focus on SPECIFIC PRODUCTS available NOW at major retailers.

For each product, provide:
- Exact product name and brand
- Where to buy: Amazon, Target, Walmart (with specific availability)
- Exact current price or price range
- Why it's trending (TikTok viral, influencer recommended, etc.)
- What makes it appealing to teen girls

Examples of product types:
- Tech accessories (phone cases, chargers, LED lights)
- Room decor (tapestries, fairy lights, organizers)
- Lifestyle items (water bottles, bags, planners)
- Beauty tools (hair tools, skincare devices)
- School/office supplies (pens, notebooks, stickers)

Return a JSON array with 4-5 objects:
[{
  "id": 1,
  "category": "products",
  "trend": "Product name/trend",
  "season": "${season}",
  "momentum": "rising/peak/emerging/steady",
  "confidence": 85,
  "ageGroup": "teen (13-17)",
  "platforms": ["TikTok", "Instagram"],
  "keyPieces": [
    "Exact Product 1 - Brand Name at Target $XX",
    "Exact Product 2 - Brand Name at Amazon $XX",
    "Exact Product 3 - Brand Name at Walmart $XX"
  ],
  "signals": ["TikTok hashtag has X views", "Amazon bestseller in category"],
  "contentOpportunity": 90,
  "josiesInsight": "Why teen girls want this",
  "suggestedContent": ["Haul video idea", "Review idea", "Styling idea"],
  "whyNow": "Why create content now"
}]

Return ONLY valid JSON, no markdown.`;
    } else {
      // Fashion categories with high fashion + Pinterest influence
      return `Identify 4-5 trending ${categoryInfo[category]} for ${audienceInfo[audience]} for ${season}.

IMPORTANT: Blend TWO trend sources:
1. Pinterest/TikTok trends (accessible, teen-friendly, viral aesthetics)
2. High fashion runway influence (Vogue, Chloé, Ralph Lauren, Miu Miu, The Row, Jacquemus - adapted for teen style and budget)

Look for:
- What runway trends are trickling down to fast fashion
- How luxury brands are influencing affordable teen style
- Pinterest aesthetics that echo high fashion movements
- TikTok trends inspired by designer collections

For each trend:
- Specific items/styles trending NOW
- High fashion inspiration (which designer/brand started this)
- Where teens can buy it affordably (Amazon, Target, Walmart, Shein, Urban Outfitters, Princess Polly)
- Price ranges for budget/mid/splurge options
- Why it's trending (runway influence + social media)

Return a JSON array with 4-5 objects:
[{
  "id": 1,
  "category": "${category}",
  "trend": "Short trend name (e.g., 'Ballet Core Flats', 'Oversized Blazers')",
  "season": "${season}",
  "momentum": "rising/peak/emerging/steady",
  "confidence": 85,
  "ageGroup": "teen (13-17)",
  "platforms": ["TikTok", "Pinterest", "Vogue"],
  "keyPieces": [
    "Specific item 1 - Budget option at Target/Walmart $XX",
    "Specific item 2 - Mid option at Urban Outfitters/Princess Polly $XX",
    "Specific item 3 - Designer inspiration: Brand Name",
    "Specific item 4 - Amazon dupe $XX"
  ],
  "signals": [
    "Seen on X runway show",
    "TikTok trend with X views",
    "Pinterest searches up X%",
    "Featured in Vogue/Teen Vogue"
  ],
  "contentOpportunity": 90,
  "josiesInsight": "How high fashion meets teen style - why this resonates",
  "suggestedContent": [
    "High vs low styling video",
    "Designer dupe roundup",
    "How to wear this trend",
    "Budget styling challenge"
  ],
  "whyNow": "Why create content now"
}]

Return ONLY valid JSON, no markdown.`;
    }
  } else {
    // Moms audience (unchanged)
    return `Identify 4-5 trending topics or challenges related to ${categoryInfo[category]} that millennial moms (30-50) are facing or discussing for ${season}.

Focus on:
- Specific pain points or conversations happening NOW
- How the Mom Dashboard app could help address these
- What moms are searching for or talking about on social media
- Practical, actionable insights

Return a JSON array with 4-5 objects:
[{
  "id": 1,
  "category": "${category}",
  "trend": "Short, specific challenge or topic name",
  "season": "${season}",
  "momentum": "rising/peak/emerging/steady",
  "confidence": 85,
  "ageGroup": "moms (30-50)",
  "platforms": ["Facebook Groups", "Pinterest", "Instagram"],
  "keyPieces": ["specific aspect 1", "specific aspect 2", "specific aspect 3"],
  "signals": ["why this is trending - data point 1", "data point 2"],
  "contentOpportunity": 90,
  "josiesInsight": "How Mom Dashboard could help with this",
  "suggestedContent": ["feature idea 1", "content idea 2", "solution idea 3"],
  "whyNow": "Why this is relevant now for ${season}"
}]

Return ONLY valid JSON, no markdown.`;
  }
}
