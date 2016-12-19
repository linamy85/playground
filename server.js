// This is a file for local testing.
// Why? Because some function (eg. google auth) will depends on 
// 		http:// or https:// instead of file://

//////////////////	Usage	////////////////////
// For test at localhost:
// step 1: npm install connect serve-static
// step 2: node server.js
// step 3: open browser with url "http://localhost:8080" and you'll see index.html

var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(8080, function(){
    console.log('Server running on 8080...');
});