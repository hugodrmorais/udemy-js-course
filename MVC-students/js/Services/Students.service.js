class StudentsService {
  constructor(){
    this.students = []
    this.updateStudentsFromLocalStorage()
    console.log(this.students)
  }

  add(student) {
    if(!student instanceof StudentModel) {
      throw TypeError("student must be an instance of StudentModel")
    }
    this.students.push(student)
    this.updateLocalStorage()
  }

  edit(student) {
    this.updateLocalStorage()
    student.generateAverage()
  }

  searchById(id) {
    return this.students.find( student => student._id === id )
  }

  search(name) {
    return this.students.filter(student => student.name.indexOf(name) >= 0)
  }

  updateLocalStorage() {
    const students = JSON.stringify(this.students)
    localStorage.setItem("students", students)
  }

  updateStudentsFromLocalStorage() {
    const local = localStorage.getItem("students")
    if(local) {
      const students = JSON.parse(local)
      console.log("students")
      console.log(students)
      students.forEach( student => {
        this.add(new StudentModel(student))
      })
      console.log("this.students")
      console.log(this.students)
    }
  }
}
