//npm install -g ts-node
//npm install --save event-stream
//fs.createReadStream() search for this approuche


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

    private InstiateData(){
        this.data[1]=[] // data[1] is line (max 80 characters)
        this.data[2]= undefined// # data[2] is index of the start_char of word
        this.data[3]=0 // # data[3] is index on characters, i = 0
        this.data[4]= false // # data[4] is flag indicating if word was found
        this.data[5]='' // # data[5] is the word
        this.data[6]='' // # data[6] is word, NNNN
        this.data[7]=0 // # data[7] is frequency

    }

    static isLetter(str:string) {
        return str.length === 1 && str.match(/[a-z]/i);
    }

    private touchOpen(filename:string){
        try {
             this.fs.unlinkSync(filename)
         } catch(err) {}
         this.fs.appendFile(filename, function (err:any) {
            if (err) throw err;
            console.log('Saved!');
          }); 
    }

    ReadLineByLine(){

        this.LaodStopWords();
        this.InstiateData();
        this.touchOpen("CountFreq.txt");

        var s = this.fs.createReadStream('Text Folder\\dummy.txt')
        .pipe(this.es.split())
        .pipe(this.es.mapSync((line:string)=>{ //line is a problem 
    
            // pause the readstream
            s.pause();


            this.data[1]=line;

            this.lineNumber += 1;//for now not needed 

            //start line prossceing 
            if(this.data[1] == '') 
             {return ;}
            if (this.data[1][(this.data[1].length)-1] != '\n')
               {this.data[1]+= '\n'}
            this.data[2] = undefined;
            this.data[3] = 0;

            for( var c in this.data[1]){

                if (this.data[2] == undefined){

                    if (Excersuxe1.isLetter(c))// We found the start of a word
                        this.data[2] = this.data[3];

                 }else{
                    if (!Excersuxe1.isLetter(c))

                        this.data[4]=false;
                        this.data[5] = this.data[1].substring(this.data[2],this.data[3]).lower();

                        if (this.data[5].length >= 2 && this.data[0].includes(this.data[5])){

                            var s = this.fs.createReadStream('Text Folder\\dummy.txt')
                            .pipe(this.es.split())
                            .pipe(this.es.mapSync((line:string)=>{ //line is a problem 
                        
                                // pause the readstream
                                s.pause();
                    
                    
                                this.data[6]=line;
                                this.data[7] = Number(this.data[6].split(',')[1]);
                                if (this.data[5] == this.data[6]){
                                    this.data[7] += 1;
                                    this.data[4] = true;
                                }else
                                 {
                                    s.resume();
                                }
         
                    
                                // resume the readstream, possibly from a callback
                            })
                            .on('error', (err: any)=>{
                                console.log('Error while reading file.', err);
                            })
                            .on('end', ()=>{
                                if(!this.data[4]){
                                    //write on freq.txt 
                                }
                            })
                        );

                        }          
                }}

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
