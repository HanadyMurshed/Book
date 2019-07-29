import { write, readFile } from "fs";
let stops = require('fs').readFileSync('./input\\stopwords.txt').toString().split('\n')
let words = require('fs').readFileSync('./input\\dummy.txt').toString().replace(/[\W_|]+/gi, " ").split(" ").filter(e => !(stops.includes(e)));
let count = words.reduce((total, word) => { (word in total) ? total[word] += 1 : total[word] = 1; return total }, {})
let sorted = Object.keys(count).map(function (key) { return [key, count[key]]; }).sort((first, second) => {
    return second[1] - first[1];
}).slice(0, 25);
console.log(sorted)