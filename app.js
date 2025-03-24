
// Your task in order to complete this Kata is to write a function which formats a duration, given as a number of seconds, in a human-friendly way.

// The function must accept a non-negative integer. If it is zero, it just returns "now". Otherwise, the duration is expressed as a combination of years, days, hours, minutes and seconds.


function formatDuration(seconds) {
 
    if (seconds === 0) return "now";

    //To Define the units in descending order of magnitude.
    const units = [
        { label: "year",   seconds: 31536000 },
        { label: "day",    seconds: 86400 },
        { label: "hour",   seconds: 3600 },
        { label: "minute", seconds: 60 },
        { label: "second", seconds: 1 }
    ];
    
    //To Build the list of time components.
    const components = [];
    for (const unit of units) {
        const count = Math.floor(seconds / unit.seconds);
        if (count > 0) {
            components.push(count + " " + unit.label + (count > 1 ? "s" : ""));
            seconds %= unit.seconds;
        }
    }
    
    //To format the final string based on the number of components.
    if (components.length === 1) {
        return components[0];
    } else {
        const last = components.pop();
        return components.join(", ") + " and " + last;
    }


}






// 4 kyu
// Nesting Structure Comparison
// Complete the function/method (depending on the language) to return true/True when its argument is an array that has the same nesting structures and same corresponding length of nested arrays as the first array.

Array.prototype.sameStructureAs = function (other) {
    // To Check if both are arrays
    if (!isArray(this) || !isArray(other)) {
        return false;
    }

    //To  Check if lengths are the same
    if (this.length !== other.length) {
        return false;
    }

    //To  Compare each element
    for (let i = 0; i < this.length; i++) {
        const thisElement = this[i];
        const otherElement = other[i];

        // If one is an array and the other is not, return false
        if (isArray(thisElement) !== isArray(otherElement)) {
            return false;
        }

        // If both are arrays, recursively check their structure
        if (isArray(thisElement) && isArray(otherElement)) {
            if (!thisElement.sameStructureAs(otherElement)) {
                return false;
            }
        }
    }

    // If all checks pass, return true
    return true;
};








// 4 kyu
// Next bigger number with the same digits
// Create a function that takes a positive integer and returns the next bigger number that can be formed by rearranging its digits. For example:
function nextBigger(n){
  //your code here
      let digits = n.toString().split('');
    
    // Step 1: Find the pivot (rightmost digit smaller than the next)
    let i = digits.length - 2;
    while (i >= 0 && digits[i] >= digits[i + 1]) {
        i--;
    }

    // If no pivot is found, return -1 
    if (i < 0) return -1;

    // Step 2: Find the smallest digit on the right that's larger than pivot
    let j = digits.length - 1;
    while (digits[j] <= digits[i]) {
        j--;
    }

    // Step 3: Swap pivot and this next larger digit
    [digits[i], digits[j]] = [digits[j], digits[i]];

    // Step 4: Sort the digits after pivot in ascending order
    let rightPart = digits.splice(i + 1).sort();
    let result = [...digits, ...rightPart].join('');

    return parseInt(result, 10);
}






// 6 kyu
// Multiples of 3 or 5
// If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.

// Finish the solution so that it returns the sum of all the multiples of 3 or 5 below the number passed in.

// Additionally, if the number is negative, return 0.

// Note: If the number is a multiple of both 3 and 5, only count it once.
function solution(number){
  if (number < 0) return 0; 

    let sum = 0;
    for (let i = 0; i < number; i++) {
        if (i % 3 === 0 || i % 5 === 0) {
            sum += i;
        }
    }

    return sum;
}






// 5 kyu
// First non-repeating character
// Write a function named first_non_repeating_letter† that takes a string input, and returns the first character that is not repeated anywhere in the string.

// For example, if given the input 'stress', the function should return 't', since the letter t only occurs once in the string, and occurs first in the string.

// As an added challenge, upper- and lowercase letters are considered the same character, but the function should return the correct case for the initial letter. For example, the input 'sTreSS' should return 'T'.

// If a string contains all repeating characters, it should return an empty string ("");

// † Note: the function is called firstNonRepeatingLetter for historical reasons, but your function should handle any Unicode character.
function firstNonRepeatingLetter(s) {
  // Add your code here
  const lowerStr = s.toLowerCase(); // Convert string to lowercase for  comparison

    for (let i = 0; i < s.length; i++) {
        if (lowerStr.indexOf(lowerStr[i]) === lowerStr.lastIndexOf(lowerStr[i])) {
            return s[i]; // Return the original case character
        }
    }

    return ""; 
}




// 5 kyu
// Memoized Fibonacci
// The Fibonacci sequence is traditionally used to explain tree recursion.

// This algorithm serves welll its educative purpose but it's tremendously inefficient, not only because of recursion, but because we invoke the fibonacci function twice, and the right branch of recursion (i.e. fibonacci(n-2)) recalculates all the Fibonacci numbers already calculated by the left branch (i.e. fibonacci(n-1)).

// This algorithm is so inefficient that the time to calculate any Fibonacci number over 50 is simply too much. You may go for a cup of coffee or go take a nap while you wait for the answer. But if you try it here in Code Wars you will most likely get a code timeout before any answers.

// For this particular Kata we want to implement the memoization solution. This will be cool because it will let us keep using the tree recursion algorithm while still keeping it sufficiently optimized to get an answer very rapidly.

// The trick of the memoized version is that we will keep a cache data structure (most likely an associative array) where we will store the Fibonacci numbers as we calculate them. When a Fibonacci number is calculated, we first look it up in the cache, if it's not there, we calculate it and put it in the cache, otherwise we returned the cached number.

// Refactor the function into a recursive Fibonacci function that using a memoized data structure avoids the deficiencies of tree recursion. Can you make it so the memoization cache is private to this function?
function fibonacci(n) {
  const memo = {}; 

    function fibHelper(n) {
        if (n in memo) return memo[n]; // Return cached result if available
        if (n <= 1) return n; // Base cases: fib(0) = 0, fib(1) = 1
        
        // To store in cache, and return result
        return memo[n] = fibHelper(n - 1) + fibHelper(n - 2);
    }

    return fibHelper(n);
}

function fibonacci(n) {
  const memo = {}; 

    function fibHelper(n) {
        if (n in memo) return memo[n]; // Return cached result if available
        if (n <= 1) return n; // Base cases: fib(0) = 0, fib(1) = 1
        
        // To store the result in memo
        return memo[n] = fibHelper(n - 1) + fibHelper(n - 2);
    }

    return fibHelper(n);
}






// 5 kyu
// Extract the domain name from a URL
// Write a function that when given a URL as a string, parses out just the domain name and returns it as a string.
function domainName(url){
 
    return url.replace(/(https?:\/\/)?(www\.)?/, "").split(".")[0];
}






// 6 kyu
// Duplicate Encoder
// The goal of this exercise is to convert a string to a new string where each character in the new string is "(" if that character appears only once in the original string, or ")" if that character appears more than once in the original string. Ignore capitalization when determining if a character is a duplicate.
function duplicateEncode(word){
   
    const lowerWord = word.toLowerCase();
    return lowerWord
        .split("")
        .map(char => lowerWord.indexOf(char) === lowerWord.lastIndexOf(char) ? "(" : ")")
        .join("")
}



// 5 kyu
// Pete, the baker
// Pete likes to bake some cakes. He has some recipes and ingredients. Unfortunately he is not good in maths. Can you help him to find out, how many cakes he could bake considering his recipes?

// Write a function cakes(), which takes the recipe (object) and the available ingredients (also an object) and returns the maximum number of cakes Pete can bake (integer). For simplicity there are no units for the amounts (e.g. 1 lb of flour or 200 g of sugar are simply 1 or 200). Ingredients that are not present in the objects, can be considered as 0.
function cakes(recipe, available) {
   return Math.min(...Object.keys(recipe).map(ingredient => 
        Math.floor((available[ingredient] || 0) / recipe[ingredient])
    ));
}




// 5 kyu
// Moving Zeros To The End
// Write an algorithm that takes an array and moves all of the zeros to the end, preserving the order of the other elements.
function moveZeros(arr) {
  return arr.filter(num => num !== 0).concat(arr.filter(num => num === 0));
}



// 6 kyu
// Your order, please
// Your task is to sort a given string. Each word in the string will contain a single number. This number is the position the word should have in the result.

// Note: Numbers can be from 1 to 9. So 1 will be the first word (not 0).

// If the input string is empty, return an empty string. The words in the input String will only contain valid consecutive numbers.
function order(words){
  return words
        .split(" ")
        .sort((a, b) => a.match(/\d/) - b.match(/\d/)) // Sort by the number inside each word
        .join(" ");
}



// 6 kyu
// Build a pile of Cubes
// Your task is to construct a building which will be a pile of n cubes.
function findNb(m) {
    // your code
 let n = 0;
    let sum = 0;

    while (sum < m) {
        n++;
        sum += Math.pow(n, 3); // Add the cube of the current n
    }

    return sum === m ? n : -1; // Return n if it matches m, otherwise -1
}

// 6 kyu
// Tribonacci Sequence
// Create a fibonacci function that given a signature array/list, returns the first n elements - signature included of the so seeded sequence.

// Signature will always contain 3 numbers; n will always be a non-negative number; if n == 0, then return an empty array (except in C return NULL) and be ready for anything else which is not clearly specified ;)
function tribonacci(signature,n){
  //your code here
      // Handle edge cases
    if (n === 0) {
        return [];
    }
    if (n <= 3) {
        return signature.slice(0, n);
    }

    // Initialize the sequence 
    const sequence = [...signature];

    // Generate the sequence until it has n elements
    while (sequence.length < n) {
        const nextElement = sequence[sequence.length - 1] + sequence[sequence.length - 2] + sequence[sequence.length - 3];
        sequence.push(nextElement);
    }

    return sequence;
}

// 6 kyu
// Does my number look big in this?
// A Narcissistic Number (or Armstrong Number) is a positive number which is the sum of its own digits, each raised to the power of the number of digits in a given base. In this Kata, we will restrict ourselves to decimal (base 10).

// The Challenge:Your code must return true or false (not 'true' and 'false') depending upon whether the given number is a Narcissistic number in base 10.

function narcissistic(value) {
  // Code me to return true or false
  const digits = String(value).split("").map(Number);
    const power = digits.length;
    const sum = digits.reduce((acc, digit) => acc + Math.pow(digit, power), 0);
    
    return sum === value;
}

// 6 kyu
// Valid Braces
// Write a function that takes a string of braces, and determines if the order of the braces is valid. It should return true if the string is valid, and false if it's invalid.
function validBraces(braces){
      const stack = [];
    const pairs = {
      
      '[': ']',
        '(': ')',
        
        '{': '}'
    };

    for (let char of braces) {
        // If the character is an opening brace, add it onto the stack
        if (pairs[char]) {
            stack.push(char);
        } else {
            // If the character is a closing brace, check  that itmatches the top of the stack
            const top = stack.pop();
            if (pairs[top] !== char) {
                return false;
            }
        }
    }

    // If the stack is empty, all braces were matched correctly
    return stack.length === 0;
}

// 6 kyu
// Persistent Bugger.
// Write a function, persistence, that takes in a positive parameter num and returns its multiplicative persistence, which is the number of times you must multiply the digits in num until you reach a single digit.
function persistence(num) {
    let count = 0;
    
    while (num >= 10) { // Continue the process until num is a single digit
        num = String(num).split("").reduce((product, digit) => product * Number(digit), 1);
        count++;
    }
    
    return count;
}



// 7 kyu
// Binary Addition
// Implement a function that adds two numbers together and returns their sum in binary. The conversion can be done before, or after the addition.
// The binary number returned should be a string.
function addBinary(a,b) {
  
  // Add the two numbers
    const sum = a + b;

    // Convert the sum to binary and return it as a string
    return sum.toString(2);

}

// 7 kyu
// Credit Card Mask
// Usually when you buy something, you're asked whether your credit card number, phone number or answer to your most secret question is still correct. However, since someone could look over your shoulder, you don't want that shown on your screen. Instead, we mask it.

// Your task is to write a function maskify, which changes all but the last four characters into '#'.
function maskify(cc) {
  
  // If the input is < or = to 4 characters, return it as it is
    if (cc.length <= 4) {
        return cc;
    }

    // Replace all characters except the last 4 with '#'
    const maskedPart = '#'.repeat(cc.length - 4);
    const lastFour = cc.slice(-4);

    return maskedPart + lastFour;

}

// 7 kyu
// Jaden Casing Strings
// Jaden Smith, the son of Will Smith, is the star of films such as The Karate Kid (2010) and After Earth (2013). Jaden is also known for some of his philosophy that he delivers via Twitter. When writing on Twitter, he is known for almost always capitalizing every word. For simplicity, you'll have to capitalize each word, check out how contractions are expected to be in the example below.

// Your task is to convert strings to how they would be written by Jaden Smith. The strings are actual quotes from Jaden Smith, but they are not capitalized in the same way he originally typed them.

String.prototype.toJadenCase = function () {
    return this.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
};



// 7 kyu
// Vowel Count
// Return the number (count) of vowels in the given string.

// We will consider a, e, i, o, u as vowels for this Kata (but not y).

// The input string will only consist of lower case letters and/or spaces.
function getCount(str) {
 
    return [...str].filter(char => "aeiou".includes(char)).length;

}

// 6 kyu
// Create Phone Number
// Write a function that accepts an array of 10 integers (between 0 and 9), that returns a string of those numbers in the form of a phone number.
function createPhoneNumber(numbers){
  
  
   // Format the phone number
    const areaCode = numbers.slice(0, 3).join('');
    const firstPart = numbers.slice(3, 6).join('');
    const secondPart = numbers.slice(6).join('');

    return `(${areaCode}) ${firstPart}-${secondPart}`
}