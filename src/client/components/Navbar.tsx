import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const baseLink =
    'block px-3 py-2 text-sm font-semibold text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition';
  const activeLink = 'text-white font-extrabold bg-white/10';

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `${baseLink} ${isActive ? activeLink : ''}`;

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-blue-950 text-white shadow border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between py-3">
          {/* Logo / Brand */}
          <NavLink
            to="/"
            className="flex items-center gap-3"
            onClick={closeMenu}
          >
            <div className="h-9 w-9 rounded-xl bg-white/15" />
            <div>
              <div className="font-extrabold leading-tight">
                Mechanical Specialties LLC
              </div>
              <div className="text-xs text-white/80">
                Electrical Contracting & Mechanical Services
              </div>
            </div>
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/about" className={linkClass}>
              About MSEC
            </NavLink>
            <NavLink to="/service-work" className={linkClass}>
              Service Work
            </NavLink>
            <NavLink to="/new-construction" className={linkClass}>
              New Construction
            </NavLink>
            <NavLink to="/service-area" className={linkClass}>
              Service Area
            </NavLink>
            <NavLink to="/contact" className={linkClass}>
              Contact
            </NavLink>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-xl p-2 hover:bg-white/10 transition"
            aria-label="Open menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {/* Icon */}
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {isOpen ? (
                <>
                  <path d="M18 6 6 18" />
                  <path d="M6 6l12 12" />
                </>
              ) : (
                <>
                  <path d="M4 6h16" />
                  <path d="M4 12h16" />
                  <path d="M4 18h16" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile dropdown */}
        {isOpen && (
          <nav className="md:hidden pb-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-2">
              <NavLink to="/" className={linkClass} onClick={closeMenu}>
                Home
              </NavLink>
              <NavLink to="/about" className={linkClass} onClick={closeMenu}>
                About MSEC
              </NavLink>
              <NavLink
                to="/service-work"
                className={linkClass}
                onClick={closeMenu}
              >
                Service Work
              </NavLink>
              <NavLink
                to="/new-construction"
                className={linkClass}
                onClick={closeMenu}
              >
                New Construction
              </NavLink>
              <NavLink
                to="/service-area"
                className={linkClass}
                onClick={closeMenu}
              >
                Service Area
              </NavLink>
              <NavLink to="/contact" className={linkClass} onClick={closeMenu}>
                Contact
              </NavLink>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
