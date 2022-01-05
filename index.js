const form = document.getElementById("todo__form")
let allTodo = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem('todos')).reverse() : []
let tasks = document.getElementById('tasks')


const deleteTodo = (e) => {
  let value = e.target.parentElement.value
  e.target.parentElement.remove()
  allTodo.splice(allTodo.indexOf(value), 1)
  localStorage.setItem('todos', JSON.stringify(allTodo))
  showTasks()
  showInfo()
}

const showInfo = () => {
  const info = document.getElementById("info")

  if (allTodo.length === 0) {
    info.innerHTML = `
      <h1 class="mt-5 text-center">No task added!</h1>
    `
    info.style.display = "block"
    document.body.appendChild(info)
  } else {
    info.style.display = "none"
  }
}

const showTasks = () => {
  tasks.innerHTML = ''
  let ul = document.createElement("ul")
  allTodo.forEach(todo => {
    let li = document.createElement("li")
    let button = document.createElement("button")
    button.innerText = "Delete"
    button.className = "btn btn-danger btn-sm float-end"
    button.onclick = deleteTodo
    li.innerText = todo
    li.appendChild(button)

    li.className = "list-group-item task"
    li.style.height = "53px"
    ul.appendChild(li)
  })

  tasks.className = "container mt-5"
  tasks.appendChild(ul)
  document.body.appendChild(tasks)
}


form.onsubmit = (e) => {
  e.preventDefault()
  const todoName = e.target.todo__title.value.trim()
  e.target.todo__title.value = ''

  if (todoName) {
    localStorage.setItem('todos', JSON.stringify([...allTodo, todoName]))
    allTodo = JSON.parse(localStorage.getItem("todos")).reverse()
    showInfo()
    showTasks()
  }

}

showInfo()
showTasks()
