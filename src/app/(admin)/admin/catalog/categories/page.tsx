import { TaxonomyExplorer } from '@/components/admin/catalog/taxonomy';
import { TaxonomyLevel } from '@/lib/enums';

export default function CategoriesRoute() {
  return <TaxonomyExplorer focus={TaxonomyLevel.CATEGORY} />;
}
