import { ObjectLiteral, Repository } from 'typeorm';

export type Query = {
  limit?: number;
  page?: number;
};

export async function paginate<T extends ObjectLiteral>(repository: Repository<T>, query?: Query) {
  const queryBuilder = repository.createQueryBuilder();

  const limit = query?.limit ?? 20;

  queryBuilder.limit(limit);

  if (query?.page) {
    const skip = query.page * (query?.limit ?? 0);

    queryBuilder.skip(skip);
  }

  const [entities, count] = await queryBuilder.getManyAndCount();

  return {
    data: entities,
    meta: {
      itemsPerPage: +(query?.limit ?? 20),
      currentPage: +(query?.page ?? 1),
      totalPages: Math.floor(count / limit),
    },
  };
}
