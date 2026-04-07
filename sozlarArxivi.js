const supabaseUrl = 'https://ayriinfhhziwoxlgwpem.supabase.co'
const supabaseKey = 'sb_publishable_BDCOwMVcpeDIr7FbHp7rUA_kvtMFX8N'

const _supabase = supabase.createClient(supabaseUrl, supabaseKey)

async function Yubor() {
    let yangiSoz = document.getElementById('yangi-soz').value
    let talafuz = document.getElementById('talafuz').value
    let tarjima = document.getElementById('tarjima').value

    const { data, error } = await _supabase
        .from('Sozlar')
        .insert([
            {
                YangiSoz: yangiSoz,
                Talafuz: talafuz,
                Tarjima: tarjima
            }
        ])
    if (error) {
        alert('Xatolik yuz berdi!', error.message)
    }
    else {
        alert("Bazaga qo'shildi")
        tozala()
    }
}
function tozala() {
    yangiSoz.value = ''
    talafuz.value = ''
    tarjima.value = ''
}

let ochish = document.getElementById('ochish')
let modalCon = document.querySelector('.modal-con')
let day = document.getElementById('day')
let month = document.getElementById('month')
let sana = document.getElementById('sana')
let X = document.querySelector('.X')
let cancel = document.getElementById('cancel')

let cardCon = document.getElementById('card-con')


ochish.addEventListener('click', () => {
    modalCon.style.display = 'flex'
})
X.addEventListener('click', () => {
    modalCon.style.display = 'none'
})
cancel.addEventListener('click', () => {
    modalCon.style.display = 'none'
})
setInterval(() => {
    const vaqt = new Date()
    let kun = vaqt.getDate().toString()
    let oy = vaqt.getMonth().toString()
    if (oy == 1) {
        month.innerText = 'Yanvar'
    }
    else if (month == 2) {
        oy.innerText = 'Fevral'
    }
    else if (month == 3) {
        oy.innerText = 'Mart'
    }
    else if (month == 4) {
        oy.innerText = 'Aprel'
    }
    else if (month == 5) {
        oy.innerText = 'May'
    }
    else if (month == 6) {
        oy.innerText = 'Iyun'
    }
    else if (month == 7) {
        oy.innerText = 'Iyul'
    }
    else if (month == 8) {
        oy.innerText = 'Avgust'
    }
    else if (month == 9) {
        oy.innerText = 'Sentabr'
    }
    else if (month == 10) {
        oy.innerText = 'Oktabr'
    }
    else if (month == 11) {
        oy.innerText = 'Noyabr'
    }
    else if (month == 12) {
        oy.innerText = 'Dekabr'
    }
    sana.innerText = `${kun}-${oy}`
})

let voices = [];
speechSynthesis.onvoiceschanged = () => {
    voices = speechSynthesis.getVoices();
};

function Gapir() {
    const text = document.getElementById('yangi-soz').textContent;
    const utterance = new SpeechSynthesisUtterance(text);
    let voices = speechSynthesis.getVoices();
    let voice = voices.find(v => v.lang.toLowerCase().includes('ru')) 
                || voices.find(v => v.lang.toLowerCase().includes('en')) 
                || voices[0];
    utterance.voice = voice;
    speechSynthesis.cancel();
    setTimeout(() => {
        speechSynthesis.speak(utterance);
    }, 100);
}