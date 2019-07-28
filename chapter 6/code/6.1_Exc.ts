import { write, readFile } from "fs";
let words = require('fs').readFileAsync('./input\\dummy.txt').toString().match(/[\W_|]+/g).toLowerCase();
let stops =  require('fs').readFileAsync('./input\\stopwordss.txt').toString().split('\n')
//https://www.collectionsjs.com/method/filter