import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    discription: { type: String, required: true },
    completed: { type: Boolean, default: false, enum: ["true", "false", "pending"] },
    workSpaceId: { type: mongoose.Schema.Types.ObjectId, ref: 'user_workspace' }
}, { timestamps: true })

const taskModel = mongoose.model('user_task', taskSchema);

export default taskModel;