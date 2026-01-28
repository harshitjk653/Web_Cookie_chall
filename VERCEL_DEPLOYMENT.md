# Deploying to Vercel

This guide will help you deploy the JWT Role Escalation CTF Challenge to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **MongoDB Atlas Account**: Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) (free tier available)
3. **Vercel CLI** (optional): Install with `npm i -g vercel`

## Step 1: Set Up MongoDB Atlas

1. Create a free MongoDB Atlas cluster
2. Create a database user with read/write permissions
3. Whitelist all IP addresses (0.0.0.0/0) for Vercel serverless functions
4. Get your connection string (it should look like):
   ```
   mongodb+srv://username:password@cluster.mongodb.net/jwt_ctf?retryWrites=true&w=majority
   ```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your Git repository (GitHub, GitLab, or Bitbucket)
3. Configure your project:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (or your project root)
   - **Build Command**: Leave default
   - **Output Directory**: Leave default

4. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A secure random string (e.g., `your_super_secret_jwt_key_12345`)
   - `FLAG`: Your CTF flag (e.g., `AKIRA{jwt_role_escalation_success}`)

5. Click **Deploy**

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from your project directory:
   ```bash
   vercel
   ```

4. Follow the prompts and add environment variables when asked

5. For production deployment:
   ```bash
   vercel --prod
   ```

## Step 3: Configure Environment Variables

After deployment, you can manage environment variables in the Vercel Dashboard:

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add/update the following variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `FLAG`

4. Redeploy for changes to take effect

## Step 4: Test Your Deployment

1. Visit your Vercel URL (e.g., `https://your-project.vercel.app`)
2. Test user registration
3. Test user login
4. Test profile access
5. Test JWT manipulation for admin access

## Troubleshooting

### MongoDB Connection Issues
- Ensure your MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Verify your connection string is correct
- Check that your database user has proper permissions

### 404 Errors
- Verify `vercel.json` is in the root directory
- Check that `api/index.js` exists and is properly configured

### Environment Variables Not Working
- Ensure variables are set in Vercel Dashboard
- Redeploy after adding/changing environment variables
- Check variable names match exactly (case-sensitive)

### Function Timeout
- MongoDB Atlas free tier may have slower cold starts
- Consider upgrading to a paid tier for better performance

## Important Notes

- **Serverless Architecture**: Each request creates a new function instance
- **Cold Starts**: First request may be slower due to MongoDB connection
- **Connection Pooling**: The app uses connection caching to minimize overhead
- **Security**: Change `JWT_SECRET` to a strong random value in production

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
