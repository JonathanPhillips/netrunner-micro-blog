---
title: "How to Blog Like a Netrunner"
date: 2024-10-06T12:00:00-00:00
categories: ["tutorial"]
tags: ["blogging", "indie-web", "cyberpunk"]
---

Here's how easy it is to blog with this setup:

## Step 1: Create a Markdown File

Create a new file in `content/posts/` with the format:
```
YYYY-MM-DD-post-title.md
```

## Step 2: Write Your Post

Just write in markdown:
- Use `#` for headers
- Use `**bold**` for emphasis
- Add code blocks with triple backticks
- Include images with `![alt](url)`

## Step 3: Push to GitHub

```bash
git add .
git commit -m "New blog post"
git push
```

## Step 4: Auto-Deploy Magic

GitHub Actions automatically:
1. Builds your Hugo site
2. Applies the cyberpunk theme
3. Deploys to GitHub Pages
4. Your post is live in ~2 minutes!

No manual uploading. No FTP. Just write, commit, push. 

The indie web, automated.

`> EOF`