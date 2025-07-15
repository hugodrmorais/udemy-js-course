import { StudentsService } from './js/Services/Students.service.js';
import { EditStudentView } from './js/Views/EditStudent.view.js';
import { EditStudentController } from './js/Controllers/EditStudent.controller.js';
import { SubjectsService } from './js/Services/Subjects.service.js';

// Instantiate your StudentsService
const studentsService = new StudentsService();

// Get URL parameters
const paramsString = window.location.search;
const URLparams = new URLSearchParams(paramsString);
const id = parseInt(URLparams.get("id")); // Get the 'id' parameter from the URL and convert to integer

// Search for the student by ID using the service
const student = studentsService.searchById(id);

// If a student is found, populate the input field with their name
if (student) {
  document.getElementById("first_name").value = student.name;
}

const editStudentView = new EditStudentView(
  document.querySelector("[data-edit-student-form]"),
  new SubjectsService().subjects)

const editStudentController = new EditStudentController(student, editStudentView, studentsService)

document.querySelector("form").addEventListener("submit", function(e){
  e.preventDefault()
  const name = document.querySelector("#first_name").value

  editStudentController.edit(student, name)
  window.location.assign("index.html")
})
