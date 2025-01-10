const { z } = require("zod");

const signUpSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(255, { message: "Name must not be more than 255 characters" }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least 3 characters" })
    .max(255, { message: "Email must not be more than 255 characters" }),

  mobile: z
    .string({ required_error: "Mobile is required" })
    .trim()
    .length(10, { message: "Phone must be exactly 10 digits" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(7, { message: "Password must be at least 7 characters" })
    .max(1024, { message: "Password must not be more than 1024 characters" }),

  confirmPassword: z
    .string({ required_error: "Confirm Password is required" })
    .min(7, { message: "Confirm Password must be at least 7 characters" }),

  date: z.string().optional(),

  technology: z.string().optional(),

  experience: z.string().optional(),
  type: z.string({ required_error: "Type is required" }),

  branch: z.string().optional(),

  courseList: z.string().optional(),

  path: z.string().optional(),
  filename: z.string().optional(),
});

module.exports = signUpSchema;
