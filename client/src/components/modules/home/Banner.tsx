"use client"
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"

import banner1 from '@/assests/banner/web1.webp'
import banner2 from '@/assests/banner/web2.webp'
import banner3 from '@/assests/banner/web3.webp'
import banner4 from '@/assests/banner/web4.webp'
import Image from "next/image"

const banners = [banner4, banner3, banner2, banner1]

export function Banner() {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )

    return (
        <div className="space-y-8">
            <Carousel
                plugins={[plugin.current]}
                className="w-full rounded-none"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent>
                    {banners.map((banner, index) => (
                        <CarouselItem key={index}>
                            <div className="mt-1 border shadow">
                                <Image src={banner} alt="banner" className="w-full md:h-full h-40" width={1920} height={400}/>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <div className="p-4 container mx-auto text-center">
                <h1 className="text-3xl font-bold text-cyan-900">Medi Mart: The Leading Online Pharmacy and Healthcare Platform of Bangladesh.</h1>
            </div>
        </div>
    )
}
