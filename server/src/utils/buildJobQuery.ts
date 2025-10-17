export function buildJobQuery(status?: string, searchQuery?: string, sort?: string, order?: string, userId?: number) {
  let baseQuery = `SELECT jobs.*, job_ai_insights.content AS ai_insight
                   FROM jobs
                   LEFT JOIN job_ai_insights
                   ON jobs.id = job_ai_insights.job_id`;

  const conditions: string[] = [];
  const values: (string | number)[] = [];

  if (userId) {
    values.push(userId);
    conditions.push(`user_id = $${values.length}`);
  }

  if (status && status !== 'all') {
    values.push(status);
    conditions.push(`status = $${values.length}`);
  }

  if (searchQuery) {
    values.push(`%${searchQuery}%`);
    conditions.push(`(company ILIKE $${values.length} OR position ILIKE $${values.length})`);
  }

  if (conditions.length > 0) {
    baseQuery += ' WHERE ' + conditions.join(' AND ');
  }

  // Safe ORDER BY
  const allowedSortFields = ['company', 'position', 'salary', 'applied_date'];
  const allowedOrder = ['asc', 'desc'];

  const sortField = allowedSortFields.includes(sort || '') ? sort : 'applied_date';
  const sortOrder = allowedOrder.includes((order || '').toLowerCase()) ? order!.toUpperCase() : 'DESC';

   // Safe sorting
  if (sortField === 'salary') {
    // Convert to numeric, empty/invalid strings become NULL, NULLS LAST
    baseQuery += ` ORDER BY CAST(NULLIF(REGEXP_REPLACE(salary, '[^0-9.]', '', 'g'), '') AS NUMERIC) ${sortOrder} NULLS LAST`;
  } else if (sortField) {
    baseQuery += ` ORDER BY ${sortField} ${sortOrder}`;
  } else {
    baseQuery += ` ORDER BY applied_date DESC`; // default sorting
  }

  return { baseQuery, values };
}
