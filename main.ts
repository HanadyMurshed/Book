//npm install -g ts-node
//npm install --save event-stream


class Excersuxe1{
    private fs = require('fs')
    private es = require('event-stream');
    private lineNumber : number = 0;
    private data:any[]=[];

    constructor() { }


    private LaodStopWords(){
        this.fs.readFile('Text Folder\\stopwords.txt', (err: any, data: any) => {
            if (err) {
                return console.error(err);
            }
            this.data[0]= data.toString().split('\n');
            //console.log(this.data[0][5])
        });

    }
    private ProcessLine(line : string ){


    }

    ReadLineByLine(){

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
