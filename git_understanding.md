# Merge Conflics & Conflict Resolution

## What Caused The conflict
This happens because I have changes in both branches. One in main branch and in dev branch, thus the conflict was created.

## How did you resolve it ? 
I had to resolve the pull request by choosing which update I want to use. I just chose the previous one and the conflict was fixed.

## What did you learn ? 
I learned how these conflicts would most likely happen in real life development scenarios. Learning how to create pull request, understanding what are conflicts and how to resolve them would benefit me when working with a git environment. 

# Git Understanding: Staging vs. Committing
**Role:** Developer Intern

## 1. What is the difference between staging and committing?
*   **Staging (`git add`):** Prepares selected changes in a temporary preview area (the index). It acts as a draft or preparation area where you select exactly which files or line changes you want to include in your next snapshot.
*   **Committing (`git commit`):** Takes a permanent snapshot of everything in the staging area and records it into the repository's history with a unique commit hash, author details, and commit message.

## 2. Why does Git separate these two steps?
*   Git separates staging and committing to give developers fine-grained control over version control history. It allows you to create **atomic commits**—small, focused snapshots that address a single logical change or bug fix—even if you edited multiple unrelated files during a coding session.

## 3. When would you want to stage changes without committing?
*   **Partial Commits:** When you have edited several files (e.g., refactored a database module and updated a UI component), but want to split them into separate, distinct commits for better clarity during code reviews.
*   **Incremental Reviewing:** When you want to stage verified, working code file-by-file while continuing to test or tweak other parts of the codebase.
*   **Organizing Work:** When preparing a clean, structured set of changes right before crafting a detailed commit message.


# Git Understanding: Branching vs. Pushing to Main
**Role:** Developer Intern

## 1. Why is pushing directly to main problematic?
Pushing directly to the main branch is problematic because it bypasses all quality control and peer review. The main branch is typically the stable "source of truth" and often deploys directly to production environments. If untested, buggy, or incomplete code is pushed straight to main, it can immediately break the live application for users and disrupt the local environments of the entire development team who rely on main as their baseline.

## 2. How do branches help with reviewing code?
Branches create a safe, isolated workspace where new features or bug fixes can be developed without destabilizing the main codebase. Once the work on a branch is complete, a developer can open a Pull Request (PR). This PR isolates the exact lines of code that were changed, allowing other team members to leave comments, catch potential bugs, and ensure the code meets formatting and security standards before it is ever integrated into the main project.

## 3. What happens if two people edit the same file on different branches?
If two developers edit the exact same line or section of a file in their separate branches, Git will not know which version is the correct one to keep when they attempt to merge. This creates a "merge conflict." Git will halt the merge process, mark the conflicting lines directly in the file, and require a human developer to manually review the conflict, choose the correct code to keep, and save the resolution before the merge can be completed.
