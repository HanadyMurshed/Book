import { write, readFile } from "fs";

let fs = require('fs');

let word_index: [string, number[]][] = [];

let stop_words = fs.readFileSync('./input\\stopwords.txt').toString().split('\n');

let lines = fs.readFileSync('./input\\dummy.txt').toString().split('\n');

let start_word = undefined, end_word;

let found: Boolean;

//pages 
for (var page = 0; page < lines.length / 45; page++) {

    //lines 
    for (var line in lines) {

        for (var idx = 0; idx < lines[line].length; idx++) {

            if (start_word == undefined) {

                if (Boolean(lines[line].charAt(idx).match(/^[0-9a-zA-Z]+$/)))

                    start_word = idx;

            } else if (!Boolean(lines[line].charAt(idx).match(/^[0-9a-zA-Z]+$/))) {

                end_word = idx;

                found = false;

                var idx2

                let word = lines[line].substring(start_word, end_word);

                start_word = undefined;

                if (!(word in stop_words) && word.length > 2) {

                    for (idx2 = 0; idx2 < word_index.length; idx2++) {

                        if (word_index[idx2][0] == word) {

                            found = true;

                            if (!word_index[idx2][1].includes(page))
                                word_index[idx2][1].push(page);

                            break;

                        }
                    }


                    if (!found)

                        word_index.push([word, [page]]);



                }
            }
        }
    }
}


for (var j = 0; j < word_index.length && j < 25; j++) {

    console.log(word_index[j]);

}