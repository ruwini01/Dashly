const mongoose = require('mongoose'); 
const { Schema, model, Types } = mongoose;

const reactionSchema = new Schema( { by: { type: Types.ObjectId, ref: 'User' }, emoji: String, }, { _id: false, timestamps: false } );

const messageSchema = new Schema( { channelId: { type: String, index: true }, sender: { type: Types.ObjectId, ref: 'User', required: true, index: true }, content: String, attachments: [ { name: String, url: String, size: Number, mimeType: String, _id: false, }, ], replyTo: { type: Types.ObjectId, ref: 'Message' }, reactions: [reactionSchema], editedAt: Date, }, { timestamps: { createdAt: true, updatedAt: false } } );

messageSchema.index({ channelId: 1, createdAt: -1 }); messageSchema.index({ sender: 1 });

module.exports = model('Message', messageSchema);