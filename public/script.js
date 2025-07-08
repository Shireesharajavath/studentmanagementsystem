function getFormData() {
  return {
    name: document.getElementById('name').value,
    age: Number(document.getElementById('age').value),
    gender: document.getElementById('gender').value,
    marks: Number(document.getElementById('marks').value),
  };
}

async function getStudent(id) {
  const res = await fetch('/students');
  const students = await res.json();
  return students.find(s => s.id == id);
}

async function addStudent(student) {
  await fetch('/add-student', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(student),
  });
}

async function updateStudent(id, student) {
  await fetch(`/update-student/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(student),
  });
}

async function deleteStudent(id) {
  await fetch(`/delete-student/${id}`, { method: 'DELETE' });
}
