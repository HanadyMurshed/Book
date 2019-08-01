import { NONAME } from "dns";
import { isMainThread } from "worker_threads";


enum MASSAGE {
    init,
    words,
    isStop,
    countWord,
    sorted,
    run
}


class DataStorageManager {

    data: string;


    dispatch(message) {

        if (message[0] == MASSAGE.init)
            return this.init(message[1]);
        else if (message[0] == MASSAGE.words)
            return this.words();
        else
            throw new Error("msg not understood")

    }

    init(path: string) {
        this.data = require('fs').readFileSync(path).toString();
        this.data = this.data.replace(/[\W_|]+/gi, " ");
    }

    words() {
        return this.data.split(" ");
    }


}

class StopWordsManager {

    stopWords: string[];

    dispatch(message) {
        if (message[0] == MASSAGE.init)
            return this.init(message[1]);
        else if (message[0] == MASSAGE.isStop)
            return this.isStop(message[1]);
        else
            throw new Error("msg not understood")
    }
    init(path: string) {

        this.stopWords = require('fs').readFileSync(path).toString().split("\n");
    }
    isStop(w: string) {
        return this.stopWords.includes(w)
    }

}

class FrequancyManaer {

    word_count: [string, number][];

    constructor() {
        this.word_count = []
    }


    dispatch(message) {
        if (message[0] == MASSAGE.countWord)
            return this.countWord(message[1]);
        else if (message[0] == MASSAGE.sorted)
            return this.sorted();
        else
            throw new Error("msg not understood")
    }

    countWord(w: string) {

        let found = false;
        for (let w2 = 0; w2 < this.word_count.length; w2++)
            if (w == this.word_count[w2][0]) {
                this.word_count[w2][1] += 1;
                found = true
            }

        if (!found) this.word_count.push([w, 1]);

    }

    sorted() {

        return this.word_count.sort((first, second) => {
            return second[1] - first[1];
        });
    }


}


class WordFrequancyController {

    data_storage_manager;
    stop_wods_manager;
    frequancy_manager;

    dispatch(message) {
        if (message[0] == MASSAGE.init)
            return this.init();
        else if (message[0] == MASSAGE.run)
            return this.run();
        else
            throw new Error("msg not understood")
    }


    init() {

        this.data_storage_manager = new DataStorageManager()
        this.data_storage_manager.dispatch([MASSAGE.init, "./input\\dummy.txt"]);
        this.stop_wods_manager = new StopWordsManager();
        this.stop_wods_manager.dispatch([MASSAGE.init, "./input\\stopwords.txt"]);
        this.frequancy_manager = new FrequancyManaer();

    }
    run() {

        var words = this.data_storage_manager.dispatch([MASSAGE.words])
        for (let w in words) {
            if (!this.stop_wods_manager.dispatch([MASSAGE.isStop, words[w]]))
                this.frequancy_manager.dispatch([MASSAGE.countWord, words[w]])
        }
        console.log(this.frequancy_manager.dispatch([MASSAGE.sorted]).slice(0, 25))
    }
}

function main() {
    let wordFreq = new WordFrequancyController();
    wordFreq.dispatch([MASSAGE.init]);
    wordFreq.dispatch([MASSAGE.run]);
}
main();