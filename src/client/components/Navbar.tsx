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
    <header className="sticky top-0 z-50 border-b border-blue-700 bg-blue-600 shadow-sm">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between py-3">
          {/* Logo / Brand */}
          <NavLink
            to="/"
            className="flex items-center gap-3"
            onClick={closeMenu}
          >
            <div className="h-9 w-9 rounded-xl bg-slate-100 border border-slate-200" />
            <div>
              <div className="font-extrabold leading-tight tracking-tight text-white">
                Mechanical Specialties LLC
              </div>
              <div className="text-xs text-blue-200">
                Electrical Contracting & Mechanical Services
              </div>
            </div>
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
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
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl p-2 text-white/70 transition hover:bg-blue-700 hover:text-white md:hidden"
            aria-label="Open menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <svg
              className="h-5 w-5"
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
          <nav className="pb-3 md:hidden">
            <div className="rounded-2xl border border-blue-500 bg-blue-700 p-2">
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
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
