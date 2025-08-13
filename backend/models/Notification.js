const mongoose = require('mongoose'); 
const { Schema, model, Types } = mongoose;

const NOTIF_TYPES = ['task', 'project', 'lead', 'content', 'event', 'system'];

const notificationSchema = new Schema( { user: { type: Types.ObjectId, ref: 'User', required: true, index: true }, type: { type: String, enum: NOTIF_TYPES }, title: String, message: String, read: { type: Boolean, default: false, index: true }, data: Schema.Types.Mixed, }, { timestamps: { createdAt: true, updatedAt: false } } );

notificationSchema.index({ user: 1, read: 1, createdAt: -1 });

module.exports = model('Notification', notificationSchema);