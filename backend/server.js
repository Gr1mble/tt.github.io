const http = require('http');
const express = require('./rest.js');

const server = http.createServer(express);

server.listen(3000, function check(err){
    if(err){
        console.log("Error Starting Server on 3000")
    } else {
        console.log("Starting Server on 3000")
    }
})