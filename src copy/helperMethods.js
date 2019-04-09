// pre: Takes in a String
// post: Returns True string is a valid phone number. False otherwise
//       (http://zparacha.com/phone_number_javascript_regex) explains regex
export function isValidPhoneNumber(number) {
  const phoneNumberPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  return phoneNumberPattern.test(number);
}
