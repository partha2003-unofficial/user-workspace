import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema({
    name: { type: String, required },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user_model' }
}, { timestamps: true })

const workSpaceModel = mongoose.model('user_workspace', workspaceSchema);

export default workSpaceModel;