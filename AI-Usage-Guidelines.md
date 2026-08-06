# AI Usage Reflection & Task

# Reflection

### 1. When should you use AI for assistance, and when should you rely on your own skills?
*   When to use AI: Writing boilerplate code, generating basic unit tests, and exploring new documentation.
*   When to rely on myself: Core business logic, complex debugging, architecture design, and security implementations.

### 2. How can you avoid over-reliance on AI while still benefiting from it?
*   Treat AI as a tool, not a definitive authority.
*   Never copy-paste code without understanding exactly how it works line-by-line.
*   Ensure I can explain the "why" behind any AI-suggested bug fix.

### 3. What steps will you take to ensure data privacy when using AI tools?
*   Strip all proprietary code and business logic before prompting.
*   Never paste API keys, environment variables, or database credentials into a chat.

---

# Task

**1. Identify one task you can improve using an AI tool, and try it out.**
*   **Task:** Generating boilerplate NUnit test cases for a new C# authentication class.

**2. Review the AI-generated output critically—did it require editing or fact-checking?**
*   Yes, it required editing. While the basic test syntax was correct, the AI made incorrect assumptions about our dependency injection. I had to manually rewrite the mock objects and update assertions to match our custom error handling.

**3. Document one best practice you will follow when using AI tools at Focus Bear.**
*   **Best Practice:** *Verify Before Committing.* Treat all AI-generated code as an untrusted draft. It must pass the same code review, linting, and testing standards as human-written code.
