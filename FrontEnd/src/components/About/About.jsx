import React from 'react'

export default function About() {
  return (
      <div className="py-16 bg-white">
          <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
              <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                  <div className="md:5/12 lg:w-5/12">
                      <img
                          src="https://tailus.io/sources/blocks/left-image/preview/images/startup.png"
                          alt="image"
                      />
                  </div>
                  <div className="md:7/12 lg:w-6/12">
                      <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
                      Mini CRM: Streamlining Your Business Relationships
                      </h2>
                      <p className="mt-6 text-gray-600">
                      Mini CRM offers a simplified yet powerful solution for managing your customer relationships effortlessly. Seamlessly organize contacts, track interactions, and nurture leads with ease. Maximize efficiency and elevate customer satisfaction with our intuitive interface designed to simplify complex workflows. Revolutionize your business relationships today with Mini CRM .
                      </p>
                      <p className="mt-4 text-gray-600">
                      Streamline your business relationships efficiently with Mini CRM . Elevate customer satisfaction effortlessly. Upgrade today for streamlined success.
                      </p>
                  </div>
              </div>
          </div>
      </div>
  );
}