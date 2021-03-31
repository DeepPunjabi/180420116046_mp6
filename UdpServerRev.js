var udp = require('dgram');

var server = udp.createSocket('udp4');

server.on('error', function(error) {
    console.log('Error: ' + error);
    server.close();
});

server.on('message', function(str, info) {
    console.log('Data received from client : ' + str.toString());

    function rev(k) {
       let std=k.toString();
       let newString="";
       for(let i=(std.length-1);i>=0;i--)
       {
        newString+=std[i];
       }
            
         return newString;
      }
    
    server.send(rev(str), info.port, 'localhost', function(error) {
        if (error) {
            client.close();
        } else {
            console.log('Data sent !!!');
        }
    });
});

server.on('listening', function() {
    var address = server.address();
    var port = address.port;
    var family = address.family;
    var ipaddr = address.address;
    console.log('Server is listening at port' + port);
    console.log('Server ip :' + ipaddr);
    console.log('Server is IP4/IP6 : ' + family);
});

server.on('close', function() {
    console.log('Socket is closed !');
});
server.bind(2222);
setTimeout(function() {
    server.close();
}, 8000);