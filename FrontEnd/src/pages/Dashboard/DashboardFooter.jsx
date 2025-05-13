import React from 'react'
import { Link } from 'react-router-dom';

export default function DashboardFooter() {
    return (
        <footer className="bg-white border-t border-gray-200 mt-8">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <Link to="/dashboard" className="text-lg font-semibold text-gray-800">
                            Mini<span className="text-blue-600">CRM</span>
                        </Link>
                        <p className="mt-2 text-sm text-gray-500 max-w-xs">
                            A simple customer relationship management system for small businesses.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase">Navigation</h2>
                            <ul className="text-gray-500 text-sm">
                                <li className="mb-2">
                                    <Link to="/dashboard" className="hover:text-blue-600 transition-colors duration-200">
                                        Dashboard
                                    </Link>
                                </li>
                                <li className="mb-2">
                                    <Link to="/campaigns" className="hover:text-blue-600 transition-colors duration-200">
                                        Campaigns
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/communications" className="hover:text-blue-600 transition-colors duration-200">
                                        Communications
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase">Resources</h2>
                            <ul className="text-gray-500 text-sm">
                                <li className="mb-2">
                                    <Link to="#" className="hover:text-blue-600 transition-colors duration-200">
                                        Help Center
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="hover:text-blue-600 transition-colors duration-200">
                                        Documentation
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase">Legal</h2>
                            <ul className="text-gray-500 text-sm">
                                <li className="mb-2">
                                    <Link to="#" className="hover:text-blue-600 transition-colors duration-200">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="hover:text-blue-600 transition-colors duration-200">
                                        Terms of Service
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-200" />
                <div className="text-center">
                    <span className="text-sm text-gray-500">
                        © {new Date().getFullYear()} MiniCRM. All rights reserved.
                    </span>
                </div>
            </div>
        </footer>
    );
}