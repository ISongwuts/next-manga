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
const express_1 = __importDefault(require("express"));
const manga_scraping_1 = require("../libs/scraping/manga.scraping");
const detail_scraping_1 = require("../libs/scraping/detail.scraping");
const chapter_scraping_1 = require("../libs/scraping/chapter.scraping");
const banner_scraping_1 = require("../libs/scraping/banner.scraping");
const mangaRouter = express_1.default.Router();
mangaRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.query.page;
    let mangas;
    if (page) {
        mangas = yield (0, manga_scraping_1.getMangas)(page);
    }
    else {
        mangas = yield (0, manga_scraping_1.getMangas)();
    }
    return res.json(mangas);
}));
mangaRouter.get('/detail', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.query.title;
    const manga = yield (0, detail_scraping_1.getMangaDetails)(title);
    return res.json(manga);
}));
mangaRouter.get('/chapter', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const path = req.query.path;
    const chapter = yield (0, chapter_scraping_1.getChapter)(path);
    return res.json(chapter);
}));
mangaRouter.get('/banner', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const banner = yield (0, banner_scraping_1.getBanner)();
    return res.json(banner);
}));
exports.default = mangaRouter;
