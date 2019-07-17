import { write } from "fs";
import { stringify } from "querystring";

//npm install -g ts-node
//npm install --save event-stream
//fs.createReadStream() search for this approuche


class Excersuxe1 {
    private fs = require('fs')
    private es = require('event-stream');
    private lineNumber: number = 0;
    private data: any[] = [];

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
        this.data[4] = false // # data[4] is flag indicating if word was found
        this.data[5] = '' // # data[5] is the word
        this.data[6] = '' // # data[6] is word, NNNN
        this.data[7] = 0 // # data[7] is frequency

    }

    static isLetter(str: string): Boolean {
        return str.length === 1 && Boolean(str.match(/^[0-9a-zA-Z]+$/));
    }

    private touchOpen(filename: string) {
        try {
            this.fs.unlinkSync(filename)
        } catch (err) { }
        this.fs.appendFile(filename, function (err: any) {
            if (err) throw err;
            console.log('Saved!');
        });
    }

    private ReadLineByLine() {

        this.InstiateData();
        //        this.touchOpen("CountFreq.txt");
        var wrtier = this.fs.createWriteStream('CountFreq.txt', {
            flags: 'a' // 'a' means appending (old data will be preserved)
        });
        // stream s 
        var inputStream = this.fs.createReadStream('Text Folder\\dummy.txt')
            //piping is taking one stream and feeding it to another
            // stream but we han't used piping like this 
            .pipe(this.es.split())
            .pipe(this.es.mapSync((line: string) => { //line is a problem 

                // pause the readstream
                inputStream.pause();


                var countStream = this.fs.createReadStream('Text Folder\\dummy.txt')
                    .pipe(this.es.split()) //split stream to break on newlines
                    .pipe(this.es.mapSync((wordFreq: string) => { //turn this sync function into a stream
                        countStream.pause();

                        this.data[1] = line;

                        //console.log("line read "+ this.data[1])

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
                                    this.data[4] = false;
                                    this.data[5] = this.data[1].substring(this.data[2], this.data[3]).toLowerCase();
                                    // console.log(this.data[2]+"  "+this.data[3]+" "+this.data[5] +!Excersuxe1.isLetter(c)+"  "+c);
                                    this.data[2] = undefined;
                                    if (this.data[5].length >= 2 && !this.data[0].includes(this.data[5])) {

                                        // think of duplex (writeStream, readStream) 
                                        // pause the readstream manage flow

                                        this.data[6] = wordFreq;

                                        this.data[7] = Number(this.data[6].split(',')[1]);
                                        if (this.data[5] == this.data[6]) {
                                            this.data[7] += 1;
                                            this.data[4] = true;
                                        } else {
                                            console.log(3 + " " + this.data[5])
                
                                            if (!this.data[4]) {
                                                //write on freq.txt 
                                                //create write streaem
                                                //withput string ormat 
                
                                                wrtier.write(this.data[5] + "," + 1 + '\n');
                
                                            } else {
                                                // read and write the whle file is the only wway 
                                                //I found for this sections I'll keep searching elittle 
                
                                                wrtier.write(this.data[5] + "," + this.data[7] + '\n', this.lineNumber);
                
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        countStream.resume();

                        // resume the readsStream, possibly from a callback
                    })
                        .on('error', (err: any) => {
                            console.log('Error while reading file.', err);
                        })
                        .on('end', () => {
                            inputStream.resume();

                        })
                    );


                // resume the readstream, possibly from a callback
                inputStream.resume();
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