"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../prisma"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rooms = yield prisma_1.default.rooms.findMany();
        res.status(200).json({ status: "OK", data: rooms });
    }
    catch (error) {
        res.status(500).json({ status: "ERR", message: error });
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { room_number, type, price } = req.body;
        const newRoom = yield prisma_1.default.rooms.create({
            data: {
                room_number: room_number,
                type: type,
                price: price
            }
        });
        res.status(201).json({ status: "OK", data: newRoom });
    }
    catch (error) {
        res.status(500).json({ status: "ERR", message: error });
    }
}));
router.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { room_number, type, price, status } = req.body;
    try {
        const updateData = {};
        if (room_number)
            updateData.room_number = room_number;
        if (type)
            updateData.type = type;
        if (price)
            updateData.price = price;
        if (status)
            updateData.status = status;
        if (Object.keys(updateData).length === 0) {
            res.status(400).json({ status: "ERR", message: "No fields to update." });
        }
        const updateRoom = yield prisma_1.default.rooms.update({
            where: { id: Number(id) },
            data: updateData
        });
        res.status(200).json({ status: "OK", data: updateRoom });
    }
    catch (error) {
        res.status(500).json({ status: "ERR", message: error });
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteRoom = yield prisma_1.default.rooms.delete({
            where: { id: Number(id) }
        });
        res.status(200).json({ status: "OK", data: deleteRoom });
    }
    catch (error) {
        res.status(500).json({ status: "ERR", message: error });
    }
}));
exports.default = router;
