import { write, readFile } from "fs";


/**
 * this is async gunctions call it is far from
 *  threading but since threading is not allawed 
 * in js I took this approuch eventhough I'm not 
 * Sgit staisfied with the code t all
 */

class FakeThread {

    tag: number;

    words: string[];

    totalFreq;

    constructor(tag: number, words: string[], totalFreq) {

        this.totalFreq = totalFreq;

        this.tag = tag;

        this.words = words
    }


    start() {

        return new Promise(resolve => {

            let freq = {};

            let word = "";

            var k = setInterval(() => {

                if (this.words.length == 0) {

                    let items = Object.keys(freq).map(function (key) {

                        return [key, freq[key]];

                    }, this.tag);

                    this.totalFreq.push(items);

                    resolve();

                    clearInterval(k);

                } else {

                    word = this.words.pop();

                    if (word in freq) {

                        freq[word] += 1

                    } else {

                        freq[word] = 1
                    }
                }
            })
        })
    }
}


class ThreadManager {

    Thread;

    freq_space;

    data_space;

    constructor(threadNumber: number) {

        this.data_space = require('fs').readFileSync('./input\\dummy.txt').toString().replace(/[\W_|]+/gi, " ").split(" ");

        let chunkSize = Math.round(this.data_space.length / threadNumber)

        this.freq_space = [];

        this.Thread = [];


        /**
         * I chunked the data accros the workers it is not needed and can be removed 
         */
        for (let i = 0, d = 0; i < threadNumber; i++ , d += chunkSize) {

            this.Thread.push(new FakeThread(i,
                this.data_space.slice(d, d + chunkSize),
                this.freq_space).start())

        }

    }

    async run() {

        await Promise.all(this.Thread);

        this.aggregate();

        this.sort();

        this.print();

    }

    aggregate() {

        let word_freq = {}

        while (this.freq_space.length != 0) {

            let freq = this.freq_space.pop();

            for (let word in freq)

                if (freq[word][0] in word_freq)

                    word_freq[freq[word][0]] += freq[word][1]

                else

                    word_freq[freq[word][0]] = freq[word][1]

        }
        this.freq_space = Object.keys(word_freq).map(function (key) {

            return [key, word_freq[key]];

        });

    }


    sort() {

        this.freq_space = this.freq_space.sort((b, a) => {

            return a[1] - b[1]

        });
    }

    print() {

        console.log(this.freq_space.slice(0, 25))

    }

}


new ThreadManager(5).run(); 