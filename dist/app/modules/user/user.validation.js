"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const updateUserValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: 'name is required',
        })
            .optional(),
        email: zod_1.z
            .string({
            required_error: 'email is required',
        })
            .optional(),
        role: zod_1.z
            .string({
            required_error: 'role is required',
        })
            .optional(),
        contactNo: zod_1.z
            .string({
            required_error: 'contactNo is required',
        })
            .optional(),
        address: zod_1.z
            .string({
            required_error: 'address is required',
        })
            .optional(),
        profileImg: zod_1.z
            .string({
            required_error: 'profileImg is required',
        })
            .optional(),
    }),
});
exports.UserValidation = {
    updateUserValidation,
};
