/**
 * I did't use a saparate function to remove the wtop words I removed it as i 
 * was bulding the words list but here I used a saparate one
 */

import { write, readFile } from "fs";

let fs = require('fs');


function isLetter(str: string): Boolean {
    return str.length === 1 && Boolean(str.match(/^[0-9a-zA-Z]+$/));
}


function read(path: string[]) {
    return [path[0],fs.readFileSync(path[1]).toString().split("")];
}

function fIlterChar(data: any[]) {
    for (let i = 0; i < data[1].length; i++) {
        if (isLetter(data[1][i])) {
            data[1][i] = data[1][i].toLowerCase();
        } else {
            data[1][i] = '';
        }
    }
    return data;
}

function findWords(data: any[]) {
    let word = "";

    let words = []

    for (let i = 0; i < data[1].length; i++) {
        if (isLetter(data[1][i]) && data[1][i] != "") {
            word += data[1][i];
        }
        else if (word != "") {
            words.push(word);
            word = "";
        }
    }
    return [data[0],words]
}

function removeStopWords(data: any[]) {

    let stopWords = fs.readFileSync(data[0]).toString().split("\n");
    let cleanedWords = []

    for (let i = 0; i < data[1].length; i++) {
        if (!stopWords.includes(data[1][i])) {
            cleanedWords.push(data[1][i]);

        }
    }
    return cleanedWords
}

function frequancies(words: string[]) {
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
    let count_word = sort(frequancies(removeStopWords(findWords(fIlterChar(read(['./input\\stopwords.txt', './input\\dummy.txt']))))));
    for (let i = 0; i < count_word.length && i < 25; i++) {
        console.log(count_word[i]);
    }
}

main();