// Netlify Function to search for products at Amazon, Target, Walmart

export async function handler(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { trendName, category, season } = JSON.parse(event.body);
    
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
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: generateProductSearchPrompt(trendName, category, season)
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

function generateProductSearchPrompt(trendName, category, season) {
  return `Find 3-5 specific products for the "${trendName}" trend in ${category} available at Amazon, Target, and Walmart.

Return product recommendations with actual buyable items.

Return a JSON array:
[{
  "name": "Specific Product Name",
  "brand": "Brand Name",
  "price": "$XX-$XX",
  "description": "Why this fits the trend",
  "stores": [
    {"name": "Amazon", "price": "$XX.XX", "url": ""},
    {"name": "Target", "price": "$XX.XX", "url": ""},
    {"name": "Walmart", "price": "$XX.XX", "url": ""}
  ]
}]

Focus on:
- Real products teens can actually buy
- Current availability (mention if seasonal/limited)
- Price ranges that are accessible
- Mix of budget ($10-20), mid ($20-40), and nicer ($40+) options

Return ONLY valid JSON.`;
}
