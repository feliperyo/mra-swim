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

const myObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show')
        } else {
            entry.target.classList.remove('show')
        }
    })
})

const elements = document.querySelectorAll('.hidden')

elements.forEach((element) => myObserver.observe(element))