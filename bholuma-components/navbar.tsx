import React from 'react'

function Navbar() {
    return (
        <nav className="flex justify-between items-center w-full p-4 bg-gray-800 text-white bg-zinc-800 rounded-lg shadow-lg">
            <div className="text-lg font-semibold">Bholuma</div>
            <ul className="flex space-x-4">
                <li><a href="#" className="hover:underline">Home</a></li>
                <li><a href="#" className="hover:underline">About</a></li>
                <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
        </nav>
    )
}

export default Navbar