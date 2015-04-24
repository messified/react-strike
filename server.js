var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({
  changeOrigin: true
});
var app = express();
var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? 8080 : 3000;
var publicPath = path.resolve(__dirname, 'public');
var AWS = require('aws-sdk');

/**
 * Bucket Region
 * @type {string}
 */
AWS.config.region = 'us-east-1';

//TODO move auth to hidden config file
AWS.config.accessKeyId = '';
AWS.config.secretAccessKey = '';

app.use(express.static(publicPath));

if (!isProduction) {

  var bundle = require('./server/bundle.js');
  bundle();
  app.all('/build/*', function (req, res) {
    proxy.web(req, res, {
        target: 'http://localhost:8080'
    });
  });

}

proxy.on('error', function(e) {
  console.log('Could not connect to proxy, please try again...');
});

// And run the server
app.listen(port, function () {
  console.log('Server running on port ' + port);
});

app.get('/api/listImages', function(req, res) {
  var s3 = new AWS.S3();
  var params = {
    Bucket: 'sotp-media',
    EncodingType: 'url',
    Prefix: 'stuff/'
  };

  s3.listObjects(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else res.send(data.Contents);
  });
});
