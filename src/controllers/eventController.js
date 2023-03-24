import Event from "../models/eventModels";

//create new Events
export const createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
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
