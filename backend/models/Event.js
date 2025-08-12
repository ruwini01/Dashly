const mongoose = require('mongoose'); 
const { Schema, model, Types } = mongoose;

const EVENT_TYPES = ['meeting', 'deadline', 'reminder', 'call'];

const eventSchema = new Schema( { title: { type: String, required: true, trim: true }, description: String, type: { type: String, enum: EVENT_TYPES, index: true }, start: { type: Date, required: true, index: true }, end: { type: Date }, allDay: { type: Boolean, default: false }, location: String, conferenceUrl: String, attendees: [{ type: Types.ObjectId, ref: 'User', index: true }], relatedProject: { type: Types.ObjectId, ref: 'Project' }, relatedTask: { type: Types.ObjectId, ref: 'Task' }, createdBy: { type: Types.ObjectId, ref: 'User' }, }, { timestamps: true } );

eventSchema.index({ start: 1, type: 1 });

module.exports = model('Event', eventSchema);