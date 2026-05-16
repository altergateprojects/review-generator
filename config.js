// Multi-Business Configuration
// Add all your businesses here

module.exports = {
  // Enable multi-business mode
  MULTI_BUSINESS_MODE: true,
  
  // List of all businesses
  BUSINESSES: [
    {
      id: "royal-shourya-resort",
      name: "Royal Shourya Resort",
      type: "Resort",
      googleReviewUrl: "https://g.page/r/Cd21nPf9tKmqEBE/review",
      logoUrl: "",
      brandColor: "#4A90D9",
      customTags: [],
      seoKeywords: [
        "Royal Shourya Resort",
        "best resort",
        "luxury resort",
        "family resort",
        "weekend getaway",
        "vacation destination"
      ],
      supportedLanguages: ["english", "marathi", "hindi"]
    },
    {
      id: "royal-villa-resort",
      name: "Royal Villa Resort",
      type: "Resort",
      googleReviewUrl: "https://g.page/r/CSXp9WVaZAtjEBM/review",
      logoUrl: "",
      brandColor: "#8B4513",
      customTags: [],
      seoKeywords: [
        "Royal Villa Resort",
        "best resort",
        "luxury villa",
        "premium resort",
        "weekend getaway",
        "vacation destination"
      ],
      supportedLanguages: ["english", "marathi", "hindi"]
    }
  ],
  
  // Default business (if multi-business mode is disabled)
  DEFAULT_BUSINESS: "royal-shourya-resort"
};
