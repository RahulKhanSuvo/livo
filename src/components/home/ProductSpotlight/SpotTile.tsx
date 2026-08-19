export default function SpotProductTitle() {
  return (
    <section className="flex flex-col items-center justify-center px-6 py-16 text-center text-[#1C1C1C]">
      {/* Subheading / Category Tag */}
      <span className="text-xs tracking-[0.25em] uppercase font-medium text-gray-700 mb-4">
        The Palace Heritage
      </span>

      {/* Main Title */}
      <h1 className="text-6xl sm:text-7xl font-normal tracking-tight mb-6">Pumpkin Sofa</h1>

      {/* Description */}
      <p className="max-w-xl text-lg sm:text-xl font-light leading-relaxed text-gray-800">
        An icon of 1970s revolutionary design, originally created for the private apartments of the
        Elysée Palace.
      </p>
    </section>
  );
}
