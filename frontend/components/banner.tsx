'use client'
import React, { useState, useEffect } from "react"
import Autoplay from "embla-carousel-autoplay"
import axios from "axios"
import Image from "next/image"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export default function Banner() {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )
    const [banner, setBanner] = useState([])

    useEffect(() => {
        const fetchBanner = async (url: string) => {
            const response = await axios.get(url)
            const { images } = response.data
            setBanner(images)
        }

        fetchBanner('http://localhost:5000/manga/banner')
    }, [])

    return (
        <Carousel
            plugins={[plugin.current]}
            className="w-full max-w-6xl"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent>
                {banner.map((img, index) => (
                    <CarouselItem key={index}>
                        <div className="flex justify-center">
                            <Image className="rounded-lg" height={100} width={1000} src={img} alt="Images Banner" />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}