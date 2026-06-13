import React from 'react'

function Footer() {
  return (
    <>
    <footer className="w-full bg-[#76bc21] text-white">
  <div className="max-w-[1400px] mx-auto  py-4">
    
    {/* Main Grid */}
    <div className=" container mx-auto gap-4 lg:px-30 my-6   grid grid-cols-5 gap-2">

      {/* Logo Section */}
      <div>
        {/* Logo */}
        <img
          src="/dvago-white-logo.svg"
          alt="Dvago Logo"
          className="w-[200px] mb-1 text-white"
        />

        <p className="text-[17px] leading-8 text-white/90 max-w-[280px]">
          Pakistan's most trusted pharmacy chain delivering nationwide
        </p>

        {/* Social */}
        <div className="mt-8">
          <h3 className="text-[30px] font-semibold mb-1">
            Follow us
          </h3>

          <div className="flex items-center gap-4">
            {/* Facebook */}
            <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/40 hover:bg-white hover:text-[#41B62A] transition-all duration-300">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5c0-2.5 1.5-4 3.8-4 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.7-1.6 1.5V12H17l-.4 3h-2.3v7A10 10 0 0 0 22 12z" />
              </svg>
            </div>

            {/* Twitter */}
            <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/40 hover:bg-white hover:text-[#41B62A] transition-all duration-300">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22 5.8c-.7.3-1.5.5-2.2.6.8-.5 1.4-1.2 1.7-2.1-.8.5-1.7.8-2.6 1A4 4 0 0 0 12 8.1c0 .3 0 .6.1.9-3.3-.2-6.2-1.8-8.1-4.2-.3.5-.5 1.2-.5 1.8 0 1.4.7 2.7 1.8 3.4-.7 0-1.3-.2-1.8-.5v.1c0 2 1.4 3.6 3.2 4-.3.1-.7.1-1 .1-.2 0-.5 0-.7-.1.5 1.6 2 2.8 3.8 2.8A8.1 8.1 0 0 1 2 18.6 11.5 11.5 0 0 0 8.3 20c7.5 0 11.6-6.3 11.6-11.7v-.5c.8-.5 1.5-1.2 2.1-2z" />
              </svg>
            </div>

            {/* Instagram */}
            <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/40 hover:bg-white hover:text-[#41B62A] transition-all duration-300">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm0 2h10c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3zm11.2 1.5a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
              </svg>
            </div>

            {/* YouTube */}
            <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/40 hover:bg-white hover:text-[#41B62A] transition-all duration-300">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21.6 7.2s-.2-1.5-.8-2.1c-.7-.8-1.5-.8-1.9-.9C16.2 4 12 4 12 4h0s-4.2 0-6.9.2c-.4 0-1.2.1-1.9.9-.6.6-.8 2.1-.8 2.1S2 8.9 2 10.5v1.5c0 1.6.2 3.3.2 3.3s.2 1.5.8 2.1c.7.8 1.7.8 2.1.9 1.5.1 6.4.2 6.4.2s4.2 0 6.9-.2c.4 0 1.2-.1 1.9-.9.6-.6.8-2.1.8-2.1s.2-1.7.2-3.3v-1.5c0-1.6-.2-3.3-.2-3.3zM10 14.7V8.8l5.2 2.9L10 14.7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="mb-6 text-[20px] font-bold">
          Categories
        </h3>

        <ul className="space-y-4 text-[14px] font-semibold text-white">
          <li>Medicine</li>
          <li>A to Z Medicine</li>
          <li>Baby & Mother Care</li>
          <li>Nutrition & Supplements</li>
          <li>Food & Beverage</li>
          <li>Devices & Appliances</li>
          <li>Personal Care</li>
          <li>OTC And Health Need</li>
        </ul>
      </div>

      {/* Navigate */}
      <div>
        <h3 className="mb-6 text-[20px] font-bold">
          Navigate
        </h3>

        <ul className="space-y-4 text-[14px] font-semibold  text-white">
          <li>Feedback</li>
          <li>Instant Order</li>
          <li>Deals</li>
          <li>Stores</li>
          <li>My Orders</li>
          <li>User Profile</li>
          <li>Brands</li>
          <li>Blogs</li>
        </ul>
      </div>

      {/* Support */}
      <div>
        <h3 className="mb-6 text-[20px] font-bold">
          Support
        </h3>

        <ul className="space-y-4 text-[14px] font-semibold  text-white">
          <li>FAQs</li>
          <li>Terms Of Service</li>
          <li>Shipping Policy</li>
          <li>Return Policy</li>
          <li>Refund Policy</li>
          <li>Privacy Policy</li>
          <li>Careers</li>
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h3 className="mb-6 text-[20px] font-bold">
          Contact Us
        </h3>

        <div className=" text-[14px] font-semibold  leading-6 text-white">
          <p>
            1st Floor, Plot No. 1 Shaheed-e-Millat Road, Modern Society MCHS,
            Karachi, Sindh 75100, Pakistan
          </p>

        
        </div>
        <div className='mt-4 grid grid-cols-1 gap-4 '>
          <p className='text-[14px]'>
            <span className="font-bold">Phone:</span>(021) 11 11 DVAGO (38246)
          </p>

          <p className='text-[14px]'>
            <span className="font-bold">Email:</span> feedback@dvago.pk
          </p>
          </div>
      </div>
    </div>
  </div>


</footer>
 
  <div className="container mx-auto w-[1400px]s text-red-600 border-t border-white/20 bg-white px-10 py-6">
    <p className="mx-auto max-w-[1400px] text-[16px] leading-4 text-red-500">
      <span className="font-bold text-red-500">Disclaimer:</span> Our official website
      is www.dvago.pk and our official mobile app is Dvago – Pharmacy & Health
      by Novacare (Pvt) Ltd.We are not liable for orders placed through
      unauthorized platforms. Stay vigilant against scams. Report any fraudulent
      websites, apps, or numbers falsely claiming association with Dvago to
      (021) 11-11-38246 immediately. Thank you.
    </p>

      <div className='   py-1 mt-3'>
    <p className='text-[#76bc21] text-[14px]'>
© 2026 Dvago – A Brand by Nova Care (Pvt) Ltd.

</p>
  </div>
  </div>


  </>
  )
}

export default Footer