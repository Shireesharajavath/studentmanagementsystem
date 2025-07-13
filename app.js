const express = require('express');
const cors = require('cors');

const {
  add_Student,
  get_All_Students,
  update_Student,
  delete_Student,
  getSingleStudent  
} = require('./controllers/studentController');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/add-student', add_Student);
app.get('/students', get_All_Students);
app.get('/students/:id', getSingleStudent); 
app.put('/update-student/:id', update_Student);
app.delete('/delete-student/:id', delete_Student);

app.listen(4000, () => {
  console.log('Server running at http://localhost:4000');
});
