const createForm = ({ root, inputTypesArray, onSubmit, vertical = true }) => {
    const form = document.createElement('div')
    const submit = document.createElement('button')
    const field = document.createElement('div')
    const control = document.createElement('div')
    const formData = {}

    submit.addEventListener('click', () => onSubmit(formData))
    submit.innerText = 'Submit'
    submit.classList.add('button')
    field.classList.add('field')
    field.classList.add('is-centered')
    control.classList.add('control')
    
    form.classList.add('box')
    inputTypesArray.forEach(inputType => {
        createInput(form, formData, inputType)  
    })

    control.appendChild(submit)
    field.appendChild(control)
    form.appendChild(submit)
    root.appendChild(form)
}