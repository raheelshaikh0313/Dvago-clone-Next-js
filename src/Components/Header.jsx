'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "@/Context/cart";
// import { offCanvasContext } from '@/Context/canvas'
import { FaQrcode, FaFileAlt, FaUser,FaUserShield, FaHeart, FaShoppingCart, FaChevronUp, FaBars, FaTimes } from 'react-icons/fa';
import MedicineHover from './Navbar-Components/MedicineHover';
import PersonalCareHover from './Navbar-Components/PersonalCareHover';
import BabyCareHover from './Navbar-Components/BabyCareHover';
import Nutrition from './Navbar-Components/Nutrition';
import Food from './Navbar-Components/Food';
import Devices from './Navbar-Components/Devices';
import Search from './Search';
import { WishlistContext } from "@/Context/wishlist";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const {setOpenCanvas }=useContext(offCanvasContext)
  const { state } = useContext(CartContext);

  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);

  setUser(
    localStorage.getItem("user")
  );

  setAdmin(
    localStorage.getItem("admin")
  );
}, []);
  const cartCount = Array.isArray(state)
    ? state.reduce(
      (total, item) =>
        total + (item.quantity || 1),
      0
    )
    : 0;

  const { wishlist } = useContext(WishlistContext);

  //   const user =
  // typeof window !== "undefined"
  // ? localStorage.getItem("user")
  // : null;

  return (
    <header className=" w-full bg-white font-sans sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between gap-4 lg:px-30 px-5 py-3">

        <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes className="text-gray-600" /> : <FaBars className="text-gray-600" />}
        </button>

        <Link href="/" className="flex-shrink-0">
          <span className="text-2xl lg:text-3xl font-bold text-[#8DC63F]">
            <img className='w-22 lg:w-32   h-auto"' src="/dvago-logo.svg" alt="Dvago" />
          </span>
        </Link>

        <Search />

        <div className="flex items-center gap-2 lg:gap-4">
          <button className="relative md:block hidden group xl:flex items-center gap-2 rounded-lg bg-[#5A8D1B] px-4 py-2 text-white text-sm font-medium">
            <FaQrcode size={18} /> Download App
            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute -right-25 h-35 top-8 z-20 ">
              <FaChevronUp size={30} className=' text-[#8DC63F]  relative  -bottom-2 -right-48' />
              <div className='bg-white border border-gray-300 rounded-2xl p-4 flex flex-row  w-sm'>
                <div className="QR w-[102px] h-[92px]"><img src="/Dvago-QR.png" alt="QR Code" /></div>
                <div className="details text-black m-3">
                  <h3 className='text-lg font-bold text-[#191919] m-0 '>Download the Dvago App</h3>
                  <p className='text-[#757575] text-[14px] mt-[2px] ml-0 mb-1'>Scan the QR code to download</p>
                  <div className=' relative top-0 flex m-1'>
                    <img className='w-[90px] h-[30.75] m-1' src="/google.png" alt="play-store" />
                    <img className='w-[90px] h-[30.75] m-1' src="/appstore.png" alt="app-store" />
                  </div>
                </div>
              </div>
            </div>
          </button>


          <button className="flex items-center gap-2 rounded-lg bg-[#8DC63F] px-3 py-2 text-white text-sm font-medium">
            <FaFileAlt size={18} className="hidden sm:block" /> Instant Order
          </button>
 
          <div className="flex items-center gap-3 text-[#8DC63F]">
               {mounted && admin && (
  <Link href="/admin/add-product">
    <FaUserShield
      className="cursor-pointer h-5 w-5 lg:h-6 lg:w-6"
      title="Admin Dashboard"
    />
  </Link>
)}
            {mounted && (
              <Link href={user ? "/profile" : "/login"}>
                <FaUser className="cursor-pointer h-5 w-5 lg:h-6 lg:w-6" />
              </Link>
            )}

            <div className="relative">
              <Link href={"/wishlist"}>
                <FaHeart className="hidden sm:block cursor-pointer h-5 w-5 lg:h-6 lg:w-6" />
              </Link>
              {mounted && wishlist.length > 0 && (

                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">{wishlist.length}</span>
              )}
            </div>
            <Link href="/cart">
              <div className="relative">


                <FaShoppingCart
                  //  onClick={() => { setOpenCanvas(true) }}  
                  className="cursor-pointer h-5 w-5 lg:h-6 lg:w-6" />

                {mounted && cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}            </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden lg:block ">
        <div className="container mx-auto lg:px-30 px-5">
          <ul className="flex items-center justify-between">
            {/* Nav Item with Mega Menu */}
            <li className="group relative py-3">
              <MedicineHover />
            </li>

            <li className="group relative py-3">
              <BabyCareHover />

            </li>
            <li className="group relative py-3">
              <Nutrition />

            </li>
            <li className="group relative py-3">
              <Food />

            </li>
            <li className="group relative py-3">
              <Devices />

            </li>
            <li className="group relative py-3">
              <PersonalCareHover />
            </li>
          </ul>
        </div>
      </div>

      <div className={`fixed inset-0 bg-black/50 transition-opacity lg:hidden ${isOpen ? 'opacity-0' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsOpen(false)} />
      <div className={`my-52 rounded-r-4xl fixed top-0 left-0 h-1/2 w-64 bg-white transition-transform lg:hidden z-[60] ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 border-b bg-[#8DC63F] rounded-r-4xl">
          <span className="text-xl font-bold text-white"><img src="/dvago-logo-(white).svg" alt="Dvago" /></span>
        </div>
        <ul className="p-4 space-y-4">
          <li className="text-gray-700 font-medium">Medicine</li>
          <li className="text-gray-700 font-medium">Personal Care</li>
          <li className="text-gray-700 font-medium">Baby Care</li>
          <li className="text-gray-700 font-medium">Health Need</li>
        </ul>
      </div>

    </header>
  );
}

export default Navbar;