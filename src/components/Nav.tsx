export function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-black">
      <div className="flex items-center justify-between px-6 py-5 md:px-10">
        <a
          href="#about"
          className="font-body text-xs md:text-sm uppercase tracking-[0.15em] hover:opacity-60 transition-opacity"
        >
          About
        </a>
        <a
          href="#directions"
          className="font-body text-xs md:text-sm uppercase tracking-[0.15em] hover:opacity-60 transition-opacity"
        >
          Directions
        </a>
      </div>
    </nav>
  );
}
