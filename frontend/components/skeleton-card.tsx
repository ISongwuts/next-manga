import React from 'react'
import { Card, CardHeader, CardContent, CardFooter } from './ui/card'
import { Skeleton } from "@/components/ui/skeleton"

const SkeletonCard = () => {
    return (
        <Card className=' cursor-pointer hover:border-primary hover:border'>
            <CardHeader className='p-2'>
                <div className='flex justify-center'>
                    <Skeleton className="w-[150px] h-[200px] rounded-md" />
                </div>

            </CardHeader>
            <CardContent className='p-2 flex flex-col gap-3'>
                <span className='text-sm font-bold'><Skeleton className="h-[20px] rounded-md" /></span>
                <div className='flex justify-between items-center'>
                    <Skeleton className="w-[50px] h-[15px]" />

                    <Skeleton className="w-[50px] h-[15px] rounded-md" />
                </div>
                <div className=' flex justify-end'>
                    <Skeleton className="w-[75px] h-[15px]" />
                </div>
            </CardContent>
        </Card>
    )
}

export default SkeletonCard