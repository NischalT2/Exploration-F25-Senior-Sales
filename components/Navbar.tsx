'use client';
import Link from "next/link";

export default function Navbar() {
    return (
        <main className= "bg-gray-50">
            <header className="fixed flex items-center w-full justify-start h-16 px-4 py-4 bg-red-800 border-b border-gray-200 z-60">
                <h1 className="text-2xl font-bold text-white ml-4"> Harvard Hoarder</h1>
                
                <div className = "static flex-1 ml-auto max-w-sm">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full rounded-full border border-gray-200 bg-white/95 pl-5 pr-4 py-2 text-sm text-gray-900 
                        placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8a1c24]/70"
                    />
                </div>
            </header>

            <nav className="fixed flex px-6 py-1 top-16 bg-red-800 shadow-md z-60 w-full mx-auto">
                <div className="relative group inline-block left-0 space-x-6 px-4 py-2">
                    <button className="peer text-white font-semibold hover:text-zinc-200 text-sm">Clothing</button>
                    <div className = "peer absolute top-8 left-0 h-3 w-full bg-transparent"></div>
                    <div className="absolute hidden peer-hover:flex hover:flex z-50 mt-3 w-[140px] flex-col bg-white drop-shadow-lg text-sm rounded-b-sm">
                        <a className="px-4 py-2 text-red-800 hover:bg-gray-200" href="#">Womens</a>
                        <a className="px-4 py-2 text-red-800 hover:bg-gray-200" href="#">Mens</a>
                        <a className="px-4 py-2 text-red-800 hover:bg-gray-200" href="#">Gender Neutral</a>
                    </div>
                </div>
                <div className="relative group inline-block space-x-6 px-4 py-2">
                    <button className="peer text-white font-semibold hover:text-zinc-200 text-sm">Furniture</button>
                    <div className = "peer absolute top-8 left-0 h-3 w-full bg-transparent"></div>
                    <div className="absolute hidden peer-hover:flex hover:flex z-50 mt-3 w-[140px] flex-col bg-white drop-shadow-lg text-sm rounded-b-sm">
                        <a className="px-4 py-2 text-red-800 hover:bg-gray-200" href="#">Chairs</a>
                        <a className="px-4 py-2 text-red-800   hover:bg-gray-200" href="#">Couches</a>
                        <a className="px-4 py-2 text-red-800   hover:bg-gray-200" href="#">Nightstands</a>
                        <a className="px-4 py-2 text-red-800   hover:bg-gray-200" href="#">Tables</a>
                    </div>
                </div>

                <div className="relative group inline-block space-x-6 px-4 py-2">
                    <button className="peer text-white font-semibold hover:text-zinc-200 text-sm">Electronics</button>
                    <div className = "peer absolute top-8 left-0 h-3 w-full bg-transparent"></div>
                    <div className="absolute hidden peer-hover:flex hover:flex z-50 mt-3 w-[140px] flex-col bg-white drop-shadow-lg text-sm rounded-b-sm">
                        <a className="px-4 py-2 text-red-800  hover:bg-gray-200" href="#">Cables</a>
                        <a className="px-4 py-2 text-red-800  hover:bg-gray-200" href="#">Chargers</a>
                        <a className="px-4 py-2 text-red-800  hover:bg-gray-200" href="#">Laptops</a>
                        <a className="px-4 py-2 text-red-800  hover:bg-gray-200" href="#">Monitors</a>
                        <a className="px-4 py-2 text-red-800  hover:bg-gray-200" href="#">Phones</a>
                    </div>
                </div>
                <div className="relative group inline-block space-x-6 px-4 py-2">
                    <button className="peer text-white font-semibold hover:text-zinc-200 text-sm">Appliances</button>
                    <div className = "peer absolute top-8 left-0 h-3 w-full bg-transparent"></div>
                    <div className="absolute hidden peer-hover:flex hover:flex z-50 mt-3 w-[140px] flex-col bg-white drop-shadow-lg text-sm rounded-b-sm">
                        <a className="px-4 py-2 text-red-800 hover:bg-gray-200" href="#">Air Purifiers</a>
                        <a className="px-4 py-2 text-red-800 hover:bg-gray-200" href="#">Fans</a>
                        <a className="px-4 py-2 text-red-800 hover:bg-gray-200" href="#">Humidifiers</a>
                        <a className="px-4 py-2 text-red-800 hover:bg-gray-200" href="#">Microwaves</a>
                        <a className="px-4 py-2 text-red-800 hover:bg-gray-200" href="#">Fridges</a>
                    </div>
                </div>
                <div className="relative group inline-block space-x-6 px-4 py-2">
                    <button className="peer text-white font-semibold hover:text-zinc-200 text-sm">College Items</button>
                    <div className = "peer absolute top-8 left-0 h-3 w-full bg-transparent"></div>
                    <div className="absolute hidden peer-hover:flex hover:flex z-50 mt-3 w-[140px] flex-col bg-white drop-shadow-lg text-sm rounded-b-sm">
                        <a className="px-4 py-2 text-red-800 hover:bg-gray-200" href="#">Books</a>
                        <a className="px-4 py-2 text-red-800 hover:bg-gray-200" href="#">Stationary</a>
                        <a className="px-4 py-2 text-red-800 hover:bg-gray-200" href="#">Textbooks</a>
                    </div>
                </div>
                <div className="relative group inline-block space-x-6 px-4 py-2">
                    <button className="relative group peer text-white font-semibold hover:text-zinc-200 text-sm">Decor</button>
                    <div className = "peer absolute top-8 left-0 h-3 w-full bg-transparent"></div>
                    <div className="absolute hidden peer-hover:flex hover:flex z-50 mt-3 w-[140px] flex-col bg-white drop-shadow-lg text-sm rounded-b-sm">
                        <a className="px-4 py-2 text-red-800 hover:bg-gray-200" href="#">Artwork</a>
                        <a className="px-4 py-2 text-red-800 hover:bg-gray-200" href="#">Lights</a>
                        <a className="px-4 py-2 text-red-800 hover:bg-gray-200" href="#">Pillows</a>
                        <a className="px-4 py-2 text-red-800 hover:bg-gray-200" href="#">Seasonal Decor</a>
                        <a className="px-4 py-2 text-red-800 hover:bg-gray-200" href="#">Wall Decor</a>
                    </div>
                </div>

                <div className="relative group inline-block space-x-6 px-4 py-2">
                    <button className="text-white font-semibold hover:text-zinc-200 text-sm">Misc.</button>
                </div>

                <div className="flex space-x-8 mx-px items-center ml-auto ">
                    <Link href="/signup">
                    <button className="text-white font-semibold hover:text-zinc-200 text-sm">Sign Up</button>
                    </Link>
                    <Link href="/login">
                    <button className="text-white font-semibold hover:text-zinc-200 text-sm">Log In</button>
                    </Link>
                </div>
                </nav>
            </main>
        );
    };