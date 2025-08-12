const mongoose = require('mongoose'); 
const { Schema, model, Types } = mongoose;

const activityLogSchema = new Schema( { 
    actor: { type: Types.ObjectId, ref: 'User', index: true }, 
    action: { type: String, required: true, index: true },  
    target: { type: { type: String, required: true, }, id: { type: Types.ObjectId, required: true }, }, 
    metadata: Schema.Types.Mixed, }, 
    { timestamps: { createdAt: true, updatedAt: false } } );

activityLogSchema.index({ action: 1, actor: 1, createdAt: -1 });

module.exports = model('ActivityLog', activityLogSchema);