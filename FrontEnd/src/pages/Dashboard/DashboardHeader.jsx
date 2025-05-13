import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOutSuccess } from '../../redux/user/userSlice.js'; 

export default function DashboardHeader() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        // Dispatch the signOutSuccess action to update the Redux state
        dispatch(signOutSuccess());

        // Clear any stored authentication tokens if you use them
        localStorage.removeItem('authToken');

        // Navigate to the home page
        navigate('/');
    };

    return (
        <header className="shadow sticky z-50 top-0">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-3">
                <div className="flex justify-between items-center mx-auto max-w-screen-xl">
                    <div className="flex items-center">
                        <Link to="/dashboard" className="flex items-center">
                            <span className="self-center text-xl font-semibold whitespace-nowrap text-gray-800">
                                Mini<span className="text-blue-600">CRM</span>
                            </span>
                        </Link>
                    </div>
                    
                    <div className="flex-grow flex justify-center">
                        <ul className="flex space-x-8 font-medium">
                            <li>
                                <NavLink
                                    to="/dashboard"
                                    className={({ isActive }) =>
                                        `py-2 px-3 block ${
                                            isActive ? 'text-blue-600 font-bold' : 'text-gray-700'
                                        } hover:text-blue-600`
                                    }
                                >
                                    Dashboard
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/campaigns"
                                    className={({ isActive }) =>
                                        `py-2 px-3 block ${
                                            isActive ? 'text-blue-600 font-bold' : 'text-gray-700'
                                        } hover:text-blue-600`
                                    }
                                >
                                    Campaigns
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/communications"
                                    className={({ isActive }) =>
                                        `py-2 px-3 block ${
                                            isActive ? 'text-blue-600 font-bold' : 'text-gray-700'
                                        } hover:text-blue-600`
                                    }
                                >
                                    Communications
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="flex items-center">
                        <button
                            onClick={handleLogout}
                            className="text-gray-700 border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none transition-colors duration-200"
                        >
                            Log Out
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
}
