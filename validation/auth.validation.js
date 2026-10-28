import z from 'zod';

const signupUserSchema = z.object({
    name: z.string().min(3, { message: 'enter minimum 3 character' }).max(100, { message: 'enter maximum 100 character' }),
    password: z.string().trim().min(4, { message: 'enter minimum 4 number' }).max(10, { message: 'enter maximum 10 number' })
})

const createWorkspaceValidatation = z.object({
    name: z.string().max(1000, { message: 'create under 1000 characters workspace ' })
})

const createTaskValidatation = z.object({
    title: z.string().max(1000, { message: 'enter 1000 character title' }),
    discription: z.string().max(1000, { message: 'enter a 1000 character discription' })
})

export { signupUserSchema, createWorkspaceValidatation, createTaskValidatation }