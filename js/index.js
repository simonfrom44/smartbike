/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    devices : [],
    listedDevices : '',
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        window.bluetooth.startDiscovery(app.onDeviceDiscovered,app.onDiscoveryFinished,app.onstartDiscoveryError)
        jQuery('#sendData').on('click', function(){
            app.sendData();
        });
        jQuery('#isConnected').on('click', function(){
            app.isConnected();
        });
        jQuery('#startConnectionManager').on('click', function(){
            window.bluetooth.startConnectionManager(app.onDataRead, app.startConnectionManagerError)
        })
    },
    onDeviceDiscovered : function(device){        
        alert(JSON.stringify(device));
        app.devices.push(device);
    },
    onDiscoveryFinished : function(){
        app.devices.forEach(function(device){
            app.listedDevices += '<div class="device" data-address="' + device.address + '">';
            app.listedDevices += 'address: ' + device.address + '<br />';
            app.listedDevices += 'name: ' + device.name;
            app.listedDevices += '</div>';
        });
        jQuery('#deviceContainer').html(app.listedDevices);
        jQuery('#deviceContainer .device').on('click', function(){
            var thisAddress = jQuery(this).attr('data-address');
            alert(thisAddress);
            var thisUuid = window.bluetooth.getUuids(app.onGetUuidsSuccess,app.onGetUuidsError,thisAddress)
        });
    },
    onstartDiscoveryError:function(boom){
        alert(JSON.stringify(boom));
    },
    onGetUuidsSuccess : function(uuid){
        alert('onGetUuidsSuccess');
        alert(JSON.stringify(uuid));
        window.bluetooth.connect(app.onConnectSuccess,app.onConnectError, {
            address: uuid.address,
            uuid: uuid.uuids[0]
        });
    },
    onGetUuidsError : function(){
        alert('onGetUuidsError')
    },
    onConnectSuccess : function(){
        alert('onConnectSuccess');
    },
    onConnectError : function(){
        alert('onConnectError')
    },
    onDataRead : function(data){
        alert('onDataRead');
        alert(data);        
    },
    isConnected : function(){
        alert('isConnected');
        window.bluetooth.isConnected(app.onIsConnectedSuccess, app.onIsConnectedError)
    },
    startConnectionManagerError : function(){
        alert('startConnectionManagerError')        
    },
    sendData : function() {
        window.bluetooth.write(app.onSendDataSuccess, app.onSendDataError, 'bonjour');
    },
    onSendDataSuccess : function() {
        alert('onSendDataSuccess')        
    },
    onSendDataError : function() {
        alert('onSendDataError')        
    },
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
