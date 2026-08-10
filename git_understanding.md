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


# Advanced Git Commands Reflection
**Role:** Developer Intern

## 1. `git checkout main -- <file>`
*   **What it does:** This command restores a specific file to its exact state in the `main` branch, without affecting any other modified files in your current working branch. 
*   **Test Experience:** When testing this, I modified a file in a feature branch but decided I wanted to revert only that specific file back to how it looks in `main`. Running this command safely pulled the `main` version of the file into my working directory, saving me from having to manually undo all my typed changes.

## 2. `git cherry-pick <commit>`
*   **What it does:** It allows you to take a single, specific commit from one branch and apply its changes directly onto your current branch, without having to merge the entire branch.
*   **Test Experience:** I created a commit on a separate branch that contained a fix. By finding the commit hash, I switched back to my main branch and ran `git cherry-pick <hash>`. It perfectly pulled over just that specific change while leaving the rest of the experimental branch behind. 

## 3. `git log`
*   **What it does:** Displays the commit history for the repository. It shows the commit hash, the author, the date, and the commit message.
*   **Test Experience:** Running this command was incredibly useful for seeing a chronological history of the repo. Appending `--oneline` to the command made finding specific commit hashes for cherry-picking extremely fast and easy.

## 4. `git blame <file>`
*   **What it does:** It outputs the content of a file line-by-line, displaying exactly which commit and author last modified each specific line, along with the timestamp.
*   **Test Experience:** I used this on one of my test files. It is easy to see how powerful this would be when trying to track down who introduced a specific bug or when trying to find out why a particular block of code was written a certain way.
To complete this task locally, save the above content into a file named advanced_git_commands.md, then add, commit, and push it to your repository just like your previous reflections.


# Git Understanding: Git Bisect

## 1. `git bisect`
*   **What it does:** It performs a binary search through the repository's commit history to pinpoint the exact commit that introduced a bug or regression.
*   **When to use it in a real-world debugging situation:** When building tailored solutions for clients and a previously working feature unexpectedly breaks. For example, if a C# backend endpoint was working perfectly on Monday but is suddenly failing NUnit tests by Friday after dozens of new commits have been merged, `git bisect` finds the exact breaking commit by testing just a handful of halfway points.
*   **How it compares to manually reviewing commits:** It is exponentially faster. Instead of manually testing commits one by one in a tedious linear fashion, `git bisect` cuts the remaining commits in half with every step. It turns checking 100 commits into a maximum of 7 tests, and can even be fully automated using `git bisect run`.
