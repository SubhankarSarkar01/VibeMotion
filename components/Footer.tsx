import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12 md:py-24">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-1">
                    <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-500 mb-4">Nano Banana</h3>
                    <p className="text-gray-400 text-sm">
                        The future of beverage is here. <br />
                        Cold pressed. Tech enabled. <br />
                        Flavor obsessed.
                    </p>
                </div>

                <div>
                    <h4 className="font-bold mb-4 text-lg">Shop</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li className="hover:text-white cursor-pointer">All Flavors</li>
                        <li className="hover:text-white cursor-pointer">Variety Pack</li>
                        <li className="hover:text-white cursor-pointer">Subscription</li>
                        <li className="hover:text-white cursor-pointer">Gift Cards</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-4 text-lg">Company</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li className="hover:text-white cursor-pointer">About Us</li>
                        <li className="hover:text-white cursor-pointer">Sustainability</li>
                        <li className="hover:text-white cursor-pointer">Careers</li>
                        <li className="hover:text-white cursor-pointer">Contact</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-4 text-lg">Stay Fresh</h4>
                    <div className="flex gap-2">
                        <input type="email" placeholder="Email address" className="bg-gray-800 border-none rounded px-4 py-2 w-full focus:ring-2 focus:ring-orange-500 text-white" />
                        <button className="bg-orange-500 text-white px-4 py-2 rounded font-medium hover:bg-orange-600 transition-colors">Join</button>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} Nano Banana. All rights reserved.
            </div>
        </footer>
    );
}
