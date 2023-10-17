const taskListContainer = document.querySelector(".app__section-task-list")
const localStorageTarefas = localStorage.getItem("tarefas")

//Add Tarefas
const formTask = document.querySelector('.app__form-add-task')

const toggleFormTaskBtn = document.querySelector('.app__button--add-task')

const formLabel = document.querySelector('.app__form-label')

const textArea = document.querySelector(".app__form-textarea")

const cancelFormTaskBtn = document.querySelector('.app__form-footer__button--cancel')

const taskActiveDescription = document.querySelector(".app__section-active-task-description") 

const btnCancelar = document.querySelector('.app__form-footer__button--cancel')

const limparForm = () =>{
    textArea.value = ''
    formTask.classList.add("hidden")
}

const taskIconSvg = `<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24"
fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="12" cy="12" r="12" fill="#FFF" />
<path
    d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
    fill="#01080E" />
</`



let tarefaSelecionada = null
let itemTarefaSelecionada = null

let tarefaEmEdicao = null
let paragraphEmedicao = null

const selecionaTarefaParaEditar = () =>{

}



const selecionaTarefa = (tarefa, elemento) => {

document.querySelectorAll('.app__section-task-list-item-active').forEach(function (button) {
    button.classList.remove('app__section-task-list-item-active')
})

if (tarefaSelecionada == tarefa) {
    taskActiveDescription.textContent = null
    itemTarefaSelecionada = null
    tarefaSelecionada = null
    return
}

tarefaSelecionada = tarefa
itemTarefaSelecionada = elemento
taskActiveDescription.textContent = tarefa.descricao
elemento.classList.add('app__section-task-list-item-active')
}

let tarefas = localStorageTarefas ? JSON.parse(localStorageTarefas) : []

function createTask (tarefa) {
    const li = document.createElement("li")
    li.classList.add("app__section-task-list-item")

    const svgIcon = document.createElement("svg")
    svgIcon.innerHTML = taskIconSvg

    const paragraph = document.createElement("p")
    paragraph.classList.add("app__section-task-list-item-description")
    paragraph.textContent = tarefa.descricao

    const button = document.createElement("button")
    
    button.classList.add("app__button-edit")
    const editIcon = document.createElement('img')
    editIcon.setAttribute('src', './imagens/edit.png')
    button.appendChild(editIcon)

    li.onclick = () =>{
        selecionaTarefa(tarefa, li)
    }

    svgIcon.addEventListener('click', (event) =>{
        event.stopPropagation()
        button.setAttribute('disabled', true)
        li.classList.add('app__section-task-list-item-complete')
    })

    if(tarefa.concluida){
        button.setAttribute('disabled', true)
        li.classList.add('app__section-task-list-item-complete')
    }

    li.appendChild(svgIcon)
    li.appendChild(paragraph)
    li.appendChild(button)

    return li
}

tarefas.forEach(task => { 
    const taskItem = createTask(task)
    taskListContainer.appendChild(taskItem)
})

toggleFormTaskBtn.addEventListener('click', () => {
    formLabel.textContent = 'Adicionando tarefa'
    formTask.classList.toggle('hidden')
})

cancelFormTaskBtn.addEventListener('click', () => {
    formTask.classList.add('hidden')
})

btnCancelar.addEventListener("click", limparForm)

const updateLocalStorage = () =>{
    localStorage.setItem("tarefas", JSON.stringify(tarefas))
}

formTask.addEventListener("submit", (evento) =>{
    evento.preventDefault()
    const task = {
        descricao: textArea.value,
        concluida: false
    }
    tarefas.push(task)
    const taskItem = createTask(task)
    taskListContainer.appendChild(taskItem)
    
    updateLocalStorage()
    limparForm()
})

