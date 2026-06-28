import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: '首页' },
    { path: '/portfolio', label: '作品合集' },
    { path: '/about', label: '关于我' },
  ];

  const isDarkPage = location.pathname === '/';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : isDarkPage ? 'bg-transparent' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className={`font-medium text-sm tracking-tight transition-colors duration-300 ${
            scrolled || !isDarkPage ? 'text-apple-black' : 'text-white'
          }`}>
            AI视频创作
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm tracking-wide transition-colors duration-300 ${
                  scrolled || !isDarkPage
                    ? location.pathname === item.path ? 'text-apple-blue' : 'text-apple-gray hover:text-apple-black'
                    : location.pathname === item.path ? 'text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button
            className={`md:hidden p-2 transition-colors duration-300 ${
              scrolled || !isDarkPage ? 'text-apple-black' : 'text-white'
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className={`md:hidden transition-all duration-300 overflow-hidden ${
        isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className={`px-6 py-4 space-y-3 ${scrolled || !isDarkPage ? 'bg-white' : 'bg-apple-black/95 backdrop-blur-md'}`}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block py-2 text-sm tracking-wide transition-colors duration-300 ${
                scrolled || !isDarkPage
                  ? location.pathname === item.path ? 'text-apple-blue' : 'text-apple-gray hover:text-apple-black'
                  : location.pathname === item.path ? 'text-white' : 'text-white/70 hover:text-white'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
