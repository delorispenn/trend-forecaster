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
        max_tokens: 1500,
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
  if (audience === 'teen-girls') {
    if (category === 'products') {
      // Non-fashion products - search TikTok, Instagram, Snapchat, Google trends
      return `Search TikTok, Instagram, Snapchat, and Google Search to find 4 trending NON-FASHION products for teen girls (13-17) for ${season}.

Focus on products that are:
- Viral on social media (TikTok shop, Instagram reels, Snapchat spotlight)
- Trending in Google searches
- Actually available at Amazon, Target, Walmart
- NON-FASHION: tech accessories, room decor, lifestyle items, school supplies, beauty tools

For each product, include:
- What platforms it's trending on
- Why it's going viral
- Specific products available with prices
- Which stores carry it

Return a JSON array:
[{
  "id": 1,
  "category": "products",
  "trend": "Trending product name/type",
  "season": "${season}",
  "momentum": "rising/peak/emerging/steady",
  "confidence": 85,
  "ageGroup": "teen (13-17)",
  "platforms": ["TikTok", "Instagram", "Snapchat"],
  "keyPieces": [
    "Specific product at Amazon $XX",
    "Specific product at Target $XX",
    "Specific product at Walmart $XX"
  ],
  "signals": [
    "TikTok: X million views",
    "Google Trends: Up X%",
    "Instagram: X posts"
  ],
  "contentOpportunity": 90,
  "josiesInsight": "Why teens want this",
  "suggestedContent": ["Unboxing video", "Review", "Haul"],
  "whyNow": "Timing",
  "products": [
    {
      "name": "Exact Product Name",
      "brand": "Brand",
      "price": "$XX.XX",
      "description": "Why it's viral",
      "stores": [
        {"name": "Amazon", "price": "$XX.XX"},
        {"name": "Target", "price": "$XX.XX"},
        {"name": "Walmart", "price": "$XX.XX"}
      ]
    }
  ]
}]

Return ONLY valid JSON.`;
    } else {
      // Fashion categories - blend Pinterest/TikTok with high fashion
      return `Identify 4 trending ${category} for teen girls (13-17) for ${season}.

Blend Pinterest/TikTok trends with high fashion influence (Vogue, designer brands).

Return concise JSON with 4 objects:
[{
  "id": 1,
  "category": "${category}",
  "trend": "Trend name",
  "season": "${season}",
  "momentum": "rising/peak/emerging/steady",
  "confidence": 85,
  "ageGroup": "teen (13-17)",
  "platforms": ["TikTok", "Pinterest"],
  "keyPieces": ["item with store & price", "item with store & price", "item with store & price"],
  "signals": ["trend data 1", "trend data 2"],
  "contentOpportunity": 90,
  "josiesInsight": "Why this matters",
  "suggestedContent": ["idea 1", "idea 2", "idea 3"],
  "whyNow": "Timing"
}]

IMPORTANT: Keep response concise. Return ONLY valid JSON.`;
    }
  } else {
    return `Identify 4 topics for millennial moms (30-50) related to ${category} for ${season}.

Return concise JSON with 4 objects:
[{
  "id": 1,
  "category": "${category}",
  "trend": "Topic name",
  "season": "${season}",
  "momentum": "rising/peak/emerging/steady",
  "confidence": 85,
  "ageGroup": "moms (30-50)",
  "platforms": ["Facebook", "Pinterest"],
  "keyPieces": ["aspect 1", "aspect 2", "aspect 3"],
  "signals": ["trend data 1", "trend data 2"],
  "contentOpportunity": 90,
  "josiesInsight": "How Mom Dashboard helps",
  "suggestedContent": ["idea 1", "idea 2", "idea 3"],
  "whyNow": "Timing"
}]

Keep concise. Return ONLY valid JSON.`;
  }
}
