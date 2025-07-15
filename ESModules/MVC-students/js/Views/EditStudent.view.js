export class EditStudentView {
  constructor(form, subjects) {
    this.form = form
    this.container = form.querySelector("[data-edit-grades]")
    this.subjects = subjects
  }

  render(student) {
    console.log(this.container)
    const html = this.subjects.map( subject =>
      `<div class="row" data-subject="${subject}">
        <div class="input-field col s4">
          <input
            id="grade_${subject}"
            type="text"
            class="validate"
            placeholder=${subject}
            disabled
          />
          <label for="grade_${subject}" class="active"></label> </div>
        <div class="input-field col s2">
          <input data-quarter="0"
            id="nota_0_${subject}"
            type="number"
            class="validate"
            placeholder="Grade 1"
            value="${student.grades[subject]?.[0]}"
          />
          <label for="nota_0_${subject}" class="active">Grade 1</label> </div>
        <div class="input-field col s2">
          <input data-quarter="1"
            id="nota_1_${subject}"
            type="number"
            class="validate"
            placeholder="Grade 2"
            value="${student.grades[subject]?.[1]}"
          />
          <label for="nota_1_${subject}" class="active">Grade 2</label>
        </div>
        <div class="input-field col s2">
          <input data-quarter="2"
            id="nota_2_${subject}"
            type="number"
            class="validate"
            placeholder="Grade 3"
            value="${student.grades[subject]?.[2]}"
          />
          <label for="nota_2_${subject}" class="active">Grade 3</label>
        </div>
        <div class="input-field col s2">
          <input data-quarter="3"
            id="nota_3_${subject}"
            type="number"
            class="validate"
            placeholder="Grade 4"
            value="${student.grades[subject]?.[3]}"
          />
          <label for="nota_3_${subject}" class="active">Grade 4</label>
        </div>
      </div>`
    ).join("")
    console.log(html)
    this.container.innerHTML = html
  }
}
