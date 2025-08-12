const mongoose = require('mongoose'); 
const { Schema, model, Types } = mongoose;

const CONTENT_TYPES = ['blog', 'video', 'social', 'email', 'ad', 'other']; 
const CONTENT_STATUS = ['idea', 'draft', 'review', 'scheduled', 'published']; 
const CHANNELS = ['website', 'youtube', 'instagram', 'x', 'linkedin', 'email', 'ads', 'other'];

const assetSchema = new Schema( { name: String, url: String, kind: { type: String, enum: ['image', 'video', 'doc', 'link'] }, }, { _id: false } );

const contentItemSchema = new Schema( { title: { type: String, required: true, trim: true, index: true }, type: { type: String, enum: CONTENT_TYPES, index: true }, status: { type: String, enum: CONTENT_STATUS, default: 'idea', index: true }, owner: { type: Types.ObjectId, ref: 'User', index: true }, dueDate: { type: Date, index: true }, channels: [{ type: String, enum: CHANNELS }], assets: [assetSchema], brief: String, keywords: [{ type: String, trim: true }], campaign: String, scheduledAt: Date, publishedAt: Date, }, { timestamps: true } );

contentItemSchema.index({ status: 1, type: 1, owner: 1, dueDate: 1 });

module.exports = model('ContentItem', contentItemSchema);