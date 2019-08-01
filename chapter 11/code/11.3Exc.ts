import { NONAME } from "dns";
import { isMainThread } from "worker_threads";

function isLetter(str: string): Boolean {
    return str.length === 1 && Boolean(str.match(/^[0-9a-zA-Z]+$/));
}
enum MASSAGE {
    init,
    lines,
    addIndex,
    getIndex,
    run
}

class DataStorageManager {

    data: string[];

    dispatch(message) {

        if (message[0] == MASSAGE.init)
            return this.init(message[1]);
        else if (message[0] == MASSAGE.lines)
            return this.lines();
        else
            throw new Error("msg not understood")

    }

    init(path: string) {
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


class IndexMnager {

    word_index: [string, number[]][];

    constructor() {
        this.word_index = []
    }

    dispatch(message) {

        if (message[0] == MASSAGE.addIndex)
            return this.addIndex(message[1], message[2]);
        else if (message[0] == MASSAGE.getIndex)
            return this.getIndex();
        else
            throw new Error("msg not understood")

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

    dispatch(message) {

        if (message[0] == MASSAGE.init)
            return this.init();
        else if (message[0] == MASSAGE.run)
            return this.run();
        else
            throw new Error("msg not understood")

    }

    init() {

        this.data_storage_manager = new DataStorageManager();
        this.data_storage_manager.dispatch([MASSAGE.init, "./input\\dummy.txt"])
        this.indexManager = new IndexMnager();
    }

    run() {


        var lines = this.data_storage_manager.dispatch([MASSAGE.lines]);
        for (var line = 0; line < lines.length; line++) {
            let page = Math.round(line / 45);
            for (var word in lines[line]) {
                this.indexManager.dispatch([MASSAGE.addIndex, lines[line][word], page])
            }
        }
        console.log(this.indexManager.dispatch([MASSAGE.getIndex]).slice(0, 25))
    }
}

function main() {
    let WordIIndex = new WordIndexController();
    WordIIndex.dispatch([MASSAGE.init]);
    WordIIndex.dispatch([MASSAGE.run]);

}
main();