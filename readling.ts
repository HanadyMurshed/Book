//bult in module 
const readline = require('readline');
const fs = require('fs');

// create instance of readline
// each instance is associated with single input stream
let rl = readline.createInterface({
    input: fs.createReadStream('Countfreq.txt')
});

let line_no = 0;

// event is emitted after each line
rl.on('line', function(line:string) {
    line_no++;
    console.log(line);
    let r2 = readline.createInterface({
        input: fs.createReadStream('Countfreq.txt')
    });
        
    // event is emitted after each line
    r2.on('line', function(line:string) {
        console.log(line);
    });
    
    // end
    r2.on('close', function(line:string) {
    });
    
});

// end
rl.on('close', function(line:string) {
    console.log('Total lines : ' + line_no);
});
