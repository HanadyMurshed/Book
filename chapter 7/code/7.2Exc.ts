/**
 * I couldn;t find a way to set the recursion limit parameter so 
 * I searched for different broswer limits nd used the smallest one of them
 * Recursion limit for web browser
 * Internet Explorer 7: 1,789
 * Firefox 3: 3,000
 * Chrome 1: 21,837
 * Opera 9.62: 10,000
 * Safari 3.2: 500
*/



function countRecursiv(words, count) {
    // this is a tail recursion 
    if (words.length == 0)
        return count

    else {
        if (words[0] in count)
            count[words[0]] += 1;
        else
            count[words[0]] = 1
        return countRecursiv(words.slice(1, words.length), count)
    }
}

function findStop(data: string) {
    if (data == "")
        return
    else {
        let word = ""
        let i = 0;
        for (; i < data.length; i++) {
            if (data.charAt(i) == '\n')
                if (word != "")
                    break;
                else
                    continue;
            word += data.charAt(i)
        }
        return [word, ...findStop(data.substring(i, data.length))]

    }
}

import { write, readFile } from "fs";
//laoding I loaded it without reccoursion 
let stops = findStop(require('fs').readFileSync('./input\\stopwords.txt').toString())
let words = require('fs').readFileSync('./input\\dummy.txt').toString().replace(/[\W_|]+/gi, " ").split(" ").filter(e => !(stops.includes(e)));
let count_word = {}
let limit = 500;

for (let i = 0; i < words.length; i += limit) {
    if (i + limit > words.length)
        countRecursiv(words.slice(i, words.length), count_word);
    else
        countRecursiv(words.slice(i, i + limit), count_word);
}
let sorted = Object.keys(count_word).map(function (key) { return [key, count_word[key]]; }).sort((first, second) => {
    return second[1] - first[1];
}).slice(0, 25);

console.log(sorted)