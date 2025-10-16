export function buildJobQuery(status?: string, searchQuery?: string, userId?: number) {
  let baseQuery = `SELECT jobs.*, job_ai_insights.content AS ai_insight
                  FROM jobs
                  LEFT JOIN job_ai_insights
                  ON jobs.id = job_ai_insights.job_id`;
  const conditions: string[] = [];
  const values: (string | number | null)[] = [];

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

  if (conditions.length > 0) baseQuery += ' WHERE ' + conditions.join(' AND ');
  baseQuery += ' ORDER BY applied_date DESC';

  return { baseQuery, values };
}