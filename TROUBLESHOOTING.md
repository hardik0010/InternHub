# Email Verification Troubleshooting Guide

## Issue: Email verification link shows "Verification Failed"

### Step 1: Check Backend Logs
1. Start your backend server: `cd backend && npm start`
2. Look for console logs when you click the verification link
3. You should see logs like:
   - "Verification attempt for token: [token]"
   - "User found: Yes/No"
   - "Verification URL generated: [url]"

### Step 2: Test Backend Connection
1. Open your browser and go to: `http://localhost:5000/api/users/test`
2. You should see: `{"message":"User routes are working!","timestamp":"..."}`

### Step 3: Debug Token (if needed)
1. Copy the token from your email verification link
2. Go to: `http://localhost:5000/api/users/debug-token/[YOUR_TOKEN]`
3. This will tell you if the token exists in the database

### Step 4: Check Environment Variables
Make sure your backend `.env` file has:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SENDGRID_API_KEY=your_sendgrid_key
EMAIL_FROM=your_verified_email
FRONTEND_URL=http://localhost:3000
```

### Step 5: Common Issues & Solutions

#### Issue: "No user found with token"
- **Cause**: Token doesn't exist in database
- **Solution**: Register again with a new email

#### Issue: "Server error"
- **Cause**: Database connection or environment variable issues
- **Solution**: Check MongoDB connection and environment variables

#### Issue: Frontend shows error but backend logs show success
- **Cause**: CORS or proxy configuration issue
- **Solution**: Check if frontend proxy is set to `http://localhost:5000`

### Step 6: Manual Verification (if needed)
If the automatic verification isn't working, you can manually verify a user:

1. Find the user in your MongoDB database
2. Set `isVerified: true`
3. Remove the `verificationToken` field

### Step 7: Test Complete Flow
1. Register a new user
2. Check email for verification link
3. Click the link
4. Check browser console for any errors
5. Check backend console for logs
6. Try logging in after verification

## Still Having Issues?

If you're still experiencing problems:

1. **Check the exact error message** in the browser console
2. **Check backend logs** for any error messages
3. **Verify your MongoDB connection** is working
4. **Ensure all environment variables** are properly set
5. **Try registering with a different email** to test the flow

## Debug Commands

```bash
# Test backend
curl http://localhost:5000/api/users/test

# Test specific token (replace [TOKEN] with actual token)
curl http://localhost:5000/api/users/debug-token/[TOKEN]

# Check if verification endpoint works
curl http://localhost:5000/api/users/verify-email/[TOKEN]
``` 