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
exports.getMangas = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
const lib_1 = require("../lib");
function getMangas() {
    return __awaiter(this, arguments, void 0, function* (page = "1") {
        const BASE_URL = process.env.BASE_MANGA_URL;
        try {
            const webResponse = yield axios_1.default.get(`${BASE_URL}page/${page}/`);
            const selector = cheerio.load(webResponse.data);
            const mangas = [];
            const totalPage = selector(".postbody > .bixbox > .listupd > .pagination > a:nth-last-child(2)").text();
            // Mapping over elements and awaiting Promise.all
            yield Promise.all(selector(".postbody > .bixbox > .listupd > .utao").map((index, el) => __awaiter(this, void 0, void 0, function* () {
                const baseElement = ".uta";
                // Get upper details
                const link = selector(el)
                    .find(`${baseElement} > .imgu > a`)
                    .attr("href");
                const path = (0, lib_1.pathFormatter)(link);
                const coverImage = selector(el)
                    .find(`${baseElement} > .imgu > a > img`)
                    .attr("src");
                // Get lower details
                const title = selector(el)
                    .find(`${baseElement} > .luf > a > h4`)
                    .text()
                    .trim();
                const latestChapter = selector(el)
                    .find(`${baseElement} > .luf > ul > li:first-of-type > a`)
                    .text();
                const timestamp = selector(el)
                    .find(`${baseElement} > .luf > ul > li:first-of-type > span`)
                    .text();
                //Get outer details
                const genres = yield (0, lib_1.getGenres)(link);
                const score = yield (0, lib_1.getScore)(link);
                // Assign details value
                mangas.push({
                    title,
                    cover: coverImage,
                    path,
                    genres,
                    latestChapter,
                    timestamp,
                    scoreNumber: score,
                });
            })));
            return {
                name: "Manga Lists",
                currentPage: page,
                totalPage,
                mangas,
            };
        }
        catch (error) {
            console.error("Error fetching manga:", error);
        }
    });
}
exports.getMangas = getMangas;
