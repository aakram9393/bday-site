// Configuration
const CONFIG = {
    password: '282025', // Change this to your desired password
    birthdayDate: new Date('2026-01-25').toDateString(), // January 25, 2026
    testMode: false, // Set to true to unlock all events immediately for testing
};

// Page Management
class PageManager {
    constructor() {
        this.pages = {
            password: document.getElementById('password-page'),
            video: document.getElementById('video-page'),
            events: document.getElementById('events-page'),
            giftHunt: document.getElementById('gift-hunt-page'),
            breakfast: document.getElementById('breakfast-page'),
            adventure: document.getElementById('adventure-page'),
            dinner: document.getElementById('dinner-page'),
            movie: document.getElementById('movie-page'),
            finale: document.getElementById('finale-page')
        };
        this.currentPage = 'password';
        this.backgroundMusic = document.getElementById('background-music');
        
        // Load saved state
        this.loadState();
    }

    showPage(pageName) {
        // Prevent direct navigation to finale from page load
        // Finale can only be accessed through the events page button
        if (pageName === 'finale' && this.currentPage === 'password') {
            console.log('Finale access blocked - must progress through the website first');
            return;
        }
        
        // Hide all pages
        Object.values(this.pages).forEach(page => {
            page.classList.remove('active');
        });

        // Show requested page
        if (this.pages[pageName]) {
            this.pages[pageName].classList.add('active');
            this.currentPage = pageName;
            
            // Save state
            this.saveState();
        }
    }

    saveState() {
        const state = {
            currentPage: this.currentPage,
            timestamp: Date.now()
        };
        localStorage.setItem('birthdayWebsiteState', JSON.stringify(state));
    }

    loadState() {
        try {
            const savedState = localStorage.getItem('birthdayWebsiteState');
            if (savedState) {
                const state = JSON.parse(savedState);
                // Only restore if saved within last 24 hours
                if (Date.now() - state.timestamp < 24 * 60 * 60 * 1000) {
                    // Don't restore finale page - always require proper navigation
                    if (state.currentPage === 'finale') {
                        this.showPage('events');
                        return;
                    }
                    
                    // Don't restore password page - it's the default
                    if (state.currentPage === 'password') {
                        return;
                    }
                    
                    this.currentPage = state.currentPage;
                    // Auto-show saved page after a brief delay
                    setTimeout(() => {
                        this.showPage(state.currentPage);
                    }, 100);
                }
            }
        } catch (e) {
            console.log('No saved state found');
        }
    }

    clearState() {
        localStorage.removeItem('birthdayWebsiteState');
    }

    playMusic() {
        this.backgroundMusic.play().catch(error => {
            console.log('Music autoplay prevented:', error);
        });
    }

    stopMusic() {
        this.backgroundMusic.pause();
        this.backgroundMusic.currentTime = 0;
    }
}

// Password Handler
class PasswordHandler {
    constructor(pageManager) {
        this.pageManager = pageManager;
        this.input = document.getElementById('password-input');
        this.button = document.getElementById('unlock-btn');
        this.errorMsg = document.getElementById('password-error');

        this.init();
    }

    init() {
        this.button.addEventListener('click', () => this.checkPassword());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.checkPassword();
            }
        });
    }

    checkPassword() {
        const enteredPassword = this.input.value.trim().toLowerCase();
        
        if (enteredPassword === CONFIG.password.toLowerCase()) {
            this.errorMsg.textContent = '';
            this.pageManager.playMusic();
            this.pageManager.showPage('video');
            this.initVideoPage();
        } else {
            this.errorMsg.textContent = '❌ Incorrect password. Try again, my love!';
            this.input.value = '';
            this.input.focus();
        }
    }

    initVideoPage() {
        const video = document.getElementById('birthday-video');
        video.play();
    }
}

// Video Page Handler
class VideoPageHandler {
    constructor(pageManager) {
        this.pageManager = pageManager;
        this.button = document.getElementById('continue-to-events');
        this.backButton = document.getElementById('video-back-to-events');
        
        this.init();
    }

    init() {
        this.button.addEventListener('click', () => {
            this.pageManager.showPage('events');
            eventsManager.startChecking();
        });

        if (this.backButton) {
            this.backButton.addEventListener('click', () => {
                this.pageManager.showPage('events');
                eventsManager.startChecking();
            });
        }
    }
}

// Gift Hunt Handler
class GiftHuntHandler {
    constructor(pageManager) {
        this.pageManager = pageManager;
        this.currentGift = 1;
        this.totalGifts = 4;
        this.giftCards = document.querySelectorAll('.single-gift-card');
        this.nextButtons = document.querySelectorAll('.next-gift-btn');
        
        // Load saved gift progress
        this.loadProgress();
        
        this.init();
    }

    init() {
        this.nextButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                const giftNumber = index + 1;
                
                if (giftNumber < this.totalGifts) {
                    // Show next gift
                    this.showGift(giftNumber + 1);
                } else {
                    // Last gift, go back to events page
                    this.pageManager.showPage('events');
                }
            });
        });
    }

    showGift(giftNumber) {
        // Hide all gifts
        this.giftCards.forEach(card => {
            card.classList.remove('active');
        });

        // Show the requested gift
        const targetGift = document.querySelector(`[data-gift="${giftNumber}"]`);
        if (targetGift) {
            targetGift.classList.add('active');
            this.currentGift = giftNumber;
            this.saveProgress();
            
            // Scroll to top smoothly
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    saveProgress() {
        localStorage.setItem('currentGift', this.currentGift);
    }

    loadProgress() {
        const saved = localStorage.getItem('currentGift');
        if (saved) {
            this.currentGift = parseInt(saved);
            // Show the saved gift
            setTimeout(() => {
                this.showGift(this.currentGift);
            }, 100);
        }
    }
}

// Events Timeline Manager
class EventsManager {
    constructor(pageManager) {
        this.pageManager = pageManager;
        this.button = document.getElementById('continue-to-finale');
        this.eventBoxes = document.querySelectorAll('.event-box');
        this.checkInterval = null;
        this.treasureHuntUnlocked = false;
        
        this.init();
    }

    init() {
        this.button.addEventListener('click', () => {
            if (this.canAccessFinale()) {
                this.pageManager.showPage('finale');
                this.stopChecking();
                this.initFinalePage();
            } else {
                this.showFinaleBlockedMessage();
            }
        });

        // Add click handler for treasure hunt button
        setTimeout(() => {
            const huntButton = document.querySelector('.start-hunt-btn');
            if (huntButton) {
                huntButton.addEventListener('click', () => {
                    this.pageManager.showPage('giftHunt');
                });
            }
        }, 500);

        // Update finale button appearance based on availability
        this.updateFinaleButton();
    }

    updateFinaleButton() {
        if (!this.canAccessFinale() && !CONFIG.testMode) {
            this.button.style.opacity = '0.5';
            this.button.style.cursor = 'not-allowed';
            this.button.title = 'Available after 10 PM or when all events are unlocked';
        } else {
            this.button.style.opacity = '1';
            this.button.style.cursor = 'pointer';
            this.button.title = 'Click to view the final message';
        }
    }

    startChecking() {
        // Check immediately
        this.checkEvents();
        
        // Then check every 30 seconds
        this.checkInterval = setInterval(() => {
            this.checkEvents();
        }, 30000);
    }

    stopChecking() {
        if (this.checkInterval) {
            clearInterval(this.checkInterval);
        }
    }

    checkEvents() {
        const now = new Date();
        const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        const currentDate = now.toDateString();

        // If test mode is enabled, unlock all events
        if (CONFIG.testMode) {
            this.eventBoxes.forEach(box => {
                if (box.classList.contains('locked')) {
                    this.unlockEvent(box);
                }
            });
            return;
        }

        // Only unlock events if it's the birthday date
        if (currentDate !== CONFIG.birthdayDate) {
            return;
        }

        this.eventBoxes.forEach(box => {
            const eventTime = box.getAttribute('data-time');
            
            if (currentTime >= eventTime && box.classList.contains('locked')) {
                this.unlockEvent(box);
            }
        });

        // Update finale button availability
        this.updateFinaleButton();
    }

    unlockEvent(box) {
        box.classList.remove('locked');
        box.classList.add('unlocked');
        
        const lockIcon = box.querySelector('.lock-icon');
        const lockedMessage = box.querySelector('.locked-message');
        const eventDetails = box.querySelector('.event-details');
        
        if (lockIcon) lockIcon.textContent = '🔓';
        if (lockedMessage) lockedMessage.classList.add('hidden');
        if (eventDetails) eventDetails.classList.remove('hidden');

        // Check if this is the treasure hunt event (10:00 AM)
        const eventTime = box.getAttribute('data-time');
        if (eventTime === '10:00' && !this.treasureHuntUnlocked) {
            this.treasureHuntUnlocked = true;
            // Show notification or animation that treasure hunt is available
        }

        // Add celebratory effect
        this.celebrateUnlock(box);
    }

    celebrateUnlock(box) {
        // Create confetti effect
        for (let i = 0; i < 20; i++) {
            const confetti = document.createElement('div');
            confetti.textContent = ['🎉', '✨', '🎊', '💖'][Math.floor(Math.random() * 4)];
            confetti.style.position = 'fixed';
            confetti.style.left = `${box.getBoundingClientRect().left + Math.random() * box.offsetWidth}px`;
            confetti.style.top = `${box.getBoundingClientRect().top}px`;
            confetti.style.fontSize = '2em';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.transition = 'all 1s ease-out';
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.style.top = `${box.getBoundingClientRect().top + 100}px`;
                confetti.style.opacity = '0';
            }, 10);
            
            setTimeout(() => {
                confetti.remove();
            }, 1000);
        }
    }

    canAccessFinale() {
        // In test mode, always allow access
        if (CONFIG.testMode) {
            return true;
        }

        const now = new Date();
        const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        const currentDate = now.toDateString();

        // Check if it's after 10 PM (22:00) on the birthday date
        if (currentDate === CONFIG.birthdayDate && currentTime >= '22:00') {
            return true;
        }

        // Check if all events are unlocked
        const allUnlocked = Array.from(this.eventBoxes).every(box => !box.classList.contains('locked'));
        return allUnlocked;
    }

    showFinaleBlockedMessage() {
        // Create a temporary message overlay
        const message = document.createElement('div');
        message.className = 'finale-blocked-message';
        message.innerHTML = `
            <div class="blocked-content">
                <h3>✨ Not Yet! ✨</h3>
                <p>The final message will be available after:</p>
                <ul>
                    <li>🕙 10:00 PM arrives, OR</li>
                    <li>🎉 All events are unlocked</li>
                </ul>
                <p>Enjoy each moment of your special day! 💝</p>
            </div>
        `;
        document.body.appendChild(message);

        setTimeout(() => {
            message.classList.add('show');
        }, 10);

        setTimeout(() => {
            message.classList.remove('show');
            setTimeout(() => message.remove(), 300);
        }, 4000);
    }

    initFinalePage() {
        const video = document.getElementById('finale-video');
        video.play();
    }
}

// Testing Mode - Uncomment this to test event unlocking
class TestMode {
    static enableTestMode() {
        console.log('🧪 Test Mode Enabled');
        console.log('All events will unlock immediately for testing purposes');
        
        // Override the checkEvents method to unlock all events
        EventsManager.prototype.checkEvents = function() {
            this.eventBoxes.forEach(box => {
                if (box.classList.contains('locked')) {
                    this.unlockEvent(box);
                }
            });
        };
    }
}

// Initialize Application
let pageManager, passwordHandler, videoHandler, giftHuntHandler, eventsManager;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize managers
    pageManager = new PageManager();
    passwordHandler = new PasswordHandler(pageManager);
    videoHandler = new VideoPageHandler(pageManager);
    giftHuntHandler = new GiftHuntHandler(pageManager);
    eventsManager = new EventsManager(pageManager);

    // Uncomment the line below to enable test mode (unlocks all events immediately)
    // TestMode.enableTestMode();

    console.log('🎂 Birthday Website Loaded!');
    console.log('💝 Made with love for my wonderful wife');
});

// Add floating hearts animation
function createFloatingHearts() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.textContent = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.bottom = '-50px';
        heart.style.fontSize = `${20 + Math.random() * 20}px`;
        heart.style.opacity = '0.6';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1';
        heart.style.transition = 'all 4s ease-out';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.style.bottom = '110vh';
            heart.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
            heart.remove();
        }, 4000);
    }, 500);
}

// Breakfast Page Handlers
function initBreakfastHandlers() {
    const startBreakfastBtn = document.getElementById('start-breakfast-btn');
    const backToEventsFromBreakfast = document.getElementById('back-to-events-from-breakfast');
    
    if (startBreakfastBtn) {
        startBreakfastBtn.addEventListener('click', () => {
            pageManager.showPage('breakfast');
        });
    }
    
    if (backToEventsFromBreakfast) {
        backToEventsFromBreakfast.addEventListener('click', () => {
            pageManager.showPage('events');
        });
    }
}

// Adventure Page Handlers
function initAdventureHandlers() {
    const startAdventureBtn = document.getElementById('start-adventure-btn');
    const backToEventsFromAdventure = document.getElementById('back-to-events-from-adventure');
    
    if (startAdventureBtn) {
        startAdventureBtn.addEventListener('click', () => {
            pageManager.showPage('adventure');
        });
    }
    
    if (backToEventsFromAdventure) {
        backToEventsFromAdventure.addEventListener('click', () => {
            pageManager.showPage('events');
        });
    }
}

// Dinner Page Handlers
function initDinnerHandlers() {
    const startDinnerBtn = document.getElementById('start-dinner-btn');
    const backToEventsFromDinner = document.getElementById('back-to-events-from-dinner');
    
    if (startDinnerBtn) {
        startDinnerBtn.addEventListener('click', () => {
            pageManager.showPage('dinner');
        });
    }
    
    if (backToEventsFromDinner) {
        backToEventsFromDinner.addEventListener('click', () => {
            pageManager.showPage('events');
        });
    }
}

// Movie Page Handlers
function initMovieHandlers() {
    const startMovieBtn = document.getElementById('start-movie-btn');
    const backToEventsFromMovie = document.getElementById('back-to-events-from-movie');
    
    if (startMovieBtn) {
        startMovieBtn.addEventListener('click', () => {
            pageManager.showPage('movie');
        });
    }
    
    if (backToEventsFromMovie) {
        backToEventsFromMovie.addEventListener('click', () => {
            pageManager.showPage('events');
        });
    }
}

// Start floating hearts
createFloatingHearts();

// Initialize all experience page handlers
initBreakfastHandlers();
initAdventureHandlers();
initDinnerHandlers();
initMovieHandlers();
