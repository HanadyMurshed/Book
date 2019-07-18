import { write } from "fs";
import { stringify } from "querystring";

//npm install -g ts-node
//npm install --save event-stream
//fs.createReadStream() search for this approuche


class Excersuxe1 {
    private fs = require('fs')
    private es = require('event-stream');
    private data: any[] = [];


    private count1: string = "freq.txt"
    private count2: string = "hfreq.txt"

    constructor() { }

    Start() {
        this.fs.readFile('Text Folder\\stopwords.txt', (err: any, data: any) => {
            if (err) {
                return console.error(err);
            }
            this.data[0] = data.toString().split('\n');
            this.ReadLineByLine();
        });

    }

    private InstiateData() {
        this.data[1] = [] // data[1] is line (max 80 characters)
        this.data[2] = undefined// # data[2] is index of the start_char of word
        this.data[3] = 0 // # data[3] is index on characters, i = 0
        this.data[4] = [] // line count
        this.data[5] = '' // # data[5] is the word
        this.data[6] = '' // # data[6] is word, NNNN
        this.data[7] = [] // # data[7] is frequency

    }

    static isLetter(str: string): Boolean {
        return str.length === 1 && Boolean(str.match(/^[0-9a-zA-Z]+$/));
    }


    private ReadLineByLine() {

        this.InstiateData();

        // stream s 
        var inputStream = this.fs.createReadStream('Text Folder\\dummy.txt')
            //piping is taking one stream and feeding it to another
            // stream but we han't used piping like this 
            .pipe(this.es.split())
            .pipe(this.es.mapSync((line: string) => { //line is a problem 

                // pause the readstream
                inputStream.pause();
                this.InstiateData();
                this.data[1] = line;

                this.data[4] = [];

                //console.log("line read "+ this.data[1])

                //start line prossceing 
                if (this.data[1] == '') { return; }

                for (var i = 0; i < this.data[1].length; i++) {
                    this.data[3] = i;
                    var c = this.data[1][i];
                    if (this.data[2] == undefined) {
                        //    console.log("char  "+ c)
                        if (Excersuxe1.isLetter(c))// We found the start of a word
                        {
                            this.data[2] = this.data[3];
                            //console.log(c);
                        }
                    } else {
                        if (!Excersuxe1.isLetter(c)) {
                            this.data[5] = this.data[1].substring(this.data[2], this.data[3]).toLowerCase();
                            // console.log(this.data[2]+"  "+this.data[3]+" "+this.data[5] +!Excersuxe1.isLetter(c)+"  "+c);
                            this.data[2] = undefined;
                            if (this.data[5].length >= 2 && !this.data[0].includes(this.data[5])) {

                                this.data[7].push(0);
                                this.data[4].push(this.data[5]);
                                // think of duplex (writeStream, readStream) 
                            }
                        }
                    }
                }
                this.data[1] = this.data[4];
                this.data[4] = [];


                //this.touchOpen("CountFreq.txt");
                this.fs.writeFile(this.count1, '', function(){console.log('done')})            ;
                    var wrtier = this.fs.createWriteStream(this.count1, {
                    flags: 'a' // 'a' means appending (old data will be preserved)
                });

                var countStream = this.fs.createReadStream(this.count2)
                    .pipe(this.es.split()) //split stream to break on newlines
                    .pipe(this.es.mapSync((line: string) => { //turn this sync function into a stream


                        // pause the readstream manage flow
                        countStream.pause();

                        var c = Number(line.split(',')[1]);
                        this.data[6] = (line.split(',')[0]);

                        console.log(this.data[7]);
                        var i = 0;
                        for (; i < this.data[1].length; i++) {
                            if (this.data[1][i] == this.data[6]) {
                                this.data[4][i]=true;
                                wrtier.write(this.data[1][i] + "," + (c+1) +'\n');
                                break;
                            } 
                        }
                        if(i==this.data[1].length && line!="" )
                        wrtier.write(line+'\n');


                        // resume the readsStream, possibly from a callback
                        countStream.resume();

                    })
                        .on('error', (err: any) => {
                            console.log('Error while reading file.', err);
                        })
                        .on('end', () => {


                            for (var i = 0; i < this.data[1].length; i++) {
                                if (!this.data[4][i] ) {
                                    wrtier.write(this.data[1][i] + "," + 1 + '\n');

                                }

                                var temp= this.count1 ;
                                this.count1=this.count2;              
                                this.count2 = temp;;

                            }
                            inputStream.resume();

                        }
                        ));



                // resume the readstream, possibly from a callback
            })
                .on('error', (err: any) => {
                    console.log('Error while reading file.', err);
                })
                .on('end', () => {
                    console.log('Read entire file.')
                })
            );
    }

}


let test: Excersuxe1 = new Excersuxe1();
test.Start();
