#!/usr/bin/env bash
rm -rf node_modules
rm -f package-lock.json
git pull origin $(git symbolic-ref --short -q HEAD)
npm install
npm install --only=dev
pm2 restart $(pm2 l  | grep "fabi-app" | awk '{ print $2}') --update-env
