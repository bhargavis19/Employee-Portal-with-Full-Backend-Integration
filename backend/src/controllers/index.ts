import type { Request, RequestHandler, Response } from "express";
import V1Services from "../services";

import { ResponseUtil, StatusCodes } from "../lib";
import { GetError } from "../lib/logger";
import { z } from "zod";
import { ApplicationSchema, EmployeeAccessRequestSchema, HrUpdateSchema } from "../lib/zod-schemas";
import { JsonArray } from "@prisma/client/runtime/library";

interface IV1Controllers {
  getContactsCtrl: RequestHandler;
  getSupportsCtrl: RequestHandler;
  requestAccessCtrl: RequestHandler;
  hrUpdateCtrl: RequestHandler;
  getHolidaysCtrl: RequestHandler;
  getApplicationsCtrl: RequestHandler;
  getHrUpdatesCtrl: RequestHandler;
}

export default class V1Controllers extends V1Services implements IV1Controllers {
  private ResponseUtil: ResponseUtil;
  constructor() {
    super();
    console.log("V1 Controllers init");
    this.ResponseUtil = new ResponseUtil();
  }

  public convertToUTC = (update: any) => {
    //console.log(update.TimeOfUpdate)
    const date = new Date(update.TimeOfUpdate);
    const utcTimeOfUpdate = date.toISOString();
    let time = utcTimeOfUpdate.substring(0,10)+ utcTimeOfUpdate.substring(11,19)
    //console.log(time) // The toISOString() method returns the date in UTC format
    return {
      ...update,
      TimeOfUpdate: time
    };
  };

  public getHrUpdatesCtrl = async (req: Request, res: Response) => {
    try {
      let hrUpdates = await this.getHrUpdates(Number(req.query.limit as unknown as number));
      let newUpdate:any = [];
      //console.log(hrUpdates[0])
      for (let v=0;v<hrUpdates.length;v++){
        //console.log(hrUpdates[v])
        newUpdate = [...newUpdate,this.convertToUTC(hrUpdates[v])];
      }
      return this.ResponseUtil.send({ res, status: StatusCodes.OK, data: newUpdate });
    } catch (error) {
      const message = GetError(error);
      return this.ResponseUtil.send({ res, status: StatusCodes.INTERNAL_SERVER_ERROR, message });
    }
  };

  public getHolidaysCtrl = async (req: Request, res: Response) => {
    try {
      const holidays = await this.getHolidays();
      return this.ResponseUtil.send({ res, status: StatusCodes.OK, data: holidays });
    } catch (error) {
      const message = GetError(error);
      return this.ResponseUtil.send({ res, status: StatusCodes.INTERNAL_SERVER_ERROR, message });
    }
  };

  public getCategoriesCtrl = async (req: Request, res: Response) => {
    try {
      const categories = await this.getCategories();
      return this.ResponseUtil.send({ res, status: StatusCodes.OK, data: categories });
    } catch (error) {
      const message = GetError(error);
      return this.ResponseUtil.send({ res, status: StatusCodes.INTERNAL_SERVER_ERROR, message });
    }
  };

  public getApplicationsCtrl = async (req: Request, res: Response) => {
    try {
      const { categoryID } = await z
        .object({ categoryID: z.string().optional() })
        .parseAsync(req.query);

      const applications = await this.getApplications(categoryID);

      return this.ResponseUtil.send({ res, status: StatusCodes.OK, data: applications });
    } catch (error) {
      const message = GetError(error);
      return this.ResponseUtil.send({ res, status: StatusCodes.INTERNAL_SERVER_ERROR, message });
    }
  };

  public getContactsCtrl = async (req: Request, res: Response) => {
    try {
      const filter = await z.object({ searchTerm: z.string().optional() }).parseAsync(req.query);

      const contacts = await this.getContacts(filter);
      return this.ResponseUtil.send({ res, status: StatusCodes.OK, data: contacts });
    } catch (error) {
      const message = GetError(error);
      return this.ResponseUtil.send({ res, status: StatusCodes.INTERNAL_SERVER_ERROR, message });
    }
  };
  public getSupportsCtrl = async (req: Request, res: Response) => {
    try {
      const filter = await z.object({ searchTerm: z.string().optional() }).parseAsync(req.query);

      const supports = await this.getSupports(filter);
      return this.ResponseUtil.send({ res, status: StatusCodes.OK, data: supports });
    } catch (error) {
      const message = GetError(error);
      return this.ResponseUtil.send({ res, status: StatusCodes.INTERNAL_SERVER_ERROR, message });
    }
  };
  public requestAccessCtrl = async (req: Request, res: Response) => {
    try {
      const body = await EmployeeAccessRequestSchema.parseAsync(req.body);
      const data = await this.requestAccess(body);
      return this.ResponseUtil.send({ res, status: StatusCodes.OK, data, message: "Success" });
    } catch (error) {
      const message = GetError(error);
      return this.ResponseUtil.send({ res, status: StatusCodes.INTERNAL_SERVER_ERROR, message });
    }
  };

  public hrUpdateCtrl = async (req: Request, res: Response) => {
    try {
      let body:any = await HrUpdateSchema.omit({ UpdateID: true }).parseAsync(req.body);
      console.log(body)
      let currTime = new Date();
      currTime.setHours(currTime.getHours()+5)
      currTime.setMinutes(currTime.getMinutes()+30);
      body["TimeOfUpdate"]=currTime
      const data = await this.hrUpdate(body);
      return this.ResponseUtil.send({ res, status: StatusCodes.OK, data, message: "Success" });
    } catch (error) {
      const message = GetError(error);
      return this.ResponseUtil.send({ res, status: StatusCodes.INTERNAL_SERVER_ERROR, message });
    }
  };

  public postApplicationCtrl = async (req: Request, res: Response) => {
    try {
      const body = await ApplicationSchema.parseAsync(req.body);
      const data = await this.postApplication(req,res);
      // return this.ResponseUtil.send({
      //   res,
      //   status: StatusCodes.OK,
      //   data: body,
      //   message: "Success",
      // });
    } catch (error) {
      const message = GetError(error);
      return this.ResponseUtil.send({ res, status: StatusCodes.INTERNAL_SERVER_ERROR, message });
    }
  };
}
