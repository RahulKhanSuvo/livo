export default function SpotProductTitle() {
  return (
    <section className="flex flex-col items-center justify-center px-6 py-16 text-center">
      {/* Subheading / Category Tag */}
      <span className="text-xs  uppercase font-medium text-gray-700 mb-4">
        Roche Bobois Heritage
      </span>

      {/* Main Title */}
      <h1 className="text-4xl font-medium mb-6 sm:text-6xl lg:text-7xl">BUBBLE CURVE</h1>

      {/* Description */}
      <p className="max-w-xl text-lg sm:text-xl font-light leading-relaxed text-gray-800">
        Designed by Sacha Lakic, this award-winning icon of contemporary design balances innovation
        and emotion through its organic, handcrafted mineral forms.
      </p>
    </section>
  );
}
