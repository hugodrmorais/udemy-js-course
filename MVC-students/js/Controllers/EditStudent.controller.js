class EditStudentController {
  constructor(model, view, service){
    this.model = model
    this.view = view
    this.service = service
    this.view.render(model)
  }

  edit(student, name) {
    student.name = name

    const grades = {}

    const subjectsRow = Array.from(this.view.container.querySelectorAll("[data-subject]"))
    console.log(subjectsRow)

    subjectsRow.forEach( row => {
      const gradesRow = Array.from(row.querySelectorAll("[data-quarter]"))
      console.log(gradesRow)

      grades[row.getAttribute("data-subject")] = gradesRow.map( grade => parseFloat(grade.value) || 0)

    })
    console.log(grades)
    student.grades = grades

    this.service.edit(student)
  }
}
