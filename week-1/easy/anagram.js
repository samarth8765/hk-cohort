/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  // Remove spaces and convert to lower case
  str1 = str1.replace(/\s+/g, "").toLowerCase();
  str2 = str2.replace(/\s+/g, "").toLowerCase();

  // length of strings
  const n1 = str1.length;
  const n2 = str2.length;

  // If lengths of strings are not equal, they cannot be anagrams
  if (n1 !== n2) {
    return false;
  }

  // Creating maps, map1 and map2 for storing each character and its count for string str1 and str2
  let map1 = {};
  let map2 = {};

  // Iterating over str1 and storing count of each char in map
  }

  // Iterating over str2 and storing count of each char in map
  for (let i = 0; i < n2; i++) {
    map2[str2[i]] = (map2[str2[i]] || 0) + 1;
  }

  // Comparing the values if matched then true otherwise false;
  for (let key in map1) {
    if (map1[key] !== map2[key]) {
      return false;
    }
  }

  return true;
}

module.exports = isAnagram;
