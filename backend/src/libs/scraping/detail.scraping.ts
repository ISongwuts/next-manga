import axios from "axios";
import * as cheerio from "cheerio";
import { pathFormatter } from "../lib";

type ChapterDetailsType = {
  chapterName: string | undefined;
  path: string | undefined;
  publishAt: string | undefined;
};

type MangaDetailsType = {
  cover: string | undefined;
  name: string | undefined;
  description: string | undefined;
  status: string | undefined;
  type: string | undefined;
  author: string | undefined;
  publishAt: string | undefined;
  updateAt: string | undefined;
  score: string | undefined;
  chapters: ChapterDetailsType[];
};

export async function getMangaDetails(
  path: string
): Promise<MangaDetailsType | undefined> {
  const BASE_URL = process.env.BASE_MANGA_URL;
  const mergeURL = BASE_URL + "manga/" + path;
  console.log(mergeURL)
  try {
    const webResponse = await axios.get(mergeURL);
    const selector = cheerio.load(webResponse.data);
    const cover = selector(".seriestucontl > .thumb > img").attr('src')
    const name = selector(".seriestuheader > h1").text().trim();
    const description = selector(".seriestuhead > .entry-content > p")
      .text()
      .trim();
    const status = selector(
      ".infotable > tbody > tr:first-of-type > td:nth-of-type(2)"
    ).text().trim();
    const type = selector(
      ".infotable > tbody > tr:nth-of-type(2) > td:nth-of-type(2)"
    ).text().trim();
    const author = selector(
      ".infotable > tbody > tr:nth-of-type(3) > td:nth-of-type(2)"
    ).text().trim();
    const publishAt = selector(
      ".infotable > tbody > tr:nth-of-type(4) > td:nth-of-type(2)"
    ).text().trim();
    const updateAt = selector(
      ".infotable > tbody > tr:nth-of-type(5) > td:nth-of-type(2)"
    ).text().trim();
    const score = selector(".seriestucon")
      .find(".rating > .rating-prc > .num")
      .text().trim();
    const chapters: ChapterDetailsType[] = [];
    selector(".eplister > ul > li").each(
      (index: number, el: cheerio.Element) => {
        const chapterName = selector(el).find(".chapternum").text();
        const link = selector(el).find("a").attr("href");
        const path = pathFormatter(link);
        const publishAt = selector(el).find(".chapterdate").text();
        chapters.push({
          chapterName,
          path,
          publishAt,
        });
      }
    );
    return {
      cover,
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
  } catch (error) {
    console.error("Error fetching manga:", error);
  }
}
