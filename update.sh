#!/usr/bin/env bash
rm -rf node_modules
rm -f package-lock.json
git pull origin $(git symbolic-ref --short -q HEAD)
npm install
npm install --only=dev
pm2 restart $(pm2 l  | grep "fabi-app" | awk '{ print $2}') --update-env
curl -X POST https://api.twilio.com/2010-04-01/Accounts/AC922925f59d024c675029c352c25d1ea4/Messages.json \
--data-urlencode "From=+15017122661" \
--data-urlencode "Body=Se desplego Myapi" \
--data-urlencode "To=+593999119174" \
-u AC922925f59d024c675029c352c25d1ea4:5363ba2399184557b76238c098de4f33
