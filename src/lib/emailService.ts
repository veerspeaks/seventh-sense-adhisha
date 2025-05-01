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
 * @param email - The email address provided by the user
 * @returns Promise that resolves when email is sent
 */
export const sendHeroEmail = async (email: string): Promise<{ success: boolean; message: string }> => {
  try {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { 
        success: false, 
        message: 'Please enter a valid email address.' 
      };
    }
    
    // Prepare template parameters
    const templateParams = {
      from_name: 'Direct email inquiry',
      from_email: email,
      business_name: 'Direct email - not available',
      phone: 'Direct email - not available',
      location: 'Direct email - not available',
      services: 'Direct email inquiry - not specified',
    };
    
    // Send email
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID, // We can reuse the same template
      templateParams,
      USER_ID
    );
    
    console.log('Hero email sent successfully:', response);
    return { 
      success: true, 
      message: 'Thanks for your interest! We\'ll be in touch soon.' 
    };
  } catch (error) {
    console.error('Hero email sending failed:', error);
    return { 
      success: false, 
      message: 'There was an error sending your request. Please try again or contact us directly.' 
    };
  }
}; 