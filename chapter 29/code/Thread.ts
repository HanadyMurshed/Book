class FakeThread {

    ms: number;

    handledData: number;

    words: string[];

    totalFreq;

    constructor(ms: number, handledData: number, words: string[], totalFreq) {

        this.totalFreq = totalFreq;

        this.ms = ms;

        this.handledData = handledData

        this.words = words
    }
    sleep(ms: number) {

        return new Promise(resolve => setTimeout(resolve, ms));

    }

    async start() {

        let freq = {};

        let proocced = this.handledData;

        for (let i = 0; this.words.length != 0; i++ , proocced--) {

            if (proocced = 0) {

                proocced = this.handledData;

                this.sleep(this.ms)

            }

            let word = this.words.pop();

            if (word in freq) {

                freq[word] += 1

            } else {

                freq[word] = 1
            }
        }

        var items = Object.keys(freq).map(function (key) {

            return [key, freq[key]];

        });

        this.totalFreq.push(items);
    }
}

class ThreadManager {

    Thread: FakeThread[];

    freq_space;

    data_space

    constructor(threadNumber: number, sleepTime: number) {

        this.data_space = require('fs').readFileSync('./input\\dummy.txt').toString().replace(/[\W_|]+/gi, " ").split(" ");

        let chunkSize = Math.round(this.data_space.length / threadNumber)

        let paralilisemFactor = Math.round(chunkSize / 5)

        this.freq_space = [];

        this.Thread = [];

        for (let i = 0, d = 0; i < threadNumber; i++ , d += chunkSize) {

            this.Thread.push(new FakeThread(sleepTime, paralilisemFactor, this.data_space.slice(d, d + chunkSize), this.freq_space))

        }

    }

    run() {

        for (let i in this.Thread) {

            this.Thread[i].start();

        }

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


new ThreadManager(5, 1000).run();