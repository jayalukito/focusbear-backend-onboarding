# Avoiding Code Duplication

### Situation
In my previous experience I had to refactor most of my code due to repeating functions and plain out copying and pasting the same code over and over again because it was easier to compared to just making a function. I had this experience when I created my data visualization website where I had to create multiple charts with somewhat of a similar draw function.

### Problem
My mistake was instead of creating a parent function with parameters to make the code cleaner I just separated them into multiple folders. Thus the codebase became very monolithic huge and somewhat unreadable.

#### Reflection / Solution
So what I did was I used the Extract method and created helper functions to make the code more readable and split the into smaller files and folders according to their functions. However, I also made these helper functions to be usable by other types of charts making them modular thus cleaner and following the principal of DRY

# Commenting & Documentation
### When should I add Comments
When to explain the reason the code was written in a particular way in the first place explaining the WHY instead WHAT the code is.

### When to AVOID Comments 
When the code can be improved upon and see whether the comment is just trying to make up for a poorly written line or actually explaining the "why". 

# Naming Variables & Functions

## What makes a good variable or function name?
A good name is intention-revealing. It should answer three big questions: why it exists, what it does, and how it is used. Variables should typically be nouns (e.g., `cartItems`, `discountPercentage`), while functions should be verbs or verb phrases that clearly describe the action being performed (e.g., `CalculateTotalWithDiscount`). Good names are also searchable and pronounceable, which minimizes cognitive load when reading through the logic.

## What issues can arise from poorly named variables?
Poorly named variables (like `d`, `lst`, or `t`) force developers to rely on context clues or read the entire function line-by-line just to understand basic operations. In an IT consulting environment where tailored software solutions are frequently handed off between different developers or delivered to clients, ambiguous naming creates massive technical debt. It increases the risk of introducing bugs during maintenance because a new developer might misinterpret what a variable like `d` stands for (is it `days`? `discount`? `distance`?).

## How did refactoring improve code readability?
Refactoring transformed the code from a puzzle into a clear narrative. By changing `Calc` to `CalculateTotalWithDiscount`, the function's exact purpose is immediately obvious without looking at its body. Replacing single-letter variables with descriptive names (`t` to `subtotal`, `d` to `discountPercentage`) makes the mathematical logic self-documenting. It removes the need for excessive comments and allows anyone reviewing the codebase to instantly grasp the business logic of the transaction.

# Code Formatting & Style Guides

## Why is code formatting important?
Code formatting is crucial because it prioritizes readability and maintainability. In any project, code is read far more often than it is written. Consistent formatting reduces cognitive load; instead of wasting mental energy parsing different indentation styles, spacing, or quote marks, developers can focus entirely on the core logic and architecture. Furthermore, in a team environment, a strict formatting standard prevents unnecessary debates during code reviews and avoids noisy Git diffs that are caused by formatting changes rather than actual feature updates.

## What issues did the linter detect?
When I ran the linter on the codebase, it caught several inconsistencies and potential bugs. Some of the specific issues detected included:
*   **Variable Declarations:** Instances where `var` was used instead of `const` or `let`, and variables that were declared but never used in the file.
*   **Syntax and Spacing:** Missing trailing commas in objects, inconsistent use of single versus double quotes, and missing semicolons at the end of statements.
*   **Equality Operators:** The linter flagged areas using abstract equality (`==`) and required them to be changed to strict equality (`===`) to prevent unexpected type coercion bugs.
*   *Note: [Add any specific logic errors or warnings your linter flagged here, such as missing return statements or unused imports]*

## Did formatting the code make it easier to read?
Yes, running the formatter made a significant difference in readability. By standardizing the indentation (e.g., locking it to 2 spaces) and enforcing a consistent maximum line width, the structure of the code became entirely predictable. Nested functions and large objects are now much easier to scan visually. This uniformity makes it significantly easier to spot actual logical errors, as my eyes are no longer distracted by messy or chaotic syntax.

