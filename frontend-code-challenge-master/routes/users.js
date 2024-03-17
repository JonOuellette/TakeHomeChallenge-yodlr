var express = require('express');
var router = express.Router();
var _ = require('lodash');
var fs= require('fs')
var path = require('path')
var logger = require('../lib/logger');
var log = logger();

var users = require('../init_data.json').data;
var curId = _.size(users);

/* GET users listing. */
router.get('/', function(req, res) {
  res.json(_.toArray(users));
});

/* Create a new user */
router.post('/', function(req, res) {
  var user = req.body;
  user.id = curId++;
  if (!user.state) {
      user.state = 'pending';
  }
  users[user.id] = user;
  log.info('Created user', user);

  // Convert the updated users object back into JSON
  const updatedData = JSON.stringify({ data: users }, null, 2);
  console.log('Writing updated data to file');
  // Write this back into init_data.json
  fs.writeFile(path.join(__dirname, 'init_data.json'), updatedData, 'utf8', (err) => {
      if (err) {
          console.error('Error writing file', err);
          res.status(500).json({ message: 'Error writing file', error: err });
          return;
      }
      res.json(user);
  });
});

/* Get a specific user by id */
router.get('/:id', function(req, res, next) {
  var user = users[req.params.id];
  if (!user) {
    return next();
  }
  res.json(users[req.params.id]);
});

/* Delete a user by id */
router.delete('/:id', function(req, res) {
  var user = users[req.params.id];
  delete users[req.params.id];
  res.status(204);
  log.info('Deleted user', user);
  res.json(user);
});

/* Update a user by id */
router.put('/:id', function(req, res, next) {
  var user = req.body;
  if (user.id != req.params.id) {
    return next(new Error('ID paramter does not match body'));
  }
  users[user.id] = user;
  log.info('Updating user', user);
  res.json(user);
});


module.exports = router;
