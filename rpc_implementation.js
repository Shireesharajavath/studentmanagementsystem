import supabase from './supabaseClient.js';

function _getGrade(marks) {
  if (marks >= 90) return 'A+';
  if (marks >= 80) return 'A';
  if (marks >= 70) return 'B';
  if (marks >= 60) return 'C';
  return 'D';
}

async function _getStudentByName(name) {
  const { data, error } = await supabase.from('students').select('*').eq('name', name);
  if (error) throw new Error(`Error fetching student by name: ${error.message}`);
  return data.length > 0;
}

async function getAllStudents() {
  const { data, error } = await supabase.from('students').select('*').order('id', { ascending: true });
  if (error) throw new Error(`Error fetching students: ${error.message}`);
  return { data };
}

async function addStudent(args) {
  const { name, age, gender, marks } = args;
  const studentExists = await _getStudentByName(name);
  if (studentExists) throw new Error(`Student with name "${name}" already exists`);
  const grades = _getGrade(marks);
  const { data, error } = await supabase.from('students').insert([{ name, age, gender, marks, grades }]);
  if (error) throw new Error(`Insert failed: ${error.message}`);
  return { data };
}

async function updateStudent(args) {
  const { id, name, age, gender, marks } = args;
  const grades = _getGrade(marks);
  const { data, error } = await supabase.from('students').update({ name, age, gender, marks, grades }).eq('id', id);
  if (error) throw new Error(`Update failed: ${error.message}`);
  return { data };
}

async function deleteStudent(args) {
  const { id } = args;
  const { data, error } = await supabase.from('students').delete().eq('id', id);
  if (error) throw new Error(`Delete failed: ${error.message}`);
  return { data };
}

export {
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent
};
