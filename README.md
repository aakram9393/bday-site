# 🎂 Birthday Website for My Beloved Wife

A romantic, interactive birthday website with password protection, videos, treasure hunt, and timed event reveals.

## 🌹 Features

1. **Password Protected Entry** - Unlock with a secret word
2. **Birthday Video** - Plays automatically with background music
3. **Gift Treasure Hunt** - Interactive hints for finding 4 hidden gifts around the house
4. **Timed Events Timeline** - 6 events unlock automatically at their scheduled times (January 25, 2026)
5. **Breakfast Experience** - Special Mazmi Dubai creek breakfast page with images and details
6. **Final Thank You Video** - A heartfelt message from you
7. **Floating Hearts Animation** - Romantic atmosphere throughout
8. **Session Persistence** - Progress is saved and restored within 24 hours
9. **Responsive Design** - Works beautifully on all devices

## 📁 Project Structure

```
bday-site/
├── index.html          # Main HTML file with all pages
├── styles.css          # Enhanced styling with animations
├── script.js           # Interactive functionality and page management
├── README.md           # This file
├── IMAGE_GUIDE.md      # Guide for breakfast experience images
├── videos/
│   ├── birthday-video.mp4    # Birthday celebration video
│   └── finale-video.mp4      # Final thank you video
├── audio/
│   └── romantic-song.mp3     # Background music
└── images/
    ├── gift1.jpg             # Gift 1 location (beneath couch)
    ├── gift2.jpg             # Gift 2 location (next to couch)
    ├── gift3.jpeg            # Gift 3 location (behind left curtain)
    ├── gift4.jpeg            # Gift 4 location (behind right curtain)
    ├── breakfast-main.jpg    # Breakfast hero image (NEEDED)
    ├── breakfast-view.jpg    # Creek view image (NEEDED)
    ├── breakfast-food.jpg    # Food spread image (NEEDED)
    └── breakfast-ambiance.jpg # Restaurant ambiance (NEEDED)
```

## 🚀 Setup Instructions

### 1. Add Your Media Files

Create the necessary folders and add your media:

```bash
cd bday-site
mkdir videos audio
```

Then add:
- **videos/birthday-video.mp4** - Your birthday video (with or without audio)
- **videos/finale-video.mp4** - Your final thank you message video
- **audio/romantic-song.mp3** - The romantic song to play throughout

### 2. Configure the Password

Open `script.js` and change the password on line 3:

```javascript
password: 'iloveyou', // Change this to your desired password
```

### 3. Set the Birthday Date

In `script.js`, line 4, set the actual birthday date:

```javascript
birthdayDate: new Date('2026-02-14').toDateString(), // Change to actual birthday
```

Or keep it as `new Date().toDateString()` for testing today.

### 4. Customize Gift Hints

Edit the gift locations in `index.html` (lines 61-106) to match your actual hiding spots.

### 4. Add Required Images

You need to add 4 breakfast experience images to the `images/` folder. See `IMAGE_GUIDE.md` for detailed specifications:

- `breakfast-main.jpg` - Hero image of Dubai Creek waterfront dining
- `breakfast-view.jpg` - Creek view or restaurant exterior
- `breakfast-food.jpg` - Gourmet breakfast spread
- `breakfast-ambiance.jpg` - Restaurant atmosphere/ambiance

**Tips for finding images:**
- Search "Dubai Creek restaurant" on Unsplash or Pexels
- Look for "waterfront breakfast Dubai" images
- Ensure proper licensing for web use
- Resize large images to under 5MB each

Gift location images are already included:
- `gift1.jpg` - Beneath the couch
- `gift2.jpg` - Next to the couch  
- `gift3.jpeg` - Behind left curtain
- `gift4.jpeg` - Behind right curtain

### 5. Customize Events

Edit the event times and descriptions in `index.html` (lines 127-206) to match your planned schedule.

### 6. Test the Website

**IMPORTANT:** Test mode is currently ENABLED. All events will unlock immediately for testing.

#### Option A: Using Python's built-in server (recommended)
```bash
python3 -m http.server 8000
```
Then open: http://localhost:8000

#### Option B: Using VS Code Live Server
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

#### Option C: Direct file opening
Simply double-click `index.html` to open in your browser (some features may be limited)

### 7. Disable Test Mode Before Launch

**CRITICAL:** Before January 25, 2026, you MUST disable test mode:

1. Open `script.js`
2. Find line 5:
```javascript
testMode: true, // Set to true to unlock all events immediately for testing
```
3. Change to:
```javascript
testMode: false, // Set to true to unlock all events immediately for testing
```

This will ensure events unlock at their proper times on your wife's birthday!

## 🎨 Customization Tips

### Change Colors
Edit `styles.css` to change the color scheme. The main colors are:
- Primary: `#d63384` (pink)
- Secondary: `#667eea` (purple)
- Background gradient: Lines 8-9 in `styles.css`

### Add More Gifts
Copy one of the `.gift-card` divs in `index.html` and modify the hint text.

### Add More Events
Copy one of the `.event-box` divs in `index.html` and set the `data-time` attribute to your desired time (24-hour format).

### Change Animations
Modify the `@keyframes` sections at the bottom of `styles.css`.

## 🎯 Birthday Event Schedule (January 25, 2026)

| Time | Event | Description |
|------|-------|-------------|
| 10:00 AM | Treasure Hunt | Find 4 hidden gifts around the house |
| 11:00 AM | Breakfast at Creek | Mazmi Dubai waterfront dining experience |
| 1:00 PM | Birthday Party | Celebration with loved ones |
| 4:00 PM | Adventure Time | Special outdoor activity |
| 6:30 PM | Dinner | Romantic dinner for two |
| 10:00 PM | Movie Night | Cozy evening with favorite films |

## 🎯 Event Time Format

Events use 24-hour format in the code: `HH:MM`
- 9:00 AM = `09:00`
- 12:00 PM = `12:00`
- 3:00 PM = `15:00`
- 7:30 PM = `19:30`

## 📱 Mobile Responsive

The website is fully responsive and will work beautifully on:
- Desktop computers
- Tablets
- Smartphones

## 💡 Tips for the Big Day

1. **Test Everything** - Run through the entire experience before the birthday
2. **Check Media Files** - Ensure all videos and audio play correctly
3. **Set Up Early** - Have the website open and ready before she arrives
4. **Hide Gifts** - Make sure all gifts are hidden in their locations
5. **Full Screen** - Press F11 for full-screen mode for a better experience
6. **Sound Check** - Ensure speakers/volume are working

## 🎁 Gift Hunt Locations (Default)

1. Beneath the couch
2. Above the cupboard
3. Behind the bedroom door
4. Inside the kitchen drawer
5. Under her pillow
6. In the bathroom cabinet

**Remember to update these in the HTML file to match your actual locations!**

## ⏰ Default Event Schedule

- 9:00 AM - Breakfast in Bed
- 12:00 PM - Lunch Date
- 3:00 PM - Spa Time
- 6:00 PM - Sunset Walk
- 7:30 PM - Candlelit Dinner
- 9:00 PM - Movie & Cuddles

## 🔒 Security Note

This is a simple password protection for a romantic surprise. It's not meant for high security - just enough to keep the surprise until she enters the password!

## 💝 Final Notes

This website is crafted with love. The most important element is not the code, but the thought and effort you put into:
- Recording heartfelt videos
- Choosing the perfect song
- Hiding meaningful gifts
- Planning a special day

Make sure everything comes from your heart, and she'll love it! ❤️

## 🐛 Troubleshooting

**Music doesn't autoplay:**
- Some browsers block autoplay. User may need to click/interact first.

**Videos don't play:**
- Check file format (MP4 is recommended)
- Ensure video files are in the correct folder

**Events don't unlock:**
- Verify the birthday date is set correctly in `script.js`
- Check system time is correct
- Try enabling Test Mode for testing

**Styling looks off:**
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Try a different browser

## 📝 Browser Compatibility

Tested and working on:
- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

---

Made with ❤️ by Ahmed for his wonderful wife
