# Digital Twin Deployment Guide

## ✅ Completed Setup

Your digital twin MCP server is ready for deployment! Here's what's been completed:

### 1. ✅ Data Uploaded to Upstash Vector
- **36 content chunks** uploaded successfully
- Professional profile with STAR-formatted achievements
- Skills, projects, education, and career goals included
- All data indexed and searchable via semantic search

### 2. ✅ Next.js Application Built
- TypeScript with strict type checking
- Server actions for RAG queries
- MCP protocol endpoint at `/api/mcp`
- Interactive web UI for testing
- Production build successful

### 3. ✅ Environment Configured
- `.env.local` with Upstash credentials
- Groq API key configured
- Ready for Vercel deployment

## 🚀 Deploy to Vercel (Next Steps)

### Option A: Deploy via Vercel CLI

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Deploy from the mydigitaltwin directory
cd /Users/eshaangupta/ragfood/mydigitaltwin
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - What's your project's name? mydigitaltwin
# - In which directory is your code located? ./
# - Want to modify settings? No

# Deploy to production
vercel --prod
```

### Option B: Deploy via GitHub + Vercel Dashboard

1. **Create GitHub Repository:**
   ```bash
   cd /Users/eshaangupta/ragfood/mydigitaltwin

   # Create repo on GitHub first, then:
   git remote add origin https://github.com/eshaangupta/mydigitaltwin.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Select your `mydigitaltwin` repository
   - Configure project:
     - Framework Preset: **Next.js**
     - Root Directory: `./`
     - Build Command: `npm run build`
     - Output Directory: `.next`

3. **Add Environment Variables:**
   In Vercel project settings → Environment Variables, add:
   ```
   UPSTASH_VECTOR_REST_URL=your_upstash_vector_url_here
   UPSTASH_VECTOR_REST_TOKEN=your_upstash_token_here
   GROQ_API_KEY=your_groq_api_key_here
   ```

   > **Note:** Use the actual values from your `.env.local` file

4. **Deploy!**
   - Click "Deploy"
   - Wait 2-3 minutes for build
   - Your app will be live at `https://mydigitaltwin-eshaangupta.vercel.app`

## 🧪 Test Your Deployment

Once deployed, test the endpoints:

### 1. Test MCP Server Info
```bash
curl https://your-app.vercel.app/api/mcp
```

Expected response:
```json
{
  "name": "Digital Twin MCP Server",
  "version": "1.0.0",
  "methods": [...]
}
```

### 2. Test Ping Method
```bash
curl -X POST https://your-app.vercel.app/api/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"ping","id":1}'
```

Expected response:
```json
{
  "jsonrpc": "2.0",
  "result": {
    "status": "ok",
    "message": "Digital Twin MCP server is running"
  },
  "id": 1
}
```

### 3. Test Query Method
```bash
curl -X POST https://your-app.vercel.app/api/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"query","params":{"question":"What are your Python skills?"},"id":1}'
```

Expected response:
```json
{
  "jsonrpc": "2.0",
  "result": {
    "answer": "I have advanced Python skills with 3+ years of experience...",
    "sources": [...],
    "question": "What are your Python skills?"
  },
  "id": 1
}
```

### 4. Test Web UI
Visit `https://your-app.vercel.app` in your browser:
- Check database status
- Ask test questions
- Verify sources are returned

## 📊 Expected Results

After deployment, you should have:

- ✅ Live URL: `https://mydigitaltwin-*.vercel.app`
- ✅ MCP endpoint: `https://mydigitaltwin-*.vercel.app/api/mcp`
- ✅ Web UI for testing
- ✅ 24/7 availability
- ✅ Automatic HTTPS
- ✅ Global CDN distribution

## 🔧 Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Verify Node.js version (18+)
- Check build logs in Vercel dashboard

### Environment Variables Not Working
- Ensure variables are added in Vercel dashboard
- Redeploy after adding variables
- Check variable names match exactly

### MCP Endpoint Returns Errors
- Verify Upstash credentials are correct
- Check Groq API key is valid
- Ensure 36 vectors are in Upstash database

### Query Returns "No relevant information"
- Data might not be uploaded to Upstash
- Check database status endpoint
- Re-run upload script if needed

## 🎯 Next Steps After Deployment

1. **Test All MCP Methods:**
   - `ping` - Server health check
   - `query` - Ask questions
   - `status` - Database info
   - `topics` - List categories
   - `initialize` - Verify setup

2. **Integrate with AI Tools:**
   - Configure VS Code Copilot to use your MCP server
   - Add to Claude Desktop configuration
   - Test with real interview questions

3. **Monitor Performance:**
   - Check Vercel Analytics
   - Monitor Upstash usage
   - Track Groq API calls

4. **Share Your Digital Twin:**
   - Add URL to your resume
   - Share with recruiters
   - Demo in interviews

## 📚 Additional Resources

- [Vercel Deployment Docs](https://nextjs.org/docs/deployment)
- [Upstash Vector Docs](https://upstash.com/docs/vector)
- [MCP Protocol Spec](https://modelcontextprotocol.io/)

---

**Status:** Ready to Deploy ✅
**Last Updated:** November 19, 2025
**Author:** Eshaan Gupta
