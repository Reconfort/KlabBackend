import Event from "../models/eventModels";
import { uploadToCloud } from "../helper/cloud";
//create new Events
export const createEvent = async (req, res) => {
  try {
    const result = await uploadToCloud(req.file, res);

    const event = new Event({
      title: req.body.title,
      details: req.body.details,
      link: req.body.link,
      location: req.body.location,
      category: req.body.category,
      profile: result.secure_url,
      startDate: req.body.startDate,
      endDate: req.body.startDate,
    });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

//get all events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

//get event by id
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

//update event
export const updateEvent = async (req, res) => {
  try {
    let event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }
    event = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

//delete event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.deleteOne({_id: req.params.id});
    if (event.deletedCount === 0) {
        return res.status(404).json({ msg: 'Event not found' });
    }
    else{
        res.json({ msg: 'Event removed' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
