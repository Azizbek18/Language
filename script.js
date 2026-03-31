let parol = document.getElementById('parol')
let form = document.getElementById('form')
let login = document.getElementById('login')
let kirish = document.getElementById('kirish')


form.addEventListener('submit', (e) => {
    e.preventDefault()
    let sParol = localStorage.getItem('parol')
    let sLogin = localStorage.getItem('ism')
    if (sParol == parol.value && sLogin == login.value) {
        alert('Siz saytga kirdingiz')
        window.location.href = 'asosiy.html'
    }
    else {
        alert('Siz saytga kira olmadingiz')
    }
})