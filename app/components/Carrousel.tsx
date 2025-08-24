'use client'

import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Loader from './Loader';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Carrousel() {

    const images = [
        {
            src: '/images/Pexels Photo by Alfred Franz.png',
            alt: 'img1',
        },
        {
            src: '/images/Pexels Photo by Adrien Olichon.png',
            alt: 'img2',
        },
        {
            src: '/images/Pexels Photo by Eyüpcan Timur.png',
            alt: 'img3',
        },
        {
            src: '/images/Pexels Photo by Jamal Umar.png',
            alt: 'img4',
        },
        {
            src: '/images/Pexels Photo by lin CH.png',
            alt: 'img5',
        },
        {
            src: '/images/Pexels Photo by Muneeb Malhotra.png',
            alt: 'img6',
        },
        {
            src: '/images/Pexels Photo by Patrick Bryan.png',
            alt: 'img7',
        },
        {
            src: '/images/Pexels Photo by Shawn Henry.png',
            alt: 'img8',
        },
        {
            src: '/images/Pexels Photo by Elanur Buse.png',
            alt: 'img9',
        },
        {
            src: '/images/Pexels Photo by Léo Gilmant-1.png',
            alt: 'img10',
        },
        {
            src: '/images/Pexels Photo by Léo Gilmant.png',
            alt: 'img11',
        },
        {
            src: '/images/Pexels Photo by Ornella Iseppi.png',
            alt: 'img12',
        },
        {
            src: '/images/Pexels Photo by Raymond  li.png',
            alt: 'img13',
        },
    ]

    const [isLoading, setIsLoading] = useState(true)
    const loadedCount = useRef(0)
    const loaderRef = useRef<HTMLDivElement>(null)

    const carrouselRef = useRef<HTMLUListElement>(null)
    const carrouselContainerRef = useRef<HTMLDivElement>(null)
    const bgRefs = useRef<HTMLLIElement[]>([])

    const handleImageLoad = () => {
        loadedCount.current += 1
        if (loadedCount.current === images.length) {
        gsap.to(loaderRef.current, {
            opacity: 0,
            ease: 'power3.in',
            duration: 0.8,
            onComplete: () => setIsLoading(false),
            })
        }
    }

    // Hover animación (solo afecta al item correspondiente)
    const handleHoverEnter = (index: number) => {
            bgRefs.current.forEach((bg, i) => {
            gsap.to(bg, { opacity: i === index ? 1 : 0, duration: 0.4 })
        })
    }

    const handleHoverLeave = () => {
            bgRefs.current.forEach((bg) => {
            gsap.to(bg, { opacity: 0, duration: 0.4 })
        })
    }

    useGSAP(() => {
        const carrousel = carrouselRef.current
        const container = carrouselContainerRef.current
        if (!carrousel || !container) return

        const maxScrollX = carrousel.scrollWidth - container.offsetWidth

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#main-container',
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
            },
        })

        tl.to(carrousel, { x: -maxScrollX })

        return () => {
            tl.kill()
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [])

  return (
    <>
        {isLoading && (
            <div
                ref={loaderRef}
                className="absolute top-0 z-20 w-full h-[100dvh] flex items-center justify-center bg-background"
                >
                <Loader />
            </div>
        )}
        <div 
            id='carrousel-container'
            ref={carrouselContainerRef}
            className="overflow-hidden relative h-full flex items-center"
            >
            <div className='absolute top-0 size-full'>
                <ul className='size-full relative'>
                    {images.map((img, i) => (
                    <li key={i} 
                        ref={el => { if (el) bgRefs.current[i] = el }}
                        className='absolute top-0 size-full object-cover opacity-0'>
                        <Image 
                            src={img.src} 
                            alt={img.alt} 
                            className='object-cover' 
                            fill
                            onLoad={handleImageLoad}/>
                    </li>
                ))}
                </ul>
            </div>
            <ul 
                ref={carrouselRef} 
                className=' px-5 flex gap-5 items-center'>
                {images.map((img, i) => (
                    <li key={i} 
                        onMouseEnter={() => handleHoverEnter(i)}
                        onMouseLeave={handleHoverLeave}
                        className='relative min-w-60 grayscale-100 hover:grayscale-0'>
                        <Image 
                            src={img.src} 
                            alt={img.alt} 
                            width={1000} 
                            height={1000}
                            onLoad={handleImageLoad}/>
                    </li>
                ))}
            </ul>
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 py-5">
                <div>
                    Scroll Down
                </div>
            </div>
        </div>
    </>
  )
}
