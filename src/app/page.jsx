import Image from "next/image";
import Header from "@/Components/Header";
import Carousel from "@/Components/home/Carousel";
import Categories from "@/Components/Catogries";
import Product from "@/Components/Product";
import Deals from "@/Components/Deals";
import FeaturedProduct from "@/Components/FeaturedProduct";
import CareByCondition from "@/Components/CareByCondition";
import Footer from "@/Components/Footer";
export default function Home() {
return(
    <div className="bg-white ">
        <Header/>
        <Carousel/>
        <Categories/>
   <Product/>
   <Deals/>
   <FeaturedProduct/>
   <CareByCondition/>
   <Footer/>
    </div>
)
}