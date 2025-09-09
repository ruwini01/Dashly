const mongoose = require('mongoose');

const CalendarEventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['meeting', 'deadline', 'event'], required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  description: { type: String },
  attendees: [{ type: String }]
});

module.exports = mongoose.model('CalendarEvent', CalendarEventSchema);
