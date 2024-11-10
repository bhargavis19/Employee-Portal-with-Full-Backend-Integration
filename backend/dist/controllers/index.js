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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var services_1 = __importDefault(require("../services"));
var lib_1 = require("../lib");
var logger_1 = require("../lib/logger");
var zod_1 = require("zod");
var zod_schemas_1 = require("../lib/zod-schemas");
var V1Controllers = /** @class */ (function (_super) {
    __extends(V1Controllers, _super);
    function V1Controllers() {
        var _this = _super.call(this) || this;
        _this.convertToUTC = function (update) {
            //console.log(update.TimeOfUpdate)
            var date = new Date(update.TimeOfUpdate);
            var utcTimeOfUpdate = date.toISOString();
            var time = utcTimeOfUpdate.substring(0, 10) + utcTimeOfUpdate.substring(11, 19);
            //console.log(time) // The toISOString() method returns the date in UTC format
            return __assign(__assign({}, update), { TimeOfUpdate: time });
        };
        _this.getHrUpdatesCtrl = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var hrUpdates, newUpdate, v, error_1, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getHrUpdates(Number(req.query.limit))];
                    case 1:
                        hrUpdates = _a.sent();
                        newUpdate = [];
                        //console.log(hrUpdates[0])
                        for (v = 0; v < hrUpdates.length; v++) {
                            //console.log(hrUpdates[v])
                            newUpdate = __spreadArray(__spreadArray([], newUpdate, true), [this.convertToUTC(hrUpdates[v])], false);
                        }
                        return [2 /*return*/, this.ResponseUtil.send({ res: res, status: lib_1.StatusCodes.OK, data: newUpdate })];
                    case 2:
                        error_1 = _a.sent();
                        message = (0, logger_1.GetError)(error_1);
                        return [2 /*return*/, this.ResponseUtil.send({ res: res, status: lib_1.StatusCodes.INTERNAL_SERVER_ERROR, message: message })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.getHolidaysCtrl = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var holidays, error_2, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getHolidays()];
                    case 1:
                        holidays = _a.sent();
                        return [2 /*return*/, this.ResponseUtil.send({ res: res, status: lib_1.StatusCodes.OK, data: holidays })];
                    case 2:
                        error_2 = _a.sent();
                        message = (0, logger_1.GetError)(error_2);
                        return [2 /*return*/, this.ResponseUtil.send({ res: res, status: lib_1.StatusCodes.INTERNAL_SERVER_ERROR, message: message })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.getCategoriesCtrl = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var categories, error_3, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getCategories()];
                    case 1:
                        categories = _a.sent();
                        return [2 /*return*/, this.ResponseUtil.send({ res: res, status: lib_1.StatusCodes.OK, data: categories })];
                    case 2:
                        error_3 = _a.sent();
                        message = (0, logger_1.GetError)(error_3);
                        return [2 /*return*/, this.ResponseUtil.send({ res: res, status: lib_1.StatusCodes.INTERNAL_SERVER_ERROR, message: message })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.getApplicationsCtrl = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var categoryID, applications, error_4, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, zod_1.z
                                .object({ categoryID: zod_1.z.string().optional() })
                                .parseAsync(req.query)];
                    case 1:
                        categoryID = (_a.sent()).categoryID;
                        return [4 /*yield*/, this.getApplications(categoryID)];
                    case 2:
                        applications = _a.sent();
                        return [2 /*return*/, this.ResponseUtil.send({ res: res, status: lib_1.StatusCodes.OK, data: applications })];
                    case 3:
                        error_4 = _a.sent();
                        message = (0, logger_1.GetError)(error_4);
                        return [2 /*return*/, this.ResponseUtil.send({ res: res, status: lib_1.StatusCodes.INTERNAL_SERVER_ERROR, message: message })];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        _this.getContactsCtrl = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var filter, contacts, error_5, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, zod_1.z.object({ searchTerm: zod_1.z.string().optional() }).parseAsync(req.query)];
                    case 1:
                        filter = _a.sent();
                        return [4 /*yield*/, this.getContacts(filter)];
                    case 2:
                        contacts = _a.sent();
                        return [2 /*return*/, this.ResponseUtil.send({ res: res, status: lib_1.StatusCodes.OK, data: contacts })];
                    case 3:
                        error_5 = _a.sent();
                        message = (0, logger_1.GetError)(error_5);
                        return [2 /*return*/, this.ResponseUtil.send({ res: res, status: lib_1.StatusCodes.INTERNAL_SERVER_ERROR, message: message })];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        _this.getSupportsCtrl = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var filter, supports, error_6, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, zod_1.z.object({ searchTerm: zod_1.z.string().optional() }).parseAsync(req.query)];
                    case 1:
                        filter = _a.sent();
                        return [4 /*yield*/, this.getSupports(filter)];
                    case 2:
                        supports = _a.sent();
                        return [2 /*return*/, this.ResponseUtil.send({ res: res, status: lib_1.StatusCodes.OK, data: supports })];
                    case 3:
                        error_6 = _a.sent();
                        message = (0, logger_1.GetError)(error_6);
                        return [2 /*return*/, this.ResponseUtil.send({ res: res, status: lib_1.StatusCodes.INTERNAL_SERVER_ERROR, message: message })];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        _this.requestAccessCtrl = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var body, data, error_7, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, zod_schemas_1.EmployeeAccessRequestSchema.parseAsync(req.body)];
                    case 1:
                        body = _a.sent();
                        return [4 /*yield*/, this.requestAccess(body)];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, this.ResponseUtil.send({ res: res, status: lib_1.StatusCodes.OK, data: data, message: "Success" })];
                    case 3:
                        error_7 = _a.sent();
                        message = (0, logger_1.GetError)(error_7);
                        return [2 /*return*/, this.ResponseUtil.send({ res: res, status: lib_1.StatusCodes.INTERNAL_SERVER_ERROR, message: message })];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        _this.hrUpdateCtrl = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var body, currTime, data, error_8, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, zod_schemas_1.HrUpdateSchema.omit({ UpdateID: true }).parseAsync(req.body)];
                    case 1:
                        body = _a.sent();
                        console.log(body);
                        currTime = new Date();
                        currTime.setHours(currTime.getHours() + 5);
                        currTime.setMinutes(currTime.getMinutes() + 30);
                        body["TimeOfUpdate"] = currTime;
                        return [4 /*yield*/, this.hrUpdate(body)];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, this.ResponseUtil.send({ res: res, status: lib_1.StatusCodes.OK, data: data, message: "Success" })];
                    case 3:
                        error_8 = _a.sent();
                        message = (0, logger_1.GetError)(error_8);
                        return [2 /*return*/, this.ResponseUtil.send({ res: res, status: lib_1.StatusCodes.INTERNAL_SERVER_ERROR, message: message })];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        _this.postApplicationCtrl = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var body, data, error_9, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, zod_schemas_1.ApplicationSchema.parseAsync(req.body)];
                    case 1:
                        body = _a.sent();
                        return [4 /*yield*/, this.postApplication(req, res)];
                    case 2:
                        data = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_9 = _a.sent();
                        message = (0, logger_1.GetError)(error_9);
                        return [2 /*return*/, this.ResponseUtil.send({ res: res, status: lib_1.StatusCodes.INTERNAL_SERVER_ERROR, message: message })];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        console.log("V1 Controllers init");
        _this.ResponseUtil = new lib_1.ResponseUtil();
        return _this;
    }
    return V1Controllers;
}(services_1.default));
exports.default = V1Controllers;
