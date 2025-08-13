const mongoose = require('mongoose'); 
const { Schema, model, Types } = mongoose;

const PROJECT_STATUS = ['planning', 'active', 'on_hold', 'completed', 'cancelled']; 
const WORKFLOW_STATUS = ['todo', 'in_progress', 'in_review', 'done'];

const deliverableSchema = new Schema( { title: { type: String, required: true, trim: true }, status: { type: String, enum: WORKFLOW_STATUS, default: 'todo' }, dueDate: Date, assignee: { type: Types.ObjectId, ref: 'User' }, notes: String, }, { _id: true, timestamps: false } );

const projectSchema = new Schema( { name: { type: String, required: true, trim: true, index: true }, client: { type: String, trim: true }, description: String, status: { type: String, enum: PROJECT_STATUS, default: 'planning', index: true }, startDate: Date, endDate: Date, progress: { type: Number, min: 0, max: 100, index: true }, budget: Number, members: [{ type: Types.ObjectId, ref: 'User', index: true }], tags: [{ type: String, trim: true }], deliverables: [deliverableSchema], createdBy: { type: Types.ObjectId, ref: 'User' }, }, { timestamps: true } );

projectSchema.index({ status: 1, progress: -1 }); projectSchema.index({ members: 1 });

module.exports = model('Project', projectSchema);