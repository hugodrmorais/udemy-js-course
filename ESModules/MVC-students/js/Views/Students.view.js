export class StudentsView {
  constructor(table, subjects) {
    this.tableList = table;
    this.tableHeader = this.tableList.querySelector('thead');
    this.tableBody = this.tableList.querySelector('tbody');
    this.subjects = ["portuguese", "math", "history", "science"]

    this.renderHeader()
  }

  renderHeader() {
    const htmlHeader = document.createElement("tr")
    htmlHeader.innerHTML = "<td>Name</td>"

    let htmlHeaderSubjects = this.subjects.map(subject => {
      return "<td>" + subject + "</td>"
    }).join("")

    htmlHeader.innerHTML += htmlHeaderSubjects

    this.tableHeader.appendChild(htmlHeader)
  }

  render(students) {
    this.tableBody.innerHTML = ""
    students.forEach( student => {
      let htmlRow = document.createElement("tr")

      let htmlAVG = `<td><a href="edit.html?id=${student._id}">${student.name}</a></td>`
      let found = false

      this.subjects.forEach( subject => {
        if(subject in student.grades) {
          found = true
        }
      })

      if(found) {
        this.subjects.forEach( grade => {
          htmlAVG += `<td>
            ${student.avg[grade] !== undefined ?
              student.avg[grade] :
              `<a href="edit.html?id=${student._id}">Add grade</a>`}
          </td>`
        })
      } else {
        htmlAVG += `<td colspan="${this.subjects.length}">
          <a href="edit.html?id=${student._id}">Add grades</a>
        </td>`
      }

      htmlRow.innerHTML = htmlAVG

      this.tableBody.appendChild(htmlRow)
    })
  }
}
