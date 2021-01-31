const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist/conFusion'));
app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+
    '/dist/conFusion/index.html'));});
var port=process.env.PORT || 8080;
app.listen(port);
