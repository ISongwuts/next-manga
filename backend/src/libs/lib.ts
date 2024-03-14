import axios from "axios";
import * as cheerio from "cheerio";

export const getGenres = async (url: string | undefined) => {
  const webResponse = await axios.get(url as string);
  const selector = cheerio.load(webResponse.data);
  const genres: string[] = [];
  selector(".seriestucon")
    .find(".seriestugenre > a")
    .each((index: number, el: cheerio.Element) => {
      const genre: string = selector(el).text().trim();
      genres.push(genre);
    });
  return genres;
};

export const getScore = async (url: string | undefined) => {
  const webResponse = await axios.get(url as string);
  const selector = cheerio.load(webResponse.data);
  const score = selector(".seriestucon")
    .find(".rating > .rating-prc > .num")
    .text();
  return score;
};

export const pathFormatter = (url: string | undefined) => {
  const match = (url as string).match(/\/([^/]+)\/?$/);
  const desiredValue = match ? match[1] : undefined;
  return desiredValue;
};

export const extractUrl = (str: string): string => {
  const urlRegex = /url\('(.*?)'\)/;
  const match = urlRegex.exec(str);
  if (match) {
    return match[1];
  } else {
    return "";
  }
}