let reports = global.reports || [];
let tasks = global.tasks || {};
let id_counter = global.id_counter || 1;

const department_map = {
  'pothole': 'Public Works',
  'street light': 'Electrical',
  'water supply': 'Water Department',
  'garbage': 'Sanitation',
  'traffic signal': 'Traffic Control',
  'default': 'General Services'
};

function assignDepartment(category, location) {
  category = (category || '').toLowerCase();
  for (const key in department_map) {
    if (category.includes(key)) return department_map[key];
  }
  location = (location || '').toLowerCase();
  if (location.includes('downtown')) return 'City Center Services';
  return department_map["default"];
}

// Handler
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({error: 'Method not allowed'});
    return;
  }
  const {
    title = '',
    category = '',
    priority = '',
    location = '',
    description = '',
    photo = null
  } = req.body;

  if (!title || !category || !priority || !location || !description) {
    res.status(400).json({ error: 'Missing required field' });
    return;
  }

  // Validate photo base64 size if needed
  if (photo && Buffer.byteLength(photo, 'base64') > 5 * 1024 * 1024) {
    res.status(400).json({error: 'Photo too large (max 5 MB)'});
    return;
  }
  const now = new Date().toISOString();
  const report = {
    id: id_counter,
    title, category, priority, location, description,
    photo,
    status: "Submitted",
    assigned_department: assignDepartment(category, location),
    created_at: now,
    updated_at: now
  };

  reports.push(report);
  tasks[report.id] = {
    assigned_to: report.assigned_department,
    status: report.status,
    last_updated: report.updated_at
  };

  id_counter += 1;
  // Persist globals (vercel serverless resets state each run)
  global.reports = reports;
  global.tasks = tasks;
  global.id_counter = id_counter;

  res.status(201).json(report);
}
