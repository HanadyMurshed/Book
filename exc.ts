//npm install -g ts-node
//npm install --save event-stream
//fs.createReadStream() search for this approuche
//https://itnext.io/using-node-js-to-read-really-really-large-files-pt-1-d2057fe76b33 

class Excersuxe1{
    private fs = require('fs')
    private es = require('event-stream');
    private lineNumber : number = 0;
    private data:any[]=[];

    constructor() { }


    private PrepareData(){
        this.fs.readFile('Text Folder\\stopwords.txt', (err: any, data: any) => {
            if (err) {
                return console.error(err);
            }
            this.data[0]= data.toString().split('\n'); //data[0] holds the stopwords
            //console.log(this.data[0][5])
            this.data[1]=[]; //data[1] is the line wich is 80 character long
            this.data[2]= undefined; //data[2] is index of the start_char of word
            this.data[3]= 0; //data[3] is index on characters, i = 0
            this.data[4]= false; //data[4] is flag indicating if word was found
            this.data[5]= ''; //data[5] is the word
            this.data[6]= ''; //data[6] is word, NNNN
            this.data[7]= 0; //data[7] is frequency

        });

    }

    private touchopen(){

        try{

        }
        catch(error){

        }
    }

    private ProcessLine(line : string ){
    }

    // to laod the input file line by line 
    ReadLineByLine(){
        this.PrepareData();
        var s = this.fs.createReadStream('Text Folder\\dummy.txt')
        .pipe(this.es.split())
        .pipe(this.es.mapSync((line:string)=>{   
            // pause the readstream
            s.pause();
    
            this.lineNumber += 1;
            this.ProcessLine(line);
            // resume the readstream, possibly from a callback
            s.resume();
        })
        .on('error', function(err: any){
            console.log('Error while reading file.', err);
        })
        .on('end', function(){
            console.log('Read entire file.')
        })
    );
    }


}
let test: Excersuxe1 = new Excersuxe1();
