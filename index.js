const Discord = require('discord.js');
const db = require('./lib/db.js');
const client = new Discord.Client();

client.on('ready', () => {
    db.setup();
    console.log("Connected as " + client.user.tag);
})

client.on("guildMemberAdd", (newMember) => {
    var memberId = newMember.user.id;
    var memberUsername = newMember.user.username;

    db.findUserById(memberId, function(data) {
        if (data == 0) {
            db.saveUser(memberId, memberUsername, []);
        } else {
            db.fetchRoles(memberId, function(result) {
                newMember.addRoles(result);
            })
        }
    });
})

client.on("guildMemberUpdate", (update) => {
    var userId = update.user.id;
    var username = update.user.username;
    var userRoles = update.guild.members.get(userId)._roles;

    db.saveUser(userId, username, userRoles);
})

client.on("message", (message) => {
    if (message.content.startsWith(".dbSync")) {
        message.guild.members.forEach(member => db.saveUser(member.user.id, member.user.username, member._roles));
    } else if (message.content.startsWith(".dbDeleteUser")) {
        var username = message.content.replace('.dbDeleteUser ','');
        var user = client.users.find(user => user.username == username);
        if (user == null) {
            console.log('User does not exists');
        } else {
            var userId = user.id;
            db.deleteUser(userId);
        }
    }
});

client.login("BOT TOKEN HERE");
