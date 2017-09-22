var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var path = require("path");
var GitHubApi = require("github");

MongoClient.connect("mongodb://admin:AdminAdmin@ds139954.mlab.com:39954/datosdeportivos", function (err, db) {
  if (!err) {
    console.log("We are connected");
    router.use(express.static(path.join(__dirname, 'client/build')));

    var github = new GitHubApi({
    // optional
    });

    router.get('/getFollowers/:userName', function (req, res) {
      console.log(req.params.userName);
      github.users.getFollowingForUser({
          username: req.params.userName
      }, function(err, resp) {
          console.log(resp);
          res.send(JSON.stringify(resp));
      });
    });

    router.post('/followers/:userName', function (req, res) {
      var player = {
        name : req.params.userName,
        followers : req.body.followers
      }
      var col = db.collection('Followers');
      col.updateOne({"name" : req.params.userName }, player, {upsert: true}).then(function (mongoError, ej2) {
        res.send(ej2);
      })
    });

    router.get('*', function (req, res) {
      res.sendFile(path.join(__dirname+'/client/build/index.html'));
    });

  }
});


module.exports = router;
