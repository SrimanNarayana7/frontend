export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateForm = (data: Record<string, string>, rules: Record<string, string[]>): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  Object.entries(rules).forEach(([field, validationRules]) => {
    const value = data[field] || '';
    
    validationRules.forEach(rule => {
      if (rule === 'required' && !validateRequired(value)) {
        errors[field] = `${field} is required`;
      } else if (rule === 'email' && value && !validateEmail(value)) {
        errors[field] = 'Please enter a valid email address';
      } else if (rule === 'phone' && value && !validatePhone(value)) {
        errors[field] = 'Please enter a valid phone number';
      } else if (rule === 'password' && value && !validatePassword(value)) {
        errors[field] = 'Password must be at least 6 characters long';
      }
    });
  });
  
  return errors;
};