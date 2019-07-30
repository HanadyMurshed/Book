import { write, readFile } from "fs";

let fs = require('fs');

let data = [] //array of characters 
let lines = []
let word_ndex: [string, number[]][] = [];

function isLetter(str: string): Boolean {
    return str.length === 1 && Boolean(str.match(/^[0-9a-zA-Z]+$/));
}


function read(path: string) {
    data = fs.readFileSync(path).toString().split("");
}

function fIlterChar() {

    for (var i = 0; i < data.length; i++) {
        if (isLetter(data[i])) {
            data[i] = data[i].toLowerCase();
        } else if (data[i] != '\n') { // I don't want to lose the lies since there number is important to find the page number 
            data[i] = '';
        }
    }

}

function findWords() {
    let word = "";
    let stopWords = fs.readFileSync("./input\\stopwords.txt").toString().split("\n");

    let lineNumber = 0;
    lines[lineNumber] = []
    for (var i = 0; i < data.length; i++) {

        if (data[i] == '\n') {
            lineNumber++;
            lines[lineNumber] = []
            continue;
        }

        if (isLetter(data[i])) {
            word += data[i];
        }

        else if (word != "" && !stopWords.includes(word)) {
            lines[lineNumber].push(word);
            word = "";
        }
    }
}

function indexes() {
    for (var line = 0; line < lines.length; line++) {
        let found = false
        let page = Math.round(line / 45);
        for (var word in lines[line]) {
            for (var i = 0; i < word_ndex.length; i++) {
                if (lines[line][word] == word_ndex[i][0]) {
                    if (!word_ndex[i][1].includes((page)))
                        word_ndex[i][1].push((page));
                    found = true
                    break;
                }
            }
            if (!found) {
                word_ndex.push([lines[line][word], [page]]);
            }
        }
    }
}


function main() {
    read('./input\\dummy.txt');
    fIlterChar();
    findWords();
    indexes();
    for (var i = 0; i < word_ndex.length; i++) {
        console.log(word_ndex[i]);
    }
}

main();