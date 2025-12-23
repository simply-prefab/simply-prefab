# Real-time Integration Setup Guide for SimplyPrefab

This guide helps you set up real email services, payment gateways, and calendar integrations for production use.

## 🔧 Configuration Setup

### 1. Environment Variables

Create a `.env` file in your project root with the following variables:

```bash
# SendGrid Email Service
REACT_APP_SENDGRID_API_KEY=your_sendgrid_api_key_here
REACT_APP_FROM_EMAIL=noreply@simplyprefab.com
REACT_APP_TEAM_EMAIL=experts@simplyprefab.com
REACT_APP_SUPPORT_EMAIL=enquiry@simplyprefab.com

# Razorpay Payment Gateway (Primary for India)
REACT_APP_RAZORPAY_KEY_ID=rzp_test_your_key_id_here
REACT_APP_RAZORPAY_KEY_SECRET=your_secret_key_here
REACT_APP_RAZORPAY_WEBHOOK_SECRET=your_webhook_secret_here

# Stripe Payment Gateway (Alternative/International)
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key_here

# EmailJS (Fallback Email Service)
REACT_APP_EMAILJS_SERVICE_ID=your_emailjs_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_emailjs_public_key

# Application Configuration
REACT_APP_WEBSITE_URL=https://simplyprefab.com
REACT_APP_SUPPORT_PHONE=+91-XXXX-XXXXXX
```

## 📧 Email Service Setup

### Option 1: SendGrid (Recommended)

1. **Create SendGrid Account**
   - Go to [sendgrid.com](https://sendgrid.com)
   - Sign up for a free account (100 emails/day free)
   - Verify your account and domain

2. **Generate API Key**
   - Go to Settings > API Keys
   - Create a new API key with "Full Access"
   - Copy the key to `REACT_APP_SENDGRID_API_KEY`

3. **Verify Sender Identity**
   - Go to Settings > Sender Authentication
   - Verify your from email (`noreply@simplyprefab.com`)
   - Add SPF and DKIM records to your domain

4. **Create Email Templates** (Optional)
   - Go to Email API > Dynamic Templates
   - Create templates for consultation confirmations
   - Use the template IDs in your code

### Option 2: EmailJS (Fallback)

1. **Create EmailJS Account**
   - Go to [emailjs.com](https://www.emailjs.com)
   - Sign up for a free account

2. **Setup Email Service**
   - Add an email service (Gmail, Outlook, etc.)
   - Configure SMTP settings
   - Note the Service ID

3. **Create Email Template**
   - Create a template for consultation emails
   - Use variables like `{{to_email}}`, `{{subject}}`, `{{html_message}}`
   - Note the Template ID

4. **Get Public Key**
   - Go to Account > API Keys
   - Copy your Public Key

## 💳 Payment Gateway Setup

### Option 1: Razorpay (Primary for India)

1. **Create Razorpay Account**
   - Go to [razorpay.com](https://razorpay.com)
   - Sign up for a business account
   - Complete KYC verification

2. **Get API Keys**
   - Go to Account & Settings > API Keys
   - Generate API keys for test/live mode
   - Copy Key ID and Key Secret

3. **Setup Webhooks**
   - Go to Account & Settings > Webhooks
   - Add webhook URL: `https://yoursite.com/api/webhooks/razorpay`
   - Select events: `payment.captured`, `payment.failed`
   - Copy webhook secret

4. **Payment Methods**
   - Enable desired payment methods
   - UPI, Cards, Net Banking, Wallets
   - Set up settlement account

### Option 2: Stripe (International)

1. **Create Stripe Account**
   - Go to [stripe.com](https://stripe.com)
   - Sign up for an account

2. **Get API Keys**
   - Go to Developers > API keys
   - Copy Publishable key for frontend
   - Use Secret key for backend (not in frontend!)

3. **Setup Webhooks**
   - Go to Developers > Webhooks
   - Add endpoint for payment events
   - Copy webhook signing secret

## 📅 Calendar Integration

The system automatically generates `.ics` calendar files that work with:
- Google Calendar
- Outlook
- Apple Calendar
- Any iCal-compatible calendar app

### Enhanced Calendar Integration (Optional)

For direct calendar API integration:

1. **Google Calendar API**
   ```bash
   REACT_APP_GOOGLE_CALENDAR_API_KEY=your_api_key
   REACT_APP_GOOGLE_CALENDAR_ID=your_calendar_id
   ```

2. **Microsoft Graph API**
   ```bash
   REACT_APP_MICROSOFT_CLIENT_ID=your_client_id
   REACT_APP_MICROSOFT_TENANT_ID=your_tenant_id
   ```

## 🚀 Deployment Setup

### 1. Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Add environment variables in Vercel dashboard
# Vercel Dashboard > Project > Settings > Environment Variables
```

### 2. Netlify Deployment

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod

# Add environment variables in Netlify dashboard
# Netlify Dashboard > Site > Environment Variables
```

### 3. Custom Server Deployment

For custom servers, ensure environment variables are properly set:

```bash
# For production, use actual values
export REACT_APP_SENDGRID_API_KEY="SG.actual_key_here"
export REACT_APP_RAZORPAY_KEY_ID="rzp_live_actual_key"
# ... other variables

# Build and serve
npm run build
npm run start
```

## 🔒 Security Best Practices

### 1. API Key Security

- **Never commit API keys to git**
- Use environment variables for all sensitive data
- Rotate keys regularly
- Use different keys for test/production

### 2. Payment Security

- Always verify payments on the backend
- Use webhooks for payment confirmation
- Implement proper signature verification
- Store minimal payment data

### 3. Email Security

- Use domain authentication (SPF, DKIM)
- Implement rate limiting
- Validate email addresses
- Use templates to prevent injection

## 🧪 Testing

### 1. Development Mode

The system automatically uses mock services in development:

```javascript
// In development, payments are mocked
if (isDevelopment) {
  return this.processMockPayment(paymentDetails);
}
```

### 2. Test Mode

Use test API keys for testing:

```bash
# Razorpay test keys
REACT_APP_RAZORPAY_KEY_ID=rzp_test_xxxxx

# Stripe test keys  
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
```

### 3. Production Testing

- Test with small amounts first
- Verify all email notifications
- Check calendar invitations
- Test payment failure scenarios

## 📊 Monitoring

### 1. Payment Monitoring

- Monitor failed payments
- Track conversion rates
- Set up alerts for payment issues

### 2. Email Monitoring

- Track delivery rates
- Monitor spam complaints
- Check bounce rates

### 3. Application Monitoring

- Use error tracking (Sentry, LogRocket)
- Monitor API response times
- Track user conversion funnel

## 🆘 Troubleshooting

### Common Issues

1. **Emails not sending**
   - Check API key validity
   - Verify sender authentication
   - Check spam folders
   - Validate email addresses

2. **Payments failing**
   - Verify API keys
   - Check webhook configuration
   - Validate payment amounts
   - Check currency settings

3. **Calendar invitations not working**
   - Verify iCal format
   - Check email attachment settings
   - Test with different calendar apps

### Support Resources

- **SendGrid Support**: [sendgrid.com/support](https://sendgrid.com/support)
- **Razorpay Support**: [razorpay.com/support](https://razorpay.com/support)
- **Stripe Support**: [stripe.com/support](https://stripe.com/support)

## 📞 Production Checklist

Before going live:

- [ ] All API keys configured and tested
- [ ] Domain authentication setup for emails
- [ ] Payment webhook endpoints configured
- [ ] SSL certificate installed
- [ ] Error monitoring setup
- [ ] Backup payment method configured
- [ ] Test complete user journey
- [ ] Legal compliance (terms, privacy policy)
- [ ] Customer support contact information
- [ ] Performance monitoring setup

---

**Note**: This integration provides production-ready email, payment, and calendar functionality. The system gracefully falls back to mock services in development and provides comprehensive error handling for production use.