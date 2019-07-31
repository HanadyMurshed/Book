import { write, readFile } from "fs";

function wrap(v) {
    return function () { return v };
}

function bind(value, func) {
    return func(value());
}

function read(path: string) {
    return require('fs').readFileSync(path).toString().split("");
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
    let stopWords = require('fs').readFileSync("./input\\stopwords.txt").toString().split("\n");

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
function print(data) {
    console.log(data.slice(0, 25))

}
function isLetter(str: string): Boolean {
    return str.length === 1 && Boolean(str.match(/^[0-9a-zA-Z]+$/));
}

function main() {
    bind(wrap(bind(wrap(bind(wrap(bind(wrap(bind(wrap(bind(wrap("./input\\dummy.txt"), read)), fIlterChar)), findWords)), frequancies)
    ), sort)), print);
}

main();