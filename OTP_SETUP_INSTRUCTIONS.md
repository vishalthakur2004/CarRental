# Email OTP Verification Setup Instructions

## Overview
The application now includes email OTP verification for user signup. New users must verify their email address with a 6-digit OTP before their account is created.

## Backend Implementation ✅

### Features Implemented:
- **OTP Model**: MongoDB schema with automatic expiration (5 minutes)
- **Send OTP Endpoint**: `/api/otp/send-otp` - generates and emails 6-digit code
- **Verify OTP Endpoint**: `/api/otp/verify-otp` - validates OTP and email
- **Resend OTP Endpoint**: `/api/otp/resend-otp` - allows OTP regeneration
- **Rate Limiting**: Prevents abuse (30s between sends, 5 verification attempts)
- **Security**: OTPs expire in 5 minutes, attempts are tracked

### Updated User Registration:
- Modified `/api/user/register` to require email verification
- Users must provide `verificationToken` from OTP verification

## Frontend Implementation ✅

### New Signup Flow:
1. **Email Entry**: User enters email address
2. **OTP Sent**: System sends 6-digit code to email
3. **OTP Verification**: User enters code with resend option
4. **Final Registration**: User completes name/password after verification
5. **Account Created**: Automatic login after successful registration

### UI Features:
- Step-by-step progress indicators
- Resend timer (30-second cooldown)
- Input validation (6-digit OTP only)
- Loading states and error handling
- Responsive design

## Required Environment Variables

⚠️ **IMPORTANT**: Set these environment variables for email functionality:

```bash
# Email Configuration (Gmail SMTP)
EMAIL_USER=your-gmail@gmail.com
EMAIL_APP_PASSWORD=your-gmail-app-password

# Other required variables
JWT_SECRET=your-jwt-secret-key
MONGODB_URI=mongodb://localhost:27017/carrental
IMAGEKIT_PUBLIC_KEY=your-imagekit-public-key
IMAGEKIT_PRIVATE_KEY=your-imagekit-private-key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your-id/
```

## Gmail App Password Setup

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail" application
   - Use this password (not your Gmail password) for `EMAIL_APP_PASSWORD`

## Testing the Implementation

### Manual Testing Steps:
1. **Start Backend**: `cd server && npm run server`
2. **Start Frontend**: `cd client && npm run dev`
3. **Test Signup Flow**:
   - Click "Sign up here" on login modal
   - Enter valid email address
   - Check email for OTP code
   - Enter 6-digit code
   - Complete registration with name/password
   - Verify automatic login

### API Testing with Curl:
```bash
# Send OTP
curl -X POST http://localhost:3000/api/otp/send-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Verify OTP
curl -X POST http://localhost:3000/api/otp/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","otp":"123456"}'

# Complete Registration
curl -X POST http://localhost:3000/api/user/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123","verificationToken":"token-from-verify"}'
```

## Security Features

- **Expiration**: OTPs automatically expire after 5 minutes
- **Rate Limiting**: 
  - One OTP send per 30 seconds per email
  - Maximum 5 verification attempts per OTP
- **Attempt Tracking**: Failed attempts are logged and limited
- **Clean Database**: Expired/used OTPs are automatically removed
- **No Logging**: OTPs are never logged in application logs

## Production Considerations

1. **Use Redis** for rate limiting instead of in-memory storage
2. **Configure proper SMTP** settings for production email service
3. **Set secure JWT secrets** and database credentials
4. **Enable HTTPS** for all API endpoints
5. **Add monitoring** for failed verification attempts
6. **Consider SMS backup** for OTP delivery

## Troubleshooting

### Common Issues:
- **OTP not received**: Check Gmail App Password configuration
- **Rate limiting**: Wait for cooldown period before retry
- **OTP expired**: Request new OTP (5-minute expiration)
- **Server errors**: Verify all environment variables are set

### Email Delivery Issues:
- Verify Gmail 2FA is enabled
- Check App Password is correctly set
- Ensure `EMAIL_USER` matches the Gmail account
- Check spam/junk folders
