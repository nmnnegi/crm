import React from 'react'

export default function About() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="space-y-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              About Mini<span className="text-blue-600">CRM</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A minimalist approach to customer relationship management
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Streamlining Your Business Relationships
              </h2>
              <p className="text-gray-600 mb-4">
                Mini CRM offers a simplified yet powerful solution for managing your customer relationships effortlessly. 
                Seamlessly organize contacts, track interactions, and nurture leads with ease.
              </p>
              <p className="text-gray-600">
                Maximize efficiency and elevate customer satisfaction with our intuitive interface 
                designed to simplify complex workflows. Revolutionize your business relationships 
                today with Mini CRM.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Philosophy</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span className="text-gray-600">Focus on simplicity and efficiency</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span className="text-gray-600">Minimalist design for reduced cognitive load</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span className="text-gray-600">Powerful core features with no bloat</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span className="text-gray-600">Text-driven interface for clarity and speed</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span className="text-gray-600">Focus on what matters: your customers</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-16 bg-gray-50 p-8 rounded-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Management</h3>
                <p className="text-gray-600">
                  Organize customer information with intuitive tools for tracking essential data and history.
                </p>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Campaign Analytics</h3>
                <p className="text-gray-600">
                  Create and track marketing campaigns with simple, effective analytics dashboards.
                </p>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Communication Logs</h3>
                <p className="text-gray-600">
                  Maintain detailed records of all customer interactions in a centralized system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 