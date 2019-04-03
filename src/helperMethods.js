// pre: Takes in a String
// post: Returns True string is a valid phone number. False otherwise
//       (http://zparacha.com/phone_number_javascript_regex) explains regex
export function isValidPhoneNumber(number) {
  const phoneNumberPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  return phoneNumberPattern.test(number);
}

// pre: Takes in any a value of any Type
// post: Returns True if value is null, undefined, or empty. False otherwise
export function isBlank(value) {
  return value === null || value === undefined || value === '';
}
