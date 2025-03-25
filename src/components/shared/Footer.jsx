import React from 'react'

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row justify-between items-center">


        <div className="text-center md:text-left">
          <h1 className="text-lg font-semibold">CPMS-Job-Portal</h1>
          <p className="text-sm text-gray-400">based on various eligibility criteria of different companies.</p>
        </div>


        <div className="flex space-x-5 my-4 md:my-0">
          <a href="#" className="text-gray-300 hover:text-white text-sm">Home</a>
          <a href="#" className="text-gray-300 hover:text-white text-sm">Jobs</a>
          <a href="#" className="text-gray-300 hover:text-white text-sm">About</a>
          <a href="#" className="text-gray-300 hover:text-white text-sm">Contact</a>
        </div>


        <div className="text-center md:text-right text-gray-400 text-sm">
          © {new Date().getFullYear()} CPMS. All rights reserved.
        </div>

      </div>
    </footer>
  )
}
