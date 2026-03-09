#!/bin/bash
# Quick deploy — commit all changes and push to trigger GitHub Pages deploy
# Usage: ./scripts/deploy.sh "what changed"

set -e
cd "$(dirname "$0")/.."

MSG="${1:-Update site content}"

echo "📦 Staging all changes..."
git add -A

if git diff --cached --quiet; then
  echo "✅ Nothing to deploy — no changes found."
  exit 0
fi

echo ""
echo "📋 Changes to deploy:"
git diff --cached --stat
echo ""

git commit -m "$MSG"
git push origin main

echo ""
echo "🚀 Pushed! GitHub Pages will deploy in ~1 minute."
echo "   Live at: https://uzihaq.github.io/brightcodecreative/"
