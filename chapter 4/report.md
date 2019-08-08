## Chapter 4: Cookbook
in chapter 2 we used this type of programming 
. We used only a stack as a shared state but we divieded the code into tasks and precedres that acts on that shared stack.

for this type of programming the major drawback is the **idempotancy**.

** idempotance : the quality of the same power (same + power)
This type of programming act on the state may  in a cumulative manner the output of each call will be differanct.

the **functional prgoramming** is solved this problem a function will always gives the same output 
for a given input and it won't face the problem of changing a mutable state or data.

**ask for side effect, when to use this style 

for me 
** scope of the shared state is a problem 