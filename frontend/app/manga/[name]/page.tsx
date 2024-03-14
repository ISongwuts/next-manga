import SectionLabel from "@/components/header-label"
import MangaProfile from "@/components/manga-profile"
import axios from "axios"
import Link from "next/link"

const getMangaDetail = async (name: string) => {
    const response = await axios.get(`http://localhost:5000/manga/detail/?title=${name}`)
    return response.data
}

export default async function Page({ params }: { params: { name: string } }) {
    const mangaDetail = await getMangaDetail(params.name)
    return (
        <div className="px-96 py-12 flex flex-col gap-6">
            <MangaProfile
                name={mangaDetail.name}
                cover={mangaDetail.cover}
                description={mangaDetail.description}
                status={mangaDetail.status}
                type={mangaDetail.type}
                author={mangaDetail.author}
                updateAt={mangaDetail.updateAt}
                publishAt={mangaDetail.publishAt}
                score={mangaDetail.score}
            />
            <div className="flex flex-col gap-6">
                <SectionLabel label="Chapters" />
                <div className="grid grid-cols-4 gap-3">
                    {
                        mangaDetail.chapters.map((ch: any, index: number) => (
                            <Link key={index} href={`/manga/chapter/${ch.path}`} className="p-4 border rounded-md flex justify-between items-center hover:text-blue-500">
                                <div className="flex items-center gap-1">
                                    {index == 0 && <span className='px-2 py-1 bg-yellow-400 font-bold text-black text-xs'>New!</span>}
                                   <span>{ch.chapterName}</span> 
                                </div>
                                
                                <span className="text-xs">{ch.publishAt}</span>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}