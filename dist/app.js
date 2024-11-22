"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rooms_1 = __importDefault(require("./rotues/rooms"));
const app = (0, express_1.default)();
app.use((express_1.default.json()));
app.use("/api/rooms", rooms_1.default);
app.get("/", (req, res) => {
    res.status(200).send("OK");
});
app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
});
