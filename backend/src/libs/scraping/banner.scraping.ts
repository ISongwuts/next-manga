import axios from "axios";
import * as cheerio from "cheerio";
import { extractUrl } from "../lib";

type BannerType = {
  images: string[];
};

export async function getBanner(): Promise<BannerType | undefined> {
  const BASE_URL = process.env.BASE_MANGA_URL;
  try {
    const webResponse = await axios.get((BASE_URL as string));
    const selector = cheerio.load(webResponse.data);
    const images: string [] = []
    selector('.big-slider > .swiper-wrapper > .swiper-slide').find('.bigbanner').each((index: number, el: cheerio.Element) => {
      const style = selector(el).attr('style')
      const image = extractUrl((style as string))
      images.push(image)
    })
    console.log(images)
    return {
      images
    }
  } catch (error) {
    console.error("Error fetching manga:", error);
  }
}