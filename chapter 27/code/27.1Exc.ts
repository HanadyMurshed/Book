import { isMainThread } from "worker_threads";

function* characters(path: string) {
    let characters = require("fs").readFileSync(path).toString()
    for (let c in characters) {
        yield characters[c];
    }
}

function* allWords(path: string) {
    let start_char = true;

    let w = "";

    let generator = characters(path);
    let c = generator.next().value;

    while (c != undefined) {
        if (start_char) {
            w = "";

            if (isLetter(c)) {
                w += c;
                start_char = false;
            }
        } else if (!isLetter(c)) {
            start_char = true;

            yield w.toLowerCase();
        } else {
            w += c;
        }
        c = generator.next().value;
    }
}
function* NoneStop(path: string) {
    let stopWords = require("fs").readFileSync("./input\\stopwords.txt").toString().split('\n')
    let generator = allWords(path);
    let word = generator.next().value
    while (word != undefined) {
        if (!stopWords.includes(word))
            yield word
        word = generator.next().value

    }
}

function count(path: string) {
    let freq = {}

    let generator = NoneStop(path)
    let word = generator.next().value
    while (word != undefined) {
        if (word in freq) {
            freq[word] += 1
        } else
            freq[word] = 1
        word = generator.next().value
    }
    return freq;
}

function sort(path: string) {
    let freq = count(path);

    var items = Object.keys(freq).map(function (key) {
        return [key, freq[key]];
    });
    items.sort((first, second) => {
        return second[1] - first[1];
    });

    return items;
}
//check for letter 
function isLetter(str: string): Boolean {
    return str.length === 1 && Boolean(str.match(/^[0-9a-zA-Z]+$/));
}

function main() {
    console.log(sort("./input\\dummy.txt").slice(0, 25));
}

main();