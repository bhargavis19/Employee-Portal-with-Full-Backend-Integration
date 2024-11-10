"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var DbClient = /** @class */ (function () {
    function DbClient() {
        this.prisma = new client_1.PrismaClient();
    }
    return DbClient;
}());
exports.default = DbClient;
