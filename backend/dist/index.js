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
var routes_1 = __importDefault(require("./routes"));
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var Bootstrap = /** @class */ (function (_super) {
    __extends(Bootstrap, _super);
    function Bootstrap() {
        var _this = _super.call(this) || this;
        var app = (0, express_1.default)();
        app.use(body_parser_1.default.json({ limit: '100mb' })); // Adjust the limit as needed
        app.use(body_parser_1.default.urlencoded({ limit: '100mb', extended: true }));
        app.get("/health", function (req, res) {
            res.json({ message: "Server is running properly" });
        });
        app.use((0, cors_1.default)({ origin: "*" }));
        app.use(express_1.default.json());
        app.use("/api/v1", _this.v1Router);
        app.listen(4000, function () {
            console.log("App is running on port 4000");
        });
        return _this;
    }
    return Bootstrap;
}(routes_1.default));
new Bootstrap();
