"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { id: "home", label: "Home", href: "#home" },
  { id: "features", label: "Features", href: "#features" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
      // Section highlight logic
      const offsets = navLinks.map(link => {
        const el = document.querySelector(link.href);
        return el ? el.getBoundingClientRect().top + window.scrollY : 0;
      });
      const scrollPos = window.scrollY + 80;
      for (let i = offsets.length - 1; i >= 0; i--) {
        if (scrollPos >= offsets[i]) {
          setActive(navLinks[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "backdrop-blur-lg bg-[#0a0a0ad9] shadow-premium" : "bg-transparent"
      }`}
      style={{ WebkitBackdropFilter: "blur(18px)" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <Link href="#home" className="flex items-center gap-2 group">
          <span className="text-2xl font-black neon-text tracking-tight">Σ</span>
          <span className="font-bold text-lg tracking-tight text-white group-hover:neon-text transition">EngineerOS</span>
        </Link>
        <ul className="hidden md:flex gap-2 lg:gap-4 items-center">
          {navLinks.map(link => (
            <li key={link.id}>
              <a
                href={link.href}
                className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 relative
                  ${active === link.id ? "neon-text bg-[#23233b]/60 shadow-lg" : "text-gray-300 hover:text-white hover:bg-[#18181b]/80"}
                `}
                style={{
                  boxShadow: active === link.id ? "0 0 12px #00eaff99, 0 0 2px #7f5af0" : undefined,
                }}
              >
                {link.label}
                {active === link.id && (
                  <span className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-2 h-2 bg-gradient-to-br from-[#7f5af0] to-[#00eaff] rounded-full animate-pulse" />
                )}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="glow-btn text-sm ml-4 hidden md:inline-block">Get Started</a>
      </div>
    </nav>
  );
}
