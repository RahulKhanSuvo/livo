export class QueryBuilder<TWhere extends object, TOrderBy extends object, TInclude extends object> {
  private where: TWhere = {} as TWhere;
  private orderBy: TOrderBy[] = [];
  private includeRelations: TInclude = {} as TInclude;

  private skip = 0;
  private take = 10;

  filter<K extends keyof TWhere>(field: K, value: TWhere[K]) {
    if (value === undefined || value === null || value === '') {
      return this;
    }

    this.where[field] = value;

    return this;
  }

  search(fields: string[], searchTerm?: string) {
    const term = searchTerm?.trim();

    if (!term) {
      return this;
    }

    (this.where as Record<string, unknown>).OR = fields.map((field) => ({
      [field]: {
        contains: term,
        mode: 'insensitive',
      },
    }));

    return this;
  }

  sort(field: string, order: 'asc' | 'desc' = 'desc') {
    if (!field) {
      return this;
    }

    this.orderBy.push({
      [field]: order,
    } as TOrderBy);

    return this;
  }

  include<K extends keyof TInclude>(relation: K, options: TInclude[K] = true as TInclude[K]) {
    this.includeRelations[relation] = options;

    return this;
  }

  paginate(page?: string | number, limit?: string | number) {
    const validPage = Math.max(1, Number(page) || 1);

    const validLimit = Math.max(1, Number(limit) || 10);

    this.skip = (validPage - 1) * validLimit;

    this.take = validLimit;

    return this;
  }

  build() {
    return {
      where: this.where,

      orderBy: this.orderBy.length > 0 ? this.orderBy : undefined,

      include: Object.keys(this.includeRelations).length > 0 ? this.includeRelations : undefined,

      skip: this.skip,
      take: this.take,
    };
  }
}
