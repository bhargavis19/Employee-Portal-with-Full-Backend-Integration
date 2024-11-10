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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var buffer_1 = require("buffer");
var db_client_1 = __importDefault(require("../db.client"));
var V1Services = /** @class */ (function (_super) {
    __extends(V1Services, _super);
    function V1Services() {
        var _this = _super.call(this) || this;
        _this.getHrUpdates = function (limit) {
            return _this.prisma.hRUpdates.findMany(__assign({ where: { UpdateStatus: 'Active' }, orderBy: { TimeOfUpdate: 'desc' } }, (limit ? { take: limit } : {})));
        };
        _this.getContacts = function (_a) {
            var _b = _a.searchTerm, searchTerm = _b === void 0 ? '' : _b;
            return _this.prisma.importantContacts.findMany({
                where: {
                    OR: [
                        { EmployeeName: { contains: searchTerm } },
                        { EmployeeID: { contains: searchTerm } },
                        { PhoneNumber: { equals: +searchTerm } },
                        { Department: { contains: searchTerm } },
                        { EmailAddress: { contains: searchTerm } },
                    ],
                },
            });
        };
        _this.getHolidays = function () {
            return _this.prisma.holidays.findMany();
        };
        _this.getCategories = function () {
            return _this.prisma.categoryMaster.findMany();
        };
        _this.getSupports = function (_a) {
            var _b = _a.searchTerm, searchTerm = _b === void 0 ? '' : _b;
            return _this.prisma.support.findMany({
                where: {
                    OR: [
                        { TeamName: { contains: searchTerm } },
                        { TeamDept: { contains: searchTerm } },
                        { TeamPhoneNumber: { equals: +searchTerm } },
                        { EmailAddress: { contains: searchTerm } },
                    ],
                },
            });
        };
        _this.requestAccess = function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.prisma.employeeAccessRequests.create({ data: data })];
            });
        }); };
        _this.hrUpdate = function (data) { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                return [2 /*return*/, this.prisma.hRUpdates.create({
                        data: __assign(__assign({}, data), { TimeOfUpdate: (_a = data.TimeOfUpdate) !== null && _a !== void 0 ? _a : new Date() }),
                    })];
            });
        }); };
        _this.postApplication = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var data, applicationsIDExists, base64Image, updatedData, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        data = req.body;
                        if (!data.ApplicationID || !data.ApplicationImage) {
                            if (!res.headersSent) {
                                res.status(400).json({ message: 'ApplicationID or ApplicationImage is missing' });
                            }
                            return [2 /*return*/]; // Ensure no further code execution
                        }
                        return [4 /*yield*/, this.prisma.applications.findFirst({
                                where: { ApplicationID: data.ApplicationID },
                                select: { ApplicationID: true },
                            })];
                    case 1:
                        applicationsIDExists = _a.sent();
                        if (applicationsIDExists) {
                            if (!res.headersSent) {
                                res.status(400).json({ message: 'Duplicate application ID!' });
                            }
                            return [2 /*return*/]; // Ensure no further code execution
                        }
                        return [4 /*yield*/, this.convertToBase64(data.ApplicationImage)];
                    case 2:
                        base64Image = _a.sent();
                        updatedData = __assign(__assign({}, data), { ApplicationImage: base64Image });
                        return [4 /*yield*/, this.prisma.applications.create({ data: updatedData })];
                    case 3:
                        _a.sent();
                        if (!res.headersSent) {
                            res.status(200).json({ message: 'Application submitted successfully' });
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        // Handle error and ensure headers are only sent once
                        console.error('Error in postApplication:', error_1);
                        if (!res.headersSent) {
                            res.status(500).json({ message: 'An error occurred', error: error_1.message });
                        }
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        _this.convertToBase64 = function (imageData) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (typeof imageData === 'string') {
                    // If imageData is already a Base64 string
                    return [2 /*return*/, imageData];
                }
                else if (buffer_1.Buffer.isBuffer(imageData)) {
                    // If imageData is a Buffer
                    return [2 /*return*/, imageData.toString('base64')];
                }
                else if (imageData && typeof imageData === 'object' && 'data' in imageData) {
                    // Handle image data in an object with a 'data' property
                    return [2 /*return*/, buffer_1.Buffer.from(imageData.data).toString('base64')];
                }
                else {
                    throw new Error('Unsupported image data format');
                }
                return [2 /*return*/];
            });
        }); };
        _this.blobToBase64 = function (blob) {
            return new Promise(function (resolve, reject) {
                var reader = new FileReader();
                reader.onloadend = function () {
                    var base64String = reader.result;
                    resolve(base64String.split(',')[1]); // Remove the data URL part
                };
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        };
        _this.getApplications = function (categoryID) { return __awaiter(_this, void 0, void 0, function () {
            var filters;
            return __generator(this, function (_a) {
                filters = { where: {} };
                if (categoryID) {
                    filters.where = { CategoryID: categoryID };
                }
                return [2 /*return*/, this.prisma.applications.findMany(filters)];
            });
        }); };
        console.log('V1 Services init');
        return _this;
    }
    return V1Services;
}(db_client_1.default));
exports.default = V1Services;
