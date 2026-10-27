import workSpaceModel from "../models/workspace.model.js"
import { createWorkspaceValidatation } from "../validation/auth.validation.js"

async function createWorkspace(request, response) {
    const { data, error } = createWorkspaceValidatation.safeParse(request.body)
    if (error) { return response.status(400).json({ message: 'enter valid workspace' }) }

    try {
        const workspace = await workSpaceModel.create(
            {
                name: data.name,
                userId: request.user._id
            }
        )
        if (workspace) {
            return response.status(200).json({ message: 'workspace is created successfully..' })
        }
    } catch (error) {
        return response.status(500).json({ message: 'internal server error in creating workspace' })
    }
}

async function listWorkspace(request, response) {
    const user = await workSpaceModel.find({ userId: request.user._id })
    if (!user) {
        return response.status(404).json({ message: 'user is not found!' });
    }
    const workspaceList = user.map(value => value.name)
    return response.status(200).json({ message: 'user is founded..', workspaces: workspaceList })
}

async function deleteWorkspace(request, response) {
    const workspaceId = request.params.workspaceID
    try {

        const deleteWorkSpaceItem = await workSpaceModel.findByIdAndDelete(workspaceId)
        if (deleteWorkSpaceItem) {
            return response.status(200).json({ message: 'document is deleted successfully.', delete_Document: deleteWorkSpaceItem })
        }

    } catch (error) {
        return response.status(500).json({ message: "internal server error!" })
    }
}

export { createWorkspace, listWorkspace, deleteWorkspace }