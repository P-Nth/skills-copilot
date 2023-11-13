// Create web server and listen for requests

// 1. Load modules
var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var comments = require('./comments.json');

// 2. Create webserver
http.createServer(function (req, res) {
    if (req.url === '/') {
        // 3. Read and display the form
        fs.readFile('./public/comments.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    } else if (req.url === '/comments' && req.method === 'GET') {
        // 4. Return the comments object
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(comments));
        res.end();
    } else if (req.url === '/comments' && req.method === 'POST') {
        // 5. Add a new comment
        var requestBody = '';
        req.on('data', function (data) {
            requestBody += data;
        });
        req.on('end', function () {
            var comment = qs.parse(requestBody);
            comments.push(comment);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('<h1>Thank you for your comment</h1>');
            res.end();
        });
    } else {
        // 6. Display 404 error
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<h1>404 Not Found</h1>');
        res.end();
    }
}).listen(3000);
