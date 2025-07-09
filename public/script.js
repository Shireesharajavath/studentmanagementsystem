async function fetchStudents() {
  const res = await fetch('http://localhost:4000/students');
  const data = await res.json();

  const tbody = document.getElementById('studentTableBody');
  tbody.innerHTML = '';

  data.forEach(student => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td><a href="student.html?id=${student.id}">${student.name}</a></td>
      <td>${student.age}</td>
      <td>${student.gender}</td>
      <td>${student.marks}</td>
      <td>${student.grades || '-'}</td>
      <td>
        <button class="edit-btn" onclick="editStudent(${student.id})">Edit</button>
        <button class="delete-btn" onclick="deleteStudent(${student.id})">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function editStudent(id) {
  window.location.href = `edit.html?id=${id}`;
}

async function deleteStudent(id) {
  const confirmed = confirm("Are you sure you want to delete this student?");
  if (!confirmed) return;

  await fetch(`http://localhost:4000/students/${id}`, {
    method: 'DELETE'
  });
  fetchStudents(); 
}

fetchStudents();
