const Ticket = require('../models/Ticket');
const { publishEvent } = require('../utils/eventPublisher');

exports.createTicket = async (req, res) => {
  const { event, user } = req.body;

  try {
    const ticket = new Ticket({ event, user });
    await ticket.save();
    
    // Publish event to RabbitMQ
    publishEvent({ type: 'TICKET_CREATED', data: ticket });

    res.json(ticket);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate('Event').populate('User');
    if (!ticket) {
      return res.status(404).json({ msg: 'Ticket not found' });
    }

    res.json(ticket);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateTicket = async (req, res) => {
  const { status } = req.body;

  try {
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { $set: { status } },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ msg: 'Ticket not found' });
    }
    
    // Publish event to RabbitMQ
    publishEvent({ type: 'TICKET_UPDATED', data: ticket });

    res.json(ticket);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndRemove(req.params.id);

    if (!ticket) {
      return res.status(404).json({ msg: 'Ticket not found' });
    }

    // Publish event to RabbitMQ
    publishEvent({ type: 'TICKET_DELETED', data: ticket });

    res.json({ msg: 'Ticket removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
