import { write, readFile } from "fs";

let fs = require('fs');
var assert = require('assert');


function read(path: string) {
    assert(path != "", "give me a valid location please")
    try {
        let lines = fs.readFileSync(path).toString().split("\n");
        for (let line in lines) {
            lines[line] = lines[line].replace(/[\W_|]+/gi, " ").split(" ")
        }
        return lines
    } catch (err) {
        console.log("error opening the words file")
        return [];
    }
}


function removeStopWords(lines: string[][]) {
    assert(lines != [], "I need lines words material to continue prosseing")
    let stopWords
    try {
        stopWords = fs.readFileSync("./input\\stopwords.txt").toString().split("\n");
    }
    catch{
        console.log("wrror reading the stop words file\n system hasn't removed stope words")
        return lines;
    }
    for (let line in lines) {
        let newLine = []
        for (let word in lines[line]) {
            if (!stopWords.includes(lines[line][word]) && lines[line][word] != "") {
                newLine.push(lines[line][word]);
            }
        }
        lines[line] = newLine;

    } return lines;
}

function indexes(lines) {
    assert(lines != [], "I need lines words material to continue prosseing")
    let word_ndex: [string, number[]][] = [];

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
    return word_ndex;
}


function main() {
    let word_ndex = indexes(removeStopWords(read('./input\\dummy.txt')))
    assert(word_ndex instanceof Array,"OMG this is big problem it hs o be an array")
    for (var i = 0; i < word_ndex.length; i++) {
        console.log(word_ndex[i]);
    }
}

main();