class Person<T> {
  constructor(private name: T) { }

  setName(name: T): void {
      this.name = name
  }
}

const daniel = new Person("daniel")
daniel.setName("daniel morales")

class List<T>{
  private list: T[] = []

  getFromList(index: number): T | null {
      const len = this.list.length
      if (len === 0) return null
      if (index > len || index < 0) return null
      return this.list[index]
  }

  removeFromList(index: number): T | null {
      const element = this.getFromList(index)

      if (element !== null) {
          this.list.splice(index, 1)
          return element
      }
      return null
  }

  addToList(element: T): this {
      this.list.push(element)
      return this
  }

}

class Animal<T> {
  constructor(private nome: T) { }

  setNome(nome: T): void {
      this.nome = nome
  }
}


const listPeople = new List<Person<string>>()
listPeople
  .addToList(daniel)
  .addToList(new Person("maria"))
  .addToList(new Person("joao"))
// .addToList(new Animal("toto"))

const listAnimal = new List<Animal<string>>()
listAnimal
  .addToList(new Animal("toto"))
  .addToList(new Animal("mingal"))

console.log(listPeople)
listPeople.removeFromList(1)
console.log(listPeople)
console.log(listAnimal.removeFromList(0))
console.log(listAnimal)
