const Event = require('../models/Event');

// Create Event
exports.createEvent = async (req, res) => {
    const { title, description, date, location, maxAttendees, eventType } = req.body;

    try {
        const event = new Event({
            title,
            description,
            date,
            location,
            maxAttendees,
            eventType,
            image: req.file ? req.file.path : null, // Store the uploaded image path
            createdBy: req.user.userId, // Get the logged-in user ID from JWT
        });

        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ msg: 'Server error', error: error.message });
    }
};

  