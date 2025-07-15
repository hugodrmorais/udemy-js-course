import { StudentModel } from "../Models/Student.model.js"

export class StudentsController {
  constructor(service, view){
    view.render(service.students)
    this.view = view
    this.service = service
  }

  add(student) {
    this.service.add(new StudentModel(student))
    this.view.render(this.service.students)
  }

  search(name) {
    const data = this.service.search(name)
    this.view.render(data)
  }
}
