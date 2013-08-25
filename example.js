var http = require('http'),
    fs = require('fs');

var listenPort = process.env.PORT || 3030;

var app = http.createServer(function (req, res) {
    if(req.url == '/') {
        fs.readFile('./chat.html', 'UTF8', function(err, content) {
            if(err) {
                res.writeHead(500);
                res.end("Error: " + err);
                return;
            }
            
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(content);
        });
    } else {
        res.writeHead(404);
        res.end("File Not Found!");
    }
}).listen(listenPort);

console.log('Listening on port: ' + listenPort)

var io = require('socket.io').listen(app);

io.set('log level', 0);

/**
    In this example we are handling two events mouse-location and 
    message.  
**/
io.sockets.on('connection', function (socket) {

    /**
        When we get a mouse-location from a client, we attach the 
        socket.id to the data and broadcast that data to all 
        connected clients.
    **/
    socket.on('mouse-location', function (data) {
        data.id = socket.id;
        
        /**
            socket.broadcast.emit means to send the message to all 
            connected clients except the client that the event 
            originated from.
        **/
        socket.broadcast.emit('mouse-location', data);
    });

    socket.on('message', function (data) {
        io.sockets.emit('message', data);
    });
});