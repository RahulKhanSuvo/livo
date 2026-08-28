export class QueryBuilder<
  TArgs extends {
    where?: Record<string, unknown>;
    orderBy?: unknown;
    include?: Record<string, unknown> | null;
    skip?: number;
    take?: number;
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  TInclude = {},
> {
  private where: NonNullable<TArgs['where']> = {} as NonNullable<TArgs['where']>;

  private orderBy: TArgs['orderBy'] = [] as TArgs['orderBy'];

  private includeRelations: TInclude = {} as TInclude;

  private skip = 0;

  private take = 10;

  filter<K extends keyof NonNullable<TArgs['where']>>(
    field: K,
    value: NonNullable<TArgs['where']>[K]
  ): this {
    if (value === undefined || value === null || value === '') {
      return this;
    }

    (this.where as Record<string, unknown>)[field as string] = value;

    return this;
  }

  search(fields: string[], searchTerm?: string): this {
    const term = searchTerm?.trim();

    if (!term) {
      return this;
    }

    const validFields = fields.filter((field) => field.trim().length > 0);

    if (validFields.length === 0) {
      return this;
    }

    (this.where as Record<string, unknown>).OR = validFields.map((field) => ({
      [field]: {
        contains: term,
        mode: 'insensitive',
      },
    }));

    return this;
  }

  sort(field: string, order: 'asc' | 'desc' = 'desc'): this {
    (this.orderBy as unknown as Record<string, unknown>[]).push({
      [field]: order,
    });

    return this;
  }

  include<K extends keyof NonNullable<TArgs['include']>, TOptions = undefined>(
    relation: K,
    options?: TOptions
  ): QueryBuilder<
    TArgs,
    TInclude & {
      [P in K]: [TOptions] extends [undefined] ? true : TOptions;
    }
  > {
    (this.includeRelations as Record<string, unknown>)[relation as string] = options ?? true;

    return this as unknown as QueryBuilder<
      TArgs,
      TInclude & {
        [P in K]: [TOptions] extends [undefined] ? true : TOptions;
      }
    >;
  }

  paginate(page?: string | number, limit?: string | number): this {
    const validPage = Math.max(1, Number(page) || 1);

    const validLimit = Math.max(1, Number(limit) || 10);

    this.skip = (validPage - 1) * validLimit;

    this.take = validLimit;

    return this;
  }

  build(): Omit<TArgs, 'include'> & { include: TInclude } {
    return {
      where: this.where,
      orderBy: this.orderBy,
      include: this.includeRelations,
      skip: this.skip,
      take: this.take,
    } as Omit<TArgs, 'include'> & { include: TInclude };
  }
}
