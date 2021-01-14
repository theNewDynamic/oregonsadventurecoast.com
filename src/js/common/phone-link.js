export default class PhoneLink {
  constructor() {}

  /**
   * Returns clickable phone number
   * @param {string} phone_local - local phone number
   * @return {string} - linkable local phone number
   */
  generatePhoneLinkLocal(phone_local) {
      if (phone_local) {
          return '<a class="phone-body" href="tel:' + phone_local + '">' + phone_local + '</a>';
      } else {
          return '';
      }
  }

  /**
   * Returns clickable phone number
   * @param {string} phone_local - toll free phone number
   * @return {string} - linkable toll free phone number
   */
  generatePhoneLinkTollFree(phone_toll_free) {
      if (phone_toll_free) {
          return '<a class="phone-body" href="tel:' + phone_toll_free + '">' + phone_toll_free + '</a>';
      } else {
          return '';
      }
  }
}