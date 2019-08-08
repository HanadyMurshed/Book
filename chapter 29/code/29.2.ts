/**
 * this is async gunctions call it is far from
 *  threading but since threading is not allawed 
 * in js I took this approuch eventhough I'm not 
 * Sgit staisfied with the code t all
 */

class FakeThread {

    tag: number;

    freq_space;

    data_space;

    word_count_space: {} = {};

    freq = [];

    constructor() {

        this.data_space = require('fs').readFileSync('./input\\dummy.txt').toString().replace(/[\W_|]+/gi, " ").split(" ");

        this.freq_space = [];

    }


    process(words: string[]) {

        return new Promise(resolve => {

            let freq = {};

            let word = "";

            var k = setInterval(() => {

                if (words.length == 0) {

                    let items = Object.keys(freq).map(function (key) {

                        return [key, freq[key]];

                    }, this.tag);

                    this.freq_space.push(items);

                    resolve();

                    clearInterval(k);

                } else {

                    word = words.pop();

                    if (word in freq) {

                        freq[word] += 1

                    } else {

                        freq[word] = 1
                    }
                }
            })
        })
    }


    aggregate() {

        let word = "";

        return new Promise(resolve => {



            var k = setInterval(() => {

                if (this.freq_space.length == 0 && this.freq.length == 0) {

                    resolve();

                    clearInterval(k);

                } else {


                    if (this.freq.length == 0)

                        this.freq = this.freq_space.pop();

                    word = this.freq.pop();

                    if (word[0] in this.word_count_space) {

                        this.word_count_space[word[0]] += word[1]

                    } else {

                        this.word_count_space[word[0]] = word[1]
                    }
                }
            })
        })
    }

    async run(threadNumber: number) {

        /**
         * I chunked the data accros the workers it is not needed and can be removed 
         */
        let chunkSize = Math.round(this.data_space.length / threadNumber)

        let worker = []

        for (let i = 0, d = 0; i < threadNumber; i++ , d += chunkSize) {

            worker.push(this.process(
                this.data_space.slice(d, d + chunkSize)
            ))
        }

        await Promise.all(worker);

        worker = [];

        for (let i = 0, d = 0; i < threadNumber; i++ , d += chunkSize) {

            worker.push(this.aggregate())
        }

        await Promise.all(worker);

        this.sort_print();

    }



    sort_print() {


        console.log(this.word_count_space)

        let items = Object.keys(this.word_count_space).map((key) => {
            return [key, this.word_count_space[key]];
        });

        items = items.sort((b, a) => {

            return a[1] - b[1]

        });

        console.log(items.slice(0, 25))

    }

}


new FakeThread().run(5);