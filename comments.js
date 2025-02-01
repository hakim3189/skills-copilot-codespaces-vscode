// Create web server
// 1. Create a web server that listens on port 3000
// 2. When you visit http://localhost:3000/ in your browser, the server should respond with "Hello, World!"
// 3. When you visit http://localhost:3000/foo, the server should respond with "404 Not Found"
// 4. When you visit http://localhost:3000/comments, the server should respond with a JSON string of all the comments in the comments.json file
// 5. When you visit http://localhost:3000/comments/0, the server should respond with the first comment in the comments.json file
// 6. When you visit http://localhost:3000/comments/1, the server should respond with the second comment in the comments.json file
// 7. When you visit http://localhost:3000/comments/2, the server should respond with the third comment in the comments.json file
// 8. When you visit http://localhost:3000/comments/3, the server should respond with the fourth comment in the comments.json file
// 9. When you visit http://localhost:3000/comments/4, the server should respond with "404 Not Found"

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

  if (req.url === '/') {
    res.end('Hello, World!');
  } else if (req.url === '/comments') {
    fs.readFile('comments.json', (err, data) => {
      if (err) {
        res.end('404 Not Found');
      } else {
        res.end(data);
      }
    });
  } else if (req.url.match(/\/comments\/\d+/)) {
    const index = req.url.match(/\/comments\/(\d+)/)[1];
    fs.readFile('comments.json', (err, data) => {
      if (err) {
        res.end('404 Not Found');
      } else {
        const comments = JSON.parse(data);
        if (index < comments.length) {
          res.end(JSON.stringify(comments[index]));
        } else {
          res.end('404 Not Found');
        }
      }
    });
  } else {
    res.end('404 Not Found');
  }

});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});