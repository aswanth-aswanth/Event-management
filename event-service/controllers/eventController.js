const Event = require("../models/Event");
const { publishEvent } = require("../utils/eventPublisher");

exports.createEvent = async (req, res) => {
  const { name, description, date, location } = req.body;
  try {
    const event = new Event({ name, description, date, location });
    await event.save();

    // Publish event creation message
    publishEvent({ type: "EVENT_CREATED", data: event });

    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }

    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.updateEvent = async (req, res) => {
  const { name, description, date, location } = req.body;

  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: { name, description, date, location } },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }

    // Publish event update message
    publishEvent({ type: "EVENT_UPDATED", data: event });

    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndRemove(req.params.id);

    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }

    // Publish event deletion message
    publishEvent({ type: "EVENT_DELETED", data: { _id: req.params.id } });

    res.json({ msg: "Event removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
