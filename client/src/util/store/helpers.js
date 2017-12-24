/**
 * IMMUTABLE HELPER METHODS  
*/
const helpers = {
  push(arr, newEntry) {
    return [ ...arr, newEntry ];
  },
  pop(arr) {
    return arr.slice(0, -1);
  },
  shift(arr) {
    return arr.slice(1);
  },
  unshift(arr, newEntry) {
    return [ newEntry, ...arr ];
  },

  /**
   * Array.sort function will mutate the array.
   * The simplest way of getting a new sorted array is to make a copy, then sort it.  
  */
  sort(arr, compareFunction) {
    return [ ...arr ].sort(compareFunction);
  },

  /**
  * Make a copy and reverse the array.
  */  
  reverse(arr) {
    return [ ...arr ].reverse();
  },

  splice(arr, start, deleteCount, ...items) {
    return [ ...arr.slice(0, start), ...items, ...arr.slice(start + deleteCount) ];
  },
  
  remove(arr, index) {
    return arr.slice(0,index)
            .concat(arr.slice(index + 1));
  },
}

export default helpers;
