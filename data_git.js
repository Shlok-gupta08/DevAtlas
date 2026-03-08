// =================================================================
//  GIT REFERENCE DATA
//  Based on "The Ultimate Git Reference Guide" markdown notes
// =================================================================
LANGUAGES['git'] = {
    name: 'Git',
    desc: 'The industry-standard distributed version control system. Master branching, rebasing, cherry-pick, reflog, and professional workflows.',
    sections: [
        // -------------------------------------------------------
        //  0. CORE CONCEPTS
        // -------------------------------------------------------
        {
            id: 'concepts',
            title: '0. Core Concepts',
            desc: 'Understand Git\'s underlying architecture before diving into commands.',
            cards: [
                {
                    title: 'The Four Areas of Git',
                    body: `
<ul>
    <li><strong>Working Directory:</strong> Your actual files on disk — what you see in your code editor.</li>
    <li><strong>Staging Area (Index):</strong> The "waiting room." Files here are prepped to be committed. Think of it as a loading dock.</li>
    <li><strong>Local Repository (HEAD):</strong> Your local database of commits. <code>HEAD</code> is a pointer to your current branch or commit.</li>
    <li><strong>Remote Repository:</strong> The centralized server (e.g., GitHub, GitLab) where code is shared with the team.</li>
</ul>
<div class="tip-box">💡 Understanding the flow: <code>Working Dir → git add → Staging → git commit → Local Repo → git push → Remote</code></div>
`
                }
            ]
        },
        // -------------------------------------------------------
        //  1. CONFIGURATION & SETUP
        // -------------------------------------------------------
        {
            id: 'config',
            title: '1. Configuration & Setup',
            desc: 'Setting up your Git environment and personalizing your workflow.',
            cards: [
                {
                    title: 'git config',
                    body: `
<p>Used to set up your Git environment. Settings are applied at three levels: <code>--system</code> (all users), <code>--global</code> (your user), and <code>--local</code> (current repo only).</p>
${codeBlock('bash', `# Identity
git config --global user.name "Your Name"
git config --global user.email "email@example.com"

# Default editor for commit messages
git config --global core.editor "code --wait"

# Create command aliases (shortcuts)
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.st "status -sb"
git config --global alias.lg "log --oneline --graph --all --decorate"

# View all current settings
git config --list

# Set default branch name (modern standard is 'main')
git config --global init.defaultBranch main

# Enable auto-color output
git config --global color.ui auto`)}
`
                },
                {
                    title: 'git init & git clone',
                    body: `
${codeBlock('bash', `# Initialize a new repository
git init
git init -b main   # Set initial branch name to 'main'

# Clone a remote repository
git clone https://github.com/user/repo.git

# Clone a specific branch
git clone -b develop https://github.com/user/repo.git

# Shallow clone (truncated history — faster for huge repos)
git clone --depth 1 https://github.com/user/repo.git

# Clone with submodules
git clone --recurse-submodules https://github.com/user/repo.git`)}
`
                }
            ]
        },
        // -------------------------------------------------------
        //  2. EVERYDAY WORKFLOW
        // -------------------------------------------------------
        {
            id: 'everyday',
            title: '2. Everyday Workflow',
            desc: 'The commands you\'ll use dozens of times a day.',
            cards: [
                {
                    title: 'git status',
                    body: `
<p>Shows the state of the working directory and staging area.</p>
${codeBlock('bash', `git status          # Full output
git status -s       # Condensed output (short)
git status -sb      # Short + branch tracking info

# Status symbols:
# M  = Modified (tracked file changed)
# A  = Added to staging
# D  = Deleted
# ?? = Untracked (new file Git doesn't know about)
# UU = Merge conflict`)}
`
                },
                {
                    title: 'git add',
                    body: `
<p>Moves changes from the Working Directory to the Staging Area.</p>
${codeBlock('bash', `# Stage specific files
git add index.html style.css

# Stage ALL changes (new, modified, deleted)
git add .
git add -A

# Interactive staging — choose specific chunks to stage
git add -p
# (Crucial workplace flag: split messy changes into clean, logical commits)

# Stage only modified/deleted files (ignore new untracked files)
git add -u`)}
<div class="tip-box">💡 <code>git add -p</code> (patch mode) is one of the most powerful flags for professional development. It lets you review each change and choose exactly which hunks to include in a commit.</div>
`
                },
                {
                    title: 'git commit',
                    body: `
${codeBlock('bash', `# Commit with inline message
git commit -m "Add user authentication module"

# Commit all tracked changes (skip git add for modified files)
git commit -a -m "Fix login validation bug"

# Amend the last commit (fix message or add forgotten files)
git add forgotten-file.js
git commit --amend -m "New corrected commit message"
# WARNING: This rewrites the last commit. Never amend a pushed commit!

# Commit without triggering pre-commit hooks (linters, tests)
git commit --no-verify -m "WIP: work in progress"

# Empty commit (useful for triggering CI pipelines)
git commit --allow-empty -m "Trigger CI rebuild"`)}
<div class="warn-box">⚠️ <code>--amend</code> rewrites history. If you've already pushed the commit, you'll need <code>git push --force-with-lease</code> to update the remote — and your teammates will need to know.</div>
`
                }
            ]
        },
        // -------------------------------------------------------
        //  3. BRANCHING
        // -------------------------------------------------------
        {
            id: 'branching',
            title: '3. Branching & Context Switching',
            desc: 'Isolate features, switch contexts, and manage parallel workstreams.',
            cards: [
                {
                    title: 'git branch',
                    body: `
${codeBlock('bash', `# List branches
git branch          # Local branches
git branch -a       # All (local + remote)
git branch -r       # Remote branches only

# Create a new branch (doesn't switch to it)
git branch feature/login

# Delete a branch (safe — prevents if unmerged changes exist)
git branch -d feature/login

# Force delete (abandon a branch regardless of merge status)
git branch -D feature/scrapped-idea

# Rename the current branch
git branch -m new-branch-name`)}
`
                },
                {
                    title: 'git switch & git checkout',
                    body: `
<p>In 2019, Git introduced <code>switch</code> and <code>restore</code> to replace the overloaded <code>checkout</code> command, making branch management much clearer.</p>
${codeBlock('bash', `# MODERN: git switch
git switch main                    # Switch to 'main' branch
git switch -c feature/new-thing    # Create AND switch to new branch
git switch -                       # Switch to previous branch (like "Back" button)

# LEGACY: git checkout (still widely used)
git checkout main                  # Switch to 'main'
git checkout -b feature/new-thing  # Create and switch
git checkout -B feature/reset-branch  # Create or RESET if it already exists`)}
`
                }
            ]
        },
        // -------------------------------------------------------
        //  4. MERGING & REBASING
        // -------------------------------------------------------
        {
            id: 'merging',
            title: '4. Merging & Rebasing',
            desc: 'Integrate changes between branches — the two fundamental strategies.',
            cards: [
                {
                    title: 'git merge',
                    body: `
${codeBlock('bash', `# Merge feature branch into current branch
git merge feature/login

# Force a merge commit even if fast-forward is possible
git merge --no-ff feature/login
# (Maintains historical context: "feature/login was merged at this point")

# Squash merge: combine all feature commits into one staged change
git merge --squash feature/messy-50-commits
git commit -m "Add login feature"
# Result: clean single commit on main

# Abort a merge (if conflicts get out of hand)
git merge --abort`)}
<div class="tip-box">💡 <strong>When to use --no-ff:</strong> In professional environments, <code>--no-ff</code> is often the standard so the Git history clearly shows when feature branches were merged back into <code>main</code>.</div>
`
                },
                {
                    title: 'git rebase',
                    body: `
<p>Takes your current branch, finds where it diverged from the base branch, and reapplies your commits <em>on top</em> of the latest base branch commits. Keeps history linear.</p>
${codeBlock('bash', `# Basic rebase: replay your commits on top of main
git switch feature/my-work
git rebase main

# Interactive rebase — squash, reword, reorder, or drop commits
git rebase -i HEAD~4
# Opens editor:
#   pick 1a2b3c4 Feature start
#   squash 5d6e7f8 WIP
#   squash 9a8b7c6 fix typo
#   squash 1b2c3d4 Finalized feature
# Result: 4 commits become 1 clean commit

# Transplant a branch onto a different base
git rebase --onto newbase oldbase feature

# Continue after resolving a conflict during rebase
git rebase --continue

# Abort the rebase entirely
git rebase --abort`)}
<div class="danger-box">🚨 <strong>The Golden Rule of Rebase:</strong> NEVER rebase a public branch (like <code>main</code>) that other developers are sharing. Only rebase your local, private feature branches to clean them up before merging.</div>
`
                },
                {
                    title: 'Handling Merge Conflicts Like a Pro',
                    body: `
<ol>
    <li>When Git says <code>CONFLICT</code>, don't panic.</li>
    <li>Run <code>git status</code> to see exactly which files are unmerged.</li>
    <li>Open the conflicted files. Look for conflict markers:</li>
</ol>
${codeBlock('text', `<<<<<<< HEAD
Current code (your branch)
=======
Incoming code (the branch you are merging)
>>>>>>> feature-branch`)}
<ol start="4">
    <li>Delete the markers (<code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code>, <code>=======</code>, <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code>) and manually edit the code to the state you want.</li>
    <li>Save the file. Run <code>git add &lt;file&gt;</code>.</li>
    <li>Run <code>git commit</code> (if merging) or <code>git rebase --continue</code> (if rebasing).</li>
</ol>
`
                }
            ]
        },
        // -------------------------------------------------------
        //  5. REMOTE OPERATIONS
        // -------------------------------------------------------
        {
            id: 'remotes',
            title: '5. Remote Operations',
            desc: 'Fetch, pull, push — synchronizing with the team.',
            cards: [
                {
                    title: 'git remote',
                    body: `
${codeBlock('bash', `# List remotes with URLs
git remote -v

# Add a new remote
git remote add origin https://github.com/user/repo.git

# Change a remote's URL
git remote set-url origin https://github.com/user/new-repo.git

# Remove a remote
git remote remove upstream`)}
`
                },
                {
                    title: 'git fetch, pull & push',
                    body: `
${codeBlock('bash', `# FETCH: Download remote data WITHOUT merging
git fetch origin          # Fetch from origin
git fetch --all           # Fetch all remotes
git fetch -p              # Prune: delete local tracking branches that were deleted on remote

# PULL: Fetch + Merge in one step
git pull origin main
git pull --rebase         # Rebase instead of merge (cleaner history!)

# PUSH: Upload commits to remote
git push origin main

# First push (link local branch to remote)
git push -u origin feature/my-branch
# After this, just: git push

# Force push (SAFE version — refuses if someone else pushed)
git push --force-with-lease
# ALWAYS use --force-with-lease instead of --force

# Push all tags
git push --tags`)}
<div class="danger-box">🚨 <strong>Never use <code>--force</code>:</strong> Always use <code>--force-with-lease</code>. Regular <code>--force</code> will overwrite your teammate's commits without warning. <code>--force-with-lease</code> checks if the remote has changes you haven't fetched yet and refuses if so.</div>
`
                }
            ]
        },
        // -------------------------------------------------------
        //  6. UNDOING & RESETTING
        // -------------------------------------------------------
        {
            id: 'undoing',
            title: '6. Undoing & Resetting',
            desc: 'How to undo mistakes — from gentle to nuclear.',
            cards: [
                {
                    title: 'git reset — The Big Three',
                    body: `
${codeBlock('bash', `# --soft: Move HEAD back, keep changes STAGED
git reset --soft HEAD~1
# Great for: "I want to redo the last commit with a different message"

# --mixed (default): Move HEAD back, keep changes UNSTAGED
git reset HEAD~1
git reset --mixed HEAD~1
# Great for: "I want to re-stage these changes differently"

# --hard: Move HEAD back AND DELETE all changes
git reset --hard HEAD~1
# 🚨 DANGER: Uncommitted changes are GONE (but see reflog)

# Reset a single file (unstage it)
git reset HEAD -- file.js
# Modern equivalent: git restore --staged file.js`)}
<table class="styled-table">
<thead><tr><th>Flag</th><th>HEAD Moves</th><th>Staging Area</th><th>Working Directory</th></tr></thead>
<tbody>
<tr><td><code>--soft</code></td><td>✅ Yes</td><td>Unchanged (changes stay staged)</td><td>Unchanged</td></tr>
<tr><td><code>--mixed</code></td><td>✅ Yes</td><td>Reset (changes unstaged)</td><td>Unchanged</td></tr>
<tr><td><code>--hard</code></td><td>✅ Yes</td><td>Reset</td><td>🚨 Reset (changes deleted)</td></tr>
</tbody>
</table>
`
                },
                {
                    title: 'git revert, restore & clean',
                    body: `
${codeBlock('bash', `# REVERT: Create a NEW commit that undoes a previous commit
git revert abc1234
# Safe for shared branches — doesn't rewrite history
# Use case: You pushed a bad commit to main. Revert creates a "fix" commit.

git revert -n abc1234    # Revert but don't auto-commit (stage changes instead)

# RESTORE: Discard changes in working directory (modern replacement for checkout --)
git restore file.js              # Discard unstaged changes
git restore --staged file.js     # Unstage a file (keep changes in working dir)
git restore --source=HEAD~2 file.js  # Restore file from 2 commits ago

# CLEAN: Remove untracked files
git clean -n     # Dry run: show what WOULD be deleted (always do this first!)
git clean -f     # Actually delete untracked files
git clean -fd    # Delete untracked files AND directories
git clean -fdx   # Also delete ignored files (node_modules, build artifacts)`)}
`
                }
            ]
        },
        // -------------------------------------------------------
        //  7. STASHING
        // -------------------------------------------------------
        {
            id: 'stashing',
            title: '7. Stashing',
            desc: 'Temporarily shelve work-in-progress without committing.',
            cards: [
                {
                    title: 'git stash Deep Dive',
                    body: `
<p>Used when you're mid-work, your working directory is messy, and you need to switch branches quickly to fix a bug without committing half-finished work.</p>
${codeBlock('bash', `# Save current work to the stash
git stash push -m "WIP: login validation"

# Stash including untracked (new) files
git stash push -u -m "WIP with new files"

# Stash only specific files
git stash push -m "partial stash" -- file1.js file2.js

# List all stashes
git stash list
# stash@{0}: On feature/login: WIP: login validation
# stash@{1}: On main: quick experiment

# Apply the most recent stash (pop removes it, apply keeps it)
git stash pop               # Apply and remove from stash list
git stash apply             # Apply but keep in stash list
git stash apply stash@{1}   # Apply a specific stash

# View what's in a stash
git stash show stash@{0}    # Summary
git stash show -p stash@{0} # Full diff

# Delete stashes
git stash drop stash@{0}    # Delete specific stash
git stash clear              # Delete ALL stashes`)}
<div class="tip-box">💡 <strong>Workflow:</strong> You're halfway through a feature. Boss says "fix this bug NOW."
<br>1. <code>git stash push -u -m "WIP: feature"</code>
<br>2. <code>git switch main</code> → fix the bug → commit → push
<br>3. <code>git switch feature/my-work</code>
<br>4. <code>git stash pop</code> — you're right back where you left off!</div>
`
                }
            ]
        },
        // -------------------------------------------------------
        //  8. ADVANCED COMMANDS
        // -------------------------------------------------------
        {
            id: 'advanced',
            title: '8. Advanced Engineering',
            desc: 'Cherry-pick, bisect, reflog, blame, worktree — the power tools.',
            cards: [
                {
                    title: 'git cherry-pick',
                    body: `
<p>Takes a specific commit from <em>anywhere</em> in the repository and applies it to your current branch.</p>
${codeBlock('bash', `# Cherry-pick a single commit
git cherry-pick abc1234

# Cherry-pick without auto-committing (stage changes instead)
git cherry-pick -n abc1234

# Cherry-pick a range of commits
git cherry-pick abc1234..def5678`)}
<div class="tip-box">💡 <strong>Workplace scenario:</strong> A dev fixed a critical memory leak in a feature branch that's weeks from merging. You need that fix NOW in the release branch. Check out the release branch, find the fix's commit hash, and <code>git cherry-pick &lt;hash&gt;</code>.</div>
`
                },
                {
                    title: 'git bisect — Binary Search for Bugs',
                    body: `
<p>A binary search tool to find exactly which commit introduced a bug.</p>
${codeBlock('bash', `# Scenario: App worked Friday. Today (150 commits later) login is broken.

# 1. Start bisect
git bisect start

# 2. Mark current state as broken
git bisect bad

# 3. Mark Friday's commit as working
git bisect good abc1234

# 4. Git checks out the MIDDLE commit. You test the app.
# 5. Tell Git if this middle commit is good or bad:
git bisect good    # Bug isn't here — must be in later commits
git bisect bad     # Bug IS here — must be in earlier commits

# 6. Git halves the range again. Repeat until it pinpoints the exact commit.
# Output: "abc5678 is the first bad commit"

# 7. When done, return to where you started
git bisect reset

# AUTOMATED bisect (if you have a test script):
git bisect start HEAD abc1234
git bisect run npm test
# Git will run 'npm test' at each step and find the breaking commit automatically!`)}
`
                },
                {
                    title: 'git reflog — The Safety Net',
                    body: `
<p>Records <strong>every movement of HEAD</strong>, even if commits were reset, dropped, or rebased away. This is your last resort for recovering lost work.</p>
${codeBlock('bash', `# View the reflog
git reflog
# HEAD@{0}: commit: Add feature X
# HEAD@{1}: reset: moving to HEAD~3
# HEAD@{2}: commit: The commit I accidentally deleted!
# HEAD@{3}: checkout: moving from main to feature

# Scenario: You accidentally ran git reset --hard and wiped commits
# 1. Find the state before the reset in reflog
git reflog
# 2. Reset to that point
git reset --hard HEAD@{2}
# Your "lost" commits are restored!

# Or create a new branch from the lost commit
git checkout -b recovered-work HEAD@{2}`)}
<div class="danger-box">🚨 <strong>Reflog entries expire!</strong> By default, entries older than 90 days are pruned. Don't wait too long to recover lost work.</div>
`
                },
                {
                    title: 'git blame & git worktree',
                    body: `
${codeBlock('bash', `# BLAME: Who wrote each line?
git blame src/auth.js
git blame -L 10,20 src/auth.js    # Only lines 10-20
git blame -w src/auth.js          # Ignore whitespace changes
# Don't blame the person who ran the code formatter!

# WORKTREE: Multiple branches checked out simultaneously
git worktree add ../hotfix main
# Creates a NEW DIRECTORY with 'main' checked out
# Your current directory stays on your feature branch

# Scenario: Heavy build running on feature-A. Boss needs urgent fix on main.
# Don't stash or stop your build! Just create a worktree.

# List worktrees
git worktree list

# Remove when done
git worktree remove ../hotfix`)}
`
                }
            ]
        },
        // -------------------------------------------------------
        //  9. HISTORY & INSPECTION
        // -------------------------------------------------------
        {
            id: 'history',
            title: '9. History & Inspection',
            desc: 'Explore and understand your project\'s commit history.',
            cards: [
                {
                    title: 'git log',
                    body: `
${codeBlock('bash', `# Basic log
git log

# One-line format
git log --oneline

# Graph view (see branches merging/diverging)
git log --oneline --graph --all --decorate

# Limit output
git log -n 10                # Last 10 commits
git log --since="2024-01-01" # Since a date
git log --author="Alice"     # By author

# Show what changed in each commit
git log -p                   # Full diffs
git log --stat               # File change summary

# Search commit messages
git log --grep="bug fix"

# Show commits that changed a specific file
git log -- src/auth.js
git log --follow -- src/auth.js  # Follow renames`)}
`
                },
                {
                    title: 'git diff',
                    body: `
${codeBlock('bash', `# Changes in working directory vs staging area
git diff

# Changes in staging area vs last commit
git diff --staged
git diff --cached     # Same as --staged

# Compare two branches
git diff main..feature/login

# Compare a specific file
git diff HEAD -- src/auth.js

# Show only file names that changed
git diff --name-only main..feature

# Word-level diff (instead of line-level)
git diff --word-diff`)}
`
                }
            ]
        },
        // -------------------------------------------------------
        //  10. WORKPLACE COMPLEXITIES
        // -------------------------------------------------------
        {
            id: 'workplace',
            title: '10. Workplace Complexities',
            desc: 'Detached HEAD, PR cleanup, moving commits, and advanced workflows.',
            cards: [
                {
                    title: 'The Detached HEAD State',
                    body: `
<p>Normally, <code>HEAD</code> points to a branch name (like <code>main</code>). If you checkout a specific commit hash or remote branch directly, HEAD <em>detaches</em> from the branch.</p>
${codeBlock('bash', `# How you get into detached HEAD:
git checkout abc1234         # Checkout a specific commit
git checkout origin/main     # Checkout a remote branch directly

# THE DANGER: If you make new commits here and then switch branches,
# those commits have no branch pointing to them — they're "orphaned"
# and will eventually be garbage collected.

# THE FIX: Before switching away, create a branch!
git switch -c my-recovery-branch
# Now your commits are safely on a named branch`)}
`
                },
                {
                    title: 'Interactive Rebase: The PR Cleanup',
                    body: `
<p>In professional environments, reviewers hate seeing a Pull Request with 20 commits like: "WIP", "fix typo", "forgot file", "actual feature". You are expected to squash these.</p>
${codeBlock('bash', `# Squash the last 4 commits into one
git rebase -i HEAD~4

# The editor opens with:
# pick 1a2b3c4 Feature start
# pick 5d6e7f8 WIP
# pick 9a8b7c6 fix typo
# pick 1b2c3d4 Finalized feature

# Change 'pick' to 'squash' (or 's') for commits to squash:
# pick 1a2b3c4 Feature start
# squash 5d6e7f8 WIP
# squash 9a8b7c6 fix typo
# squash 1b2c3d4 Finalized feature

# Save and close. Git opens another editor for the unified message.
# Write a clean commit message and save.

# Force push to update your PR branch:
git push --force-with-lease`)}
`
                },
                {
                    title: 'Moving Commits Between Branches',
                    body: `
<p><strong>Scenario:</strong> You were working on <code>main</code> by mistake instead of a feature branch. You haven't pushed yet.</p>
${codeBlock('bash', `# 1. Create the branch you MEANT to be on
git branch my-feature
# (This points my-feature at your current latest commit)

# 2. Reset main back to the remote state
git reset --hard origin/main

# 3. Switch to your feature branch
git switch my-feature
# Your work is safely isolated on the correct branch!`)}
`
                }
            ]
        }
    ]
};
