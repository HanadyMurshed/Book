## Chapter 13: abstract things 

13.1 Constraints

- The larger problem is decomposed into abstract things that make sense for the problem domain.
- Each abstract thing is described by what operations the things of that abstraction can eventually do.
- Concrete things are then bound, somehow, to the abstractions; mechanisms for doing that vary.
- The rest of the application uses the things not by what they are but by what they do in the abstract.

the seconde line refers to interface I think 

now since TypeScript or even JavaScript doesn't support abstract classes 
I uses\ed interfaces as the abstract unit  to define the structure of an entitiy 

we are going to solve this problem using interfaces 

I think this way of abstraction is realy clever, usefull and handy 

It defines what structure an object must has without to worry about how it was implemented 