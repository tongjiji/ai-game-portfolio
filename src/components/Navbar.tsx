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
    { path: '/portfolio', label: 'AI视频Demo' },
    { path: '/about', label: '关于我' },
  ];

  const isDarkPage = location.pathname === '/';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-tech-dark/90 backdrop-blur-md' : isDarkPage ? 'bg-transparent' : 'bg-tech-dark'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="font-medium text-sm tracking-tight text-tech-blue text-glow-blue">
            童基芽 / JIYA TONG — Portfolio
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm tracking-wide transition-all duration-300 ${location.pathname === item.path ? 'text-tech-blue text-glow-blue' : 'text-white/70 hover:text-white hover:text-glow-blue'}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button
            className="md:hidden p-2 text-white hover:text-tech-blue transition-colors duration-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 py-4 space-y-3 bg-tech-dark/95 backdrop-blur-md">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block py-2 text-sm tracking-wide transition-all duration-300 ${location.pathname === item.path ? 'text-tech-blue text-glow-blue' : 'text-white/70 hover:text-white'}`}
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
