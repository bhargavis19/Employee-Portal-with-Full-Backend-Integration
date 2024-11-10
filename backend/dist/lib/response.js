"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseUtil = exports.StatusCodes = void 0;
var StatusCodes;
(function (StatusCodes) {
    StatusCodes[StatusCodes["OK"] = 200] = "OK";
    StatusCodes[StatusCodes["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    StatusCodes[StatusCodes["NOT_FOUND"] = 404] = "NOT_FOUND";
    StatusCodes[StatusCodes["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(StatusCodes || (exports.StatusCodes = StatusCodes = {}));
var ResponseUtil = /** @class */ (function () {
    function ResponseUtil() {
    }
    ResponseUtil.prototype.send = function (args) {
        var payload = {
            data: args.data,
            message: args.message || "Success",
            status: args.status,
        };
        return args.res.status(args.status).json(payload);
    };
    return ResponseUtil;
}());
exports.ResponseUtil = ResponseUtil;
