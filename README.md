# RaverBot

## About

Has your server ever randomly been deleted? Has someone ever left your server and then had to spam you so they could get their rank back? Well, Raver the Discord role saver keeps a server pain free by storing user roles in a database so you'll never have to spend time reassigning them!

If the bot is running when a user enters your server, their user id, username, and roles assigned to them (which will initally be none) will automatically be stored into the database. Then say you give then a new role the database will automatically update to accommodate that change. If they leave the server for any reason, and join back Raver will scour the database and give them the roles they were already assigned.

## Commands
#### Main:
- `.dbSync` - Syncs every user to RethinkDB (Should be the first command used after setup)
- `.dbRemoveUser` - Removes user from database (Useful for if you kick someone and don't want them to rejoin with their old roles)

---

<a name="localconfig" />

## Local Installation
#### Windows:
- Install [Node.js v10.15.1](https://nodejs.org/en)
- [cd](https://en.wikipedia.org/wiki/Cd_%28command%29) to where you would like RaverBot installed
- Download RaverBot (open the [command prompt](http://windows.microsoft.com/en-us/windows/command-prompt-faq) and write `git clone https://github.com/AustinWildgrube/RaverBot.git` or if you don't have/want to use [git](https://git-scm.com/downloads), download the ZIP by clicking the green Download button at the top right of this page)
- Open `lib/db.js` and change the variables to your specific information. Note that only variables with the `*Required*` comment are needed
- Open `/index.js` and add your [bot token](https://discordapp.com/developers/applications/) at the bottom of the file

#### Linux:
- Install [Node.js v10.15.1](https://nodejs.org/en)
- [cd](https://en.wikipedia.org/wiki/Cd_%28command%29) to where you would like RaverBot installed
- Download RaverBot (open the [terminal](http://www.howtogeek.com/140679/beginner-geek-how-to-start-using-the-linux-terminal) and write `git clone https://github.com/AustinWildgrube/RaverBot.git` or if you don't have/want to use [git](https://git-scm.com/downloads), download the ZIP by clicking the green Download button at the top right of this page)
- Open `lib/db.js` and change the variables to your specific information. Note that only variables with the `*Required*` comment are needed
- Open `/index.js` and add your [bot token](https://discordapp.com/developers/applications/) at the bottom of the file

#### Mac:
- Install [Node.js v10.15.1](https://nodejs.org/en)
- [cd](https://en.wikipedia.org/wiki/Cd_%28command%29) to where you would like RaverBot installed
- Download RaverBot (open the [terminal](http://blog.teamtreehouse.com/introduction-to-the-mac-os-x-command-line) and write `git clone https://github.com/AustinWildgrube/RaverBot.git` or if you don't have/want to use [git](https://git-scm.com/downloads), download the ZIP by clicking the green Download button at the top right of this page)
- Open `lib/db.js` and change the variables to your specific information. Note that only variables with the `*Required*` comment are needed
- Open `/index.js` and add your [bot token](https://discordapp.com/developers/applications/) at the bottom of the file

#### RethinkDB
RaverBot comes setup and ready for [RethinkDB](https://www.rethinkdb.com/).

1. The GUI for RethinkDB can be found at `your.local.ip:8080`
2. Once the bot is started the database and tables will be created for you under the name of `users`

## Delployment

- [cd](https://en.wikipedia.org/wiki/Cd_%28command%29) to where RaverBot is installed
- Run `rethinkdb`in the RaverBot directory to start RethinkDB
  - If you would like to keep RethinkDB running 24/7 you can run `$ nohup rethinkdb &` 
- Run `npm start` in the RaverBot directory to start the bot
  - If you would like to keep the bot running 24/7 you can run `$ nohup npm start &`
- Invite the bot to your server putting the URL in your browser `https://discordapp.com/oauth2/authorize?client_id=540018685000155156&permissions=8&scope=bot1`
- The bot may only add roles lower than itself. To safe gaurd against it not working, make sure the bots role is the highest on the list

## Updating
#### [Changelog](CHANGELOG.md)

Updating RaverBot is like any other Node.js app. Just run `git pull && npm install` in the RaverBot folder via the [terminal](http://www.howtogeek.com/140679/beginner-geek-how-to-start-using-the-linux-terminal) if you're on Linux or the [command prompt](http://windows.microsoft.com/en-us/windows/command-prompt-faq) if you're on Windows. You may also download the ZIP, configure it and run npm install again.

---

## Feature Requests

Have a feature in mind? We'd love to hear about it. Feel free to [open an issue](https://github.com/AustinWildgrube/RaverBot/issues/new) and let us know.
