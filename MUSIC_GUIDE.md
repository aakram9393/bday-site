# Music Files Guide 🎵

## Required Music Files

You need to add the following MP3 files to the `audio/` folder:

### 1. **password-music.mp3**
- **Page:** Password page
- **Mood:** Romantic, mysterious, gentle
- **Suggestion:** Soft romantic piano or acoustic love song
- **Duration:** Can be short (2-3 minutes) and loop

### 2. **events-music.mp3**
- **Page:** Events timeline/hub page
- **Mood:** Uplifting, celebratory, joyful
- **Suggestion:** Happy birthday melody or cheerful instrumental
- **Duration:** 3-4 minutes loop

### 3. **gift-hunt-music.mp3**
- **Page:** Treasure hunt page
- **Mood:** Playful, exciting, adventurous
- **Suggestion:** Upbeat treasure hunt theme or playful melody
- **Duration:** 2-3 minutes loop

### 4. **breakfast-music.mp3**
- **Page:** Mazmi Dubai breakfast experience
- **Mood:** Calm, morning vibes, peaceful
- **Suggestion:** Soft jazz, cafe music, or morning acoustic
- **Duration:** 3-4 minutes loop

### 5. **adventure-music.mp3**
- **Page:** Chaos Kart racing adventure
- **Mood:** Energetic, fast-paced, exciting
- **Suggestion:** Racing music, upbeat electronic, action theme
- **Duration:** 2-3 minutes loop

### 6. **dinner-music.mp3**
- **Page:** Melanzane restaurant dinner
- **Mood:** Elegant, romantic, sophisticated
- **Suggestion:** Italian romantic music, soft classical, or elegant instrumental
- **Duration:** 4-5 minutes loop

### 7. **movie-music.mp3**
- **Page:** Now You See Me movie time
- **Mood:** Relaxing, cozy, romantic
- **Suggestion:** Soft background music, cozy evening vibes, or the Now You See Me soundtrack
- **Duration:** 3-4 minutes loop

## How to Add Music Files

1. **Download or create** your MP3 files
2. **Name them exactly** as shown above (case-sensitive)
3. **Place them** in the `audio/` folder in your repository
4. **Commit and push** to GitHub:
   ```bash
   cd /Users/ahmed/repositories/bday-site
   git add audio/
   git commit -m "🎵 Add music files for all pages"
   git push origin main
   ```

## Music Sources (Free/Royalty-Free)

- **YouTube Audio Library** - https://studio.youtube.com/
- **Bensound** - https://www.bensound.com/
- **Free Music Archive** - https://freemusicarchive.org/
- **Incompetech** - https://incompetech.com/music/
- **Pixabay Music** - https://pixabay.com/music/

## Notes

- All music files loop automatically
- Music changes when navigating between pages
- Previous page music stops when new page opens
- If a music file is missing, the page will work fine (just no sound)
- Video and finale pages don't have background music (video has its own audio)

## Testing

After adding the files:
1. Visit each page
2. Listen to confirm music plays and changes
3. Check browser console for any audio loading errors
4. Test on mobile devices (some browsers block autoplay)
