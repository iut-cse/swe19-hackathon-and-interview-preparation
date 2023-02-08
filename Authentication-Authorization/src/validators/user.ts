import { object, TypeOf, z } from 'zod'

export const addUserSchema = object({
  body: object({
    name: z.string(),
    nickName: z.string(),
    password: z.string(),
    email: z.string(),
  }),
})

export type AddUserInput = TypeOf<typeof addUserSchema>

export const addEmailSchema = object({
  body: object({
    email: z.string(),
    password: z.string(),
  }),
})

export type AddLoginInput = TypeOf<typeof addEmailSchema>
