import React from 'react'
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-16 pb-32 md:pt-24 md:pb-40">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>
                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-7xl">
                            <span className="block text-blue-600 mb-2">Mini CRM</span>
                            <span className="block">Simple. Powerful. Efficient.</span>
                        </h1>
                        <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
                            Streamline your customer relationships with our minimalist, text-driven CRM solution designed for businesses that value simplicity and efficiency.
                        </p>
                        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                            <Link 
                                to="/signup" 
                                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Get Started
                            </Link>
                            <Link 
                                to="/login" 
                                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>
                
                {/* Abstract decorative elements */}
                <div className="absolute top-24 left-1/4 w-72 h-72 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
                <div className="absolute bottom-24 right-1/4 w-72 h-72 bg-gray-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-gray-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Powerful Features, Elegant Simplicity
                        </h2>
                        <p className="mt-3 text-xl text-gray-500">
                            Focus on what matters most - your customers and campaigns.
                        </p>
                    </div>
                    <div className="mt-10">
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="pt-6">
                                <div className="rounded-lg bg-white px-6 pb-8">
                                    <div className="mt-5">
                                        <h3 className="text-lg font-medium text-gray-900">Customer Management</h3>
                                        <p className="mt-2 text-base text-gray-500">
                                            Easily organize and track customer information in a clean, minimalist interface.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6">
                                <div className="rounded-lg bg-white px-6 pb-8">
                                    <div className="mt-5">
                                        <h3 className="text-lg font-medium text-gray-900">Campaign Analytics</h3>
                                        <p className="mt-2 text-base text-gray-500">
                                            Build targeted campaigns and track their performance with intuitive analytics.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6">
                                <div className="rounded-lg bg-white px-6 pb-8">
                                    <div className="mt-5">
                                        <h3 className="text-lg font-medium text-gray-900">Communication Logs</h3>
                                        <p className="mt-2 text-base text-gray-500">
                                            Keep track of all customer interactions in one centralized, organized system.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-white py-16 md:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Ready to transform your customer relationships?
                        </h2>
                        <p className="mt-4 text-lg text-gray-500">
                            Start using Mini CRM today and experience the power of simplicity.
                        </p>
                        <div className="mt-8">
                            <Link 
                                to="/signup" 
                                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Get Started Now
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}