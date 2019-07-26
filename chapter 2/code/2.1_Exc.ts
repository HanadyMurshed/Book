import { write, readFile } from "fs";
import { finished } from "stream";

let stack = [];
let heap = {};
let fs = require('fs')
//let es = require('event-stream');

function ReadFile() {

    fs.readFile(stack.pop(), (err: Boolean, data: any) => {
        if (err) {
            console.log(err+"please try latter")
        } else {
            // console.log(data.toString())
            stack.push(data.toString());
            FilterChar();
            Scan();
            RemoveStopWords();
        }
    })

}

function FilterChar() {


    heap['data'] = stack.pop();
    stack.push(/[\W_|]+/gi);
    stack.push(heap['data']);

    // console.log(heap['data']);
    delete heap['data'];


    stack.push(stack.pop().replace(stack.pop(), " "));
    // stack.push(stack.pop().replace(','||".",""))
    // console.log(stack[stack.length-1]);


}

function Scan() {
    stack = stack.pop().split(" ");
    // console.log(stack)
}

function RemoveStopWords() {
    fs.readFile('./input\\stopwords.txt', (err: any, data: any) => {
        if (err) {
            console.log(err + "please try latter")
        } else {
            stack.push(data.toString().split('\n'));

            //create al[pha list

            for (var i = "a".charCodeAt[0], end = "z".charCodeAt[0]; i <= end; i++) {
                stack[stack.length - 1].push(String.fromCharCode(i));
            }
            
        heap['stop_words'] = stack.pop();
        heap["words"] = [];
        // console.log(heap['stop_words'])
        for (; stack.length > 0;) {
            // console.log(stack+"\n"+ heap["words"]+"\n"+stack[stack.length-1]);
            if (heap['stop_words'].includes(stack[stack.length - 1])) {
                stack.pop()
            } else {
                heap['words'].push(stack.pop());
            }
        }
        stack=heap['words']
        // console.log(heap['words'])
        delete heap['words'];
        delete heap['stop_words'];


        frequancies();
        sort();
        finish();
        // console.log("stack is callback "+ stack);

        }

    })


}

//my evaluation
function frequancies() {
    heap['count-words'] = {};
    heap['count'] = 0;

    //  console.log(stack);

    while (stack.length > 0) {
        // console.log(stack)

        // console.log(stack[stack.length-1]);

        if (stack[stack.length - 1] in heap['count-words']) {
            stack.push(heap['count-words'][stack[stack.length - 1]]);
            stack.push(1)
            stack.push(stack.pop() + stack.pop());
        } else {
            stack.push(1)
        }
        heap['count'] = stack.pop();
        heap['count-words'][stack.pop()] = heap['count'];

        // console.log(stack)
        // console.log(heap['count-words']);


    }

    stack.push(heap['count-words']);
    // console.log(heap['count-words']);

    delete heap['count-words']; delete heap['count'];
}



function sort() {
    heap['word_count'] = stack.pop();
    // console.log(heap['word_count'])
    var items = Object.keys(heap['word_count']).map(function (key) {
        return [key, heap['word_count'][key]];
    });
    items.sort((first, second) => {
        return first[1] - second[1];
    });

    stack = items;
}

function finish(){
    heap['i'];
    stack.push(0)
     while (stack[stack.length-1] < 25 && stack.length> 1){

        heap['i'] = stack.pop();
        let item = stack.pop(); 
        console.log(item[0]+" "+item[1])
        stack.push(heap['i']);
        stack.push(1);
        stack.push(stack.pop()+stack.pop());

    }
}

function main(){
    stack.push('./input\\dummy.txt')
    ReadFile();
}


main();