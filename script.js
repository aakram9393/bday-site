// Configuration
const CONFIG = {
    password: '282025', // Change this to your desired password
    birthdayDate: new Date('2026-01-25').toDateString(), // January 25, 2026
    testMode: false, // Set to true to unlock all events immediately for testing
    countdownTest: true, // Set to true to show countdown immediately for testing, false to wait for Jan 25
};

// Fireworks Animation - Enhanced & Modern
class Firework {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.animationId = null;
        this.trails = [];
    }

    createParticle(x, y, isFinale = false) {
        const colors = [
            '#667eea', '#764ba2', '#f093fb', '#4facfe', 
            '#00f2fe', '#43e97b', '#fa709a', '#feca57',
            '#ff6b6b', '#ee5a6f', '#c44569', '#f8b500'
        ];
        const particleCount = isFinale ? 100 : 60;
        const speed = isFinale ? 15 : 12;
        
        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = Math.random() * speed + 5;
            
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                life: 1,
                maxLife: 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 4 + 2,
                decay: Math.random() * 0.015 + 0.01
            });
        }
    }

    launch(isFinale = false) {
        const x = Math.random() * this.canvas.width;
        const y = Math.random() * this.canvas.height * 0.6;
        this.createParticle(x, y, isFinale);
        
        // Add launch trail
        this.createLaunchTrail(x, y);
    }

    createLaunchTrail(x, y) {
        for (let i = 0; i < 20; i++) {
            this.trails.push({
                x: x,
                y: this.canvas.height,
                targetY: y,
                progress: i / 20,
                life: 1
            });
        }
    }

    update() {
        // Create dark gradient background for better firework visibility
        const gradient = this.ctx.createRadialGradient(
            this.canvas.width / 2, this.canvas.height / 2, 0,
            this.canvas.width / 2, this.canvas.height / 2, this.canvas.width / 2
        );
        gradient.addColorStop(0, 'rgba(0, 0, 20, 0.1)');
        gradient.addColorStop(1, 'rgba(0, 0, 40, 0.2)');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw trails
        for (let i = this.trails.length - 1; i >= 0; i--) {
            const t = this.trails[i];
            t.life -= 0.05;
            
            if (t.life <= 0) {
                this.trails.splice(i, 1);
                continue;
            }
            
            const currentY = this.canvas.height - (this.canvas.height - t.targetY) * t.progress;
            
            this.ctx.beginPath();
            this.ctx.arc(t.x, currentY, 2, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 220, 100, ${t.life})`;
            this.ctx.fill();
        }
        
        // Update and draw particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.98; // air resistance
            p.vy += 0.15; // gravity
            p.life -= p.decay;
            
            if (p.life <= 0) {
                this.particles.splice(i, 1);
                continue;
            }
            
            // Draw particle with glow effect
            this.ctx.save();
            this.ctx.globalAlpha = p.life;
            
            // Outer glow
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
            const gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
            gradient.addColorStop(0, p.color);
            gradient.addColorStop(1, 'transparent');
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
            
            // Inner particle
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = p.color;
            this.ctx.fill();
            
            this.ctx.restore();
        }
        
        this.animationId = requestAnimationFrame(() => this.update());
    }

    start() {
        this.update();
    }

    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.particles = [];
        this.trails = [];
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

// Countdown Manager
class CountdownManager {
    constructor() {
        this.countdownPage = document.getElementById('countdown-page');
        this.countdownDisplay = document.querySelector('.countdown-display');
        this.countdownMessage = document.querySelector('.countdown-message');
        this.canvas = document.getElementById('fireworks-canvas');
        this.fireworks = null;
        this.intervalId = null;
        this.secondsRemaining = 10;
        
        // Set canvas size
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });
    }

    shouldShowCountdown() {
        // Show countdown if test flag is true OR if it's January 25, 2026
        if (CONFIG.countdownTest) {
            return true;
        }
        
        const today = new Date().toDateString();
        return today === CONFIG.birthdayDate;
    }

    start() {
        if (!this.shouldShowCountdown()) {
            this.countdownPage.classList.add('hidden');
            return false;
        }

        this.countdownPage.classList.remove('hidden');
        this.fireworks = new Firework(this.canvas);
        this.fireworks.start();
        
        // Launch fireworks at intervals
        this.fireworkLauncher = setInterval(() => {
            this.fireworks.launch();
        }, 300);
        
        // Play countdown music
        const countdownMusic = document.getElementById('countdown-music');
        if (countdownMusic) {
            countdownMusic.volume = 0.6;
            countdownMusic.play().catch(e => {
                console.log('Countdown music autoplay blocked. Click anywhere to enable music.');
            });
        }
        
        this.updateDisplay();
        this.intervalId = setInterval(() => this.tick(), 1000);
        
        return true;
    }

    tick() {
        this.secondsRemaining--;
        this.updateDisplay();
        
        // Increase firework frequency as we get closer
        if (this.secondsRemaining <= 3) {
            clearInterval(this.fireworkLauncher);
            this.fireworkLauncher = setInterval(() => {
                this.fireworks.launch();
            }, 100);
        }
        
        if (this.secondsRemaining <= 0) {
            this.complete();
        }
    }

    updateDisplay() {
        if (this.secondsRemaining > 0) {
            this.countdownDisplay.textContent = this.secondsRemaining;
        } else {
            this.countdownDisplay.textContent = '🎉';
            this.countdownMessage.textContent = 'Happy Birthday, My Love! 💖';
        }
    }

    complete() {
        clearInterval(this.intervalId);
        clearInterval(this.fireworkLauncher);
        
        // Massive finale burst of fireworks
        for (let i = 0; i < 10; i++) {
            setTimeout(() => this.fireworks.launch(true), i * 150);
        }
        
        // Transition to password page after celebration
        setTimeout(() => {
            this.fireworks.stop();
            
            // Stop countdown music
            const countdownMusic = document.getElementById('countdown-music');
            if (countdownMusic) {
                countdownMusic.pause();
                countdownMusic.currentTime = 0;
            }
            
            this.countdownPage.classList.remove('active');
            this.countdownPage.classList.add('hidden');
            
            // Now show password page
            const passwordPage = document.getElementById('password-page');
            passwordPage.classList.remove('hidden');
            passwordPage.classList.add('active');
            
            console.log('Transitioning to password page');
        }, 2000);
    }
}

// Page Management
class PageManager {
    constructor() {
        this.pages = {
            countdown: document.getElementById('countdown-page'),
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
        
        // Music for each page
        this.musicTracks = {
            countdown: document.getElementById('countdown-music'),
            password: document.getElementById('password-music'),
            events: document.getElementById('events-music'),
            giftHunt: document.getElementById('gift-hunt-music'),
            breakfast: document.getElementById('breakfast-music'),
            adventure: document.getElementById('adventure-music'),
            dinner: document.getElementById('dinner-music'),
            movie: document.getElementById('movie-music')
        };
        this.currentMusic = null;
        this.musicEnabled = false; // Music starts disabled until user enables it
        
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
        
        // Pause videos when leaving their pages
        this.pauseAllVideos();
        
        // Hide all pages
        Object.values(this.pages).forEach(page => {
            page.classList.remove('active');
            page.classList.add('hidden');
        });

        // Show requested page
        if (this.pages[pageName]) {
            this.pages[pageName].classList.add('active');
            this.pages[pageName].classList.remove('hidden');
            this.currentPage = pageName;
            
            // Change music for the new page
            this.playMusicForPage(pageName);
            
            // Save state
            this.saveState();
        }
    }

    pauseAllVideos() {
        // Pause birthday video
        const birthdayVideo = document.getElementById('birthday-video');
        if (birthdayVideo) {
            birthdayVideo.pause();
        }
        
        // Pause finale video
        const finaleVideo = document.getElementById('finale-video');
        if (finaleVideo) {
            finaleVideo.pause();
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

    playMusicForPage(pageName) {
        // Stop current music if playing
        if (this.currentMusic) {
            this.currentMusic.pause();
            this.currentMusic.currentTime = 0;
        }
        
        // Only play music if user has enabled it
        if (!this.musicEnabled) {
            return;
        }
        
        // Play music for the new page (if available)
        if (this.musicTracks[pageName]) {
            this.currentMusic = this.musicTracks[pageName];
            this.currentMusic.play().catch(error => {
                console.log('Music autoplay prevented:', error);
            });
        }
    }

    toggleMusic() {
        this.musicEnabled = !this.musicEnabled;
        
        if (this.musicEnabled) {
            // Enable music and play current page music
            this.playMusicForPage(this.currentPage);
        } else {
            // Disable music and stop all
            this.stopAllMusic();
        }
        
        return this.musicEnabled;
    }

    stopAllMusic() {
        // Stop all music tracks
        Object.values(this.musicTracks).forEach(music => {
            if (music) {
                music.pause();
                music.currentTime = 0;
            }
        });
        this.currentMusic = null;
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
            // Music will automatically play when switching to video page via showPage
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
            // Only show saved gift if it's not the last one (gift 4)
            // If on last gift, reset to gift 1 for a fresh start
            if (this.currentGift >= this.totalGifts) {
                this.currentGift = 1;
                this.saveProgress();
            }
            // Show the gift
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
        this.eventBoxes = document.querySelectorAll('.event-box');
        this.checkInterval = null;
        this.treasureHuntUnlocked = false;
        
        this.init();
    }

    init() {
        // Add click handler for treasure hunt button
        setTimeout(() => {
            const huntButton = document.querySelector('.start-hunt-btn');
            if (huntButton) {
                huntButton.addEventListener('click', () => {
                    this.pageManager.showPage('giftHunt');
                });
            }
        }, 500);

        // Start checking events
        this.startChecking();
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

        // Refresh event boxes selection to ensure we have all of them
        this.eventBoxes = document.querySelectorAll('.event-box');
        
        console.log('🔍 Checking events...');
        console.log('Test Mode:', CONFIG.testMode);
        console.log('Event boxes found:', this.eventBoxes.length);

        // If test mode is enabled, unlock all events
        if (CONFIG.testMode) {
            console.log('✅ Test mode is ON - unlocking all events');
            this.eventBoxes.forEach(box => {
                if (box.classList.contains('locked')) {
                    console.log('🔓 Unlocking event:', box.getAttribute('data-time'));
                    this.unlockEvent(box);
                }
            });
            return;
        }

        // Only unlock events if it's the birthday date
        if (currentDate !== CONFIG.birthdayDate) {
            console.log('📅 Not birthday date yet. Events stay locked.');
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
let pageManager, passwordHandler, videoHandler, giftHuntHandler, eventsManager, countdownManager;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize managers
    pageManager = new PageManager();
    countdownManager = new CountdownManager();
    passwordHandler = new PasswordHandler(pageManager);
    videoHandler = new VideoPageHandler(pageManager);
    giftHuntHandler = new GiftHuntHandler(pageManager);
    eventsManager = new EventsManager(pageManager);

    // Start with countdown if appropriate, otherwise go to password page
    const showingCountdown = countdownManager.start();
    if (!showingCountdown) {
        pageManager.showPage('password');
    }

    // Make pageManager globally accessible for countdown
    window.pageManager = pageManager;

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

// Finale Event Button Handler
function initFinaleHandlers() {
    const startFinaleBtn = document.getElementById('start-finale-btn');
    
    if (startFinaleBtn) {
        startFinaleBtn.addEventListener('click', () => {
            pageManager.showPage('finale');
            eventsManager.stopChecking();
            initFinalePage();
        });
    }
}

// Initialize finale page
function initFinalePage() {
    const video = document.getElementById('finale-video');
    if (video) {
        video.play();
    }
}

// Start floating hearts
createFloatingHearts();

// Initialize all experience page handlers
initBreakfastHandlers();
initAdventureHandlers();
initDinnerHandlers();
initMovieHandlers();
initFinaleHandlers();

// Global Reset Progress Handler
function initGlobalReset() {
    const globalResetBtn = document.getElementById('global-reset-btn');
    
    if (globalResetBtn) {
        globalResetBtn.addEventListener('click', () => {
            if (confirm('🔄 Reset all progress?\n\nThis will:\n• Clear your current page\n• Reset gift hunt progress\n• Start fresh from the beginning\n\nAre you sure?')) {
                // Clear all localStorage data
                localStorage.removeItem('birthdayWebsiteState');
                localStorage.removeItem('giftHuntProgress');
                
                // Show loading state
                globalResetBtn.textContent = '⏳';
                globalResetBtn.style.pointerEvents = 'none';
                
                // Reload page after a brief delay
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            }
        });
    }
}

// Initialize global reset button
initGlobalReset();

// Music Control Button Handler
function initMusicControl() {
    const musicControlBtn = document.getElementById('music-control-btn');
    
    if (musicControlBtn) {
        musicControlBtn.addEventListener('click', () => {
            const isPlaying = pageManager.toggleMusic();
            
            // Update button appearance
            if (isPlaying) {
                musicControlBtn.textContent = '🔊';
                musicControlBtn.classList.add('playing');
            } else {
                musicControlBtn.textContent = '🔇';
                musicControlBtn.classList.remove('playing');
            }
        });
    }
}

// Initialize music control button
initMusicControl();
