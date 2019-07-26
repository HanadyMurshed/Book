import { write, readFile } from "fs";


let fs = require('fs');

let word_freq: [string, number][] = [];

let stop_words = fs.readFileSync('./input\\stopwords.txt').toString().split('\n');

let lines = fs.readFileSync('./input\\dummy.txt').toString().split('\n');

let start_word = undefined, end_word;

let found: Boolean;


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

                for (idx2 = 0; idx2 < word_freq.length; idx2++) {

                    if (word_freq[idx2][0] == word) {

                        found = true;

                        word_freq[idx2][1] += 1;

                        break;

                    }
                }


                if (!found)

                    word_freq.push([word, 1]);
            }
        }

    }

    // console.log(word_freq)
}


/***
 * to answere the question weather which sol is better i think it depends on how you reordered your listt
 * in other terms it's a sorting problem 
 * it also depends on the nature of the ddata to be sorted 
 * but in general in the first section we reordered the list as we were bulding it 
 * but in this case 'Bubble sort' We needed a new for loop to reorder it
 * of course I can use insertion sort which may performe better or any other 
 * suitable sort alg but this is not the problem
 */

for (var i = 0 ; i < word_freq.length - 1; i++) {

    for (var i2 = 0; i2 < i; i2++) {

        if (word_freq[i2][1] < word_freq[i2 + 1][1]) {

            var temp = word_freq[i2];

            word_freq[i2] = word_freq[i2 + 1];

            word_freq[i2 + 1] = temp;

        }


    }
}


for (var j = 0; j < word_freq.length && j < 25; j++) {

    console.log(word_freq[j]);

}
