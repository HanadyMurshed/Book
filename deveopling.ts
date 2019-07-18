import { write } from "fs";
import { stringify } from "querystring";

//npm install -g ts-node
//npm install --save event-stream
//fs.createReadStream() search for this approuche


class Excersuxe1 {
    private fs = require('fs')
    private es = require('event-stream');
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
        this.data[4] = [] // line count
        this.data[5] = '' // # data[5] is the word
        this.data[6] = '' // # data[6] is word, NNNN
        this.data[7] = [] // # data[7] is frequency

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
        var wrtier = this.fs.createWriteStream('freq.txt', {
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
               this.InstiateData();
                this.data[1] = line;

                this.data[4]=[];

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
                this.data[1]=this.data[4];
                this.data[4]=[];

                var countStream = this.fs.createReadStream('freq.txt')
                    .pipe(this.es.split()) //split stream to break on newlines
                    .pipe(this.es.mapSync((line: string) => { //turn this sync function into a stream


                        // pause the readstream manage flow
                        countStream.pause();

    


                        var c = Number(line.split(',')[1]);
                        this.data[6] = (line.split(',')[0]);
               
                        console.log(this.data[7]);
                        for(var i =0;i< this.data[1].length;i++){
                            if (this.data[1][i] == this.data[6]) {
                                this.data[7][i] = 1+c;
                                this.data[4][i] = true;
                                
                            console.log(this.data[7])
                            console.log(this.data[6]+">"+this.data[1][i])

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


                            for(var i =0;i< this.data[1].length;i++){
                                if (this.data[4][i] == true) {
                                     //write on freq.txt 
                                    //create write streaem
                                    //withput string ormat 
                                    wrtier.seek(-50);
    
                                       wrtier.write(this.data[1][i] + "," + this.data[7][i] + '\n');
    
                                } else {
                                    // read and write the whle file is the only wway 
                                    //I found for this sections I'll keep searching elittle 
    
                                    wrtier.write(this.data[1][i] + "," + 1 + '\n');
    
                                }

                         
                        }
                        inputStream.resume();

                    }
                     ) );


                    
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