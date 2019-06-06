export default class SortMenu {
    constructor() {}

    /**
     * Sorts given list by key in ascending order.
     * @param {array} list - array of objects with the data
     * @param {string} key - key value of the object value to sort by
     * @return {array} - returns the original array, sorted
     */
    sortAscending(list, key) {
        list.sort(function(a, b){
            if (a[key] < b[key]) {
                return -1;
            }
            if (a[key] > b[key]) {
                return 1;
            }

            return 0;
        });

        return list;
    }

    /**
     * Sorts given list by key in descending order.
     * @param {array} list - array of objects with the data
     * @param {string} key - key value of the object value to sort by
     * @return {array} - returns the original array, sorted
     */
    sortDescending(list, key) {
        list.sort(function(a, b){
            if (a[key] > b[key]) {
                return -1;
            }
            if (a[key] < b[key]) {
                return 1;
            }

            return 0;
        });

        return list;
    }

    /**
     * Sets the classes for the sorting menu.
     * @param
     * @return
     */
    setClasses(clickedEl) {

        clickedEl.parent('ul').find('li').toggleClass('-selected');
        clickedEl.parent('ul').slideUp();

    }
}