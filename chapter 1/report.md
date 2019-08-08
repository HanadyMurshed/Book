## Chapter 1 

### We have 2 constraints 
 - naming
 - memory limit

First of all these two constraints don't mean faster processing but efficient resource handling.
Actually this method may run slower sometimes becuase the data is fetched from the secondary memory 
but it's useful for dealing with large files especially when the main memory is limited 

#### challange 1
When I searched about dealing with file system like reading/writing, the approach was to use readSynic method and readAsynic/ readfile /writefile but unfortunately these methods load the entire file to the main memory conflicting the first constraint 

#### Solution 1
so I had to search for another way. Which is streams. I had to deal with readStream/WriteStream 
so that I could process and load only a single line to the memory 

#### challange 2 
But still since I created readstream/writestream objects I couldn't write to the same file (update it) 
while reading from it. This problem emerged when I had to write the count to the freq.file. Moreover to write a specfic place or postrion was really a problem since It's not supported with the way I used

#### solution 2

the alternatives were costly
- one solution is to load the whole file and process it as a string and use the replace method
  and then write it again as a whole to the frq file. It's rejected 
- a seconds approach was to use duplex and transform streams since they are both read/write streams
  but I din;t have the time to spend on learning how to deal with them

- my soution, the thing I did is that I used 2 files stored in the secondary memory as freq and hfreq 
  I processed the first one and wrote to the second and vice verse I was swapping between 
  them by reading and writing operations. so that I don't need to laod nor the first one, neither the second to the main  memory.'
  
   It did work for me. First of all I was writing while reading. Seconedly, I alwasy wrote to the end of the file no need to find where the word was stored to update it's count cuz they are stored in the other one from the first place.


PS: the restriction was about the ram only.
