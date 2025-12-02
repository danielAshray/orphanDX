"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const app_config_1 = require("./config/app.config");
const routes_1 = __importDefault(require("./routes"));
const error_middleware_1 = require("./middleware/error.middleware");
const path_1 = __importDefault(require("path"));
const main = async () => {
    try {
        const app = (0, express_1.default)();
        app.use((0, cors_1.default)({ origin: app_config_1.CLIENT_URL }));
        app.use((0, helmet_1.default)());
        app.use(express_1.default.json({ limit: "50mb" }));
        app.use(express_1.default.urlencoded({ extended: true }));
        app.use(express_1.default.text({ type: "text/xml" }));
        app.use("/api", routes_1.default);
        const frontendPath = path_1.default.join(__dirname, "../../ui/dist");
        app.use(express_1.default.static(frontendPath));
        app.get(/^\/(?!api).*/, (_req, res) => {
            res.sendFile(path_1.default.join(frontendPath, "index.html"));
        });
        app.use(error_middleware_1.notFoundHandler);
        app.use(error_middleware_1.globalErrorHandler);
        app.listen(app_config_1.PORT, () => {
            console.info(`Server running on port ${app_config_1.PORT}`);
        });
        process.on("SIGINT", async () => {
            process.exit(0);
        });
    }
    catch (error) {
        console.error(`Server failed to start: ${error}`);
        process.exit(1);
    }
};
main();
