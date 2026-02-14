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
    return `Identify 3-4 trending ${categoryInfo[category]} for ${audienceInfo[audience]} for ${season}.

Focus on:
- Specific items/styles that are trending NOW
- Where to buy (Amazon, Target, Walmart, Shein, specific stores)
- Price ranges
- What makes it trending (TikTok, Instagram, Pinterest)

Return a JSON array with 3-4 objects:
[{
  "id": 1,
  "category": "${category}",
  "trend": "Short, catchy trend name",
  "season": "${season}",
  "momentum": "rising/peak/emerging/steady",
  "confidence": 85,
  "ageGroup": "teen (13-17)",
  "platforms": ["TikTok", "Pinterest"],
  "keyPieces": ["specific item 1", "specific item 2", "specific item 3"],
  "signals": ["why it's trending - data point 1", "data point 2"],
  "contentOpportunity": 90,
  "josiesInsight": "Why this matters for teen girls",
  "suggestedContent": ["content idea 1", "content idea 2", "content idea 3"],
  "whyNow": "Why create content about this now"
}]

Return ONLY valid JSON, no markdown.`;
  } else {
    // Moms audience
    return `Identify 3-4 trending topics or challenges related to ${categoryInfo[category]} that millennial moms (30-50) are facing or discussing for ${season}.

Focus on:
- Specific pain points or conversations happening NOW
- How the Mom Dashboard app could help address these
- What moms are searching for or talking about on social media
- Practical, actionable insights

Return a JSON array with 3-4 objects:
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
