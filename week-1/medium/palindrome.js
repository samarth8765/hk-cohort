/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  // I have only included regex bcoz test case were written like this
  str = str.replace(/[.,\/#!$%?\^&\*;:{}=\-_`~()"\s]/g, "").toLowerCase();
  let s = 0;
  let e = str.length - 1;

  while (e >= s) {
    if (str[e--] !== str[s++]) {
      return false;
    }
  }
  return true;
}

module.exports = isPalindrome;
