# Company Policies
## Cyber Security

### 1. What security measures do you currently follow, and where can you improve?
In my current development workflows, I adhere to the principle of least privilege, especially when configuring access in Active Directory (ADDS) and managing Group Policy Objects. At the application level, I ensure sensitive credentials and API keys are kept out of source control by utilizing environment variables across my Next.js, Laravel, and Python projects. When interacting with databases like MySQL and MongoDB, I use parameterized queries and ORMs to prevent SQL/NoSQL injection. My background in developing threat detection models, specifically working with NLP for smishing detection, has also ingrained a strong awareness of data sanitization and input validation.
While I handle basic application security well, I want to improve my integration of automated security testing directly into the CI/CD pipeline. I also aim to deepen my practical application of the OWASP Top 10 across all the frameworks I use, ensuring that secure coding is uniform whether I am writing API endpoints in Express.js or building out backend services in C# and .NET.

### 2. How can you make secure behaviour a habit rather than an afterthought?
Making security a habit requires a "shift-left" mentality—treating it as a foundational requirement rather than a final checklist item. I plan to incorporate security checks into my standard unit testing routines. For example, when writing tests in NUnit for C# applications, I will include specific test cases for edge cases, unauthorized access attempts, and input boundaries, rather than just testing for functional success. By consistently designing architecture and network topologies with security in mind from the beginning, secure behavior becomes a natural part of the development lifecycle.

### 3. What steps will you take to ensure your passwords and accounts are secure?
I use a reputable password manager to generate, store, and auto-fill complex, unique passwords for every account. In addition, I enable MFA on all accounts, preferring authenticator apps or hardware keys over SMS-based verification whenever possible.

### 4. What would you do if you suspected a security breach or suspicious activity on your account?
I would try to isolate the breach by disconnecting the device from the network. Next, I would report the issue with the internal IT and security team. Lastly, I would change the account passwords, API keys, database credentials and ETC to contain the breach. 
