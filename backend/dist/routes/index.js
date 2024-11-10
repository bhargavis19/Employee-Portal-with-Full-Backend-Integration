"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var controllers_1 = __importDefault(require("../controllers"));
var V1Routes = /** @class */ (function (_super) {
    __extends(V1Routes, _super);
    function V1Routes() {
        var _this = _super.call(this) || this;
        _this.v1Router = express_1.default.Router();
        _this.v1Router.get("/contacts", _this.getContactsCtrl);
        _this.v1Router.get("/supports", _this.getSupportsCtrl);
        _this.v1Router.get("/categories", _this.getCategoriesCtrl);
        _this.v1Router.get("/holidays", _this.getHolidaysCtrl);
        _this.v1Router.get("/applications", _this.getApplicationsCtrl);
        _this.v1Router.get("/hr-updates", _this.getHrUpdatesCtrl);
        _this.v1Router.post("/request-access", _this.requestAccessCtrl);
        _this.v1Router.post("/hr-update", _this.hrUpdateCtrl);
        _this.v1Router.post("/applications", _this.postApplicationCtrl);
        return _this;
    }
    return V1Routes;
}(controllers_1.default));
exports.default = V1Routes;
