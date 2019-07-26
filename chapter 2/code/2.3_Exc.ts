import { write, readFile } from "fs";
import { finished } from "stream";

class Stack<E>{
    private list;

    constructor(list:E[]=[]) {
        this.list=list;
     }

     setData(list:E[]){
         this.list= list;
     }

     length(){
         return this.list.length;
     }


    pop():E{
        let temp = this.list[this.list.length-1]
        this.list.length--;
        return temp;
    }
    
    push(element:E){
        this.list[this.list.length]=element;
    }

    tail():E{
        return this.list[this.list.length-1];
    }
}


let stack:Stack<any> = new Stack();
let heap = {};
let fs = require('fs')
//let es = require('event-stream');

function ReadFile() {

    fs.readFile(stack.pop(), (err: Boolean, data: any) => {
        if (err) {
            console.log("please try latter")
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
    stack.setData(stack.pop().split(" "));
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
                stack.tail().push(String.fromCharCode(i));
            }
            
        heap['stop_words'] = stack.pop();
        heap["words"] = [];
        // console.log(heap['stop_words'])
        for (; stack.length() > 0;) {
            // console.log(stack+"\n"+ heap["words"]+"\n"+stack[stack.length-1]);
            if (heap['stop_words'].includes(stack[stack.length() - 1])) {
                stack.pop()
            } else {
                heap['words'].push(stack.pop());
            }
        }
        stack.setData(heap['words']);
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

    while (stack.length() > 0) {
        // console.log(stack)

        search();
        // console.log(stack[stack.length-1]);

        if (stack.pop()) {
            stack.push(heap['count-words'][stack.tail()]);
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

//2.2
function search() {


    heap['found'] = false;
    heap['words'] = [];
    heap['current_words'];

    // console.log(stack.tail())
    heap['search_word'] = stack.tail();

    // console.log(heap['search_word'] + "\n"+stack+"\n\n")


    //clear stack
    while (stack.length() > 0)
        heap['words'].push(stack.pop());

    //fill stack woth freq_count
    for (var key in heap['count-words'])
        stack.push(key);

    while (stack.length() > 0 && heap['found'] != true) {

        stack.push(heap['search_word']);
        if (stack.pop() == stack.pop())
            heap['found'] = true;

    }

    while (stack.length() > 0)
        stack.pop();


    //clear stack
    while (heap['words'].length > 0)
        stack.push(heap['words'].pop());


    stack.push(heap['found'])

    delete 
    heap['found'];
    delete
    heap['words'] ;
    delete
    heap['current_words'];

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

    stack.setData(items);
}

function finish(){
    heap['i'];
    
    // console.log(stack)
    stack.push(0)
     while (stack.tail() < 25 && stack.length()> 1){

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
