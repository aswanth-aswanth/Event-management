const express = require('express');
const {
  createTicket,
  getTicket,
  updateTicket,
  deleteTicket
} = require('../controllers/ticketController');
const router = express.Router();

router.post('/', createTicket);
router.get('/:id', getTicket);
router.put('/:id', updateTicket);
router.delete('/:id', deleteTicket);

module.exports = router;
