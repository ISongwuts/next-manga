import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons"
import axios from "axios"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const getMangaChapter = async (name: string) => {
    const response = await axios.get(`http://localhost:5000/manga/chapter/?path=${name}`)
    return response.data
}

export default async function Page({ params }: { params: { name: string } }) {
    const mangaChapter = await getMangaChapter(params.name)
    return (
        <div className="px-96 py-12 flex flex-col gap-6">
            <div className="text-center">
                <span className="text-lg font-bold">{mangaChapter.name}</span>
                <p>อ่านมังงะตอนล่าสุด เรื่อง {mangaChapter.name} ได้ที่เว็บ next-manga.com  </p>
            </div>
            <BehaviorBar />
            <Card>
                <CardHeader>
                    <div className="flex flex-col justify-center ">
                        {mangaChapter.images.map((img: string, index: number) => (
                            <Image
                                key={index}
                                src={img}
                                alt="Read Image"
                                sizes="100vw"
                                width={0}
                                height={0}
                                style={{ width: '100%', height: 'auto' }} // optional
                            />
                        ))}
                    </div>
                </CardHeader>
            </Card>
            <BehaviorBar />
        </div>
    )
}

const BehaviorBar = () => {
    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between">
                    <div>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select chapters" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button size='sm'>
                            <ArrowLeftIcon />
                            <span>
                                ก่อนหน้านี้
                            </span>
                        </Button>
                        <Button size='sm'>
                            <span>
                                ถัดไป
                            </span>
                            <ArrowRightIcon />
                        </Button>
                    </div>
                </div>
            </CardHeader>
        </Card>
    )
}