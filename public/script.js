

 
// Load student list on index.html
window.onload = () => {
  const tbody = document.getElementById('studentTableBody');
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
 
  if (tbody) {
    fetch('http://localhost:4000/students')
      .then(res => res.json())
      .then(data => {
        tbody.innerHTML = '';
        data.forEach(student => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td><a href="student.html?id=${student.id}">${student.name}</a></td>
            <td>${student.age}</td>
            <td>${student.gender}</td>
            <td>${student.marks}</td>
            <td>${student.grades}</td>
            <td>
              <button class="blue-btn" onclick="location.href='edit.html?id=${student.id}'">Edit</button>
              <button class="red-btn" onclick="deleteStudent(${student.id})">Delete</button>
            </td>
          `;
          tbody.appendChild(row);
        });
      });
  }
 
  // Load student data on edit.html
  const editForm = document.getElementById('editForm');
  if (editForm && id) {
    fetch(`http://localhost:4000/students/${id}`)
      .then(res => res.json())
      .then(student => {
        document.getElementById('edit-name').value = student.name;
        document.getElementById('edit-age').value = student.age;
        document.getElementById('edit-gender').value = student.gender;
        document.getElementById('edit-marks').value = student.marks;
      });
 
    editForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const updatedStudent = {
        name: document.getElementById('edit-name').value,
        age: document.getElementById('edit-age').value,
        gender: document.getElementById('edit-gender').value,
        marks: document.getElementById('edit-marks').value
      };
 
      fetch(`http://localhost:4000/update-student/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedStudent)
      }).then(() => {
        window.location.href = 'index.html';
      });
    });
  }
 
  // Load student details on student.html
  if (window.location.pathname.includes('student.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    const studentId = urlParams.get('id');
 
    if (!studentId) {
      alert("Invalid student ID");
      window.location.href = "index.html";
      return;
    }
 
    fetch(`http://localhost:4000/students/${studentId}`)
      .then(res => res.json())
      .then(student => {
        document.getElementById("detail-name").value = student.name;
        document.getElementById("detail-age").value = student.age;
        document.getElementById("detail-gender").value = student.gender;
        document.getElementById("detail-marks").value = student.marks;
        document.getElementById("detail-grade").value = student.grades || calculateGrade(student.marks);
      })
      .catch(err => {
        console.error(err);
        alert("Student not found.");
        window.location.href = "index.html";
      });
 
    window.editStudent = () => {
      window.location.href = `edit.html?id=${studentId}`;
    };
 
    window.deleteStudent = () => {
      if (confirm("Are you sure you want to delete this student?")) {
        fetch(`http://localhost:4000/delete-student/${studentId}`, {
          method: "DELETE",
        })
          .then(() => {
            alert("Student deleted successfully.");
            window.location.href = "index.html";
          })
          .catch(err => {
            alert("Failed to delete student.");
            console.error(err);
          });
      }
    };
  }
};
 
// Add student on add.html
document.addEventListener('DOMContentLoaded', () => {
  const addForm = document.getElementById('addForm');
  if (addForm) {
    addForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newStudent = {
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        marks: document.getElementById('marks').value
      };
 
      fetch('http://localhost:4000/add-student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent)
      }).then(() => {
        window.location.href = 'index.html';
      });
    });
  }
});
 
function deleteStudent(id) {
  if (confirm('Are you sure you want to delete this student?')) {
    fetch(`http://localhost:4000/delete-student/${id}`, {
      method: 'DELETE'
    }).then(() => {
      window.location.reload();
    });
  }
}
 
function calculateGrade(marks) {
  const m = parseInt(marks);
  if (m >= 90) return 'A';
  if (m >= 75) return 'B';
  if (m >= 60) return 'C';
  if (m >= 45) return 'D';
  return 'F';
}
 

 