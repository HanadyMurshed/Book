import { write, readFile } from "fs";

let fs = require('fs');


function isLetter(str: string): Boolean {
    return str.length === 1 && Boolean(str.match(/^[0-9a-zA-Z]+$/));
}


function read(path: string) {
    return fs.readFileSync(path).toString().split("");
}

function fIlterChar(data: any[]) {
    for (let i = 0; i < data.length; i++) {
        if (isLetter(data[i])) {
            data[i] = data[i].toLowerCase();
        } else {
            data[i] = '';
        }
    }
    return data;
}

function findWords(data: string[]) {
    let word = "";
    let stopWords = fs.readFileSync("./input\\stopwords.txt").toString().split("\n");

    let words = []

    for (let i = 0; i < data.length; i++) {
        if (isLetter(data[i]) && data[i] != "") {
            word += data[i];
        }
        else if (word != "" && !stopWords.includes(word)) {
            words.push(word);
            word = "";
        }
    }
    return words;
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
    let count_word = sort(frequancies(findWords(fIlterChar(read('./input\\dummy.txt')))));
    for (let i = 0; i < count_word.length && i < 25; i++) {
        console.log(count_word[i]);
    }
}

main();