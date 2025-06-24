const express = require('express');
const ideasRouter = express.Router();

const {
  getAllFromDatabase,
  addToDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require('./db.js');

const { checkMillionDollarIdea } = require('./checkMillionDollarIdea.js');

// Add your minion routes here

// Get All Route
ideasRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('ideas'));
});

// Post route
ideasRouter.post('/', (req, res, next) => {
  const newIdea = req.body;
  if (newIdea) {
    const ideaCreated = addToDatabase('ideas', newIdea);
    res.status(201).send(ideaCreated);
  } else {
    res.status(400).send();
  }
});

// Get by Id Route
ideasRouter.get('/:ideaId', (req, res, next) => {
  const ideaId = req.params.ideaId;
  const ideaFound = getFromDatabaseById('ideas', ideaId);
  if (ideaFound) {
    res.send(ideaFound);
  } else {
    res.status(404).send();
  }
});

// Put Route
ideasRouter.put('/:ideaId', (req, res, next) => {
  const ideaId = req.params.ideaId;
  const ideaToUpdate = getFromDatabaseById('ideas', ideaId);
  const ideaData = req.body;
  ideaData.id = ideaId;
  if (ideaToUpdate) {
    const ideaUpdated = updateInstanceInDatabase('ideas', ideaData);
    res.status(200).send(ideaUpdated);
  } else {
    res.status(404).send();
  }
});

// Delete Route
ideasRouter.delete('/:ideaId', (req, res, next) => {
  const ideaId = req.params.ideaId;
  const ideaToDelete = getFromDatabaseById('ideas', ideaId);
  if (ideaToDelete) {
    deleteFromDatabasebyId('ideas', ideaId);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

module.exports = ideasRouter;
