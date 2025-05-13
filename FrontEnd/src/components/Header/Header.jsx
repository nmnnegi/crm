import React from 'react'
import {Link, NavLink} from 'react-router-dom'

export default function Header() {
    return (
        <header className="shadow sticky z-50 top-0">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-3">
                <div className="flex justify-between items-center mx-auto max-w-screen-xl">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <span className="self-center text-xl font-semibold whitespace-nowrap text-gray-800">
                                Mini<span className="text-blue-600">CRM</span>
                            </span>
                        </Link>
                    </div>
                    
                    <div className="flex-grow flex justify-center">
                        <ul className="flex space-x-8 font-medium">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({isActive}) =>
                                        `py-2 px-3 block ${
                                            isActive ? 'text-blue-600 font-bold' : 'text-gray-700'
                                        } hover:text-blue-600`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/about"
                                    className={({isActive}) =>
                                        `py-2 px-3 block ${
                                            isActive ? 'text-blue-600 font-bold' : 'text-gray-700'
                                        } hover:text-blue-600`
                                    }
                                >
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/contact"
                                    className={({isActive}) =>
                                        `py-2 px-3 block ${
                                            isActive ? 'text-blue-600 font-bold' : 'text-gray-700'
                                        } hover:text-blue-600`
                                    }
                                >
                                    Contact
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                        <Link
                            to="/login"
                            className="text-gray-700 border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none transition-colors duration-200"
                        >
                            Log In
                        </Link>
                        <Link
                            to="/signup"
                            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none transition-colors duration-200"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}