const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
const mongoURI = 'mongodb://localhost:27017/scheduler_app/timedate_data'; 

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Mongoose schema for storing time and date
const timeDateSchema = new mongoose.Schema({
    datetime: {
        type: String,
        required: true
    }
});

const TimeDate = mongoose.model('TimeDate', timeDateSchema);

// API endpoint to receive and store the time and date
app.post('/api/time-date', async (req, res) => {
    const { datetime } = req.body;
    try {
        const newTimeDate = new TimeDate({ datetime });
        await newTimeDate.save();
        res.json({ message: 'Time and date saved successfully!' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save time and date' });
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
