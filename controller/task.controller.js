import { createTaskValidatation } from "../validation/auth.validation.js";
import taskModel from "../models/task.model.js";
import workSpaceModel from "../models/workspace.model.js";

async function createTask(request, response) {

    const { data, error } = createTaskValidatation.safeParse(request.body);
    if (error) { return response.status(404).json({ message: 'data is not founded! please enter all required detailes' }) }

    const { title, discription } = data;
    try {
        const task = await taskModel.create({
            title,
            discription,
        })
        if (task) {
            return response.status(200).json({ message: "task is created successfully.." })
        }
    } catch (error) {
        return response.status(500).json({ message: 'internal server error' })
    }
}

async function getAllWorkspaceTasks(request, response) {
    try {
        const workspace = await workSpaceModel
            .find({ userId: request.user._id })

        const workspaceId = workspace.map((id) => id._id)

        const task = await taskModel
            .find({ workSpaceId: { $in: workspaceId.objectId } })
            .populate("workSpaceId")
        if (task) {
            return response.status(200).json({
                message: 'all task is successfully generated..',
                tasks: task
            })
        }
    } catch (error) {
        return response.status(500).json({ message: 'internal server error in getAllWorkTasks' })
    }
}

async function modifyTaskComplitation(request, response) {
    const taskId = request.params?.taskId;
    if (!taskId) {
        return response.status(400).json({ message: ' please enter taskId' })
    }

    try {
        const modifyTask = await taskModel
            .findByIdAndUpdate(
                taskId,
                { completed: true },
                { new: true })
            .populate('workSpaceId')

        if (modifyTask) {
            return response.status(200).json({
                message: 'modified successfull',
                modified_Task: modifyTask
            })
        }
    } catch (error) {
        return response.status(500).json({ message: 'internal server error in task controller' })
    }
}

async function deleteTask(request, response) {
    const taskId = request.params?.taskId;
    if (!taskId) { return response.status(404).json({ message: 'taskId is did not submited!' }) }

    try {
        const deletedTask = await taskModel.findByIdAndDelete(taskId);
        if (deletedTask) {
            return response.status(200).json({
                message: 'this is the task , that is delete successfull',
                delete_task: deletedTask
            })
        } else {
            return response.status(200).json({ message: "this task is not present" })
        }

    } catch (error) {
        return response.status(500).json({
            message: "internal server error ",
            error: error
        })
    }
}

export { createTask, getAllWorkspaceTasks, modifyTaskComplitation, deleteTask }