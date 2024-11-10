import { z } from "zod";

export const EmployeeAccessRequestSchema = z.object({
  EmployeeID: z.string(),
  ApplicationName: z.string(),
  EmailAddress: z.string().email(),
  Messages: z.string().optional(),
  Status: z.enum(["accepted", "rejected"]).optional().nullable().default(null),
  AccessRequestTime: z.date().default(new Date()),
  AssignDate: z.date().default(new Date()),
});

export const HrUpdateSchema = z.object({
  UpdateID: z.number().optional(),
  Title: z.string(),
  HRUpdate: z.string(),
  TimeOfUpdate: z.date().default(new Date()),
  Category: z.string(),
  UpdateStatus: z.enum(["Active", "Inactive"]).default("Active"),
});

export const ApplicationSchema = z.object({
  ApplicationID: z.string(),
  ApplicationName: z.string(),
  CategoryName: z.string(),
  CategoryID: z.string(),
  ApplicationURL: z.string(),
  ApplicationDescription: z.string(),
  ApplicationImage: z.any().optional(),
  ApplicationOwner: z.string().optional(),
  ApplicationOwnerPrimaryEmail: z.string().email().optional(),
  ApplicationOwnerSecondaryEmail: z.string().email().optional(),
});
