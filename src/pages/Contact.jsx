import React from "react";

const Contact = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-semibold text-yellow-400 mb-8 text-center">
          Contact Us
        </h1>
        <div className="max-w-md mx-auto">
          <form className="grid grid-cols-1 gap-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="mt-1 p-2 block w-full border-gray-300 rounded-md"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="mt-1 p-2 block w-full border-gray-300 rounded-md"
                placeholder="Your Email Address"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="mt-1 p-2 block w-full border-gray-300 rounded-md"
                placeholder="Your Message"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
