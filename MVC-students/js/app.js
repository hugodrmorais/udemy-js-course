// const students = [
//   {
//     _id: 0,
//     name: "chico melato",
//     grades: {
//       portuguese: [1, 1, 2, 2],
//       math: [2, 2, 2, 2],
//       history: [2, 2, 3, 3],
//       science: [3, 3, 3, 3],
//     },
//   },
//   {
//     _id: 1,
//     name: "talita lima",
//     grades: {
//       portuguese: [4, 4, 4, 4],
//       math: [4, 4, 5, 5],
//       history: [5, 5, 6, 6],
//       science: [7, 7, 8, 9],
//     },
//   },
// ];

const studentsService = new StudentsService()

// students.forEach( student => {
//   studentsService.add(new StudentModel(student))
// });

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
