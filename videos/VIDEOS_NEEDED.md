# Video Files Required 🎥

## Overview
This folder should contain 2 video files for the birthday website.

---

## Required Video Files

### 1. **birthday-video.mp4**
- **Used on:** Video page (after password entry)
- **Purpose:** Birthday greeting/celebration video
- **When it plays:** Immediately after entering the correct password
- **Recommendations:**
  - Personal birthday message
  - Happy birthday song/music
  - Photo montage or special memories
  - Duration: 1-3 minutes recommended
  - Format: MP4 (H.264 codec for best compatibility)
  - Resolution: 1080p or 720p

**Mapped in HTML:**
```html
<video id="birthday-video" controls>
    <source src="videos/birthday-video.mp4" type="video/mp4">
</video>
```

**Page:** `video-page` (line ~33 in index.html)

---

### 2. **finale-video.mp4**
- **Used on:** Finale page (final event at 10:30 PM)
- **Purpose:** Final heartfelt message to end the day
- **When it plays:** 
  - Unlocks at 10:30 PM on January 25, 2026
  - Last event of the day
  - Accessible after all events or at 10:30 PM
- **Recommendations:**
  - Personal thank you message
  - Reflection on the special day
  - Love message or future wishes
  - Duration: 2-5 minutes recommended
  - Format: MP4 (H.264 codec for best compatibility)
  - Resolution: 1080p or 720p

**Mapped in HTML:**
```html
<video id="finale-video" controls>
    <source src="videos/finale-video.mp4" type="video/mp4">
</video>
```

**Page:** `finale-page` (line ~495 in index.html)

---

## Video Player Features

Both videos have:
- ✅ Play/pause controls
- ✅ Volume control
- ✅ Fullscreen option
- ✅ Progress bar
- ✅ Autoplay on page load (birthday video starts automatically)

---

## How to Add Videos

1. **Prepare your videos:**
   - Record or create your personal videos
   - Export/convert to MP4 format
   - Recommended encoding: H.264 video, AAC audio
   - Keep file sizes reasonable (under 100MB each if possible)

2. **Name them correctly:**
   - `birthday-video.mp4`
   - `finale-video.mp4`

3. **Add to this folder:**
   - Place both MP4 files in `/videos/` folder

4. **Commit and push:**
   ```bash
   cd /Users/ahmed/repositories/bday-site
   git add videos/
   git commit -m "🎥 Add birthday videos"
   git push origin main
   ```

5. **For large files (>50MB):**
   - Consider using Git LFS (Large File Storage)
   - Or use video hosting (YouTube unlisted, Vimeo) and embed links
   - Or compress videos to reduce file size

---

## Video Compression Tips

If your videos are too large for GitHub:

**Option 1: Use Handbrake (Free)**
- Download: https://handbrake.fr/
- Preset: "Web" → "Gmail Medium 5 Minutes 720p30"
- This will compress while maintaining quality

**Option 2: Use FFmpeg (Command line)**
```bash
ffmpeg -i input.mp4 -vcodec h264 -acodec aac -b:v 1500k output.mp4
```

**Option 3: Online Tools**
- https://www.freeconvert.com/video-compressor
- https://www.videosmaller.com/

---

## File Size Recommendations

| Video | Recommended Size | Maximum Size |
|-------|-----------------|--------------|
| birthday-video.mp4 | 20-50 MB | 100 MB |
| finale-video.mp4 | 20-50 MB | 100 MB |

---

## Current Status

- [ ] birthday-video.mp4 - **NOT ADDED YET**
- [ ] finale-video.mp4 - **NOT ADDED YET**

---

## Testing

After adding videos:
1. Visit https://aakram9393.github.io/bday-site/
2. Enter password: **282025**
3. Check if birthday video plays automatically
4. Navigate through events to 10:30 PM event (or use test mode)
5. Check if finale video plays on the final page

---

## Troubleshooting

**Video doesn't play?**
- Check file name matches exactly: `birthday-video.mp4` or `finale-video.mp4`
- Ensure MP4 format (not MOV, AVI, etc.)
- Try different browser (Chrome, Firefox, Safari)
- Check file isn't corrupted

**Video too large to upload?**
- Use compression tools mentioned above
- Consider Git LFS: https://git-lfs.github.com/
- Or host externally and update src URL in HTML

**Video quality poor?**
- Use higher bitrate when compressing
- Start with higher resolution source video
- Balance between quality and file size
