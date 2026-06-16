# StudyCalc — Vercel Deployment Guide

## Deploy in 3 Steps

### Step 1: Push to GitHub
1. Create a new repo at github.com
2. Run these commands in your project folder:
```
git init
git add .
git commit -m "Initial StudyCalc deploy"
git remote add origin https://github.com/YOUR_USERNAME/studycalc.git
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to vercel.com → Sign in with GitHub
2. Click "Add New Project" → Select your studycalc repo
3. Build settings (auto-detected):
   - Framework: Vite
   - Build Command: npm run build
   - Output Directory: dist
4. Click Deploy — live in 30 seconds!

Your site URL: https://studycalc.vercel.app

### Step 3: Set Up Contact Form (Optional)
1. Go to formspree.io → Create free account
2. Create a new form → Copy your Form ID
3. In src/components/LegalPages.tsx, replace YOUR_FORMSPREE_ID with your real ID

## Google AdSense Setup (After Approval)
1. Open src/components/AdPlaceholder.tsx
2. Replace the ADVERTISEMENT div in each component with your <ins> AdSense tag
3. In index.html, uncomment the AdSense <script> tag and add your Publisher ID

## Custom Domain (Optional)
1. Buy a domain (e.g. studycalc.in) from GoDaddy/Namecheap (~₹500/year)
2. Vercel Dashboard → Your Project → Settings → Domains → Add domain
3. Update sitemap.xml and robots.txt with your real domain
