import emailjs from 'emailjs-com';

// EmailJS service IDs
const SERVICE_ID = 'service_epkwcie'; // Replace with your EmailJS service ID
const TEMPLATE_ID = 'template_ohqebtm';  // Replace with your EmailJS template ID
const HERO_TEMPLATE_ID = 'template_hero_email'; // Replace with your hero email template ID
const USER_ID = 'fvUhiteRj-Qmtc0i5';  // Replace with your EmailJS user ID

export interface OnboardingFormData {
  fullName: string;
  email: string;
  businessName: string;
  phone: string;
  location: string;
  services: string[];
}

/**
 * Sends onboarding form data to the specified email using EmailJS
 * @param formData - The collected form data
 * @returns Promise that resolves when email is sent
 */
export const sendOnboardingEmail = async (formData: OnboardingFormData): Promise<{ success: boolean; message: string }> => {
  try {
    // Format services as a comma-separated list
    const formattedServices = formData.services.join(', ');
    
    // Prepare template parameters
    const templateParams = {
      from_name: formData.fullName,
      from_email: formData.email,
      business_name: formData.businessName,
      phone: formData.phone,
      location: formData.location,
      services: formattedServices,
    };
    
    // Send email
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      USER_ID
    );
    
    console.log('Email sent successfully:', response);
    return { 
      success: true, 
      message: 'Your information has been submitted successfully! We will contact you soon.' 
    };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { 
      success: false, 
      message: 'There was an error sending your information. Please try again or contact us directly.' 
    };
  }
};

/**
 * Sends a simple email request from the hero section
 * @param contact - The email address or phone number provided by the user
 * @returns Promise that resolves when email is sent
 */
export const sendHeroEmail = async (contact: string): Promise<{ success: boolean; message: string }> => {
  try {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Phone validation (basic international format)
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    
    const isEmail = emailRegex.test(contact);
    const isPhone = phoneRegex.test(contact);
    
    if (!isEmail && !isPhone) {
      return { 
        success: false, 
        message: 'Please enter a valid email address or phone number.' 
      };
    }
    
    // Prepare template parameters
    const templateParams = {
      from_name: 'Direct inquiry',
      from_email: isEmail ? contact : 'Phone contact - see below',
      business_name: 'Direct inquiry - not available',
      phone: isPhone ? contact : 'Email contact - see above',
      location: 'Direct inquiry - not available',
      services: 'Direct inquiry - not specified',
      contact_type: isEmail ? 'Email' : 'Phone',
      contact_value: contact
    };
    
    // Send email
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID, // We can reuse the same template
      templateParams,
      USER_ID
    );
    
    console.log('Hero contact request sent successfully:', response);
    return { 
      success: true, 
      message: 'Thanks for your interest! We\'ll be in touch soon.' 
    };
  } catch (error) {
    console.error('Hero contact request sending failed:', error);
    return { 
      success: false, 
      message: 'There was an error sending your request. Please try again or contact us directly.' 
    };
  }
}; 