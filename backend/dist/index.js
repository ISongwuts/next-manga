"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const manga_1 = __importDefault(require("./routes/manga"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use('/manga', manga_1.default);
app.get('/', (req, res) => {
    res.json({
        message: 'ok'
    });
});
app.listen(PORT, () => {
    console.log('Running on port:', PORT);
});
