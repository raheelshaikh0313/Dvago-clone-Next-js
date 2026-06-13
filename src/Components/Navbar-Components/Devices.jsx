import React from 'react'
import { FaChevronDown } from 'react-icons/fa';

function Devices() {
  return (
        <div>
        <button className="flex items-center gap-1 text-sm font-medium text-gray-700 group-hover:text-[#8DC63F]">
                Devices & Support <FaChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
              </button>

              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute right-0 top-full w-max bg-white shadow-xl border border-gray-100 transition-all duration-200 z-50 p-6 rounded-b-xl">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-bold text-[#8DC63F] mb-3">Health Conditions</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="hover:translate-x-1 transition-transform cursor-pointer">Diabetes Care</li>
                      <li className="hover:translate-x-1 transition-transform cursor-pointer">Heart Health</li>
                      <li className="hover:translate-x-1 transition-transform cursor-pointer">Pain Relief</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#8DC63F] mb-3">Prescriptions</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="hover:translate-x-1 transition-transform cursor-pointer">Antibiotics</li>
                      <li className="hover:translate-x-1 transition-transform cursor-pointer">Cold & Flu</li>
                    </ul>
                  </div>
                </div>
              </div>
    </div>
  )
}

export default Devices