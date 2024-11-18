import React from "react";

const Contact = () => {
  return (
    <div className="bg-gray-950 text-gray-100 ">
      <div className="container mx-auto  py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-cyan-400 mb-8 text-center my-5">
          Contact Us
        </h1>

        <div className="max-w-lg mx-auto bg-gray-900 p-6 rounded-lg shadow-2xl border border-cyan-400">
          <form className="grid grid-cols-1 gap-y-6">
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-cyan-300"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                placeholder="Your Name"
                className="mt-2 p-3 block w-full bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
              />
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-cyan-300"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Your Email Address"
                className="mt-2 p-3 block w-full bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
              />
            </div>

            {/* Message Input */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-cyan-300"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                required
                placeholder="Your Message"
                className="mt-2 p-3 block w-full bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-500 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400"
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
