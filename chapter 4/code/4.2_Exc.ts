import { write, readFile } from "fs";

let fs = require('fs');

let words = []

function isLetter(str: string): Boolean {
    return str.length === 1 && Boolean(str.match(/^[0-9a-zA-Z]+$/));
}

var obj1 = {
    data: [],
    readFile(path: string) {
        this.data = fs.readFileSync(path).toString().split("");
    },

    fIlterChar() {
        for (var i = 0; i < this.data.length; i++) {
            if (isLetter(this.data[i])) {
                this.data[i] = this.data[i].toLowerCase();
            } else {
                this.data[i] = '';
            }
        }
    },
    findWords() {
        let word = "";
        let stopWords = fs.readFileSync("./input\\stopwords.txt").toString().split("\n");

        for (var i = 0; i < this.data.length; i++) {
            if (isLetter(this.data[i]) && this.data[i] != "") {
                word += this.data[i];
            }
            else if (word != "" && !stopWords.includes(word)) {
                words.push(word);
                word = "";
            }
        }
    }

}

var obj2 = {
    words_count: [],
    frequancies() {
        for (var word in words) {
            let found = false
            for (var i = 0; i < this.words_count.length; i++) {
                if (words[word] == this.words_count[i][0]) {
                    this.words_count[i][1] += 1;
                    found = true
                }
            }
            if (!found) {
                this.words_count.push([words[word], 1]);
            }
        }
    },

    sort() {
        this.words_count.sort((first, second) => {
            return second[1] - first[1];
        });
    }

}

function main() {

    obj1.readFile('./input\\dummy.txt');
    obj1.fIlterChar();
    obj1.findWords();
    obj2.frequancies();
    obj2.sort();
    for (var i = 0; i < obj2.words_count.length && i < 25; i++) {
        console.log(obj2.words_count[i]);
    }
}

main();