 const mongoose = require('mongoose'); 
 const { Schema, model, Types } = mongoose;

const LEAD_STATUS = ['new', 'contacted', 'qualified', 'lost', 'won']; 
const LEAD_SOURCE = ['website', 'referral', 'email', 'social', 'ads', 'other'];

const leadSchema = new Schema( { 
    name: { type: String, required: true, trim: true }, 
    company: { type: String, trim: true }, 
    email: { type: String, trim: true, index: true, lowercase: true }, 
    phone: { type: String, trim: true }, 
    status: { type: String, enum: LEAD_STATUS, default: 'new', index: true }, 
    source: { type: String, enum: LEAD_SOURCE }, 
    owner: { type: Types.ObjectId, ref: 'User', index: true }, 
    value: Number, 
    notes: String, 
    tags: [{ type: String, trim: true }], }, { timestamps: true } );

leadSchema.index({ owner: 1, status: 1 }); 
leadSchema.index({ email: 1 });

module.exports = model('Lead', leadSchema);