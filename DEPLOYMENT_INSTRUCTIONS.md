# 🚀 Complete Deployment Guide for Your Website

## What You Need Before Starting

1. **GitHub Account** - Sign up at https://github.com if you don't have one
2. **Vercel Account** - Sign up at https://vercel.com (use your GitHub account)
3. **Database** - Your Neon database (you already have this)

## Step 1: Prepare Your Environment Variables

### Required Information:
- **Database URL**: You already have this in your `.env` file
- **Optional**: SendGrid API key (for contact forms)
- **Optional**: Stripe keys (for payments)

### What to do:
1. Keep your current `.env` file as is
2. The `.env.example` file shows what variables are available

## Step 2: Upload to GitHub

### If this is your first time:
1. Go to https://github.com
2. Click "New repository"
3. Name it: `munroe-island-website` (or any name you prefer)
4. Make it **Public** or **Private** (your choice)
5. Click "Create repository"

### Upload your files:
1. Download GitHub Desktop: https://desktop.github.com/
2. Clone your new repository to your computer
3. Copy ALL files from this folder to the GitHub repository folder
4. **IMPORTANT**: Do NOT copy the `.env` file (it contains secrets)
5. In GitHub Desktop, commit and push all files

## Step 3: Deploy to Vercel

### Connect GitHub to Vercel:
1. Go to https://vercel.com
2. Sign in with your GitHub account
3. Click "New Project"
4. Select your `munroe-island-website` repository
5. Click "Import"

### Configure Environment Variables:
1. Before clicking "Deploy", scroll down to "Environment Variables"
2. Add these variables one by one:

   **Variable Name**: `DATABASE_URL`
   **Value**: `postgresql://neondb_owner:npg_GzwY50vlFXSg@ep-round-credit-a1nshwa8-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`

   **Variable Name**: `NODE_ENV`
   **Value**: `production`

3. Click "Deploy"

## Step 4: Wait and Test

1. Vercel will build and deploy your site (takes 2-3 minutes)
2. You'll get a URL like: `https://your-site-name.vercel.app`
3. Click the URL to test your website
4. Check if all features work:
   - Homepage loads
   - Booking forms work
   - Contact forms work
   - Gallery displays images

## Step 5: Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow Vercel's instructions to update your domain's DNS

## Troubleshooting

### If deployment fails:
1. Check the "Functions" tab in Vercel for error logs
2. Make sure your DATABASE_URL is correctly added
3. Verify your Neon database is active (not paused)

### If website doesn't work:
1. Check browser console for errors (F12 → Console)
2. Verify all environment variables are set
3. Test database connection

## Making Updates

### To update your website:
1. Make changes to your files locally
2. Use GitHub Desktop to commit and push changes
3. Vercel will automatically redeploy (takes 1-2 minutes)

## Important Notes

- ✅ Your `.env` file stays on your computer (never upload it)
- ✅ Environment variables are set in Vercel dashboard
- ✅ Every GitHub push triggers automatic deployment
- ✅ Your database will work with the deployed site
- ✅ The site will be fast and reliable on Vercel

## Need Help?

If you encounter any issues:
1. Check the Vercel deployment logs
2. Verify your environment variables
3. Make sure your database is accessible
4. Contact support if needed

---

**🎉 Once deployed, your website will be live and accessible worldwide!**