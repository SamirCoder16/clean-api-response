export function buildPaginationMeta(page, limit, total) {
  return {
    pagination: {
      page: page,
      limit: limit,
      total: total,
      totalPages: Math.ceil(total / limit),
    },
  };
}
