const mongoose = require('mongoose'); const { Schema, model, Types } = mongoose;

const fileSchema = new Schema( { name: { type: String, required: true, trim: true }, url: { type: String, required: true }, size: Number, mimeType: String, uploadedBy: { type: Types.ObjectId, ref: 'User', index: true }, tags: [{ type: String, trim: true }], }, { timestamps: { createdAt: true, updatedAt: false } } );

fileSchema.index({ uploadedBy: 1, createdAt: -1 });

module.exports = model('File', fileSchema);