import axios from "axios";
import * as cheerio from "cheerio";

type ChapterType = {
  name: string | undefined;
  nextPath: string | undefined;
  prevPath: string | undefined;
  images: string[];
};

export async function getChapter(
  path: string
): Promise<ChapterType | undefined> {
  const BASE_URL = process.env.BASE_MANGA_URL;
  const mergeURL = BASE_URL + "/" + path;
  console.log(mergeURL);
  try {
    const webResponse = await axios.get(mergeURL);
    const selector = cheerio.load(webResponse.data);
    const name = selector(".headpost > h1").text().trim();
    const nextPath = selector(".ctop > .navlef > .npv > .nextprev").find('a:last-child').attr('href')
    const prevPath = selector(".ctop > .navlef > .npv > .nextprev").find('a:first-child').attr('href')
    const images: string [] = []
    selector('#readerarea').find('img').each((index: number, el: cheerio.Element) => {
      const image = selector(el).attr('src')
      images.push((image as string))
    })
    return {
      name,
      nextPath,
      prevPath,
      images
    }
  } catch (error) {
    console.error("Error fetching manga:", error);
  }
}
