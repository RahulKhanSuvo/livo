import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function SpotDataGrid() {
  const cards = [
    {
      title: 'Precise Contouring',
      description:
        'Stretch-fabrics engineered to follow the complex, rounded volumes without a single fold or wrinkle.',
      image:
        'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80',
      alt: 'Close-up fabric texture',
    },
    {
      title: 'Deep Immersion',
      description:
        'A revolutionary multi-density foam core that adapts to your body, providing a cocoon-like feeling.',
      image:
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
      alt: 'Modern interior living space',
    },
    {
      title: 'Master of Curves',
      description:
        'He replaced rigid forms with organic freedom, believing furniture should fit people, not spaces.',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      alt: 'Designer profile portrait',
    },
  ];

  return (
    <section className="py-12 md:py-20">
      <div className="relative z-10 mx-auto max-w-350 px-4">
        {/* Responsive Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:mb-12 lg:grid-cols-3">
          {cards.map((card, index) => (
            <div key={index} className="flex flex-col overflow-hidden">
              <div className="relative h-56 overflow-hidden sm:h-72 lg:h-96">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between bg-white/40 p-6 md:p-8">
                <div>
                  <h3 className="mb-4 text-xl font-medium text-gray-900">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button className="py-6">Discover collection</Button>
        </div>
      </div>
    </section>
  );
}
