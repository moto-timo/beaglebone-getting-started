var mdns = require('mdns');
var io = require('socket.io')(8080);

io.on('connection', function (socket) {
    socket.on('beagle_search', function (name, fn) {
        fn('beagle');
    });
});

// change the default resolver sequence for avahi compatibility on Linux
mdns.Browser.defaultResolverSequence[1] = 'DNSServiceGetAddrInfo' in mdns.dns_sd ?
    mdns.rst.DNSServiceGetAddrInfo() : mdns.rst.getaddrinfo({families:[4]});

var serviceTypes = ['https', 'tcp', 'http', 'ssh', 'workstation', 'udisks-ssh'];

var beagleList = {};

var identifyBeagle = function(service) {
    if(typeof service !== 'undefined' && service) {
        if(service.host && service.host.match(/beagle/i)) {
            if(!(service.addresses[0] in beagleList)) {
                beagleList[service.addresses[0]] = [service.port];
            }
            else {
                beagleList[service.addresses[0]].push(service.port);
            }
        }
    }
    console.log(beagleList);
    socket.broadcast.emit('found beagle');
};

var handleServiceDown = function(service) {
};

var logErrorMessage = function(error) {
    console.log("ERROR: " + error);
};

var findAllBeagles = function() {
    for (var i in serviceTypes) {
        try {
            mdns.createBrowser(mdns.tcp(serviceTypes[i]))
                .on('serviceUp', identifyBeagle)
                .on('serviceDown', handleServiceDown)
                .on('error', logErrorMessage)
                .start();
        }
        catch (e) {
            console.log();
        }
    }
};

var getBeagleList = function() {
    return beagleList;
};


module.exports = {
    findAllBeagles: function () {
        console.log("Finding all beagles");
        findAllBeagles();
    },
    getBeagleList: function() {
        return getBeagleList();
    }
};