// Netlify Function to call Anthropic API
// This runs on Netlify's servers, not in the browser

export async function handler(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { season, category } = JSON.parse(event.body);
    
    // Get API key from environment variable
    // Note: Netlify functions access env vars without VITE_ prefix
    const apiKey = process.env.VITE_ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY;
    
    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'API key not configured' })
      };
    }

    // Call Anthropic API from server-side
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
        'x-api-key': apiKey
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4000,
        messages: [{
          role: 'user',
          content: generateTrendPrompt(season, category)
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

function generateTrendPrompt(season, category) {
  return `You are analyzing teen girl trends for Josie's Journal, targeting 11-17 year olds.

SEASON: ${season} (3+ months from now)
CATEGORY: ${category === 'all' ? 'fashion and products' : category}

Based on current signals, identify 3-4 ${category} trends that will be relevant for ${season}.

IMPORTANT REQUIREMENTS:
${category === 'fashion' || category === 'all' ? `
For FASHION trends:
- Break down into SPECIFIC subcategories: vintage styles, jewelry trends, denim/pants trends, accessories, occasion-specific (school vs weekend)
- Include WHERE to buy at major retailers: Amazon, Target, Walmart, Shein
- Price points with SPECIFIC products and prices
- Example: "Baggy cargo pants at Target ($25-40), Amazon Essentials ($20-30)"` : ''}

${category === 'products' || category === 'all' ? `
For PRODUCT trends:
- SPECIFIC PRODUCTS available at major retailers
- Exact product names (e.g., "Maybelline Sky High Mascara in Black")
- WHERE TO BUY: Amazon, Target, Walmart, Ulta, Sephora with prices
- Current availability status` : ''}

Return ONLY a valid JSON array of 3-4 trend objects. Each trend must include:
- id (number)
- category ("fashion" or "products")
- trend (creative name)
- subcategory (for fashion: "vintage", "jewelry", "denim", "accessories", "school-style", "weekend-style")
- season
- momentum ("rising", "peak", "emerging", "steady")
- confidence (0-100)
- ageGroup
- platforms (array)
- keyPieces or specificProducts (array with detailed info)
- signals (array of 3-4 data points)
- contentOpportunity (0-100)
- josiesInsight (2-3 sentences)
- suggestedContent (array of 4 content ideas)
- whyNow (timing guidance)

No markdown formatting, just valid JSON.`;
}