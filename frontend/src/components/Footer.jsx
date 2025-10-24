// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 pb-6 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* ---- Brand / About Section ---- */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">EcomStore</h2>
          <p className="text-sm leading-relaxed">
            Your one-stop destination for all your shopping needs. Explore top
            quality products with amazing offers and fast delivery.
          </p>
        </div>

        {/* ---- Quick Links ---- */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-blue-500">Home</Link></li>
            <li><Link to="/" className="hover:text-blue-500">About Us</Link></li>
            <li><Link to="/" className="hover:text-blue-500">Products</Link></li>
            <li><Link to="/" className="hover:text-blue-500">Contact</Link></li>
            <li><Link to="/" className="hover:text-blue-500">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* ---- Contact Info ---- */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <MapPin size={18} className="text-blue-500" />
              <span>Bangalore, India</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} className="text-blue-500" />
              <span>+91 7218798712</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={18} className="text-blue-500" />
              <span>info@ecomstore.com</span>
            </li>
          </ul>
        </div>

        {/* ---- Social Media ---- */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-blue-500"><Facebook size={20} /></a>
            <a href="#" className="hover:text-blue-500"><Instagram size={20} /></a>
            <a href="#" className="hover:text-blue-500"><Twitter size={20} /></a>
            <a href="#" className="hover:text-blue-500"><Linkedin size={20} /></a>
          </div>
        </div>
      </div>

      {/* ---- Bottom Copyright ---- */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        © {new Date().getFullYear()} EcomStore. All rights reserved. | Designed by <span className="text-blue-500">Chetan Vastrad</span>
      </div>
    </footer>
  );
};

export default Footer;
