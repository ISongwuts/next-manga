'use client'

import React from 'react'
import { Card, CardHeader, CardContent, CardFooter } from './ui/card'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
    title: string,
    imgSrc: string,
    path: string,
    latestChapter: string,
    timestamp: string,
    score: string
}

const MangaCard = ({ title, imgSrc, path, latestChapter, timestamp, score }: Props) => {
    return (
        <Link href={`/manga/${path}`}>
            <Card className=' cursor-pointer hover:border-primary hover:border'>
                <CardHeader className='p-2'>
                    <div className='flex justify-center'>
                        <Image
                            className='rounded-md'
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: '150px', height: '200px' }}
                            src={imgSrc}
                            alt={title}
                        />
                    </div>

                </CardHeader>
                <CardContent className='p-2 flex flex-col gap-3'>
                    <span className='text-sm font-bold'>{String(title).length > 15 ? (String(title).slice(0, 15) + '...') : title}</span>
                    <div className='flex justify-between items-center text-xs'>
                        <span className='px-2 py-1 bg-yellow-400 font-bold text-black'>New!</span>
                        <span>{latestChapter}</span>
                    </div>
                    <div className='text-xs text-end text-slate-400'>
                        <span>{timestamp}</span>
                    </div>
                </CardContent>
            </Card >
        </Link>
    )
}

export default MangaCard