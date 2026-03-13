#!/bin/bash

# Build the project
npm run build

# Add gh-pages branch
git add dist && git commit -m "Deploy to GitHub Pages"
git subtree push --prefix dist origin gh-pages

echo "Deployed to GitHub Pages!"
echo "Your site will be available at: https://Jayendra4.github.io/BankManagementSystem/"
