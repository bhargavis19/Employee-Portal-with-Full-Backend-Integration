"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationSchema = exports.HrUpdateSchema = exports.EmployeeAccessRequestSchema = void 0;
var zod_1 = require("zod");
exports.EmployeeAccessRequestSchema = zod_1.z.object({
    EmployeeID: zod_1.z.string(),
    ApplicationName: zod_1.z.string(),
    EmailAddress: zod_1.z.string().email(),
    Messages: zod_1.z.string().optional(),
    Status: zod_1.z.enum(["accepted", "rejected"]).optional().nullable().default(null),
    AccessRequestTime: zod_1.z.date().default(new Date()),
    AssignDate: zod_1.z.date().default(new Date()),
});
exports.HrUpdateSchema = zod_1.z.object({
    UpdateID: zod_1.z.number().optional(),
    Title: zod_1.z.string(),
    HRUpdate: zod_1.z.string(),
    TimeOfUpdate: zod_1.z.date().default(new Date()),
    Category: zod_1.z.string(),
    UpdateStatus: zod_1.z.enum(["Active", "Inactive"]).default("Active"),
});
exports.ApplicationSchema = zod_1.z.object({
    ApplicationID: zod_1.z.string(),
    ApplicationName: zod_1.z.string(),
    CategoryName: zod_1.z.string(),
    CategoryID: zod_1.z.string(),
    ApplicationURL: zod_1.z.string(),
    ApplicationDescription: zod_1.z.string(),
    ApplicationImage: zod_1.z.any().optional(),
    ApplicationOwner: zod_1.z.string().optional(),
    ApplicationOwnerPrimaryEmail: zod_1.z.string().email().optional(),
    ApplicationOwnerSecondaryEmail: zod_1.z.string().email().optional(),
});
