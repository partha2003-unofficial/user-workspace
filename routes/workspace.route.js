import {Router} from 'express'
import { createWorkspace, deleteWorkspace, listWorkspace } from '../controller/workspace.controller.js';
const workspace_router = Router();

workspace_router.post('/create',createWorkspace);
workspace_router.get('/workspaces_list',listWorkspace);
workspace_router.delete('/delete/:workspaceID',deleteWorkspace);

export default workspace_router;