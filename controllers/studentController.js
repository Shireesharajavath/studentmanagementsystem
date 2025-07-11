const supabase = require('../supabaseClient');

function get_grade(marks) {
  if (marks >= 90) return 'A';
  if (marks >= 80) return 'B';
  if (marks >= 70) return 'C';
  if (marks >= 60) return 'D';
  return 'F';
}


async function add_Student(req, res) {
  const { name, age, gender, marks } = req.body;
  const grade = get_grade(marks);

  const { data, error } = await supabase
    .from('students')
    .insert([{ name, age, gender, marks, grades: grade }])
    .select(); 

  if (error) return res.status(500).json({ error: error.message });

  if (!data || data.length === 0) {
    return res.status(500).json({ error: 'Insert succeeded, but no data returned' });
  }

  res.status(201).json({
    message: 'Student added',
    student: data[0]
  });
}


async function get_All_Students(req, res) {
  const { data, error } = await supabase
    .from('students')
    .select('*');

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json(data);
}


async function update_Student(req, res) {
  const id = req.params.id;
  const { name, age, gender, marks } = req.body;
  const grade = get_grade(marks);

  const { data: existing, error: fetchError } = await supabase
    .from('students')
    .select('*')
    .eq('id', id);

  if (fetchError || !existing || existing.length === 0) {
    return res.status(404).json({ error: 'Student not found' });
  }

  const { data, error } = await supabase
    .from('students')
    .update({ name, age, gender, marks, grades: grade })
    .eq('id', id)
    .select();

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json({
    message: 'Student updated',
    student: data[0]
  });
}

async function delete_Student(req, res) {
  const id = req.params.id;


  const { data: existing, error: fetchError } = await supabase
    .from('students')
    .select('id')
    .eq('id', id);

  if (fetchError || !existing || existing.length === 0) {
    return res.status(404).json({ error: 'Student not found' });
  }

 
  const { error } = await supabase
    .from('students')
    .delete()
    .eq('id', id);

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json({ message: 'Student deleted' });
}

module.exports = {
  add_Student,
  get_All_Students,
  update_Student,
  delete_Student
};
