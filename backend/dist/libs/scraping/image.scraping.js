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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImages = void 0;
function getImages(path) {
    return __awaiter(this, void 0, void 0, function* () {
        const BASE_URL = process.env.BASE_MANGA_URL;
        const mergeURL = BASE_URL + "manga/" + path;
        console.log(mergeURL);
    });
}
exports.getImages = getImages;
try { }
catch (error) {
    console.error("Error fetching manga:", error);
}
