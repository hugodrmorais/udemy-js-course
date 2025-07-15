import { average  } from "../calc.js"

export class StudentModel {
  // constructor(student) {
  //   this.name = student.name
  // }

  constructor({name, _id, grades} = {grades: {}}) {
    this.name = name
    this._id = (_id !== undefined) ? _id : this.generateId()
    this.grades = {...grades}

    if(this._id > StudentModel.maxId) {
      StudentModel.maxId = this._id
    }

    this.avg = {}

    this.generateAverage()
  }

  generateId() {
    return StudentModel.maxId + 1
  }

  generateAverage() {
    for(let subject in this.grades) {
      this.avg[subject] = average(...this.grades[subject])
    }
  }
}

StudentModel.maxId = 0
