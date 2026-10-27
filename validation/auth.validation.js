import z from 'zod';

const signupUserSchema = z.object({
    name: z.string().trim().min(3, { message: 'enter minimum 3 character' }).max(100, { message: 'enter maximum 100 character' }),
    password: z.string().trim().min(4, { message: 'enter minimum 4 number' }).max(10, { message: 'enter maximum 10 number' })
})

const createWorkspaceValidatation = z.object({
    name: z.string().trim().max(1000, { message: 'create under 1000 characters workspace ' })
})

export { signupUserSchema, createWorkspaceValidatation }