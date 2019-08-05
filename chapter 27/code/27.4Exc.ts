import { write, readFile } from "fs";

let fs = require('fs');


function* read(path: string) {

    let lines = fs.readFileSync(path).toString().split("\n");
    for (let line in lines) {
        yield lines[line].replace(/[\W_|]+/gi, " ").split(" ")
    }

}


function* removeStopWords(path: string) {
    let stopWords
    stopWords = fs.readFileSync("./input\\stopwords.txt").toString().split("\n");


    let generator = read(path)
    let line = generator.next()

    while (line.value != undefined) {
        let newLine = []
        for (let word in line.value) {
            if (!stopWords.includes(line.value[word]) && line.value[word] != "") {
                newLine.push(line.value[word]);
            }
        }

        yield newLine;

        line = generator.next()
    }
}

function indexes(path: string) {
    let word_ndex: [string, number[]][] = [];

    let generator = removeStopWords(path)
    let line = generator.next()

    let lineNumber = 0; let page = 0;
    while (line.value != undefined) {
        let found = false
        page = Math.round(lineNumber / 45);
        for (var word in line.value) {
            for (var i = 0; i < word_ndex.length; i++) {
                if (line.value[word] == word_ndex[i][0]) {
                    if (!word_ndex[i][1].includes((page)))
                        word_ndex[i][1].push((page));
                    found = true
                    break;
                }
            }
            if (!found) {
                word_ndex.push([line.value[word], [page]]);
            }
        }
        line = generator.next()
        lineNumber++;
    }
    return word_ndex;
}


function main() {

    try {
        let word_ndex = indexes('./input\\dummy.txt')
        for (var i = 0; i < word_ndex.length; i++) {
            console.log(word_ndex[i]);
        }
    } catch{
        console.log("something went wrong ")
    }
}

main();