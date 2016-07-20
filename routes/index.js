var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');

router.get('/', function (req, res) {
  res.render('index');
});
router.get('/:membershipType/:guardian', function (req, res) {
  res.render('guardian');
});
router.get('/:membershipType/:guardian/fixed', function (req, res) {
  res.render('guardian');
});

// Courtesy of https://github.com/DestinyTrialsReport/DestinyTrialsReport/blob/05c113f8d39dee2a02461902f0c9e1c287cad3aa/server.js#L37
router.get('/Platform/*?', function (req, res) {
  res.setTimeout(25000);
  console.log(req);
  var options = {
    url: 'https://www.bungie.net/' + req.originalUrl,
    headers: {'X-API-Key': 'c1eff700917547f9b7ace07118dd4e84'}
  };
  try {
    request(options, function (error, response, body) {
      if (!error) {
        console.log(body);
        res.send(body);
      } else {
        res.send(error);
      }
    });
  } catch (e) {}
});

module.exports = router;
