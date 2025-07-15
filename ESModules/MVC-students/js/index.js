import { StudentsService } from "./Services/Students.service.js"
import { StudentsView } from "./Views/Students.view.js"
import { StudentsController } from "./Controllers/Students.controller.js"
import { SubjectsService } from "./Services/Subjects.service.js"

const studentsService = new StudentsService()

const studentsView = new StudentsView(
  document.querySelector('[data-table-students'),
  new SubjectsService().subjects
)

const studentsController = new StudentsController(studentsService, studentsView)

document.querySelector("form").addEventListener("submit", function(e){
  e.preventDefault()
  const name = document.getElementById("first_name").value

  studentsController.add({name})
})

document.querySelector("#search_name").addEventListener("input", function () {
  const name = this.value

  if (name.length > 2 || name.length === 0) {
    studentsController.search(name)
  }
})
