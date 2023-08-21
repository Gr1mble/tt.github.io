const http = require('http');
/*const https = require('https');*/

const express = require('./rest.js');

/* const sslCert = "C:/Users/Administrator/Documents/Certs/cert.pem";
const sslKey = "C:/Users/Administrator/Documents/Certs/privkey.pem";

const httpsServer = https.createServer(express, sslCert, sslKey);

httpsServer.listen(3001, function check(err){
    if(err){
        console.log("Error Starting HTTPS Server on 3001")
    } else {
        console.log("Starting HTTPS Server on 3001")
    }
}) */

const httpServer = http.createServer(express);

httpServer.listen(3000, function check(err){
    if(err){
        console.log("Error Starting HTTP Server on 3000")
    } else {
        console.log("Starting HTTP Server on 3000")
    }
})