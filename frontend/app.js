// Configuration
// Auto-detect if running locally or in production
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3000/api'
  : '/api'; // Use relative path in production

const MAX_REGENERATIONS = 5;

// State
let config = null;
let selectedRating = 0;
let selectedTags = [];
let customerNote = '';
let selectedLanguage = 'english';
let generatedReview = '';
let regenerationCount = 0;

// Default tags by rating
const DEFAULT_TAGS = {
    5: ['Excellent Service', 'Great Quality', 'Highly Recommend', 'Friendly Staff', 'Clean & Professional', 'Great Value'],
    4: ['Good Service', 'Quality Product', 'Would Return', 'Friendly Team', 'Nice Atmosphere', 'Fair Price'],
    3: ['Decent Experience', 'Room for Improvement', 'Average Service', 'Okay Quality'],
    2: ['Slow Service', 'Poor Quality', 'Unfriendly Staff', 'Not Clean', 'Overpriced', 'Disappointing'],
    1: ['Very Disappointed', 'Poor Service', 'Low Quality', 'Would Not Return']
};

// DOM Elements
const page1 = document.getElementById('page-1');
const page2 = document.getElementById('page-2');
const stars = document.querySelectorAll('.star');
const ratingText = document.getElementById('rating-text');
const languageContainer = document.getElementById('language-container');
const languageSelect = document.getElementById('language-select');
const tagsContainer = document.getElementById('tags-container');
const tagsElement = document.getElementById('tags');
const noteContainer = document.getElementById('note-container');
const customerNoteInput = document.getElementById('customer-note');
const charCount = document.getElementById('char-count');
const generateBtn = document.getElementById('generate-btn');
const regenerateBtn = document.getElementById('regenerate-btn');
const copySubmitBtn = document.getElementById('copy-submit-btn');
const backBtn = document.getElementById('back-btn');
const reviewText = document.getElementById('review-text');
const reviewStars = document.getElementById('review-stars');
const loadingOverlay = document.getElementById('loading-overlay');
const toast = document.getElementById('toast');

// Initialize
async function init() {
    try {
        // Check if business ID is in URL path
        const pathParts = window.location.pathname.split('/').filter(p => p);
        const businessIdFromUrl = pathParts.length > 0 ? pathParts[0] : null;
        
        // Load configuration
        const response = await fetch(`${API_BASE_URL}/config`);
        if (!response.ok) throw new Error('Failed to load configuration');
        
        config = await response.json();
        
        // Check if multi-business mode
        if (config.multiBusinessMode) {
            // If business ID in URL, load that business directly
            if (businessIdFromUrl) {
                const business = config.businesses.find(b => b.id === businessIdFromUrl);
                if (business) {
                    // Hide navbar and business selector - direct access mode
                    document.getElementById('navbar').style.display = 'none';
                    await selectBusinessFromCard(businessIdFromUrl);
                } else {
                    // Invalid business ID in URL
                    showToast('Invalid business link. Please check the URL.', 'error');
                }
            } else {
                // No business ID in URL - show selector (admin mode)
                setupMultiBusinessMode();
            }
        } else {
            // Single business mode
            applyConfiguration();
        }
        
        // Setup event listeners
        setupEventListeners();
        
    } catch (error) {
        console.error('Initialization error:', error);
        showToast('Failed to load configuration. Please refresh the page.', 'error');
    }
}

// Apply configuration to UI
function applyConfiguration() {
    // Set business name
    document.getElementById('business-name').textContent = config.businessName;
    document.getElementById('business-name-2').textContent = config.businessName;
    
    // Set logo if provided
    if (config.logoUrl) {
        const logo1 = document.getElementById('business-logo');
        const logo2 = document.getElementById('business-logo-2');
        logo1.src = config.logoUrl;
        logo2.src = config.logoUrl;
        logo1.classList.remove('hidden');
        logo2.classList.remove('hidden');
    }
    
    // Set brand color
    if (config.brandColor) {
        document.documentElement.style.setProperty('--brand-color', config.brandColor);
    }
    
    // Setup language selector
    if (config.supportedLanguages && config.supportedLanguages.length > 0) {
        // Filter language options to only show supported languages
        const allOptions = languageSelect.querySelectorAll('option');
        allOptions.forEach(option => {
            if (!config.supportedLanguages.includes(option.value)) {
                option.style.display = 'none';
            }
        });
        
        // Set default language
        languageSelect.value = config.supportedLanguages[0];
        selectedLanguage = config.supportedLanguages[0];
    }
    
    // Set page title
    document.title = `Share Your Experience - ${config.businessName}`;
}

// Setup event listeners
function setupEventListeners() {
    // Star rating
    stars.forEach(star => {
        star.addEventListener('click', handleStarClick);
        star.addEventListener('mouseenter', handleStarHover);
    });
    
    document.querySelector('.stars').addEventListener('mouseleave', () => {
        updateStarDisplay(selectedRating);
    });
    
    // Language selector
    languageSelect.addEventListener('change', (e) => {
        selectedLanguage = e.target.value;
    });
    
    // Customer note
    customerNoteInput.addEventListener('input', (e) => {
        customerNote = e.target.value;
        charCount.textContent = customerNote.length;
    });
    
    // Buttons
    generateBtn.addEventListener('click', handleGenerate);
    regenerateBtn.addEventListener('click', handleRegenerate);
    copySubmitBtn.addEventListener('click', handleCopyAndSubmit);
    backBtn.addEventListener('click', handleBack);
}

// Handle star click
function handleStarClick(e) {
    const rating = parseInt(e.target.dataset.rating);
    selectedRating = rating;
    updateStarDisplay(rating);
    updateRatingText(rating);
    showLanguageSelector();
    showTagsForRating(rating);
    showNoteInput();
    enableGenerateButton();
}

// Handle star hover
function handleStarHover(e) {
    const rating = parseInt(e.target.dataset.rating);
    updateStarDisplay(rating, true);
}

// Update star display
function updateStarDisplay(rating, isHover = false) {
    stars.forEach((star, index) => {
        star.classList.remove('selected', 'hover');
        if (index < rating) {
            star.classList.add(isHover ? 'hover' : 'selected');
        }
    });
}

// Update rating text
function updateRatingText(rating) {
    const texts = {
        1: '1 star - We\'d like to improve',
        2: '2 stars - Below expectations',
        3: '3 stars - It was okay',
        4: '4 stars - Good experience',
        5: '5 stars - Excellent!'
    };
    ratingText.textContent = texts[rating] || 'Select a rating';
}

// Show language selector
function showLanguageSelector() {
    languageContainer.classList.remove('hidden');
}

// Show tags for rating
function showTagsForRating(rating) {
    // Get custom tags from selected business or main config
    let customTags = [];
    if (selectedBusiness && selectedBusiness.customTags) {
        customTags = selectedBusiness.customTags;
    } else if (config && config.customTags) {
        customTags = config.customTags;
    }
    
    const tags = customTags.length > 0 ? customTags : DEFAULT_TAGS[rating];
    
    tagsElement.innerHTML = '';
    selectedTags = [];
    
    tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'tag';
        tagElement.textContent = tag;
        tagElement.addEventListener('click', () => toggleTag(tagElement, tag));
        tagsElement.appendChild(tagElement);
    });
    
    tagsContainer.classList.remove('hidden');
}

// Toggle tag selection
function toggleTag(element, tag) {
    element.classList.toggle('selected');
    
    if (selectedTags.includes(tag)) {
        selectedTags = selectedTags.filter(t => t !== tag);
    } else {
        selectedTags.push(tag);
    }
}

// Show note input
function showNoteInput() {
    noteContainer.classList.remove('hidden');
}

// Enable generate button
function enableGenerateButton() {
    generateBtn.disabled = false;
}

// Handle generate
async function handleGenerate() {
    if (selectedRating === 0) {
        showToast('Please select a star rating', 'error');
        return;
    }
    
    // Check honeypot
    if (document.getElementById('website').value || document.getElementById('email_confirm').value) {
        showToast('Invalid request', 'error');
        return;
    }
    
    showLoading(true);
    regenerationCount = 0;
    
    try {
        const review = await generateReview();
        generatedReview = review;
        showReviewPage(review);
    } catch (error) {
        console.error('Generation error:', error);
        showToast(error.message || 'Failed to generate review. Please try again.', 'error');
    } finally {
        showLoading(false);
    }
}

// Handle regenerate
async function handleRegenerate() {
    if (regenerationCount >= MAX_REGENERATIONS) {
        showToast(`Maximum ${MAX_REGENERATIONS} regenerations reached`, 'error');
        return;
    }
    
    showLoading(true);
    regenerationCount++;
    
    try {
        const review = await generateReview();
        generatedReview = review;
        reviewText.textContent = review;
        showToast('Review regenerated!', 'success');
    } catch (error) {
        console.error('Regeneration error:', error);
        showToast('Failed to regenerate. Please try again.', 'error');
    } finally {
        showLoading(false);
    }
}

// Generate review via API
async function generateReview() {
    const requestBody = {
        stars: selectedRating,
        tags: selectedTags,
        customerNote: customerNote,
        language: selectedLanguage
    };
    
    // Add business info if multi-business mode
    if (config.multiBusinessMode && selectedBusiness) {
        requestBody.businessType = selectedBusiness.type;
        requestBody.businessId = selectedBusiness.id;
    } else {
        requestBody.businessType = config.businessType;
    }
    
    const response = await fetch(`${API_BASE_URL}/generate-review`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to generate review');
    }
    
    const data = await response.json();
    return data.review;
}

// Show review page
function showReviewPage(review) {
    reviewText.textContent = review;
    
    // Show stars
    reviewStars.innerHTML = '★'.repeat(selectedRating) + '☆'.repeat(5 - selectedRating);
    
    // Switch pages
    page1.classList.remove('active');
    page2.classList.add('active');
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Handle copy and submit
async function handleCopyAndSubmit() {
    try {
        // Copy to clipboard
        await navigator.clipboard.writeText(generatedReview);
        
        // Show confetti
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
        
        // Show success message
        showToast('Review copied! Opening Google Reviews...', 'success');
        
        // Get correct Google Review URL
        const reviewUrl = (config.multiBusinessMode && selectedBusiness) 
            ? selectedBusiness.googleReviewUrl 
            : config.googleReviewUrl;
        
        // Open Google Reviews in new tab
        setTimeout(() => {
            window.open(reviewUrl, '_blank');
        }, 500);
        
    } catch (error) {
        console.error('Copy error:', error);
        showToast('Failed to copy. Please copy manually.', 'error');
    }
}

// Handle back
function handleBack() {
    page2.classList.remove('active');
    page1.classList.add('active');
    
    // Reset state
    selectedRating = 0;
    selectedTags = [];
    customerNote = '';
    selectedLanguage = selectedBusiness?.supportedLanguages?.[0] || config.supportedLanguages?.[0] || 'english';
    generatedReview = '';
    regenerationCount = 0;
    
    // Reset UI
    updateStarDisplay(0);
    ratingText.textContent = 'Select a rating';
    languageContainer.classList.add('hidden');
    languageSelect.value = selectedLanguage;
    tagsContainer.classList.add('hidden');
    noteContainer.classList.add('hidden');
    customerNoteInput.value = '';
    charCount.textContent = '0';
    generateBtn.disabled = true;
    
    window.scrollTo(0, 0);
}

// Show/hide loading
function showLoading(show) {
    if (show) {
        loadingOverlay.classList.remove('hidden');
    } else {
        loadingOverlay.classList.add('hidden');
    }
}

// Show toast notification
function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.remove('hidden');
    
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// Start the app
init();


// Multi-business support
const navbar = document.getElementById('navbar');
const navbarBusinessSelector = document.getElementById('navbar-business-selector');
const navbarBusinessSelect = document.getElementById('navbar-business-select');
const businessSelectorContainer = document.getElementById('business-selector-container');
const businessCardsContainer = document.getElementById('business-cards');
const reviewFormContainer = document.getElementById('review-form-container');

let selectedBusiness = null;

function setupMultiBusinessMode() {
    // Show navbar selector
    navbarBusinessSelector.classList.remove('hidden');
    
    // Populate navbar dropdown
    navbarBusinessSelect.innerHTML = '<option value="">Choose a business...</option>';
    config.businesses.forEach(business => {
        const option = document.createElement('option');
        option.value = business.id;
        option.textContent = business.name;
        navbarBusinessSelect.appendChild(option);
    });
    
    // Show business cards
    businessSelectorContainer.classList.remove('hidden');
    reviewFormContainer.classList.add('hidden');
    
    businessCardsContainer.innerHTML = '';
    config.businesses.forEach(business => {
        const card = document.createElement('div');
        card.className = 'business-card';
        card.onclick = () => selectBusinessFromCard(business.id);
        
        const icon = getBusinessIcon(business.type);
        
        card.innerHTML = `
            ${business.logoUrl ? `<img src="${business.logoUrl}" class="business-card-logo" alt="${business.name}">` : `<div class="business-card-icon">${icon}</div>`}
            <div class="business-card-name">${business.name}</div>
            <div class="business-card-type">${business.type}</div>
        `;
        
        businessCardsContainer.appendChild(card);
    });
    
    // Navbar dropdown change
    navbarBusinessSelect.addEventListener('change', (e) => {
        if (e.target.value) {
            selectBusinessFromCard(e.target.value);
        }
    });
}

function getBusinessIcon(type) {
    const icons = {
        'Resort': '🏨',
        'Hotel': '🏨',
        'Restaurant': '🍽️',
        'School': '🎓',
        'College': '🎓',
        'Hospital': '🏥',
        'Clinic': '🏥',
        'Salon': '💇',
        'Spa': '💆',
        'Gym': '💪',
        'Shop': '🛍️',
        'Store': '🏪'
    };
    return icons[type] || '🏢';
}

async function selectBusinessFromCard(businessId) {
    try {
        showLoading(true);
        
        const response = await fetch(`${API_BASE_URL}/config/${businessId}`);
        if (!response.ok) throw new Error('Failed to load business');
        
        const businessConfig = await response.json();
        const business = config.businesses.find(b => b.id === businessId);
        
        selectedBusiness = {
            id: businessId,
            name: business.name,
            type: business.type,
            googleReviewUrl: businessConfig.googleReviewUrl,
            logoUrl: businessConfig.logoUrl,
            brandColor: businessConfig.brandColor,
            customTags: businessConfig.customTags,
            seoKeywords: businessConfig.seoKeywords,
            supportedLanguages: businessConfig.supportedLanguages
        };
        
        // Update navbar
        navbarBusinessSelect.value = businessId;
        
        // Update UI
        document.getElementById('business-name').textContent = selectedBusiness.name;
        document.getElementById('business-name-2').textContent = selectedBusiness.name;
        
        if (selectedBusiness.brandColor) {
            document.documentElement.style.setProperty('--brand-color', selectedBusiness.brandColor);
        }
        
        // Setup language selector for this business
        if (selectedBusiness.supportedLanguages && selectedBusiness.supportedLanguages.length > 0) {
            const allOptions = languageSelect.querySelectorAll('option');
            allOptions.forEach(option => {
                option.style.display = selectedBusiness.supportedLanguages.includes(option.value) ? 'block' : 'none';
            });
            languageSelect.value = selectedBusiness.supportedLanguages[0];
            selectedLanguage = selectedBusiness.supportedLanguages[0];
        }
        
        // Show review form
        businessSelectorContainer.classList.add('hidden');
        reviewFormContainer.classList.remove('hidden');
        
        showLoading(false);
    } catch (error) {
        console.error('Error:', error);
        showToast('Failed to load business', 'error');
        showLoading(false);
    }
}
