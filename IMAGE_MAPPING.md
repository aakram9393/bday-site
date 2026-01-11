# 📸 Image Mapping Guide

## Gift Location Images

Rename your photos to match these exact names and place them in the `images/` folder:

### Gift Images (4 photos needed)

| File Name | Location Hint | What to Photograph |
|-----------|---------------|-------------------|
| **gift1.jpg** | Beneath the couch 👇 | Photo showing the area beneath your couch |
| **gift2.jpg** | Next to the couch 👉 | Photo showing the area next to your couch |
| **gift3.jpg** | Behind the curtain (left side) 👈 | Photo of the left curtain area |
| **gift4.jpg** | Behind the curtain (right side) 👉 | Photo of the right curtain area |

## Quick Setup Commands

```bash
# Navigate to the images folder
cd /Users/ahmed/repositories/bday-site/images/

# Copy your renamed images here
# Then commit and push
git add .
git commit -m "Add gift location photos"
git push
```

## Image Tips

- **Format**: JPG or PNG (JPG recommended for smaller file size)
- **Size**: Any size works (will auto-resize), but 1200x800px is ideal
- **Orientation**: Landscape (horizontal) works best
- **Quality**: Take clear, well-lit photos
- **Hints**: Can be subtle or obvious - your choice!

## Current Status

✅ Test mode is **ENABLED** - All events will unlock immediately for testing
❌ Change `testMode: false` in `script.js` before the actual birthday

## How to Disable Test Mode (IMPORTANT!)

**Before January 25th, you MUST disable test mode:**

1. Open `script.js`
2. Find line 4: `testMode: true,`
3. Change to: `testMode: false,`
4. Commit and push

This ensures events only unlock at their scheduled times on her birthday!
