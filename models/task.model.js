import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: { type: String, required },
    discription: { type: String, required },
    completed: { type: Boolean, default: false },
    workSpaceId: { type: mongoose.Schema.Types.ObjectId, ref: 'user_workspace' }
}, { timestamps: true })

const taskModel = mongoose.model('user_task', taskSchema);

export default taskModel;