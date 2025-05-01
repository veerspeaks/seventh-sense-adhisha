# Email Setup for Onboarding Form

This project uses [EmailJS](https://www.emailjs.com/) to send emails from the onboarding form. Follow these steps to set up your EmailJS account and configure the service.

## Setup Instructions

1. **Create an EmailJS Account**
   - Go to [EmailJS](https://www.emailjs.com/) and sign up for an account
   - The free tier allows 200 emails per month

2. **Connect an Email Service**
   - In your EmailJS dashboard, go to "Email Services"
   - Click "Add New Service" and connect your Gmail or other email provider
   - Name your service "service_seventhsense" or update the SERVICE_ID in src/lib/emailService.ts

3. **Create an Email Template**
   - Go to "Email Templates" in your dashboard
   - Click "Create New Template"
   - Name your template "Onboarding Form Submission" and give it the ID "template_onboarding"
   - Design your template with the following variables:
     - `{{from_name}}` - The name of the person submitting the form
     - `{{from_email}}` - The email of the person submitting the form
     - `{{business_name}}` - The business name from the form
     - `{{phone}}` - The phone number (if provided)
     - `{{location}}` - The location (if provided)
     - `{{services}}` - The selected services

   Example template:
   ```
   New Onboarding Form Submission

   Name: {{from_name}}
   Email: {{from_email}}
   Business: {{business_name}}
   Phone: {{phone}}
   Location: {{location}}
   
   Services Requested:
   {{services}}
   
   Please follow up with this lead soon.
   ```

4. **Get Your User ID**
   - Go to "Account" > "API Keys"
   - Copy your Public Key

5. **Update the Code**
   - Open src/lib/emailService.ts
   - Replace `YOUR_USER_ID` with your actual EmailJS Public Key
   - Verify that the SERVICE_ID and TEMPLATE_ID match what you set up

## Testing the Form

After setup is complete:
1. Fill out the onboarding form on your website
2. Submit the form
3. Check the email address associated with your EmailJS service for the incoming message

## Troubleshooting

- If emails aren't being sent, check your browser console for errors
- Verify your EmailJS account is active and has available sends in your plan
- Ensure all IDs (service, template, user) are correctly set in the code
- Check spam folders if emails aren't appearing in the inbox 