var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var path = require("path");
var GitHubApi = require("github");

MongoClient.connect(process.env.MONGO, function (err, db) {
  if (!err) {
    console.log("We are connected");
    router.use(express.static(path.join(__dirname, 'client/build')));

    var github = new GitHubApi({
    });

    router.get('/getFollowers/:userName', function (req, res) {
      console.log(req.params.userName);
      github.users.getFollowingForUser({
        username: req.params.userName
      }, function (err, resp) {
        console.log(resp);
        res.send(JSON.stringify(resp));
      });
    });

    router.get('/followers/best', function (req, res) {
      var col = db.collection('Followers');
      col.find({}, {sort: {followers: -1}}).limit(10).toArray(function (error, resp) {
        console.log(resp);
        res.send(resp);
      })
    });

    router.post('/followers/:userName', function (req, res) {
      var player = {
        name: req.params.userName,
        followers: req.body.followers
      }
      var col = db.collection('Followers');
      col.updateOne({"name": req.params.userName}, player, {upsert: true}).then(function (mongoError, ej2) {
        res.send(ej2);
      })
    });

    router.get('*', function (req, res) {
      res.sendFile(path.join(__dirname + '/client/build/index.html'));
    });

  }
});

module.exports = router;
