import { z } from 'zod';

const updateUserValidation = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'name is required',
      })
      .optional(),
    email: z
      .string({
        required_error: 'email is required',
      })
      .optional(),
    role: z
      .string({
        required_error: 'role is required',
      })
      .optional(),
    contactNo: z
      .string({
        required_error: 'contactNo is required',
      })
      .optional(),
    address: z
      .string({
        required_error: 'address is required',
      })
      .optional(),
    profileImg: z
      .string({
        required_error: 'profileImg is required',
      })
      .optional(),
  }),
});

export const UserValidation = {
  updateUserValidation,
};
