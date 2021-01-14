export default class PhoneLink {
  constructor() {}

  /**
   * Returns clickable phone number
   * @param {string} phone - phone number
   * @return {string} - linkable phone number
   */

  generatePhoneLink(phone) {
    if (phone) {
        return '<a class="phone-body" href="tel:' + phone + '">' + phone + '</a>';
    } else {
        return '';
    }
  }
}