const express = require('express');
const { createEvent } = require('../controllers/eventController');
const authMiddleware = require('../middlewares/authMiddleware'); // Import the auth middleware
const upload = require('../middlewares/multerConfig'); // Import Multer config
const Event = require('../models/Event'); 

const router = express.Router();

// Route to create a new event (protected and with image upload)
router.post('/create', authMiddleware, upload.single('image'), createEvent);

router.get('/', async (req, res) => {
    try {
      const events = await Event.find(); // Fetch all events
      res.status(200).json(events);
      console.log('Event Model:', Event);
    } catch (error) {
      console.error('Error fetching events:', error.message);
      res.status(500).json({ error: 'Failed to fetch events' });
    }
  });
  
module.exports = router;
