import { write } from "fs";
import { stringify } from "querystring";

//npm install -g ts-node
//npm install --save event-stream
//fs.createReadStream() search for this approuche


class Excersuxe1 {
    private fs = require('fs')
    private es = require('event-stream');
    private data: any[] = [];


    //used to store words count
    private currentCount: string = "./chapter 1\\secondery storage\\freq.txt"
    private lastCount: string = "./chapter 1\\secondery storage\\hfreq.txt"

    constructor() { }

    //start proccesing
    Start() {
        this.fs.readFile( './input\\stopwords.txt', (err: any, data: any) => {
            if (err) {
                return console.error(err);
            }
            this.data[0] = data.toString().split('\n');
            this.ReadLineByLine();
        });

    }

    //it's better to call it reset the data
    private InstiateData() {
        this.data[1] = [] // data[1] is line (max 80 characters)

        //these are used to crop a word from the line 
        this.data[2] = undefined// # data[2] is index of the start_char of word
        this.data[3] = 0 // # data[3] is index on characters, i = 0

        this.data[4] = [] // found flag
        this.data[5] = '' // # data[5] is the word
        this.data[6] = '' // # data[6] is word fetched from the secondey mem.
        this.data[7] = [] // # data[7] is frequency


    }

    //check for letter 
    static isLetter(str: string): Boolean {
        return str.length === 1 && Boolean(str.match(/^[0-9a-zA-Z]+$/));
    }


    private ReadLineByLine() {

        //reset the secondary files for proccesing
        this.fs.writeFile(this.currentCount, '', () => { });
        this.fs.writeFile(this.lastCount, '', () => { });


        // stream the input file
        var inputStream = this.fs.createReadStream( './input\\dummy.txt')
            .pipe(this.es.split()) //split stream to break on newlines
            .pipe(this.es.mapSync((line: string) => { //turn this sync function into a stream

                //stop the stream
                inputStream.pause();

                //setup the data variable
                this.InstiateData();
                
                // line is a function parameter which represent the current line being proccessed
                this.data[1] = line;
                this.data[4] = [];

                //start line prossceing 
                for (var i = 0; i < this.data[1].length; i++) {
                    this.data[3] = i;
                    var c = this.data[1][i];
                    if (this.data[2] == undefined) {
                        if (Excersuxe1.isLetter(c))// We found the start of a word
                        {
                            this.data[2] = this.data[3];
                        }
                    } else {
                        if (!Excersuxe1.isLetter(c)) {
                            this.data[5] = this.data[1].substring(this.data[2], this.data[3]).toLowerCase();
                            this.data[2] = undefined;
                            if (this.data[5].length >= 2 && !this.data[0].includes(this.data[5])) {

                                this.data[7].push(0);
                                this.data[4].push(this.data[5]);
                                // think of duplex (writeStream, readStream) or transform
                            }
                        }
                    }
                }
                this.data[1] = this.data[4];
                this.data[4] = [];

                this.fs.writeFile(this.currentCount, '', () => { });
                var wrtier = this.fs.createWriteStream(this.currentCount, {
                    flags: 'a' // 'a' means appending (old data will be preserved)
                });

                var countStream = this.fs.createReadStream(this.lastCount)
                    .pipe(this.es.split()) //split stream to break on newlines
                    .pipe(this.es.mapSync((line: string) => { //turn this sync function into a stream


                        // pause the readstream manage flow
                        countStream.pause();
                        // console.log(this.currentCount);

                        var c = Number(line.split(',')[1]);
                        this.data[6] = (line.split(',')[0]);

                        var i = 0;
                        for (; i < this.data[1].length; i++) {
                            if (this.data[1][i] == this.data[6]) {
                                this.data[4][i] = true;
                                wrtier.write(this.data[1][i] + "," + (c + 1) + '\n');
                                break;
                            }
                        }
                        if (i == this.data[1].length && line != "")
                            wrtier.write(line + '\n');


                        // resume the readsStream
                        countStream.resume();

                    })
                        .on('error', (err: any) => {
                            console.log('Error while reading file.', err);
                        })
                        .on('end', () => {
                            for (var i = 0; i < this.data[1].length; i++) {
                                if (!this.data[4][i]) {
                                    wrtier.write(this.data[1][i] + "," + 1 + '\n');
                                }
                            }

                            var temp = this.lastCount;
                            this.lastCount = this.currentCount;
                            this.currentCount = temp;;
                            inputStream.resume();

                        }
                        ));
            })

                .on('error', (err: any) => {
                    console.log('Error while reading file.', err);
                })
                .on('end', () => {

                    console.log("top 25 words are listed below \n without any sorting ");
                    this.calculatetop25();

                }
                ));


    }


    private calculatetop25() {
        this.data[1] = [] // words
        this.data[2] = [] // counts 


        var countStream = this.fs.createReadStream(this.lastCount)
            .pipe(this.es.split()) //split stream to break on newlines
            .pipe(this.es.mapSync((line: string) => { //turn this sync function into a stream

                console.log(line);

                this.data[4] = Number(line.split(',')[1]);
                this.data[3] = (line.split(',')[0]);
                // pause the readstream manage flow
                countStream.pause();
                for (var i = 0; i < 25; i++) {
                    if (this.data[1] == [] || this.data[2][i] < this.data[4]) {
                        this.data[1].splice (i,0,this.data[3]);
                        this.data[2].splice (i,0,this.data[4]);
                        break;
                    }
                }


                // resume the readsStream, possibly from a callback
                countStream.resume();

            })
                .on('error', (err: any) => {
                    console.log('Error while reading file.', err);
                })
                .on('end', () => {


                    for (var i = 0; i < 25; i++) {
                        if (this.data[1][i] == undefined) {
                            break;
                        }
                        console.log(this.data[1][i] + "," + this.data[2][i] + "\n");
                    }

                }
                ));




    }

}


let test: Excersuxe1 = new Excersuxe1();
test.Start();
