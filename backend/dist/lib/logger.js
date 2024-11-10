"use strict";
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetError = GetError;
var library_1 = require("@prisma/client/runtime/library");
var zod_1 = require("zod");
// import type { Response } from "express";
// import { ResponseUtil, StatusCodes } from "./response";
// interface LoggerWrapperProps {
//   fileName?: string;
//   sendAPIResponseOnError?: boolean;
// }
// export type Method = (...args: any[]) => any;
// const responseUtil = new ResponseUtil();
/**
 * @description decorator for the logger
 */
// export function logger(props: LoggerWrapperProps): Method {
//   return <T extends Method>(
//     value: T,
//     context: ClassMethodDecoratorContext<T>
//   ): Method => {
//     return async function (this: any, ...args: any[]): Promise<T> {
//       // Check if `sendAPIResponseOnError` is true and if arguments match the expected types
//       if (props.sendAPIResponseOnError) {
//         const [req, res, next] = args;
//         if (!(req && res && typeof next === "function")) {
//           throw new Error(
//             "Invalid arguments. Expected Request, Response, and NextFunction."
//           );
//         }
//       }
//       try {
//         const result = await value.call(this, ...args);
//         return result;
//       } catch (error) {
//         console.log(JSON.stringify(error), { props });
//         if (props.sendAPIResponseOnError) {
//           const res = args[1] as Response;
//           if (res) {
//             return responseUtil.send({
//               res,
//               status: StatusCodes.BAD_REQUEST,
//               message: GetError(error),
//             }) as unknown as T;
//           }
//         }
//         throw error;
//       }
//     };
//   };
// }
function GetError(error) {
    var message = "Something went wrong";
    if (error instanceof Error) {
        message = error.message;
    }
    if (error instanceof TypeError) {
        console.log(error.message);
        message = error.message;
    }
    if (error instanceof TypeError) {
        console.log(error.message);
        message = error.message;
    }
    if (error instanceof zod_1.ZodError) {
        console.log(error.errors.forEach(function (e) { return console.log(e.message, e.path); }));
        message = "Please check you data, Validation Error";
    }
    if (error instanceof library_1.PrismaClientValidationError) {
        console.log("\tMSG:PrismaClientValidationError", error.message);
        message = error.message;
    }
    if (error instanceof library_1.PrismaClientRustPanicError) {
        console.log("\tMSG:PrismaClientRustPanicError:", error.message);
        message = error.message;
    }
    if (error instanceof library_1.PrismaClientKnownRequestError) {
        console.log("\tMSG:PrismaClientKnownRequestError:", error.message);
        message = error.message;
    }
    if (error instanceof library_1.PrismaClientUnknownRequestError) {
        console.log("\tMSG:PrismaClientUnknownRequestError:", error.message);
        message = error.message;
    }
    if (error instanceof library_1.PrismaClientInitializationError) {
        console.log("\tMSG:PrismaClientInitializationError:", error.message);
        message = error.message;
    }
    console.log(message);
    return message;
}
