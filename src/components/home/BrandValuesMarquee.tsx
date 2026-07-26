import { Marquee } from '../ui/marquee';

const items = [
  'Modern Living',
  'Scandinavian Design',
  'Solid Oak',
  'Handcrafted',
  'Minimal Spaces',
  'Premium Materials',
  'Timeless Design',
  'Comfort First',
  'Natural Wood',
  'Curated Collection',
  'Interior Excellence',
  'Crafted for Living',
];
const BrandValuesMarquee = () => {
  return (
    <section className="bg-[#f0eeeb] py-5">
      <Marquee className="[--duration:30s]">
        {items.map((item) => (
          <div key={item} className="flex items-center">
            <span className="uppercase text-lg font-medium text-neutral-600">{item}</span>

            <div className="mx-10 h-1 w-1 rounded-full bg-neutral-400" />
          </div>
        ))}
      </Marquee>
    </section>
  );
};
export default BrandValuesMarquee;
