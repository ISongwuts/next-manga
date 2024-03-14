"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMangaDetails = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
const lib_1 = require("../lib");
function getMangaDetails(path) {
    return __awaiter(this, void 0, void 0, function* () {
        const BASE_URL = process.env.BASE_MANGA_URL;
        const mergeURL = BASE_URL + "manga/" + path;
        console.log(mergeURL);
        try {
            const webResponse = yield axios_1.default.get(mergeURL);
            const selector = cheerio.load(webResponse.data);
            const name = selector(".seriestuheader > h1").text().trim();
            const description = selector(".seriestuhead > .entry-content > p")
                .text()
                .trim();
            const status = selector(".infotable > tbody > tr:first-of-type > td:nth-of-type(2)").text().trim();
            const type = selector(".infotable > tbody > tr:nth-of-type(2) > td:nth-of-type(2)").text().trim();
            const author = selector(".infotable > tbody > tr:nth-of-type(3) > td:nth-of-type(2)").text().trim();
            const publishAt = selector(".infotable > tbody > tr:nth-of-type(4) > td:nth-of-type(2)").text().trim();
            const updateAt = selector(".infotable > tbody > tr:nth-of-type(5) > td:nth-of-type(2)").text().trim();
            const score = selector(".seriestucon")
                .find(".rating > .rating-prc > .num")
                .text().trim();
            const chapters = [];
            selector(".eplister > ul > li").each((index, el) => {
                const chapterName = selector(el).find(".chapternum").text();
                const link = selector(el).find("a").attr("href");
                const path = (0, lib_1.pathFormatter)(link);
                const publishAt = selector(el).find(".chapterdate").text();
                chapters.push({
                    chapterName,
                    path,
                    publishAt,
                });
            });
            return {
                name,
                description,
                status,
                type,
                author,
                publishAt,
                updateAt,
                score,
                chapters,
            };
        }
        catch (error) {
            console.error("Error fetching manga:", error);
        }
    });
}
exports.getMangaDetails = getMangaDetails;
