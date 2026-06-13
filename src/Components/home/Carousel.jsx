"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdChevronRight } from "react-icons/md";

export default function Carousel() {
    const slides = [
        "/image1.webp",
        "/image2.webp",
        "/image3.webp",
        "/image4.webp",
        "/image5.webp",
        "/image6.webp",
        "/image7.webp",
    ];

    const [current, setCurrent] = useState(0);

    const prevSlide = () => {
        setCurrent((prev) =>
            prev === 0 ? slides.length - 1 : prev - 1
        );
    };

    const nextSlide = () => {
        setCurrent((prev) =>
            prev === slides.length - 1 ? 0 : prev + 1
        );
    };

    // Auto Slide
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000);

        return () => clearInterval(interval);
    }, [current]);

    return (
        <>
            {/* Notice Bar */}
            <div className="bg-gray-300 my-4 text-black font-medium">
                <marquee>
                    Beware Of Fraud!: For our website use only
                    www.dvago.pk. For Calling & WhatsApp please
                    use 021-11-11-38246. Do not trust unauthorized
                    websites/apps claiming to be Dvago. Stay
                    vigilant!
                </marquee>
            </div>

            {/* Carousel */}
            <div className=" mx-auto lg:px-30 px-5 my-6">
                <div className="relative h-[214px] md:h-[350px] overflow-visible">

                    {slides.map((src, index) => {
                        let position = index - current;

                        if (position < -1)
                            position += slides.length;

                        if (position > 1)
                            position -= slides.length;

                        return (
                            <div
                                key={index}
                                className={` 
                  absolute top-0 h-full
                  transition-all duration-700 
                  ${position === 0
                                        ? "left-1/2 z-30 w-[92%] -translate-x-1/2 scale-100 opacity-100"
                                        : position === -1
                                            ? "-left-[10%] z-20 w-[12%] scale-100 opacity-70"
                                            : position === 1
                                                ? "-right-[9%] z-20 w-[11%] scale-100 opacity-70"
                                                : "opacity-0 scale-75 pointer-events-none"
                                    }
                `}
                            >
                                <div className="container relative h-full w-full overflow-hidden rounded-2xl shadow-xl mx-3">
                                    <Image
                                        src={src}
                                        alt={`slide-${index}`}
                                        fill
                                        priority={index === current}
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        );
                    })}

                    {/* Left Arrow */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-19 top-1/2 z-40 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm"
                    >
                        <MdKeyboardArrowLeft size={18} />
                    </button>

                    {/* Right Arrow */}
                    <button
                        onClick={nextSlide}
                        className="absolute right-14 top-1/2 z-40 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm"
                    >
                        <MdChevronRight size={18} />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-5 left-1/2 z-40 flex -translate-x-1/2 gap-2">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`h-3 w-3 rounded-full transition-all ${i === current
                                    ? "bg-white scale-125"
                                    : "bg-white/50"
                                    }`}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </>
    );
}