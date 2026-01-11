// Configuration
const CONFIG = {
    password: 'iloveyou', // Change this to your desired password
    birthdayDate: new Date().toDateString(), // Today's date for testing
};

// Page Management
class PageManager {
    constructor() {
        this.pages = {
            password: document.getElementById('password-page'),
            video: document.getElementById('video-page'),
            giftHunt: document.getElementById('gift-hunt-page'),
            events: document.getElementById('events-page'),
            finale: document.getElementById('finale-page')
        };
        this.currentPage = 'password';
        this.backgroundMusic = document.getElementById('background-music');
    }

    showPage(pageName) {
        // Hide all pages
        Object.values(this.pages).forEach(page => {
            page.classList.remove('active');
        });

        // Show requested page
        if (this.pages[pageName]) {
            this.pages[pageName].classList.add('active');
            this.currentPage = pageName;
        }
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
        this.button = document.getElementById('continue-to-gifts');
        
        this.init();
    }

    init() {
        this.button.addEventListener('click', () => {
            this.pageManager.showPage('giftHunt');
        });
    }
}

// Gift Hunt Handler
class GiftHuntHandler {
    constructor(pageManager) {
        this.pageManager = pageManager;
        this.currentGift = 1;
        this.totalGifts = 6;
        this.giftCards = document.querySelectorAll('.single-gift-card');
        this.nextButtons = document.querySelectorAll('.next-gift-btn');
        
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
                    // Last gift, go to events page
                    this.pageManager.showPage('events');
                    eventsManager.startChecking();
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
            
            // Scroll to top smoothly
            window.scrollTo({ top: 0, behavior: 'smooth' });
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
        
        this.init();
    }

    init() {
        this.button.addEventListener('click', () => {
            this.pageManager.showPage('finale');
            this.stopChecking();
            this.initFinalePage();
        });
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

// Start floating hearts
createFloatingHearts();
