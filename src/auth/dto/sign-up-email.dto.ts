import { createZodDto } from 'nestjs-zod';
import { nameSchema, passwordSchema } from '@/shared/schema/common';
import { z } from 'zod';

// DTO
export class SignUpEmailDto extends createZodDto(
  z.object({
    firstName: nameSchema,
    lastName: nameSchema,
    password: passwordSchema,
    email: z.email(),
  }),
) {}

export class SignUpEmailSuccessDto extends createZodDto(
  z.object({
    status: z.boolean(),
  }),
) {}

// services schema
export const signUpEmailSchema = SignUpEmailDto.schema.extend({
  name: z.string(),
});
export type SignUpEmailSchema = z.infer<typeof signUpEmailSchema>;
