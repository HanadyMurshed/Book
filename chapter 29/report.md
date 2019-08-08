## Chapter 29: Dataspaces

If I talked about concarancy and threading in JS and trying to achieve them. It would take so much time and writing and I don't want you to get bored 

the things I've leanred in this chapter

- JS (single threaded) is meant for simple web page design. Complex and heavy calculations that need multithreading is not taken in considration
since it may be implemented in the server side
. Further more, multithreading is tied to the OS and the web itself is meant to be OS independant 
so multithreading is not supported  

+ Threaading requires concurrancy control synchronization and messaging control between thread . In web browser many pages may be opened at the same time and by many I mean so many tabs 
and to multithread each one of them it will cause the browser to crush and fail (so many overhead)

anther approuch 
- use timer and function to bulit a fake programmed multithreading // actually it is asynchrounce functions call 
- web worker: this is for multithreading ... real multithreading but it is used to run named js file. new browser tends to add this feature  

