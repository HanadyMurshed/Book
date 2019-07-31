import { NONAME } from "dns";

class DataStorageManager {

    data: string;

    constructor(path: string) {
        this.data = require('fs').readFileSync(path).toString();
        this.data = this.data.replace(/[\W_|]+/gi, " ");

    }

    words() {
        return this.data.split(" ");
    }

}

class StopWordsManager {
    stopWords: string[];
    constructor(path: string) {
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

    constructor() {

        this.data_storage_manager = new DataStorageManager("./input\\dummy.txt");
        this.stop_wods_manager = new StopWordsManager("./input\\stopwords.txt");
        this.frequancy_manager = new FrequancyManaer();
    }
    run() {


        var words = this.data_storage_manager.words()
        for (let w in words) {
            if (!this.stop_wods_manager.isStop(words[w]))
                this.frequancy_manager.countWord(words[w])
        }
        console.log(this.frequancy_manager.sorted().slice(0, 25))
    }
}

new WordFrequancyController().run();