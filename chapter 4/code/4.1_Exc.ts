
let fs = require('fs');

let data = [] //array of characters 
let words = []
let words_count: [string, number][] = [];

function isLetter(str: string): Boolean {
    return str.length === 1 && Boolean(str.match(/^[0-9a-zA-Z]+$/));
}


function readFile(path: string) {
    data = fs.readFileSync(path).toString().split("");
    fIlterChar()
}

function fIlterChar() {
    for (var i = 0; i < data.length; i++) {
        if (isLetter(data[i])) {
            data[i] = data[i].toLowerCase();
        } else {
            data[i] = '';
        }
    }
}

function findWords() {
    let word = "";
    let stopWords = fs.readFileSync("./input\\stopwords.txt").toString().split("\n");

    for (var i = 0; i < data.length; i++) {
        if (isLetter(data[i]) && data[i] != "") {
            word += data[i];
        }
        else if (word != "" && !stopWords.includes(word)) {
            words.push(word);
            word = "";
        }
    }
}

function frequancies() {
    for (var word in words) {
        let found =false
        for (var i=0;i<words_count.length;i++) {
            if (words[word] == words_count[i][0]) {
                words_count[i][1]+=1;
                found = true
            }
        }
        if(!found){
            words_count.push([words[word],1]);
        }
    }
}

function sort(){
    words_count.sort((first, second) => {
        return second[1] - first[1];
    });
}

function main() {
    readFile('./input\\dummy.txt');
    fIlterChar();
    findWords();
    frequancies();
    sort();
    for(var i=0;i<words_count.length &&i<25;i++){
        console.log(words_count[i]);
    }
}

main();