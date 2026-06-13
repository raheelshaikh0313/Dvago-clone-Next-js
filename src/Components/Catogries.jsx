"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { MdChevronRight,MdChevronLeft } from "react-icons/md";


const categoriesData = [
  {
    title: "Multivitamins",
    image: "/catogries1.png",
    link: "/category/multivitamins",
  },
  {
    title: "Perfumes",
    image: "/catogries3.png",
    link: "/category/fragrance",
  },
  {
    title: "Medicine",
    image: "/catogries4.png",
    link: "/category/nebulizer",
  },
  {
    title: "Beauty Care",
    image: "/catogries2.png",
    link: "/category/derma",
  },
  {
    title: "Intimate Essentials",
    image: "/catogries5.png",
    link: "/category/intimate",
  },
   {
    title: "Nebulizer",
    image: "/catogries6.png",
    link: "/category/intimate",
  },
   {
    title: "Baby & Mother Care",
    image: "/catogries7.png",
    link: "/category/intimate",
  },
   
];

  

// 🔥 Important: clone data for loop
const loopData = [...categoriesData, ...categoriesData];

export default function Categories() {  
  const scrollRef = useRef(null);
  const intervalRef = useRef(null);
  const router = useRouter();

  const stopScroll = () => {
  clearInterval(intervalRef.current);
};

const startScroll = () => {
  intervalRef.current = setInterval(() => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;

    container.scrollBy({
      left: 200,
      behavior: "smooth",
    });

    if (container.scrollLeft >= container.scrollWidth / 2) {
      setTimeout(() => {
        container.scrollTo({
          left: 0,
          behavior: "auto",
        });
      }, 500);
    }
  }, 3000);
};
 // ✅ Auto Scroll with LOOP
  useEffect(() => {
     intervalRef.current = setInterval(() => {
      if (!scrollRef.current) return;

      const container = scrollRef.current;

      container.scrollBy({
        left: 200,
        behavior: "smooth",
      });

      // 🔥 Loop logic
      if (container.scrollLeft >= container.scrollWidth / 2) {
        // reset to start smoothly
        setTimeout(() => {
          container.scrollTo({
            left: 0,
            behavior: "auto",
          });
        }, 500); // wait for smooth scroll finish
      }
    }, 3000);

    return () => clearInterval(intervalRef.current);
  }, []);

  // ✅ Button Controls
  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -200,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 200,
      behavior: "smooth",
    });
  };

  return (
    <div className="container mx-auto gap-4 lg:px-30 px-5 py-3">
      
      {/* 🔹 Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[30.4px] my-[10px] mx-[0px] font-bold text-[#76BC21] ">
          Categories
        </h2>

        <div
          onMouseEnter={stopScroll}
        onMouseLeave={startScroll}
        className="flex gap-3">
          <button
            onClick={scrollLeft}
            className="bg-[#8DC63F] hover:bg-[#8DC63F] text-white p-2 rounded-full transition"
          >
            <MdChevronLeft size={20} />
          </button>

          <button
            onClick={scrollRight}
            className="bg-[#8DC63F] hover:bg-[#8DC63F] text-white p-2 rounded-full transition"
          >
            <MdChevronRight size={20} />
          </button>
        </div>
      </div>

       {/* Scroll Container */}
       <div
         onMouseEnter={stopScroll}
        onMouseLeave={startScroll}
       >
      <div
        ref={scrollRef}
        className="flex gap-6  overflow-hidden scrollbar-hide"
      >
        {loopData.map((item, index) => (
          <div
            key={index}
                         onClick={() => router.push("/products")}

            className="group relative min-w-[176px] min-h-[216px] mb-[30px] bg-white border border-gray-400 rounded-xl p-4 flex flex-col items-center justify-center transition-all duration-300  shadow-sm hover:shadow-lg transition hover:-translate-y-2 hover:border-gray-500"
          >
             {/* 🔹 Content Wrapper (move UP) */}
  <div className="flex flex-col items-center transition-all duration-300 group-hover:-translate-y-6">
            
            {/* 🔹 Image (Hover Zoom Effect) */}
            <img
              src={item.image}
              alt={item.title}
              className="w-30 h-30 object-contain mb-3 "
            />

            {/* 🔹 Title */}
            <p className="text-md font-bold text-black text-center">
              {item.title}
            </p>

           {/* Hover Button */}
            <button
             onClick={() => router.push("/products")}
              className="absolute bottom-[5px] opacity-0 group-hover:-bottom-17 group-hover:opacity-100 bg-[#8DC63F] text-white text-xs px-1.5 py-1.5 rounded-full transition-all duration-300 "
            >
            <MdChevronRight size={15} />
            </button>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}