const express = require('express');
const workRouter = express.Router({ mergeParams: true });

const {
  getAllFromDatabase,
  addToDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require('./db.js');

// Routes

// Get Route
workRouter.get('/', (req, res, next) => {
  const allWork = getAllFromDatabase('work');
  const filteredWork = allWork.filter(
    (work) => work.minionId === req.params.minionId
  );
  res.send(filteredWork);
});

// Post Route
workRouter.post('/', (req, res, next) => {
  const newWork = req.body;
  const minionId = req.params.minionId;
  newWork.minionId = req.params.minionId;
  const existMinion = getFromDatabaseById('minions', minionId);
  if (existMinion) {
    const createdWork = addToDatabase('work', newWork);
    res.status(201).send(createdWork);
  } else {
    res.status(404).send();
  }
});

// Put Route
workRouter.put('/:workId', (req, res, next) => {
  const { minionId, workId } = req.params;
  const updatedWork = req.body;
  updatedWork.id = workId;
  updatedWork.minionId = minionId;
  const foundWorkToUpdate = getFromDatabaseById('work', workId);
  if (foundWorkToUpdate && foundWorkToUpdate.minionId === minionId) {
    const result = updateInstanceInDatabase('work', updatedWork);
    res.send(result);
  } else {
    res.status(404).send();
  }
});

// Delete Route
workRouter.delete('/:workId', (req, res, next) => {
  const { minionId, workId } = req.params;
  const workToDelete = getFromDatabaseById('work', workId);
  if (workToDelete && workToDelete.minionId === minionId) {
    deleteFromDatabasebyId('work', workId);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

module.exports = workRouter;
