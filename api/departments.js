const department_map = {
  'pothole': 'Public Works',
  'street light': 'Electrical',
  'water supply': 'Water Department',
  'garbage': 'Sanitation',
  'traffic signal': 'Traffic Control',
  'default': 'General Services'
};
export default function handler(req, res) {
  res.json(Array.from(new Set(Object.values(department_map))));
}
    history: [{ status: report.status, timestamp: now }];
  id_counter += 1;
  res.status(201).json(report);