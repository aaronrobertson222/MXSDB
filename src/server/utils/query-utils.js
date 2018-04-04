module.exports = {
  getQueryParams(queryString) {
    const include = queryString.category ? queryString.category.split(',') : ['bike', 'gear', 'track'];
    const limit = queryString.limit ? queryString.limit : 12;
    const offset = queryString.offset ? queryString.offset : null;
    let order = [['createdAt', 'DESC']];
    if (queryString.by && queryString.by === 'popular') {
      order = [['downloadCount', 'DESC']];
    }

    const query = {
      limit,
      offset,
      order,
      where: {
        category: include
      }
    };

    if (queryString.users) {
      const users = queryString.users.split(',');
      query.where.creator = users;
    }

    return query;
  }
};
