const r = require('rethinkdb')

var dbConfig = {
  host: process.env.RDB_HOST || 'HOST HERE',
  port: parseInt(process.env.RDB_PORT) || HOST PORT HERE,
  db  : process.env.RDB_DB || 'users',
};

module.exports.setup = function() {
    r.connect({host: dbConfig.host, port: dbConfig.port }, function (err, connection) {
        r.dbCreate(dbConfig.db).run(connection, function(err, result) {
            if(err) {
                console.log("[INFO][setup] " + err.msg);
            } else {
                console.log("[SUCCESS][setup] Database created");
            }
        });
        r.db(dbConfig.db).tableCreate("users", {primaryKey: "userId"}).run(connection, function(err, result) {
            if(err) {
                console.log("[INFO][setup] " + err.msg);
            }
            else {
                console.log("[SUCCESS][setup] Table created");
            }
        });
    });
};

module.exports.findUserById = function (userId, callback) {
    onConnect(function (err, connection) {
        r.db(dbConfig.db).table('users').filter({'userId': userId}).limit(1).run(connection, function(err, cursor) {
            if(err) {
                console.log("[ERROR][findUserById] " + err.msg);
            } else {
                cursor.next(function (err, row) {
                    if(err) {
                        console.log("[ERROR][findUserById] " + err.msg);
                        callback(0);
                    } else {
                        callback(1);
                    }
                    connection.close();
                });
            }
        });
    });
};

module.exports.saveUser = function (userId, username, roles) {
    onConnect(function (err, connection) {
        exports.findUserById(userId, function(data) {
            if (data == 0) {
                r.db(dbConfig.db).table('users').insert({
                    userId: userId,
                    username: username,
                    roles: roles
                }).run(connection, function(err, result) {
                    if(err) {
                        console.log("[ERROR][saveUser] " + err.msg);
                    } else {
                        console.log("[SUCCESS][saveUser] User inserted into database");
                    }
                })
            } else {
                r.db(dbConfig.db).table('users').get(userId).update({username:username, roles: roles}).run(connection, function(err, result) {
                    if(err) {
                        console.log("[ERROR][saveUser] " + err.msg);
                    } else {
                        console.log("[SUCCESS][saveUser] The table has been updated");
                    }
                })
            }
        })
        // connection.close();
    })
};

module.exports.deleteUser = function (userId) {
    onConnect(function (err, connection) {
        r.db(dbConfig.db).table('users').get(userId).delete().run(connection, function(err, cursor) {
            if(err) {
                console.log("[ERROR][deleteUser] " + err.msg);
            } else {
                console.log("[SUCCESS][deleteUser] The user has been deleted");
            }
        });
    });
};

module.exports.fetchRoles = function (userId, callback) {
    onConnect(function (err, connection) {
        r.db(dbConfig.db).table('users').filter({'userId': userId}).limit(1).run(connection, function(err, cursor) {
            if(err) {
                console.log("[ERROR][fetchRoles] " + err.msg);
            } else {
                cursor.next(function (err, row) {
                    if(err) {
                        console.log("[ERROR][fetchRoles] " + err.msg);
                    } else {
                        callback(row.roles);
                    }
                    connection.close();
                });
            }
        });
    });
};

function onConnect(callback) {
  r.connect({host: dbConfig.host, port: dbConfig.port }, function(err, connection) {
    connection['_id'] = Math.floor(Math.random()*10001);
    callback(err, connection);
  });
}
