import { NONAME } from "dns";

function isLetter(str: string): Boolean {
    return str.length === 1 && Boolean(str.match(/^[0-9a-zA-Z]+$/));
}
interface IDataStorageManager {
    lines();
}

interface IIndexMnager {
    addIndex(words: string, page: number);
    getIndex(): [string, number[]][];
}

class DataStorageManager implements IDataStorageManager {

    data: string[];

    constructor(path: string) {
        this.data = require('fs').readFileSync(path).toString().split("");
        for (var i = 0; i < this.data.length; i++) {
            if (isLetter(this.data[i])) {
                this.data[i] = this.data[i].toLowerCase();
            } else if (this.data[i] != '\n') { // I don't want to lose the lies since there number is important to find the page number 
                this.data[i] = '';
            }
        }


    }

    lines() {
        let word = "";
        let stopWords = require('fs').readFileSync("./input\\stopwords.txt").toString().split("\n");

        let lines = []

        let lineNumber = 0;
        lines[lineNumber] = []
        for (var i = 0; i < this.data.length; i++) {

            if (this.data[i] == '\n') {
                lineNumber++;
                lines[lineNumber] = []
                continue;
            }

            if (isLetter(this.data[i])) {
                word += this.data[i];
            }

            else if (word != "" && !stopWords.includes(word)) {
                lines[lineNumber].push(word);
                word = "";
            }
        }
        return lines;
    }

}


class IndexMnager implements IIndexMnager {

    word_index: [string, number[]][];

    constructor() {
        this.word_index = []
    }

    addIndex(word: string, page: number) {

        let found = false;
        for (var i = 0; i < this.word_index.length; i++) {
            if (word == this.word_index[i][0]) {
                if (!this.word_index[i][1].includes((page)))
                    this.word_index[i][1].push((page));
                found = true
                break;
            }
        }
        if (!found) {
            this.word_index.push([word, [page]]);
        }
    }

    getIndex() {
        return this.word_index;[]
    }

}


class WordIndexController {

    data_storage_manager;
    indexManager;

    constructor() {

        this.data_storage_manager = new DataStorageManager("./input\\dummy.txt");
        this.indexManager = new IndexMnager();
    }
    run() {


        var lines = this.data_storage_manager.lines();
        for (var line = 0; line < lines.length; line++) {
            let page = Math.round(line / 45);
            for (var word in lines[line]) {
                this.indexManager.addIndex(lines[line][word], page)
            }
        }
        console.log(this.indexManager.getIndex().slice(0, 25))
    }
}

new WordIndexController().run();