"use client";

import { useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export default function CareByCondition() {
  const conditions = [
    {
      id: 1,
      title: "Hair Fall",
      image: "/condition1.png",
    },
    {
      id: 2,
      title: "Cough & Cold",
      image: "/condition2.png",
    },
    {
      id: 3,
      title: "Bones & Joints Pain",
      image: "/condition3.png",
    },
    {
      id: 4,
      title: "Acne",
      image: "/condition4.png",
    },
    {
      id: 5,
      title: "Pain & Body Aches",
      image: "/condition5.png",
    },
    {
      id: 6,
      title: "Sleep Disorders",
      image: "/condition6.png",
    },
    {
      id: 7,
      title: "Constipation",
      image: "/condition7.png",
    },
    {
      id: 8,
      title: "Sun Protection",
      image: "/condition8.png",
    },
     {
      id: 9,
      title: "Fever Relief",
      image: "/condition9.png",
    },
  ];

  const visibleCards = 5;

  const [currentIndex, setCurrentIndex] = useState(0);

  const showLeft = currentIndex > 0;

  const isEnd =
    currentIndex >= conditions.length - visibleCards;

    const cardWidth = 192;
const gap = 20;

  const scrollRight = () => {
    if (!isEnd) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const scrollLeft = () => {
    if (showLeft) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="container mx-auto lg:px-30 px-5 py-10 overflow-hidden">

      {/* Heading */}
       <h2 className="text-3xl font-bold text-[#8DC63F] my-10">
        Care By Condition
      </h2>

      <div className="relative">

        {/* Left Button */}
        {showLeft && (
          <button
            onClick={scrollLeft}
            className="absolute -left-5 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#8DC63F] text-white shadow-lg"
          >
            <MdChevronLeft size={22} />
          </button>
        )}

        {/* Right Button */}
        <button
          onClick={scrollRight}
          disabled={isEnd}
          className={`absolute -right-5 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-white shadow-lg transition-all duration-300 ${
            isEnd
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#8DC63F]"
          }`}
        >
          <MdChevronRight size={22} />
        </button>

        {/* Cards Wrapper */}
        <div className="overflow-hidden">

          <div
            className="flex gap-5 transition-transform duration-500 ease-in-out"
           style={{
  transform: `translateX(-${currentIndex * (cardWidth + gap)}px)`,
}}
          >
            {conditions.map((item) => (
              <div
  key={item.id}
  className="w-[192px] flex-shrink-0"
>
<div className="relative h-[280px] overflow-visible">
    {/* Top Arch */}
    <div className="absolute top-0 left-0 w-full h-[200px] rounded-t-[100px] bg-white" />

    {/* Person Image */}
    <img
      src={item.image}
      alt={item.title}
      className="absolute left-1/2 z-20 w-[180px] -translate-x-1/2  object-contain"/>

    {/* Bottom Strip */}
    {/* <div
      className="
        absolute
        left-0
        bottom-[48px]
        z-30
        h-[78px]
        w-full
        bg-[#D7B4BE]
      "
    >
      <h3
        className="
          flex
          h-full
          items-center
          justify-center
          px-2
          text-center
          text-[16px]
          font-semibold
          text-black
        "
      >
        {item.title}
      </h3>
    </div> */}

    {/* Diamond Shape */}
    {/* <div
      className="
        absolute
        left-1/2
        bottom-[12px]
        z-10
        h-[70px]
        w-[70px]
        -translate-x-1/2
        rotate-45
        rounded-[12px]
        bg-[#E8D4D9]
      "
    />

    Arrow
    <div
      className="
        absolute
        bottom-[10px]
        left-1/2
        z-40
        -translate-x-1/2
        text-[38px]
        font-bold
        text-black
      "
    >
      »
    </div> */}

  </div>
</div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}