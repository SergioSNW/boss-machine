const express = require('express');
const meetingsRouter = express.Router();

const {
  getAllFromDatabase,
  addToDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,
  createMeeting,
} = require('./db.js');

// Add your minion routes here

// Get route All
meetingsRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('meetings'));
});

// Post Route
meetingsRouter.post('/', (req, res, next) => {
  const newMeeting = createMeeting();
  if (newMeeting) {
    const createdMeeting = addToDatabase('meetings', newMeeting);
    res.status(201).send(createdMeeting);
  } else {
    res.status(400).send();
  }
});

// Delete Route
meetingsRouter.delete('/', (req, res, next) => {
  deleteAllFromDatabase('meetings');
  res.status(204).send();
});

module.exports = meetingsRouter;
