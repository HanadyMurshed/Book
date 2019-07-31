import { write, readFile } from "fs";

class TheOne {
    value
    constructor(v) {
        this.value = v
    }

    read(path: string) {
        return require('fs').readFileSync(path).toString().split("");
    }

    fIlterChar(data: string[]) {

        for (var i = 0; i < data.length; i++) {
            if (isLetter(data[i])) {
                data[i] = data[i].toLowerCase();
            } else if (data[i] != '\n') { // I don't want to lose the lies since there number is important to find the page number 
                data[i] = '';
            }
        }

        return data;
    }

    findWords(data: string[]) {
        let word = "";
        let stopWords = require('fs').readFileSync("./input\\stopwords.txt").toString().split("\n");

        let lines = []

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
        return lines;
    }

    indexes(lines) {
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
    print(v) {
        console.log(v.slice(0, 25))
    }

    bind(func) {
        this.value = func(this.value)
        return this
    }
}
function isLetter(str: string): Boolean {
    return str.length === 1 && Boolean(str.match(/^[0-9a-zA-Z]+$/));
}
function main() {
    let ob = new TheOne('./input\\dummy.txt');
    ob.bind(ob.read)
        .bind(ob.fIlterChar)
        .bind(ob.findWords)
        .bind(ob.indexes)
        .bind(ob.print)
}

main();