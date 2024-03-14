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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function getMangas() {
    return __awaiter(this, arguments, void 0, function* (page = '1') {
        const BASE_URL = process.env.BASE_MANGA_URL;
        console.log(BASE_URL);
        try {
            const webResponse = yield axios_1.default.get(`${BASE_URL}/manga/?page=${page}&order=update`);
            const selector = cheerio.load(webResponse.data);
            const mangas = [];
            selector('.listupd > .bs').each((index, el) => {
                const baseElement = '.bsx > a';
                //Get upper details
                const link = selector(el).find(baseElement).attr('href');
                const type = selector(el).find(`${baseElement} > .limit > .type`).text();
                const coverImage = selector(el).find(`${baseElement} > .limit > img`).attr('src');
                //Get lower details
                const title = selector(el).find(`${baseElement} > .bigor > .tt`).text().trim();
                const latestChapter = selector(el).find(`${baseElement} > .bigor > .adds > .epxs`).text();
                const ratingScore = selector(el).find(`${baseElement} > .bigor > .adds > .rt > .rating > .numscore`).text();
                //Assign details value
                mangas.push({
                    title,
                    cover: coverImage,
                    link,
                    type,
                    latestChapter,
                    ratingScore,
                });
            });
            return {
                name: 'Manga Lists',
                page,
                mangas
            };
        }
        catch (error) {
            console.error('Error fetching manga:', error);
        }
    });
}
exports.getMangas = getMangas;
