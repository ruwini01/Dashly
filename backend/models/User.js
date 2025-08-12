 const mongoose = require('mongoose'); 
 const { Schema, model } = mongoose;

 const USER_ROLES = ['admin', 'manager', 'member']; 
 const USER_STATUS = ['active', 'inactive'];

 const userSchema = new Schema( { 
    name: { type: String, required: true, trim: true }, 
    email: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true }, 
    role: { type: String, enum: USER_ROLES, default: 'member', index: true }, 
    avatarUrl: { type: String, trim: true }, 
    status: { type: String, enum: USER_STATUS, default: 'active', index: true }, 
    timezone: { type: String, trim: true }, }, { timestamps: true } );

userSchema.index({ createdAt: 1 });

module.exports = model('User', userSchema);