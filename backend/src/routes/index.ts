import express from "express";
import V1Controllers from "../controllers";

export default class V1Routes extends V1Controllers {
  public v1Router: express.Router;

  constructor() {
    super();
    this.v1Router = express.Router();
    this.v1Router.get("/contacts", this.getContactsCtrl);
    this.v1Router.get("/supports", this.getSupportsCtrl);
    this.v1Router.get("/categories", this.getCategoriesCtrl);
    this.v1Router.get("/holidays", this.getHolidaysCtrl);
    this.v1Router.get("/applications", this.getApplicationsCtrl);
    this.v1Router.get("/hr-updates", this.getHrUpdatesCtrl);

    this.v1Router.post("/request-access", this.requestAccessCtrl);
    this.v1Router.post("/hr-update", this.hrUpdateCtrl);
    this.v1Router.post("/applications", this.postApplicationCtrl);
  }
}
