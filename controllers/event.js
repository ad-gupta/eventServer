import { Op, literal } from 'sequelize';
import { Event } from "../models/index.js";

export const createEvent = async (req, res) => {
  try {
    const { name, description, date, location } = req.body;

    if (!name || !date)
      return res.status(400).json({ error: "Name and date are required" });

    const newEvent = await Event.create({
      name,
      description,
      date,
      location,
    });
    res.status(201).json(newEvent);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Server Error" });
  }
};

export const getEvents = async (req, res) => {
  try {
    const { name, date } = req.query;

    let whereClause = {};

    if (name) {
      whereClause = {
        ...whereClause,
        name: {
          [Op.like]: literal(`LOWER('%${name.toLowerCase()}%')`) // Ensures SQLite handles case-insensitive search
        }
      };
    }

    if (date) {
      whereClause.date = date;
    }

    const events = await Event.findAll({ where: whereClause });
    return res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, date, location } = req.body;

    const event = await Event.findByPk(id);
    if (!event)
      return res.status(404).json({ error: "Event not found" });

    event.set({
      name: name ?? event.name,
      description: description ?? event.description,
      date: date ?? event.date,
      location: location ?? event.location
    });

    // Save the changes
    await event.save();
    return res.json(event);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Server Error" });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const eventToDelete = await Event.findByPk(id);
    if (!eventToDelete)
      return res.status(404).json({ error: "Event not found" });
    await eventToDelete.destroy();

    return res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Server Error" });
  }
};

export const toggleRSVP = async (req, res) => {
  try {
    const {id} = req.params;
    const event = await Event.findByPk(id);

    if (!event)
      return res.status(404).json({ error: "Event not found" });

    event.rsvp = !event.rsvp
    await event.save();
    return res.json({event, rsvp: event.rsvp});
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ error: "Error toggling event" });
  }
}