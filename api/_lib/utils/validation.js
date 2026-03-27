/**
 * Shared validation utilities for API endpoints
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates an email address format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function isValidEmail(email) {
  return EMAIL_REGEX.test(email);
}

/**
 * Validates password meets minimum requirements
 * @param {string} password - Password to validate
 * @param {number} minLength - Minimum length required (default: 6)
 * @returns {boolean} - True if valid, false otherwise
 */
function isValidPassword(password, minLength = 6) {
  return password && password.length >= minLength;
}

/**
 * Validates required fields are present
 * @param {object} fields - Object with field names as keys and values
 * @returns {array} - Array of error objects for missing fields
 */
function validateRequiredFields(fields) {
  const errors = [];
  
  for (const [fieldName, value] of Object.entries(fields)) {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      errors.push({
        field: fieldName,
        message: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`
      });
    }
  }
  
  return errors;
}

module.exports = {
  isValidEmail,
  isValidPassword,
  validateRequiredFields,
  EMAIL_REGEX,
};
