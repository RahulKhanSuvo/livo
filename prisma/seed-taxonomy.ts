import prisma from '@/lib/prisma';
import { navCategories } from '@/components/common/navbar/navbar.data';

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function toTitleCase(value: string): string {
  return value.toLowerCase().replace(/\b\w/g, (ch) => ch.toUpperCase());
}

function itemTitleFromHref(href: string): string {
  return (
    href
      .split('/')
      .filter(Boolean)
      .pop()
      ?.split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ') ?? ''
  );
}

export async function seedTaxonomy() {
  for (const nav of navCategories) {
    if (nav.type === 'link') continue;

    const category = await prisma.category.upsert({
      where: { slug: nav.id },
      update: { name: nav.title },
      create: { name: nav.title, slug: nav.id },
    });

    if (nav.type === 'megamenu') {
      for (const [columnIndex, column] of (nav.columns ?? []).entries()) {
        const subName = column.header ?? toTitleCase(nav.title);
        const subSlug = column.header
          ? `${nav.id}-${slugify(column.header)}`
          : `${nav.id}-${columnIndex}`;

        const subcategory = await prisma.subCategory.upsert({
          where: { slug: subSlug },
          update: { name: subName, categoryId: category.id },
          create: { name: subName, slug: subSlug, categoryId: category.id },
        });

        for (const item of column.items) {
          await prisma.productType.upsert({
            where: { slug: `${subSlug}-${slugify(item.title)}` },
            update: { name: item.title, subCategoryId: subcategory.id },
            create: {
              name: item.title,
              slug: `${subSlug}-${slugify(item.title)}`,
              subCategoryId: subcategory.id,
            },
          });
        }
      }
    }

    if (nav.type === 'dropdown') {
      const subcategory = await prisma.subCategory.upsert({
        where: { slug: `${nav.id}-featured` },
        update: { name: toTitleCase(nav.title), categoryId: category.id },
        create: {
          name: toTitleCase(nav.title),
          slug: `${nav.id}-featured`,
          categoryId: category.id,
        },
      });

      for (const item of nav.dropdownItems ?? []) {
        const name = item.title || itemTitleFromHref(item.href);
        await prisma.productType.upsert({
          where: { slug: `${subcategory.slug}-${slugify(name)}` },
          update: { name, subCategoryId: subcategory.id },
          create: {
            name,
            slug: `${subcategory.slug}-${slugify(name)}`,
            subCategoryId: subcategory.id,
          },
        });
      }
    }
  }

  const [categories, subcategories, productTypes] = await Promise.all([
    prisma.category.count(),
    prisma.subCategory.count(),
    prisma.productType.count(),
  ]);

  console.log(
    `✅ Taxonomy seeded — ${categories} categories, ${subcategories} subcategories, ${productTypes} product types`
  );
}
