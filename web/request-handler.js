var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var statusCode;
  var headers = defaultCorsHeaders;
  archive.isUrlInList(req.url.slice(1) , function(results) {
    if(req.method === 'GET') {
      if(req.url === '/' || req.url === '/styles.css'){
        if(req.url === '/styles.css'){
          headers['Content-Type'] = 'text/css';
        }
        //console.log(req.url);
        //console.log(req.method);
        fs.readFile(__dirname + '/public/index.html', 'utf8', function (err, content) {
          if (err) {
            //console.log('fs.readFile failed :(\n', err)
          } else {
            statusCode = 200;
            res.writeHead(statusCode, headers);
            res.end(content);
          }
        });
        // if requested url is www.google.com then :
        //1. www.google.com should exist in sites.txt AND
        //2. www.google.com should be a file under sites
      } else if (results) {
        console.log('yay the url is there');
      } else if (results === false){
        console.log('url does not exist');
        statusCode = 404;
        res.writeHead(statusCode, headers);
        res.end();
      }
    }
  });
  console.log(req.url.slice(1))


  // res.end(archive.paths.list);
};

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};
