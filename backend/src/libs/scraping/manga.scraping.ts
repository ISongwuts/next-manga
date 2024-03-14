import axios from "axios";
import * as cheerio from "cheerio";
import { getGenres, getScore, pathFormatter } from "../lib";

type MangaListDetailsType = {
  title: string | undefined;
  cover: string | undefined;
  path: string | undefined;
  genres: string[] | undefined;
  latestChapter: string | undefined;
  timestamp: string | undefined;
  scoreNumber: string | undefined;
};

type GetMangasType = {
  name: string;
  currentPage: string;
  totalPage: string;
  mangas: MangaListDetailsType[];
};

export async function getMangas(
  page: string = "1"
): Promise<GetMangasType | undefined> {
  const BASE_URL = process.env.BASE_MANGA_URL;
  try {
    const webResponse = await axios.get(`${BASE_URL}page/${page}/`);
    const selector = cheerio.load(webResponse.data);
    const mangas: MangaListDetailsType[] = [];
    const totalPage = selector(
      ".postbody > .bixbox > .listupd > .pagination > a:nth-last-child(2)"
    ).text();

    // Mapping over elements and awaiting Promise.all
    await Promise.all(
      selector(".postbody > .bixbox > .listupd > .utao").map(
        async (index: number, el: cheerio.Element) => {
          const baseElement: string = ".uta";

          // Get upper details
          const link = selector(el)
            .find(`${baseElement} > .imgu > a`)
            .attr("href");
          const path = pathFormatter(link)
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
          const genres = await getGenres(link);
          const score = await getScore(link);
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
        }
      )
    );

    return {
      name: "Manga Lists",
      currentPage: page,
      totalPage,
      mangas,
    };
  } catch (error) {
    console.error("Error fetching manga:", error);
  }
}
