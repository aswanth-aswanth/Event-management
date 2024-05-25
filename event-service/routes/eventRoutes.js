const express = require('express');
const {
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController');
const router = express.Router();

router.post('/', createEvent);
router.get('/:id', getEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
