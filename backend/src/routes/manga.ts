import express from 'express'
import { getMangas } from '../libs/scraping/manga.scraping'
import { getMangaDetails } from '../libs/scraping/detail.scraping'
import { getChapter } from '../libs/scraping/chapter.scraping'
import { getBanner } from '../libs/scraping/banner.scraping'

const mangaRouter = express.Router()

mangaRouter.get('/', async (req, res) => {
    const page = req.query.page
    let mangas
    if(page){
        mangas = await getMangas((page as string))
    }else{
        mangas = await getMangas()
    }
    return res.json(mangas)
})

mangaRouter.get('/detail', async (req, res) => {
    const title = req.query.title
    const manga = await getMangaDetails((title as string))
    return res.json(manga)
})

mangaRouter.get('/chapter', async (req, res) => {
    const path = req.query.path
    const chapter = await getChapter((path as string))
    return res.json(chapter)
})

mangaRouter.get('/banner', async (req, res) => {
    const banner = await getBanner()
    return res.json(banner)
})


export default mangaRouter