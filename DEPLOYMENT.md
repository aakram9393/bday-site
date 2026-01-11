# 🚀 Deploying to GitHub Pages (FREE!)

Your birthday website can be hosted for **FREE** on GitHub Pages! Here's how:

## 📋 Prerequisites

- A GitHub account (free)
- Git installed on your computer
- Your media files ready (videos and audio)

## 🎯 Quick Deployment Steps

### 1. Create a New GitHub Repository

1. Go to https://github.com/new
2. Repository name: `birthday-surprise` (or any name you prefer)
3. Make it **PRIVATE** (so only you can see it until the big day!)
4. **Don't** initialize with README (we already have files)
5. Click "Create repository"

### 2. Push Your Code to GitHub

Run these commands in your terminal:

```bash
cd /Users/ahmed/repositories/bday-site

# Add all files
git add .

# Commit
git commit -m "Initial commit: Birthday website for my amazing wife 💕"

# Add your GitHub repository as remote (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/birthday-surprise.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. Scroll down to **Pages** (left sidebar)
4. Under "Source", select **main** branch
5. Click **Save**
6. Wait 1-2 minutes for deployment

Your site will be available at:
```
https://USERNAME.github.io/birthday-surprise/
```

## 🔒 Keeping It Secret (IMPORTANT!)

### Option A: Private Repository (Recommended)
- Make the repository **Private** in Settings
- Share the URL only on her birthday
- She won't be able to access it without the password anyway

### Option B: Deploy on Her Birthday
- Keep the repository private until the big day
- Make it public on her birthday morning
- Or create a custom domain (see below)

## 📦 Handling Large Media Files

If your videos are too large (> 100MB), you have options:

### Option 1: Use Git LFS (Large File Storage)
```bash
# Install Git LFS
brew install git-lfs  # macOS
# or download from: https://git-lfs.github.com

# Initialize Git LFS
git lfs install

# Track large files
git lfs track "*.mp4"
git lfs track "*.mp3"

# Add and commit
git add .gitattributes
git add videos/ audio/
git commit -m "Add media files with Git LFS"
git push
```

### Option 2: Upload via GitHub Web Interface
1. Go to your repository on GitHub
2. Navigate to `videos/` folder
3. Click "Add file" > "Upload files"
4. Drag and drop your video files
5. Commit directly to main branch

### Option 3: Use External Hosting for Videos
- Upload videos to **Google Drive**, **Dropbox**, or **YouTube (unlisted)**
- Update the video `src` in `index.html` to point to the hosted URL

Example for Google Drive:
```html
<source src="https://drive.google.com/uc?export=download&id=YOUR_FILE_ID" type="video/mp4">
```

## 🌐 Custom Domain (Optional)

Want a custom URL like `happybirthday.com`?

1. Buy a domain (around $10-15/year) from:
   - Namecheap.com
   - GoDaddy.com
   - Google Domains

2. In your GitHub repository Settings > Pages:
   - Add your custom domain
   - Wait for DNS to propagate (24-48 hours)

3. Configure DNS with your domain provider:
   - Add CNAME record pointing to `USERNAME.github.io`

## 🧪 Testing Your Deployed Site

After deployment:
1. Visit your GitHub Pages URL
2. Test all features:
   - ✅ Password entry
   - ✅ Videos play
   - ✅ Music plays
   - ✅ All pages transition smoothly
   - ✅ Responsive on mobile

## 📱 Sharing the Link

On her birthday, you can:
1. **QR Code**: Generate a QR code for the URL (use qr-code-generator.com)
2. **Short Link**: Use bit.ly to create a memorable short URL
3. **Direct Link**: Send her the URL via text or email

## 🔧 Making Updates

If you need to change anything:

```bash
# Make your changes to the files
git add .
git commit -m "Update: description of changes"
git push
```

Changes will be live in 1-2 minutes!

## 💡 Pro Tips

1. **Test in Incognito Mode** - To see it as she will see it
2. **Check Mobile** - Open on your phone to test responsive design
3. **Backup Your Files** - Keep a local copy of all videos/audio
4. **Set Birthday Date Correctly** - Update the date in script.js before deploying
5. **Clear Cache** - If changes don't appear, clear browser cache (Ctrl+Shift+R)

## 🆘 Troubleshooting

**"Repository not found" error:**
- Make sure you replaced USERNAME with your actual GitHub username

**Videos not playing:**
- Check file sizes (each file should be < 100MB for GitHub)
- Use Git LFS for larger files
- Or host videos externally

**Page not loading:**
- Wait 2-3 minutes after enabling GitHub Pages
- Check that index.html is in the root directory
- Make sure repository is public (or you're logged in if private)

**Music not autoplaying:**
- This is normal browser behavior
- User needs to interact with page first
- It will start after password is entered

## 📊 Viewing Analytics (Optional)

Want to know when she visits the site?

Add Google Analytics:
1. Create free Google Analytics account
2. Add tracking code to your index.html
3. See visits in real-time on her birthday!

---

## ✨ Summary

GitHub Pages is:
- ✅ **100% FREE**
- ✅ **Fast and reliable**
- ✅ **HTTPS secure**
- ✅ **Easy to update**
- ✅ **No server management needed**

Perfect for your romantic surprise! 💕
