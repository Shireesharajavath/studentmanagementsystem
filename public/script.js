let editingId = null;


document.getElementById('studentForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const student = {
    name: document.getElementById('name').value,
    age: Number(document.getElementById('age').value),
    gender: document.getElementById('gender').value,
    marks: Number(document.getElementById('marks').value),
  };

  if (editingId) {
   
    const res = await fetch(`/update-student/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    });
    const result = await res.json();
    alert(result.message);
    editingId = null;
    document.querySelector('button[type="submit"]').textContent = 'Add Student';
  } else {
   
    const res = await fetch('/add-student', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    });
    const result = await res.json();
    alert(result.message);
  }

  document.getElementById('studentForm').reset();
  fetchStudents();
});


async function fetchStudents() {
  const res = await fetch('/students');
  const students = await res.json();

  const list = document.getElementById('studentList');
  list.innerHTML = '';

  students.forEach((s) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${s.name} (${s.marks} marks - Grade: ${s.grades})
      <button onclick="editStudent(${s.id}, '${s.name}', ${s.age}, '${s.gender}', ${s.marks})">Edit</button>
      <button onclick="deleteStudent(${s.id})">Delete</button>
    `;
    list.appendChild(li);
  });
}


async function deleteStudent(id) {
  if (confirm('Are you sure you want to delete this student?')) {
    const res = await fetch(`/delete-student/${id}`, {
      method: 'DELETE',
    });
    const result = await res.json();
    alert(result.message);
    fetchStudents();
  }
}


function editStudent(id, name, age, gender, marks) {
  document.getElementById('name').value = name;
  document.getElementById('age').value = age;
  document.getElementById('gender').value = gender;
  document.getElementById('marks').value = marks;
  editingId = id;
  document.querySelector('button[type="submit"]').textContent = 'Update Student';
}


fetchStudents();
