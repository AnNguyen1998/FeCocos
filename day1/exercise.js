//EXERCISE 1
console.log("EXERCISE 1")
/* 1. Write a function to format money string:
10000000 => “10,000,000" || 123456 => “123,456" || 12000.02 => "12,000.02" */
const moneyString = (a) => {
    return new Intl.NumberFormat("vi-VN").format(a);
}
console.log("1 - " + moneyString(10000000));
/* 2. Write a function for format money in shorten :
1000 => 1K, 1123400000 => 1.12B , 1342222 => 1.34M */
const moneyShorten = (c) => {
    if (c >= 1000000000) {
        return c / 1000000000 + "B"
    }
    if (c >= 1000000) {
        return c / 1000000 + "M"
    }
    if (c >= 1000) {
        return c / 1000 + "K";
    }
}
console.log("2 - " + moneyShorten(2120000));
/* 3. Write the function to count how many words appear in a string:
oneTwoThree => 3 */
const countWord = (d) => {
    return d.split(/(?=[A-Z])/)
}
console.log("3 - " + countWord("oneTwoThree").length)
/* 4. Write the function get the get the Extension of file:
“image.png” => “png”. “Sound.mp3” => “mp3” */
let word = "music.mp3";
const extensWord = function (word) {
    return text = word.split(".");
}
console.log("4 - " + extensWord(word)[1])

//EXERCISE 2
console.log("EXERCISE 2")
/* 1. Write the function to calculate the combination (Ckn) */
function product_Range(c, d) {
    var prd = c,
        i = c;
    while (i++ < d) {
      prd *= i;
    }
    return prd;
  }
const combination = (a, b) => {
    if (a == b || b == 0) {
        return 1;
    } else {
        b = (b < a - b) ? a - b : b;
        return product_Range(b + 1, a) / product_Range(1, a - b);
    }
}
console.log("1 - " + combination(6, 2));
/* 2. Write the function to get a random integer between 2 numbers: min, max; */
const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
console.log("2 - " + randomInt(3, 6))
/* 3. Write the function get a random element from an arrays. */
let array = ["A", "B", "C", "D"]
const randomEle = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)]
}
console.log("3 - " + randomEle(array))
/* 4. Given two arrays of integers, find which elements in the second array are missing from the first array. */
const findMiss = (arr1, arr2) => {
    for (i = 0; i < arr2.length; i++) {
        let flag = 0;
        for (j = 0; j < arr1.length; j++) {
            if (arr1[j] == arr2[i]) {
                flag += 1;
                break;
            }
        }
        if (flag < 1) {
            return console.log(arr2[i] + " is missing in Arr1");
        }
    }
    return console.log("nothing is missing");
}
findMiss([1, 2, 5], [1, 2, 5])