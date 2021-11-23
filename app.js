var http = require('http');
var mysql = require('mysql');
const util = require('util');

var con = mysql.createConnection({
    host: "192.168.1.9",
    user: "user",
    password: "password",
    database: "db", 
    port: "8080"
  });

con.connect(function(err) {
    if (err) throw err;
    console.log('successfully connected to mysql');
  });

const query = util.promisify(con.query).bind(con);

http.createServer(async function (request, response) {

    await query("UPDATE counterTable SET counter_count = counter_count+1 WHERE counter_id = 1");
    const userCount = query('SELECT counter_count FROM counterTable WHERE counter_id = 1');

    response.writeHead(200, {'Content-Type': 'text/plain'});

    response.write('Hello!\n');

    response.write(' I have been seen '+userCount+' times!\n');

    response.end();

}).listen(3000);


console.log('Server started run at the http://localhost:8000');