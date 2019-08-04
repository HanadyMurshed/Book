import { NONAME } from "dns";
class EventManager {
    subscriptions;
    constructor() {

        this.subscriptions = {};

    }

    subscribe(type: string, handler: any) {
        if (type in this.subscriptions)
            this.subscriptions[type].push(handler)
        else
            this.subscriptions[type] = [handler];

    }
    publish(type: string, event) {
        if (type in this.subscriptions)
            for (let v in this.subscriptions[type])
                this.subscriptions[type][v](event);
    }

}

class DataStorage {
    data: string;
    eventM: EventManager;
    constructor(eventM: EventManager) {


        this.eventM = eventM;

        this.eventM.subscribe("read", this.read.bind(this));

        this.eventM.subscribe("words", this.words.bind(this));


    }

    read() {
        this.data = require('fs').readFileSync('./input\\dummy.txt').toString().replace(/[\W_|]+/gi, " ");
    }

    words() {

        let words = this.data.split(' ');
        for (let w in words) {
            this.eventM.publish("word", words[w])
        }
    }

}

class StopWords {

    stopWordsList: [];

    em;

    constructor(em: EventManager) {
        this.em = em
        this.stopWordsList = [];
        this.em.subscribe("read", this.readStop.bind(this));
        this.em.subscribe("word", this.isStop.bind(this))


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

class FreqCount {
    freq: [string, number][];
    em;

    constructor(em: EventManager) {
        this.freq = [];
        this.em = em;

        this.em.subscribe("increament", this.increament.bind(this));
        this.em.subscribe("print", this.print.bind(this))

    }
    increament(word: string) {
        let found
        for (let w in this.freq) {
            found = false;
            if (this.freq[w][0] == word) {
                this.freq[w][1] += 1;
                found = true;
                break;
            }

        }
        if (!found)
            this.freq.push([word, 1])
    }
    print() {
        this.freq = this.freq.sort((n1, n2) => { return n1[1] - n2[1] })
        console.log("Result, \n", this.freq.slice(0, 25))
    }
}
class Application {
    em;
    constructor(em: EventManager) {
        this.em = em;
        this.em.subscribe("run",this.run.bind(this));
        this.em.subscribe('eof', this.stop.bind(this));
    }

    run() {
        this.em.publish('load')
        this.em.publish('start')
    }
    stop() {
        this.em.publish('print')

    }
}

let em = new EventManager();
new DataStorage(em); new StopWords(em); new FreqCount(em);
new Application(em)
em.publish('run',undefined)
