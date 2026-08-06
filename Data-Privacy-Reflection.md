# Data Privacy Reflection

## Reflection

**1. What steps can you take to ensure you handle data securely in your daily tasks?**
*   I will ensure that any data collected, such as email addresses and contact info [cite: 1.2.3], is handled strictly according to the privacy policy. 
*   I will verify that all data remains encrypted in transit when developing or testing new features [cite: 1.2.4].
*   I will ensure the AccessibilityService API is used solely to detect and block distracting websites in real time, ensuring it is never used to collect personal or sensitive data [cite: 1.2.4].

**2. How should you store, share, and dispose of sensitive information safely?**
*   **Store:** Rely on the secure cloud sync design to keep data safely synced across multiple platforms (Mac, Windows, iOS, and Android) [cite: 1.1.5].
*   **Share:** Ensure any data sharing complies with our safety standards and that users are aware of what data might be shared with third parties [cite: 1.2.4].
*   **Dispose:** Ensure our backend architectures continue to support user requests to have their data deleted when it is no longer needed [cite: 1.2.4], and ensure session cookies correctly disappear when a user's session ends [cite: 1.1.3].

**3. What are some common mistakes that lead to data privacy issues, and how can they be avoided?**
*   **Over-collection of data:** A common mistake is logging user activity unnecessarily. I will strictly adhere to Focus Bear's standard of *not* logging keystrokes or taking screenshots [cite: 1.1.5].
*   **Lack of transparency:** Failing to ask for explicit consent. We can avoid this by ensuring explicit user permission is always requested for features requiring elevated privileges [cite: 1.2.4].

---

## 🛠️ Task

**1. Identify at least one habit or practice you can adopt to improve data security in your role.**
*   **Habit:** I will habitually review the data payload of any new feature I build. If the data does not directly serve core functionality (such as managing routines or quantified self features [cite: 1.1.5]), I will advocate against collecting it.

**2. Document at least one key learning or security measure you will implement.**
*   **Security Measure:** I learned that maintaining trust requires strict boundaries. I will implement a personal checklist during my code reviews to guarantee that any new tracking or analytics implementations do not inadvertently capture keystrokes or screen contents [cite: 1.1.5], ensuring we stick to only logging explicit user-provided input.
