//EXERCISE 1
console.log("EXERCISE 1")
/* 1. Write a function to format money string:
10000000 => “10,000,000" || 123456 => “123,456" || 12000.02 => "12,000.02" */
const moneyString = (a) =>{
    return new Intl.NumberFormat("vi-VN").format(a);
}
console.log("1 - " + moneyString(10000000));
/* 2. Write a function for format money in shorten :
1000 => 1K, 1123400000 => 1.12B , 1342222 => 1.34M */
const moneyShorten = (c) => {
    if(c >= 1000000000){
        return c/1000000000 + "B"
    }
    if(c >= 1000000){
        return c/1000000 + "M"
    }
    if(c >= 1000){
        return c/1000 + "K";
    }
}
console.log("2 - " + moneyShorten(2120000));
/* 3. Write the function to count how many words appear in a string:
oneTwoThree => 3 */
const countWord = (d)=>{
    return d.split(/(?=[A-Z])/)
}
console.log("3 - " + countWord("oneTwoThree").length)
/* 4. Write the function get the get the Extension of file:
“image.png” => “png”. “Sound.mp3” => “mp3” */
let word = "music.mp3";
const extensWord = function(word){
    return text = word.split(".");
}
console.log("4 - " + extensWord(word)[1])

//EXERCISE 2
console.log("EXERCISE 2")
/* 1. Write the function to calculate the combination (Ckn) */
const combination = (a, b)=>{
 let prd = a;
 let i = a;
    while (i++ < b){
        prd *= i;
    }
    return prd;
}
console.log("1 - " + combination(2,6));
/* 2. Write the function to get a random integer between 2 numbers: min, max; */
const randomInt = (min,max)=>{
    return Math.floor(Math.random()*(max-min+1)+min)
}
console.log("2 - " + randomInt(3,6))
/* 3. Write the function get a random element from an arrays. */
let array = ["A","B","C","D"]
const randomEle = (arr)=>{
    return arr[Math.floor(Math.random()*arr.length)]
}
console.log("3 - " + randomEle(array))
/* 4. Given two arrays of integers, find which elements in the second array are missing from the first array. */
const findMiss = (arr1, arr2) => {
    for(i = 0; i <= arr1.length; i++){
        let flag = false;
        for(j = 0; j <= arr2.length; j ++){
            if(arr1[i] == arr2[j]){
                break
            }else{
                flag = true
                console.log(arr1[i+1] + " is missing");
            }
        }
        if(flag){
            console.log(arr1[i+1] + " is missing");
            break;
        }else{
            console.log("nothing is missing");
        }
    }
}
console.log(findMiss([1,2,4], [1,2,5]));