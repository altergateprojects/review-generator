const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const router = express.Router();

// System prompts for different rating levels
const SYSTEM_PROMPT_HIGH = `You are a real customer writing a Google review. Your job is to write a concise, genuine, human-sounding review for a business.

Rules:
- Write in first person, casual but respectful tone
- Vary sentence structure and length each time — never use the same template twice
- Sound like a real person, not a marketer. Use natural phrases.
- IMPORTANT: Naturally mention the business name at least once in the review
- Include relevant keywords naturally (like "best resort", "luxury resort", "weekend getaway", etc.) but don't force them
- Do NOT use overly promotional words like "exceptional", "outstanding", "top-notch" unless it fits very naturally
- Do NOT start every review with "I"
- Keep it between 50–100 words (concise but informative)
- Never mention discounts, incentives, or being asked to leave a review
- Be positive and mention specific details from the tags
- Use keywords like "highly recommend", "best choice", "perfect for"
- Include 2-3 specific details about your visit
- Make it feel authentic and helpful to other customers
- Output ONLY the review text, nothing else`;

const SYSTEM_PROMPT_MEDIUM = `You are a real customer writing a Google review. Your job is to write a concise, genuine, human-sounding review for a business.

Rules:
- Write in first person, casual but respectful tone
- Vary sentence structure and length each time — never use the same template twice
- Sound like a real person, not a marketer. Use natural phrases.
- IMPORTANT: Naturally mention the business name at least once in the review
- Keep it between 50–100 words (concise but informative)
- Never mention discounts, incentives, or being asked to leave a review
- Be balanced and polite
- Mention both positives and areas for improvement
- Be constructive, not harsh
- Focus on specific details
- Make it feel authentic and helpful to other customers
- Output ONLY the review text, nothing else`;

const SYSTEM_PROMPT_LOW = `You are a real customer writing constructive feedback for a business. Your job is to write a helpful, balanced review that provides improvement suggestions.

IMPORTANT RULES FOR LOW RATINGS:
- Write in first person, polite and respectful tone
- Focus on CONSTRUCTIVE CRITICISM, not harsh complaints
- Mention what could be improved, but also acknowledge any positives
- Frame feedback as suggestions for improvement
- Use phrases like "could be better", "room for improvement", "would suggest", "hope to see"
- AVOID harsh words like "terrible", "awful", "worst", "horrible"
- Be specific about issues but remain professional
- Mention the business name naturally
- Keep it between 50–100 words
- End on a hopeful note about potential improvements
- Make it sound like you want the business to succeed
- Output ONLY the review text, nothing else

Example tone: "Had an okay experience at [Business]. The service could be faster and the facilities need some updates. However, the staff was friendly and tried their best. With some improvements in [specific area], this place has potential. Hope to see positive changes in the future."`;

// Honeypot field check
const checkHoneypot = (req, res, next) => {
  if (req.body.website || req.body.email_confirm) {
    return res.status(400).json({ error: 'Invalid request' });
  }
  next();
};

// Input validation
const validateInput = (req, res, next) => {
  const { stars, tags, customerNote } = req.body;
  
  // Validate stars
  if (!stars || !Number.isInteger(stars) || stars < 1 || stars > 5) {
    return res.status(400).json({ error: 'Stars must be an integer between 1 and 5' });
  }
  
  // Validate tags (optional)
  if (tags && !Array.isArray(tags)) {
    return res.status(400).json({ error: 'Tags must be an array' });
  }
  
  // Validate customer note length (optional)
  if (customerNote && customerNote.length > 500) {
    return res.status(400).json({ error: 'Customer note too long (max 500 characters)' });
  }
  
  next();
};

// Generate review endpoint
router.post('/generate-review', checkHoneypot, validateInput, async (req, res) => {
  try {
    const { stars, tags = [], customerNote = '', businessType = 'business', language = 'english', businessId } = req.body;
    
    // Check API key
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY not configured');
      return res.status(500).json({ error: 'API configuration error' });
    }
    
    // Load config
    delete require.cache[require.resolve('../../config')];
    const config = require('../../config');
    
    // Get business-specific config
    let seoKeywords = [];
    let businessName = businessType;
    
    if (config.MULTI_BUSINESS_MODE && businessId) {
      // Multi-business mode - get specific business config
      const business = config.BUSINESSES.find(b => b.id === businessId);
      if (business) {
        seoKeywords = business.seoKeywords || [];
        businessName = business.name;
      }
    } else {
      // Single business mode - use default config
      seoKeywords = config.SEO_KEYWORDS || [];
      businessName = config.BUSINESS_NAME || businessType;
    }
    
    // Language instruction
    const languageInstructions = {
      english: 'Write the review in English.',
      marathi: 'Write the review in Marathi (मराठी). Use natural Marathi language that a real customer would use.',
      hindi: 'Write the review in Hindi (हिंदी). Use natural Hindi language that a real customer would use.',
      gujarati: 'Write the review in Gujarati (ગુજરાતી). Use natural Gujarati language that a real customer would use.',
      tamil: 'Write the review in Tamil (தமிழ்). Use natural Tamil language that a real customer would use.',
      telugu: 'Write the review in Telugu (తెలుగు). Use natural Telugu language that a real customer would use.',
      kannada: 'Write the review in Kannada (ಕನ್ನಡ). Use natural Kannada language that a real customer would use.',
      bengali: 'Write the review in Bengali (বাংলা). Use natural Bengali language that a real customer would use.'
    };
    
    const languageInstruction = languageInstructions[language.toLowerCase()] || languageInstructions.english;
    
    // Select appropriate system prompt based on rating
    let systemPrompt;
    if (stars >= 4) {
      systemPrompt = SYSTEM_PROMPT_HIGH; // 4-5 stars: positive review
    } else if (stars === 3) {
      systemPrompt = SYSTEM_PROMPT_MEDIUM; // 3 stars: balanced review
    } else {
      systemPrompt = SYSTEM_PROMPT_LOW; // 1-2 stars: constructive feedback
    }
    
    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      generationConfig: {
        temperature: 0.95,
        maxOutputTokens: 1024,
      }
    });
    
    // Construct user prompt
    const experienceHighlights = tags.length > 0 ? tags.join(', ') : 'general visit';
    const customerWords = customerNote.trim() || 'none provided';
    
    // Add SEO keywords instruction if available (only for high ratings)
    const keywordsInstruction = (stars >= 4 && seoKeywords.length > 0)
      ? `\nNaturally incorporate 1-2 of these keywords if relevant: ${seoKeywords.join(', ')}`
      : '';
    
    const fullPrompt = `${systemPrompt}

${languageInstruction}

Write a Google review for ${businessName} (a ${businessType}).

Star rating: ${stars} out of 5
Experience highlights: ${experienceHighlights}
Customer's own words: ${customerWords}${keywordsInstruction}

Remember to mention "${businessName}" naturally in the review.`;
    
    // Call Gemini API
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const reviewText = response.text().trim();
    
    // Return generated review
    res.json({
      review: reviewText,
      stars: stars,
      language: language,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error generating review:', error.message);
    
    if (error.message?.includes('API key')) {
      return res.status(500).json({ error: 'API authentication failed' });
    }
    
    if (error.message?.includes('quota') || error.message?.includes('rate limit')) {
      return res.status(429).json({ error: 'API rate limit reached, please try again later' });
    }
    
    res.status(500).json({ error: 'Failed to generate review' });
  }
});

// Get configuration endpoint (for frontend)
router.get('/config', (req, res) => {
  try {
    // Clear the cache to get fresh config
    delete require.cache[require.resolve('../../config')];
    const config = require('../../config');
    
    // Check if multi-business mode is enabled
    if (config.MULTI_BUSINESS_MODE && config.BUSINESSES) {
      res.json({
        multiBusinessMode: true,
        businesses: config.BUSINESSES.map(b => ({
          id: b.id,
          name: b.name,
          type: b.type,
          logoUrl: b.logoUrl,
          brandColor: b.brandColor
        })),
        defaultBusiness: config.DEFAULT_BUSINESS
      });
    } else {
      // Single business mode (backward compatibility)
      res.json({
        multiBusinessMode: false,
        businessName: config.BUSINESS_NAME,
        businessType: config.BUSINESS_TYPE,
        googleReviewUrl: config.GOOGLE_REVIEW_URL,
        logoUrl: config.LOGO_URL,
        brandColor: config.BRAND_COLOR,
        customTags: config.CUSTOM_TAGS,
        seoKeywords: config.SEO_KEYWORDS || [],
        supportedLanguages: config.SUPPORTED_LANGUAGES || ["english"]
      });
    }
  } catch (error) {
    console.error('Error loading config:', error.message);
    res.status(500).json({ error: 'Failed to load configuration' });
  }
});

// Get specific business configuration
router.get('/config/:businessId', (req, res) => {
  try {
    delete require.cache[require.resolve('../../config')];
    const config = require('../../config');
    const { businessId } = req.params;
    
    if (!config.MULTI_BUSINESS_MODE || !config.BUSINESSES) {
      return res.status(400).json({ error: 'Multi-business mode not enabled' });
    }
    
    const business = config.BUSINESSES.find(b => b.id === businessId);
    
    if (!business) {
      return res.status(404).json({ error: 'Business not found' });
    }
    
    res.json({
      businessName: business.name,
      businessType: business.type,
      googleReviewUrl: business.googleReviewUrl,
      logoUrl: business.logoUrl,
      brandColor: business.brandColor,
      customTags: business.customTags || [],
      seoKeywords: business.seoKeywords || [],
      supportedLanguages: business.supportedLanguages || ["english"]
    });
  } catch (error) {
    console.error('Error loading business config:', error.message);
    res.status(500).json({ error: 'Failed to load business configuration' });
  }
});

module.exports = router;
