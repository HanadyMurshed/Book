import { write, readFile } from "fs";
import { finished } from "stream";


function extract_words(obj, path: string) {

    obj['data'] = require("fs").readFileSync(path).toString().replace(/[\W_|]+/gi, " ").split(" ");
}
function load_stop(obj) {
    obj['stopwords'] = require("fs").readFileSync('./input\\stopwords.txt').toString().split("\n");
}
function isStop(obj, w: string): Boolean {
    for (let word in obj['stopwords']) {
        if (obj['stopwords'][word] == w)
            return true
    }

    return false;
}

function increment(obj, w: string) {
    let found;
    for (var word in obj['freq']) {
        let found = false
        if (obj['freq'][word][0] == w) {
            console.log()
            obj['freq'][word][1] += 1;
            found = true
        }
    }
    if (!found) {
        obj['freq'].push([w, 1]);
    }
}


function sort(obj) {
    obj["freq"].sort((first, second) => {
        return second[1] - first[1];
    });
    return obj["freq"];
}

let data_storage_obj = {
    "data": [],
    "init": (path) => { extract_words(data_storage_obj, path) },
    "words": () => { return data_storage_obj['data'] }
}
let stop_words = {
    "stopwords": [],
    "init": () => { load_stop(stop_words) },
    "isStop": (w): Boolean => { return isStop(stop_words, w) }
}
let freq_word = {
    "freq": [],
    "count": (w) => { increment(freq_word, w) },
    "sort": (): [] => { return sort(freq_word) }
}

function main() {
    data_storage_obj['init']('./input\\dummy.txt');
    stop_words['init'];

    let words = data_storage_obj["words"]();
    for (let w in words) {
        if (!stop_words["isStop"](words[w])) {

            freq_word["count"](words[w])
        }
    }
    console.log(freq_word['sort']().slice(0, 25))

}

main();