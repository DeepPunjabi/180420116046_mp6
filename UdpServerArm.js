var udp = require('dgram');

var server = udp.createSocket('udp4');

server.on('error', function(error) {
    console.log('Error: ' + error);
    server.close();
});

server.on('message', function(str, info) {
    console.log('Data received from client : ' + str.toString());

    function checkarmStrong(number) { 
        let sum=0; 
        const numberOfDigits = number.length; 
        let temp = number; 
        while (temp > 0) { 
            let remainder = temp % 10; 
            sum += remainder ** numberOfDigits; 
            temp = parseInt(temp / 10); // convert float into integer 
        } 
        if (sum == number) 
        { 
            return number + ' is the Armstrong number.' 
        } 
            else { 
                return number + ' is not the Armstrong number.' 
            } 
        }
    
    
    server.send(checkarmStrong(str), info.port, 'localhost', function(error) {
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