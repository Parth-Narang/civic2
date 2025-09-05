const reports = global.reports || [];
export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({error: 'Method not allowed'});
    return;
  }
  const { status, category, priority, location_contains } = req.query;
  let filtered = [...reports];
  if (status) filtered = filtered.filter(r => r.status && r.status.toLowerCase() === status.toLowerCase());
  if (category) filtered = filtered.filter(r => r.category && r.category.toLowerCase() === category.toLowerCase());
  if (priority) filtered = filtered.filter(r => r.priority && r.priority.toLowerCase() === priority.toLowerCase());
  if (location_contains) filtered = filtered.filter(r => r.location && r.location.toLowerCase().includes(location_contains.toLowerCase()));
  res.json(filtered);
}
