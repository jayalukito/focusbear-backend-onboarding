# Code Smells and Code Quality

## What are Code Smells?
Code smells are not necessarily bugs or errors that prevent the program from running. Instead, they are surface-level indicators of deeper design flaws. They impact code quality by making the codebase harder to read, scale, and maintain over time. Left unchecked, code smells contribute to "technical debt," slowing down future development and increasing the risk of introducing bugs when making changes.

---

## Code Examples: Before and After (C# POS Application)

### The Messy Code (Demonstrating 7 Code Smells)
This `PosManager` class acts as a "God Object." It mixes business logic with SplashKit UI rendering and contains multiple code smells.

```csharp
using SplashKitSDK;
using System.Collections.Generic;

public class PosManager 
{
    // 4. Large Class (God Object): Handles cart logic, tax calculation, AND UI rendering all at once.
    
    // 6. Commented-Out Code: Clutters the file and creates confusion.
    // private double legacyTax = 0.05;
    // public void OldCheckout() { ... }

    // 2. Long Function: This method does way too much in one block.
    // 7. Inconsistent Naming: 'crt' and 'uId' are unclear and not descriptive.
    public void pCheckout(Cart crt, string uId) 
    {
        // 5. Deeply Nested Conditionals: The "arrow code" anti-pattern makes logic hard to follow.
        if (crt != null) 
        {
            if (crt.Items != null) 
            {
                if (crt.State == "PENDING") // 1. Magic String: "PENDING" is hardcoded.
                {
                    double t = 0; // 7. Inconsistent Naming.
                    foreach (var i in crt.Items) 
                    {
                        t += i.Price;
                    }

                    // 1. Magic Numbers: 0.10 (tax) and 0.15 (discount) are hardcoded without context.
                    double tx = t * 0.10;
                    double finalAmt = t + tx;

                    if (crt.CustomerType == "MEMBER") 
                    {
                        finalAmt = finalAmt - (finalAmt * 0.15);
                    }

                    // 3. Duplicate Code: Tax is calculated again just for the UI receipt.
                    double uiTax = t * 0.10;
                    
                    // Mixed UI Rendering (SplashKit)
                    // Magic numbers used for drawing coordinates and sizes
                    SplashKit.FillRectangle(Color.White, 100, 100, 400, 600); 
                    SplashKit.DrawText("Total: $" + finalAmt, Color.Black, 120, 120);

                    System.Console.WriteLine("Transaction saved by " + uId);
                }
            }
        }
    }
}
```

### The Clean, Refactored Code
By abstracting the logic, utilizing constants, and returning early, the smells are eliminated and the SplashKit rendering is decoupled from the business logic.

```csharp
using SplashKitSDK;
using System.Collections.Generic;
using System.Linq;

// Extracted Constants to replace Magic Numbers and Strings
public static class PosConstants 
{
    public const double TAX_RATE = 0.10;
    public const double MEMBER_DISCOUNT = 0.15;
    public const string STATUS_PENDING = "PENDING";
    public const string CUSTOMER_MEMBER = "MEMBER";
}

// 4. Broken down into single-responsibility classes
public class CartValidator 
{
    public static bool IsValid(Cart cart) 
    {
        // 5. Eliminated Deeply Nested Conditionals with Guard Clauses
        if (cart == null || cart.Items == null) return false;
        return cart.State == PosConstants.STATUS_PENDING;
    }
}

public class CheckoutCalculator 
{
    public static double CalculateSubtotal(List<Item> items) 
    {
        return items.Sum(item => item.Price);
    }

    public static double CalculateTotal(double subtotal, string customerType) 
    {
        double tax = subtotal * PosConstants.TAX_RATE;
        double total = subtotal + tax;

        if (customerType == PosConstants.CUSTOMER_MEMBER) 
        {
            total -= (total * PosConstants.MEMBER_DISCOUNT);
        }
        return total; // 3. Duplicate code removed; tax logic is only handled here.
    }
}

public class ReceiptRenderer 
{
    // UI logic is now cleanly separated from business logic
    public static void DrawReceipt(double total) 
    {
        SplashKit.FillRectangle(Color.White, 100, 100, 400, 600);
        SplashKit.DrawText($"Total: ${total:F2}", Color.Black, 120, 120);
    }
}

public class PosManager 
{
    // 7. Improved Naming: 'cart' and 'userId' are immediately understandable.
    // 6. Commented-out code has been permanently deleted.
    // 2. Short Function: It now acts purely as an orchestrator.
    public void ProcessCheckout(Cart cart, string userId) 
    {
        if (!CartValidator.IsValid(cart)) return;

        double subtotal = CheckoutCalculator.CalculateSubtotal(cart.Items);
        double total = CheckoutCalculator.CalculateTotal(subtotal, cart.CustomerType);

        ReceiptRenderer.DrawReceipt(total);
        SaveTransaction(userId);
    }

    private void SaveTransaction(string userId) 
    {
        System.Console.WriteLine($"Transaction saved by {userId}");
    }
}
```

---

## Reflections

### What code smells did you find in your code?
Looking back at my recent projects—such as the custom Point of Sale (POS) application I built using C# and SplashKit—I noticed several prevalent code smells. Initially, my main classes suffered from the "God Object" anti-pattern, where a single class was handling UI rendering, inventory calculations, and state management all at once. I also found deeply nested conditionals in the transaction logic and "Magic Numbers" used for hardcoded tax rates and UI grid coordinates, which made the code incredibly brittle and hard to read.

### How did refactoring improve the readability and maintainability of the code?
Refactoring those monolithic classes into smaller, single-purpose components completely transformed the structure. By extracting the rendering logic away from the core business logic, the files became much shorter and easier to scan. Replacing magic numbers with named constants meant that if a UI coordinate or tax rate needed to change, I only had to update it in one central location. Overall, it shifted the codebase from being a fragile, highly coupled script into a modular, maintainable system where each piece does exactly one thing.

### How can avoiding code smells make future debugging easier?
When code smells are eliminated, isolating bugs becomes drastically faster. For instance, if a transaction total is calculating incorrectly, a codebase free of God Objects means I only need to check the specific calculation module, rather than hunting through thousands of lines of mixed UI and transaction logic. Furthermore, flattening nested conditionals reduces the cognitive load required to trace execution paths, and eliminating duplicate code ensures that a bug fixed in one place is definitively fixed everywhere.
