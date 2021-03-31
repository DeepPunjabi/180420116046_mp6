var udp = require('dgram');

var server = udp.createSocket('udp4');

server.on('error', function(error) {
    console.log('Error: ' + error);
    server.close();
});

server.on('message', function(str, info) {
    console.log('Data received from client : ' + str.toString());

    function checkPrime(k) {
        var count=0;
        for(var i=1;i<=k;i++){
            if(k%i===0){
                 count++;
            }
        }
        if(count===2){
            return 'It is a Prime number'
        }
        return 'It is not a Prime number';
     }
    
    server.send(checkPrime(str), info.port, 'localhost', function(error) {
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