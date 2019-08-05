import { write, readFile } from "fs";

let fs = require('fs');



function read(path: string) {
    if (path == "") {
        return [];
    }
    try {
        return fs.readFileSync(path).toString().replace.replace(/[\W_|]+/gi, " ").split(" ");
    } catch{
        console.log("error opening the words file")
        return [];
    }
}

function removeStopeWord(words: string[]) {

    let stopwords;
    try {
        stopwords = fs.readFileSync('./input\\stopwords.txt').toString().split(" ");
    } catch{
        console.log("error opening the stop words file")
        return words;
    }
    let newWords = []
    for (let w in words) {
        if (!stopwords.includes(words[w]))
            newWords.push(words[w]);
    }
    return newWords;

}
function frequancies(words: string[]) {
    if (words == [])
        return [];
    let words_count: [string, number][] = [];

    for (let word in words) {
        let found = false
        for (var i = 0; i < words_count.length; i++) {
            if (words[word] == words_count[i][0]) {
                words_count[i][1] += 1;
                found = true
            }
        }
        if (!found) {
            words_count.push([words[word], 1]);
        }
    }
    return words_count;
}

function sort(words_count: [string, number][]) {
    words_count.sort((first, second) => {
        return second[1] - first[1];
    });
    return words_count;
}

function main() {
    let count_word = sort(frequancies(removeStopeWord(read('./input\\dummy.txt'))));
    for (let i = 0; i < count_word.length && i < 25; i++) {
        console.log(count_word[i]);
    }
}

main();