const tasks = global.tasks || {};
export default function handler(req, res) {
  const { id } = req.query;
  if (!id || !(id in tasks)) {
    res.status(404).json({ error: "Task not found" });
    return;
  }
  res.json(tasks[id]);
}
