# 🚀 Deploy Your Digital Twin Now!

## ✅ What's Ready

- ✅ Code pushed to GitHub: https://github.com/Eshaan-byte/digital-twin
- ✅ 36 content chunks in Upstash Vector
- ✅ Production build tested
- ✅ Environment variables ready

## 🎯 Deploy to Vercel (2 Options)

### Option 1: Deploy via Vercel Dashboard (Recommended - Easiest)

1. **Go to Vercel:**
   - Visit: https://vercel.com/new
   - Sign in with GitHub

2. **Import Repository:**
   - Click "Import Git Repository"
   - Select: `Eshaan-byte/digital-twin`
   - Click "Import"

3. **Configure Project:**
   - Project Name: `mydigitaltwin` (or your choice)
   - Framework: Next.js (auto-detected)
   - Root Directory: `./`
   - Leave build settings as default

4. **Add Environment Variables:**
   Click "Environment Variables" and add these 3 variables:

   ```
   Name: UPSTASH_VECTOR_REST_URL
   Value: https://internal-shad-90145-us1-vector.upstash.io

   Name: UPSTASH_VECTOR_REST_TOKEN
   Value: [copy from your .env.local file]

   Name: GROQ_API_KEY
   Value: [copy from your .env.local file]
   ```

   > Copy the token values from: `/Users/eshaangupta/ragfood/mydigitaltwin/.env.local`

5. **Click Deploy!**
   - Wait 2-3 minutes for build
   - Your app will be live at: `https://mydigitaltwin-[hash].vercel.app`

### Option 2: Deploy via CLI

```bash
cd /Users/eshaangupta/ragfood/mydigitaltwin

# Deploy (this will prompt for login and setup)
npx vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? [your account]
# - Link to existing project? No
# - Project name? mydigitaltwin
# - Directory? ./
# - Override settings? No

# After deployment completes, deploy to production:
npx vercel --prod
```

## 🧪 Test Your Deployment

Once deployed, you'll get a URL like: `https://mydigitaltwin-xyz.vercel.app`

### Test 1: Visit the Web UI
```
https://your-app.vercel.app
```
- Click "Check Database" - should show 36 vectors
- Ask a test question like "What are your Python skills?"
- Verify you get an answer with sources

### Test 2: Test MCP Endpoint
```bash
# Get server info
curl https://your-app.vercel.app/api/mcp

# Ping test
curl -X POST https://your-app.vercel.app/api/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"ping","id":1}'

# Query test
curl -X POST https://your-app.vercel.app/api/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"query","params":{"question":"Tell me about your experience"},"id":1}'
```

## 📝 After Deployment

1. **Save Your URL:**
   - Add it to your resume
   - Share with recruiters
   - Add to GitHub README

2. **Update GitHub README:**
   Add a "Live Demo" section with your Vercel URL

3. **Test MCP Integration:**
   Configure VS Code or Claude Desktop to use your deployed URL

## 🎉 You're Done!

Your digital twin is now:
- ✅ Live 24/7 on Vercel
- ✅ Accessible worldwide
- ✅ HTTPS secured
- ✅ Auto-scaling
- ✅ Ready for interviews!

## 🔗 Quick Links

- **GitHub Repo:** https://github.com/Eshaan-byte/digital-twin
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Your Deployment:** https://mydigitaltwin-[hash].vercel.app (after deploy)

---

**Ready to deploy?** Choose Option 1 (Vercel Dashboard) for the easiest experience!
