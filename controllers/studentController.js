const supabase = require('../supabaseClient');


async function add_Student(req, res) {
  const { name, age, grade } = req.body;
  const { data, error } = await supabase
    .from('students')
    .insert([{ name, age, grade }]);

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json({ message: 'Student added', data });
}


async function get_All_Students(req, res) {
  const { data, error } = await supabase.from('students').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
}

async function update_Student(req, res) {
  const { id } = req.params;
  const { name, age, grade } = req.body;
  const { data, error } = await supabase
    .from('students')
    .update({ name, age, grade })
    .eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Student updated', data });
}


async function delete_Student(req, res) {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('students')
    .delete()
    .eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Student deleted', data });
}

module.exports = {
  add_Student,
  get_All_Students,
  update_Student,
  delete_Student,
};
