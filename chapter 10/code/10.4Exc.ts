import { NONAME } from "dns";



let dataStorageManager = {

    data: "",

    init(path: string) {
        this.data = require('fs').readFileSync(path).toString();
        this.data = this.data.replace(/[\W_|]+/gi, " ");
        return this;

    },

    words() {
        return this.data.split(" ");
    }


}

let StopWordsManager = {
    stopWords: [],
    init(path: string) {
        this.stopWords = require('fs').readFileSync(path).toString().split("\n");
        return this
    },
    isStop(w: string) {
        return this.stopWords.includes(w)
    }


}

let FrequancyManaer = {

    word_count: [],

    countWord(w: string) {

        let found = false;
        for (let w2 = 0; w2 < this.word_count.length; w2++)
            if (w == this.word_count[w2][0]) {
                this.word_count[w2][1] += 1;
                found = true
            }

        if (!found) this.word_count.push([w, 1]);

    },

    sorted() {

        return this.word_count.sort((first, second) => {
            return second[1] - first[1];
        });
    }
}


let WordFrequancyController = {

    data_storage_manager: dataStorageManager.init("./input\\dummy.txt"),
    stop_wods_manager: StopWordsManager.init("./input\\stopwords.txt"),
    frequancy_manager: FrequancyManaer,

    run() {
        var words = this.data_storage_manager.words()
        for (let w in words) {
            if (!this.stop_wods_manager.isStop(words[w]))
                this.frequancy_manager.countWord(words[w])
        }
        console.log(this.frequancy_manager.sorted().slice(0, 25))
    }
}

WordFrequancyController.run();