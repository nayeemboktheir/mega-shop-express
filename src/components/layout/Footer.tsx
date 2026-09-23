import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => (
  <footer className="bg-[#171726] text-white">
    <div className="container mx-auto px-4 py-12 lg:py-16">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-3" aria-label="TRIMATRIK home">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-orange-400 text-lg font-bold">T</span>
            <span className="text-2xl font-bold tracking-wide">TRIMATRIK</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-gray-400">Curated women&apos;s fashion with thoughtful details, confident style, and a collection made for every day.</p>
        </div>
        <div>
          <h2 className="mb-4 text-base font-semibold">Quick links</h2>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link to="/products" className="hover:text-pink-400">All products</Link></li>
            <li><Link to="/products?category=two-piece" className="hover:text-pink-400">Two-piece collection</Link></li>
            <li><Link to="/products?category=three-piece" className="hover:text-pink-400">Three-piece collection</Link></li>
            <li><Link to="/about" className="hover:text-pink-400">About TRIMATRIK</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="mb-4 text-base font-semibold">Help</h2>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link to="/contact" className="hover:text-pink-400">Contact</Link></li>
            <li><Link to="/shipping-policy" className="hover:text-pink-400">Shipping Policy</Link></li>
            <li><Link to="/return-policy" className="hover:text-pink-400">Return Policy</Link></li>
            <li><Link to="/faq" className="hover:text-pink-400">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="mb-4 text-base font-semibold">Contact</h2>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-center gap-3"><Phone className="h-4 w-4 shrink-0 text-pink-400" /><a href="tel:+8801995909243" className="hover:text-pink-400">+880 1995-909243</a></li>
            <li className="flex items-center gap-3"><Mail className="h-4 w-4 shrink-0 text-pink-400" /><a href="https://www.facebook.com/messages/t/282687191604098/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">Facebook Inbox</a></li>
            <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-pink-400" /><a href="https://www.google.com/maps/search/?api=1&query=Mirpur-13%2C+Dhaka-1216%2C+Bangladesh" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">Mirpur-13, Dhaka-1216, Bangladesh</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="border-t border-white/10 px-4 py-5 text-center text-sm text-gray-500">© {new Date().getFullYear()} TRIMATRIK. All rights reserved.</div>
  </footer>
);

export default Footer;
