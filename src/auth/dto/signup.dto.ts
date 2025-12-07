import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const signupSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
  email: z.email(),
});

export class SignupDto extends createZodDto(signupSchema) {}
export const createUserSchema = signupSchema.extend({
  name: z.string(),
});
export type CreateUserSchema = z.infer<typeof createUserSchema>;
