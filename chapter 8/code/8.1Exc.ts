/**
 * I did't use a saparate function to remove the wtop words I removed it as i 
 * was bulding the words list but here I used a saparate one
 */
import { write, readFile } from "fs";

let fs = require('fs');


function isLetter(str: string): Boolean {
    return str.length === 1 && Boolean(str.match(/^[0-9a-zA-Z]+$/));
}


function read(path: string, fun) {
    fun(fs.readFileSync(path).toString().split(""), findWords);
}

function fIlterChar(data: any[], fun) {
    for (let i = 0; i < data.length; i++) {
        if (isLetter(data[i])) {
            data[i] = data[i].toLowerCase();
        } else {
            data[i] = '';
        }
    }
    fun(data, removeStopWords);
}

function findWords(data: string[], fun) {
    let word = "";
    let words = []

    for (let i = 0; i < data.length; i++) {
        if (isLetter(data[i]) && data[i] != "") {
            word += data[i];
        }
        else if (word != "") {
            words.push(word);
            word = "";
        }
    }
    fun(words, frequancies);
}


function removeStopWords(data: any, fun) {

    let stopWords = fs.readFileSync("./input\\stopwords.txt").toString().split("\n");
    let cleanedWords = []

    for (let i = 0; i < data.length; i++) {
        if (!stopWords.includes(data[i])) {
            cleanedWords.push(data[i]);

        }
    }
    fun(cleanedWords, sort)
}

function frequancies(words: string[], fun) {
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
    fun(words_count, print);
}

function sort(words_count: [string, number][], fun) {
    words_count.sort((first, second) => {
        return second[1] - first[1];
    });
    return fun(words_count);
}
function print(count_word) {
    for (let i = 0; i < count_word.length && i < 25; i++) {
        console.log(count_word[i]);
    }
}
function main() {
    read('./input\\dummy.txt', fIlterChar);

}

main();