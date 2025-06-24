const express = require('express');
const minionsRouter = express.Router();
const {
  getAllFromDatabase,
  addToDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require('./db.js');

const workRouter = require('./work');
minionsRouter.use('/:minionId/work', workRouter);

// Add your minion routes here

// Getting all minions
minionsRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('minions'));
});

// Post Method
minionsRouter.post('/', (req, res, next) => {
  const newMinion = req.body;
  if (newMinion) {
    const createdMinion = addToDatabase('minions', newMinion);
    res.status(201).send(createdMinion);
  } else {
    res.status(400).send();
  }
});

// Get a specific Minion
minionsRouter.get('/:minionId', (req, res, next) => {
  const minionId = req.params.minionId;
  const minionFound = getFromDatabaseById('minions', minionId);
  if (minionFound) {
    res.send(minionFound);
  } else {
    res.status(404).send();
  }
});

// Put request
minionsRouter.put('/:minionId', (req, res, next) => {
  const minionId = req.params.minionId;
  const minionToUpdate = getFromDatabaseById('minions', minionId);
  const updatedMinionData = req.body;
  updatedMinionData.id = minionId;
  if (minionToUpdate) {
    const result = updateInstanceInDatabase('minions', updatedMinionData);
    res.status(200).send(result);
  } else {
    res.status(404).send();
  }
});

// Delete request
minionsRouter.delete('/:minionId', (req, res, next) => {
  const minionId = req.params.minionId;
  const minionToDelete = getFromDatabaseById('minions', minionId);
  if (minionToDelete) {
    deleteFromDatabasebyId('minions', minionId);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

module.exports = minionsRouter;
