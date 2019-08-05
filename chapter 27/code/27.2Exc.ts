import { isMainThread } from "worker_threads";

function* lines(path: string) {
    let lines = require("fs").readFileSync(path).toString().split('\n')
    for (let line in lines) {
        yield lines[line];
    }
}

function* words(path: string) {


    let generator = lines(path);
    let line = generator.next().value;

    let words;
    while (line != undefined) {
        words = line.replace(/[\W_|]+/gi, " ").split(" ");
        for (let word in words) {
            yield words[word];
        }
        line = generator.next().value;
    }
}
function* NoneStop(path: string) {
    let stopWords = require("fs").readFileSync("./input\\stopwords.txt").toString().split('\n')
    let generator = words(path);
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