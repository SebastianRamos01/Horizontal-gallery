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
            alt: 'img2',
        },
        {
            src: '/images/Pexels Photo by Adrien Olichon.png',
            alt: 'img1',
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
    ]

    const [isLoading, setIsloading] = useState(true)
    const [loadedImages, setLoadedImages] = useState(0)
    const loaderRef = useRef<HTMLDivElement>(null)

    const handleImageLoad = () => {
        setLoadedImages((prev) => prev + 1); 
    }

    const carrouselRef = useRef<HTMLUListElement>(null)
    const carrouselConrtainerRef = useRef<HTMLDivElement>(null)
    const [imgIndex, setImgIndex] = React.useState(null)

    // Set loading state to false after images are loaded
    useEffect(() => {
        if(loadedImages === images.length) {
            gsap.to(loaderRef.current, {
                opacity: 0,
                pointerEvents: 'none',
                duration: 0.5,
                onComplete: () => setIsloading(false)
            })
        }
    }, [loadedImages, images.length])

    const handleHoverEnter = (index: any) => {
        setImgIndex(index)

        images.forEach((_, i) => {
            gsap.to('#bgImg-'+ i, {
                opacity: i === index ? 1 : 0,
            })
        })

    }

    const handleHoverLeave = () => {
        setImgIndex(null)

        images.forEach((_, i) => {
            gsap.to('#bgImg-'+ i, {
                opacity:  0,
            })
        })
    }

    // Carrousel animation 
    useGSAP(() => {

        const carrousel = carrouselRef.current
        const carrouselconatiner = carrouselConrtainerRef.current

        if (!carrousel || !carrouselconatiner) return;

        const maxScrollX = carrousel.scrollWidth - carrouselconatiner.offsetWidth;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#main-container',
                start: 'top top',
                end: 'bottom bottom',
                scrub: true
            }
        })

        tl.to('#carrousel', {
            x: -maxScrollX,
        })
    })

  return (
    <>
        {isLoading && (
            <div ref={loaderRef} className='absolute top-0 z-20 w-full h-[100dvh] flex items-center justify-center bg-background'>
                <Loader></Loader>
            </div>
        )}
        <div ref={carrouselConrtainerRef} className='overflow-hidden relative h-full flex items-center'>
            <div className='absolute top-0 size-full'>
                <ul  className='size-full relative'>
                    {images.map((img, i) => (
                    <li key={i} id={`bgImg-${i}`} 
                        className='absolute top-0 size-full object-cover opacity-0'>
                        <Image src={img.src} alt={img.alt} objectFit='cover' fill/>
                    </li>
                ))}
                </ul>
            </div>
            <ul id='carrousel' ref={carrouselRef} className=' px-5 flex gap-5 items-center'>
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
                            onLoad={handleImageLoad} />
                    </li>
                ))}
            </ul>
        </div>
    </>
  )
}
