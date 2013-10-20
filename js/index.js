var app = {

    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        alert('onDeviceReady');
        app.receivedEvent('deviceready');
        bluetoothSerial.list(app.listSuccess, app.listFailure);

        var el = document.getElementById("connecter"); 
        el.addEventListener("click", app.vkconnect, false); 

    },
    deviceAddress : '',
    listSuccess : function(devices){
        alert('listSuccess');
        devices.forEach(function(device) {                      
            if (device.hasOwnProperty("uuid")) {
                alert('uuid: ' + device.uuid);
            }
            if (device.hasOwnProperty("address")) {
                alert('address: ' + device.address);
            }
            if (device.hasOwnProperty("name")) {
                alert('name: ' + device.name);
            }
            if (
                device.name == 'Note2 Agathe'
                ) {
                alert(device.address);
                app.deviceAddress = device.address;
            }
       });
    },
    vkconnect : function(){
        alert(app.deviceAddress);
        alert('vkconnect');
        bluetoothSerial.isConnected(app.isconnectedSuccess, app.isconnectedFailure);
    },
    isconnectedSuccess : function(){
        alert('isconnectedSuccess');
    },
    isconnectedFailure : function(){
        alert('isconnectedFailure');
        bluetoothSerial.connect(app.deviceAddress, app.connectSuccess, app.connectFailure);
    },
    listFailure : function(data){
        alert('listFailure');
    },
    connectSuccess : function(data){
        alert('connectSuccess');
    },
    connectFailure: function(reason) {
        var details = "";
        if (reason) {
            details += ": " + JSON.stringify(reason);
        }
        alert('connectFailure');
        alert(details);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
