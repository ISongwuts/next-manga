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
exports.extractUrl = exports.pathFormatter = exports.getScore = exports.getGenres = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
const getGenres = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const webResponse = yield axios_1.default.get(url);
    const selector = cheerio.load(webResponse.data);
    const genres = [];
    selector(".seriestucon")
        .find(".seriestugenre > a")
        .each((index, el) => {
        const genre = selector(el).text().trim();
        genres.push(genre);
    });
    return genres;
});
exports.getGenres = getGenres;
const getScore = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const webResponse = yield axios_1.default.get(url);
    const selector = cheerio.load(webResponse.data);
    const score = selector(".seriestucon")
        .find(".rating > .rating-prc > .num")
        .text();
    return score;
});
exports.getScore = getScore;
const pathFormatter = (url) => {
    const match = url.match(/\/([^/]+)\/?$/);
    const desiredValue = match ? match[1] : undefined;
    return desiredValue;
};
exports.pathFormatter = pathFormatter;
const extractUrl = (str) => {
    const urlRegex = /url\('(.*?)'\)/;
    const match = urlRegex.exec(str);
    if (match) {
        return match[1];
    }
    else {
        return "";
    }
};
exports.extractUrl = extractUrl;