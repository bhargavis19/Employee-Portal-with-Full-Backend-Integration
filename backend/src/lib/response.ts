import type { Response } from "express";

export enum StatusCodes {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

interface ISendArgs {
  res: Response;
  data?: unknown;
  message?: string;
  status: StatusCodes;
}

interface IResponseUtil {
  send(args: ISendArgs): Response;
}

export class ResponseUtil implements IResponseUtil {
  public send(args: ISendArgs) {
    const payload = {
      data: args.data,
      message: args.message || "Success",
      status: args.status,
    };
    return args.res.status(args.status).json(payload);
  }
}
