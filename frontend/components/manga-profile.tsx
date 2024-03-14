import React from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from './ui/card'
import Image from 'next/image'
import { PersonIcon } from '@radix-ui/react-icons'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Button } from './ui/button'

type Props = {
    name: string
    cover: string
    description: string
    status: string
    author: string
    type: string
    updateAt: string
    publishAt: string
    score: string
}

const MangaProfile = (props: Props) => {
    return (
        <div className='flex flex-col gap-6'>
            <div className='flex gap-6'>
                <Card className=' basis-1/5 h-fit'>
                    <CardHeader>
                        <Image src={props.cover} width={200} height={500} alt={props.name} />
                    </CardHeader>
                </Card>
                <div className='basis-4/5 h-fit flex flex-col gap-6'>
                    <Card>
                        <CardHeader>
                            <CardTitle className='flex items-center justify-between'>
                                <span>{props.name}</span>
                                <Rating style={{ maxWidth: 150 }} value={Math.ceil(Number.parseInt(props.score) / 2)}/>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className=' indent-4 text-sm dark:text-slate-200 text-gray-700'>
                                {String(props.description).length == 0 ? 'No Description' : props.description}
                            </p>
                        </CardContent>
                    </Card>
                    <div className='grid grid-cols-2 gap-6'>
                        <Button className='hover:bg-blue-500 hover:text-white' size={'lg'}>First Chapter</Button>
                        <Button className='hover:bg-blue-500 hover:text-white' size={'lg'}>Last Chapter</Button>
                    </div>
                    <div className='flex gap-3 text-xs'>
                        <Card className='h-fit'>
                            <CardHeader>
                                <CardTitle className='flex items-center gap-3'>
                                    <div className='p-2 rounded-full bg-slate-400 border-primary border'>
                                        <PersonIcon/>
                                    </div>
                                    <span>{props.author}</span>
                                </CardTitle>
                            </CardHeader>
                        </Card>
                        <Card className='h-fit'>
                            <CardHeader>
                                <CardTitle className='flex items-center gap-3'>
                                    <span className='p-2 bg-primary text-primary-foreground rounded-md'>{props.status}</span>
                                </CardTitle>
                            </CardHeader>
                        </Card>
                        <Card className='h-fit'>
                            <CardHeader>
                                <CardTitle className='flex items-center gap-3'>
                                    <span className='p-2 bg-primary text-primary-foreground rounded-md'>{props.type}</span>
                                </CardTitle>
                            </CardHeader>
                        </Card>
                        <Card className='h-fit'>
                            <CardHeader>
                                <CardTitle className='flex items-center gap-3'>
                                    <span className='p-2 bg-primary text-primary-foreground rounded-md'>{props.publishAt}</span>
                                </CardTitle>
                            </CardHeader>
                        </Card>
                        <Card className='h-fit'>
                            <CardHeader>
                                <CardTitle className='flex items-center gap-3'>
                                    <span className='p-2 bg-primary text-primary-foreground rounded-md'>{props.updateAt}</span>
                                </CardTitle>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default MangaProfile