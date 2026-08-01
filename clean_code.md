#Avoiding Code Duplication

### Situation
In my previous experience I had to refactor most of my code due to repeating functions and plain out copying and pasting the same code over and over again because it was easier to compared to just making a function. I had this experience when I created my data visualization website where I had to create multiple charts with somewhat of a similar draw function.

### Problem
My mistake was instead of creating a parent function with parameters to make the code cleaner I just separated them into multiple folders. Thus the codebase became very monolithic huge and somewhat unreadable.

#### Reflection / Solution
So what I did was I used the Extract method and created helper functions to make the code more readable and split the into smaller files and folders according to their functions. However, I also made these helper functions to be usable by other types of charts making them modular thus cleaner and following the principal of DRY

#Commenting & Documentation
### When should I add Comments
When to explain the reason the code was written in a particular way in the first place explaining the WHY instead WHAT the code is.

### When to AVOID Comments 
When the code can be improved upon and see whether the comment is just trying to make up for a poorly written line or actually explaining the "why". 



