//I wrote it in pipline form in the fiirst place but here is the cook book style 

function countRecursiv(words, count) {
    // this is a tail recursion 
    if (words.length != 0) {
        if (words[0] in count)
            count[words[0]] += 1;
        else
            count[words[0]] = 1
        countRecursiv(words.slice(1, words.length), count)
    }
}