const mongoose = require('mongoose'); 
const { Schema, model, Types } = mongoose;

const TASK_PRIORITIES = ['low', 'medium', 'high', 'urgent']; 
const WORKFLOW_STATUS = ['todo', 'in_progress', 'in_review', 'done'];

const attachmentSchema = new Schema( { 
    name: String, 
    url: String, 
    size: Number, 
    mimeType: String, }, 
    { _id: false } 
);

const taskSchema = new Schema( { 
    title: { type: String, required: true, trim: true }, 
    description: { type: String, trim: true }, 
    assignee: { type: Types.ObjectId, ref: 'User', index: true }, 
    createdBy: { type: Types.ObjectId, ref: 'User' }, 
    project: { type: Types.ObjectId, ref: 'Project', index: true }, 
    priority: { type: String, enum: TASK_PRIORITIES, default: 'medium', index: true }, 
    status: { type: String, enum: WORKFLOW_STATUS, default: 'todo', index: true }, 
    estimatedHours: Number, dueDate: { type: Date, index: true }, 
    completedAt: Date, 
    tags: [{ type: String, trim: true }], 
    attachments: [attachmentSchema], }, 
    { timestamps: true } );

taskSchema.index({ assignee: 1, status: 1 }); 
taskSchema.index({ priority: 1 }); 
taskSchema.index({ project: 1 }); 
taskSchema.index({ dueDate: 1 });

module.exports = model('Task', taskSchema);