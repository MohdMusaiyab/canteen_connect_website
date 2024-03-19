// Footer.js
import React from 'react';

function Footer() {
    return (
        <footer className="bg-yellow-400 py-8">
            <div className="container mx-auto">
                {/* Grid layout for footer sections */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Contact Information */}
                    <div className="text-white">
                        <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
                        <p>Email: info@fooddeliveryapp.com</p>
                        <p>Phone: +1 (123) 456-7890</p>
                        <p>Address: 123 Main Street, City, Country</p>
                    </div>

                    {/* Quick Links */}
                    <div className="text-white">
                        <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
                        <ul>
                            <li><a href="#" className="hover:text-yellow-100">Home</a></li>
                            <li><a href="#" className="hover:text-yellow-100">Menu</a></li>
                            <li><a href="#" className="hover:text-yellow-100">About</a></li>
                            <li><a href="#" className="hover:text-yellow-100">Contact</a></li>
                        </ul>
                    </div>

                    {/* Newsletter Subscription */}
                    <div className="text-white">
                        <h2 className="text-lg font-semibold mb-4">Subscribe to Our Newsletter</h2>
                        <form>
                            <input type="email" placeholder="Your Email Address" className="bg-white border-2 border-gray-300 px-4 py-2 rounded-lg mb-2" />
                            <button type="submit" className="bg-white text-yellow-400 px-4 py-2 rounded-lg hover:bg-yellow-100 hover:text-white">Subscribe</button>
                        </form>
                    </div>
                </div>

                {/* Secondary Contact Details */}
                <div className="text-center text-white mt-8">
                    <p>Follow us on social media:</p>
                    <div className="flex justify-center mt-4">
                        <a href="#" className="hover:text-yellow-100 mx-2">
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                {/* Add your SVG icon for social media */}
                            </svg>
                        </a>
                        {/* Add more social media icons as needed */}
                    </div>
                    <p className="mt-4">© 2024 FoodDeliveryApp. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
