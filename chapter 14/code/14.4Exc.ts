import { NONAME } from "dns";
class framework {
    loadEvenHandler: any[];
    doWrokEventHnadler: any[];
    EndEventHnadler: any[];

    constructor() {

        this.loadEvenHandler = [];

        this.doWrokEventHnadler = [];

        this.EndEventHnadler = [];

    }

    RegisterForLoad(handler: any) {
        this.loadEvenHandler.push(handler)
    }
    RegisterForDoWork(handler: any) {
        this.doWrokEventHnadler.push(handler)
    }
    RegisterForEnd(handler: any) {
        this.EndEventHnadler.push(handler)
    }

    run() {
        for (let h in this.loadEvenHandler) {

            this.loadEvenHandler[h]();
        }
        for (let w in this.doWrokEventHnadler) {

            this.doWrokEventHnadler[w]();
        }
        for (let v in this.EndEventHnadler) {
            this.EndEventHnadler[v]();
        }
    }
}

class DataStorage {
    data;
    stopWordFilter = undefined;
    wordHnadler = []

    constructor(wfapp: framework, stopWord) {


        this.stopWordFilter = stopWord;
        wfapp.RegisterForLoad(this.read.bind(this));
        wfapp.RegisterForDoWork(this.lines.bind(this))

    }

    read() {
        this.data = require('fs').readFileSync('./input\\dummy.txt').toString().replace(/[\W_|^\n]+/gi, " ");
    }

    lines() {

        let lines = this.data.split('\n');
        for (var line = 0; line < lines.length; line++) {
            let words = lines[line].split(" ")
            let page = Math.round(line / 45);
            for (var word in words) {
                this.wordHnadler[0](words[word], page);
            }
        }
    }

    registerWordHnadler(handler) {
        this.wordHnadler.push(handler)
    }

}

class StopWords {

    stopWordsList: [];

    constructor(wfapp: framework) {
        this.stopWordsList = [];
        wfapp.RegisterForLoad(this.readStop.bind(this));
    }

    readStop() {
        this.stopWordsList = require('fs').readFileSync('./input\\stopwords.txt').toString().split("\n");

    }
    isStop(word: string): Boolean {
        for (let w in this.stopWordsList) {
            if (this.stopWordsList[w] == word)
                return true;
        }
        return false;
    }
}

class indexCout {
    word_index: [string, number[]][];

    constructor(wfapp: framework, daraStorag: DataStorage) {
        this.word_index = [];
        daraStorag.registerWordHnadler(this.addIndex.bind(this))
        wfapp.RegisterForEnd(this.print.bind(this))

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

    print() {
        console.log("Result, \n", this.word_index.slice(0, 25))
    }
}

let f = new framework();
let stop = new StopWords(f)
let data = new DataStorage(f, stop)
let freq = new indexCout(f, data)
f.run();
