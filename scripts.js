const form = document.querySelector('.form')
const mask = document.querySelector('.form-mask')

function agendar() {
    form.style.left = '50%'
    form.style.transform = 'translateX(-50%)'
    mask.style.visibility = 'visible'
}

function closeForm() {
    form.style.left = '-350px'
    mask.style.visibility = 'hidden'
}