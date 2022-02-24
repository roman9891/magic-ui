const createInput = (root, dataStore, type) => {
    const column = document.createElement('div')
    const field = document.createElement('div')
    const label = document.createElement('label')
    const input = document.createElement('input')

    column.classList.add('column')
    field.classList.add('field')
    label.classList.add('label')
    input.classList.add('input')
    label.innerText = `${type}: `
    input.addEventListener('input', (e) => {
        dataStore[type] = e.target.value
        console.log(dataStore)
    })

    column.appendChild(field)
    field.appendChild(label)
    field.appendChild(input)
    root.appendChild(column)
}
